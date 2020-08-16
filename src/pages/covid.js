import React, { useEffect, useState } from 'react'
import { Row, Col, Spinner, Card, CardBody } from 'reactstrap'
import CovidApi from '../service/covid-api'
import Header from '../components/molecules/header/header'
import Worldwide from '../components/orgnism/worldwide/worldwide'
import Statistic from '../components/orgnism/statistic/statistic'
import History from '../components/orgnism/history/history'
import Footer from '../components/molecules/footer/footer'
import InfoSection from '../components/orgnism/information/information'
import FooterConstant from '../constant/footer-constant'
import commaRemover from '../utils/comma-remover'

const Covid = () => {

  const [countryOptions, setCountryOptions] = useState([])
  const [selectedCountryHistory, setSelectedCountryHistory] = useState('')
  const [selectedCountryStatistic, setSelectetdCountryStatistic] = useState('')

  const [startDate, setStartDate] = useState(new Date().setDate(new Date().getDate()-1))
  const [endDate, setEndDate] = useState(new Date())

  const [chartData, setChartData] = useState({})

  const [isPlot, setIsPlot] = useState({
    'active cases'    : false,
    'total deaths'    : false,
    'total recovered' : false
  })

  const [loader, setLoader] = useState(null)

  const [isOpen, setIsOpen] = useState({
    country : true,
    history : false,
    info    : false 
  })

  const color = {
    0 : 'rgba(54,162,235,1)',
    1 : 'rgba(244, 208, 63, 1)',
    2 : 'rgba(219, 10, 91, 1)'
  }

  const [cases, setCases] = useState({
    active    : '0',
    new       : '0',
    recovered : '0'
  })
  const [deaths, setDeaths] = useState({
    active : '0',
    deaths : '0',
    total  : '0'
  })
  const [time, setTime] = useState('')

  const [worldCases, setWorldCases] = useState({
    active    : '0',
    new       : '0',
    recovered : '0'
  })
  const [worldDeaths, setWorldDeaths] = useState({
    active : '0',
    deaths : '0',
    total  : '0'
  })
  const [worldTime, setWorldTime] = useState('')


  const [activeTab, setActiveTab] = useState(1)

  useEffect(()=> {
    fetchCountry()
    fetchWorldData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchCountry = () => {
    CovidApi.getCountries()
      .then((res)=> { 
        const countries = res.data.response
        setCountryOptions(countries)
      })
      .catch((err) => alert('failed to get the data'))
  }

  const fetchWorldData = () => {
    CovidApi.getStatistic('all')
      .then((res)=> {
        const data = res.data.response[0]
        const cases = data.cases
        const deaths = data.deaths
        const time = new Date(data.time)
        
        setWorldCases(cases)
        setWorldDeaths(deaths)
        setWorldTime(time.toDateString())
      })
  }

  const setButton = () => {
    const selectedPlot = Object.values(isPlot).find((value) => value === true)
    const disable = selectedCountryHistory && selectedPlot ? false : true
    return disable
  }

  const onChangeCountry = (e) => {
    const country = e.target.value


    if(e.target.value) {
      setSelectedCountryHistory(country)
    }
  }

  const dateConvertion = (loop) => {
    const convertionOutput = loop.toISOString().split('T')[0]
    return convertionOutput
  }

  const fetchHistory = () => {
    const promises = []

    var start = new Date(startDate)
    var end = new Date(endDate)

    if (dateConvertion(start) === dateConvertion(end)) {
      alert('minimum 2 days for plotting')
    }
    else {
      while(start <= end){
        promises.push(CovidApi.getHistory({ country: selectedCountryHistory, date: dateConvertion(start) }))
        var newDate = start.setDate(start.getDate() + 1)  
        start = new Date(newDate)
      }
      
      let label = []
      let yActive = []
      let yRecovery = []
      let yDeath = []
  
      let yAxis = {}

      setLoader(      
        <div className='text-center'>
          <Spinner color='primary' size='sm'/>
        </div>
      )
      Promise.all(promises)
        .then((responses)=>{
          responses.map((res) => {
            setLoader(null)
            const date = res.data.parameters.day
            if(res.data.response.length === 0) { // belum ada case covid
              label.push(date)
              yActive.push(0)
              yRecovery.push(0)
              yDeath.push(0)
            }
            else {
              const data = res.data.response[0]
              const active = data.cases.active  
              label.push(date)
              yActive.push(active)
              yRecovery.push(data.cases.recovered)
              yDeath.push(data.deaths.total)
            }
            return null
          })
          if(isPlot['active cases']) {
            yAxis['active cases']=yActive
          }
          if(isPlot['total deaths']) {
            yAxis['total deaths']=yDeath
          }
          if(isPlot['total recovered']) {
            yAxis['total recovered']=yRecovery
          }

          return fetchChart(label, yAxis)
        }) 
    }
  }

  const handleClickCountry = (e) => {
    const country = e.target.value

    if(e.target.value) {
      CovidApi.getStatistic(country)
        .then((res)=> {
          const data = res.data.response[0]
          const country = data.country
          const cases = data.cases
          const deaths = data.deaths
          const time = new Date(data.time)

          setSelectetdCountryStatistic(country)
          setCases(cases)
          setDeaths(deaths)
          setTime(time.toDateString())
        })
    }
  }

  const handleClickActiveCases = () => {
    isPlot['active cases'] = !isPlot['active cases']
    setIsPlot( { ...isPlot })
  }

  const handleClickTotalRecovered = () => {
    isPlot['total recovered'] = !isPlot['total recovered']
    setIsPlot({ ...isPlot })
  }

  const handleClickTotalDeaths = () => {
    isPlot['total deaths'] = !isPlot['total deaths']
    setIsPlot({ ...isPlot })
  }

  const fetchChart = (label, yAxis) => {
    setChartData({
      labels   : label,
      datasets : Object.keys(yAxis).map((key, index)=> (
        {
          label                 : key,
          fill                  : false,
          lineTension           : 0.1,
          backgroundColor       : color[index],
          borderColor           : color[index],
          borderCapStyle        : 'butt',
          borderDash            : [],
          borderDashOffset      : 0.0,
          borderJoinStyle       : 'miter',
          pointBorderColor      : color[index],
          pointBackgroundColor  : '#fff',
          pointBorderWidth      : 1,
          pointHoverRadius      : 5,
          pointHoverBorderWidth : 2,
          pointRadius           : 1,
          pointHitRadius        : 1,
          data                  : yAxis[key]
        }
      ))
    })
  }

  return(
    <div className='position-realtive'>
      <Header />
      <Card className='covid__card-wrapper border-0'>
        <CardBody>
          <Row>
            <Col sm='12' lg={{ size: '8', offset: '2' }}>
              <Worldwide 
                worldTime={ worldTime }
                active={ commaRemover(worldCases.active) }
                newCase={ worldCases.new }
                recovered={ commaRemover(worldCases.recovered) }
                deaths={ commaRemover(worldDeaths.total) }
                newDeaths={ worldDeaths.new }
              />
              <Statistic
                time={ time }
                isOpen={ isOpen }
                setIsOpen={ setIsOpen }
                countryOptions={ countryOptions }
                handleClickCountry={ handleClickCountry }
                selectedCountryStatistic={ selectedCountryStatistic }
                active={ commaRemover(cases.active) }
                newCase={ cases.new }
                recovered={ commaRemover(cases.recovered) }
                deaths={ commaRemover(deaths.total) }
                newDeaths={ deaths.new }

              />
              <History
                isOpen={ isOpen }
                setIsOpen={ setIsOpen }
                startDate={ startDate }
                setStartDate={ setStartDate }
                endDate={ endDate }
                setEndDate={ setEndDate }
                countryOptions={ countryOptions }
                handleClickActiveCases={ handleClickActiveCases }
                handleClickTotalRecovered={ handleClickTotalRecovered }
                handleClickTotalDeaths={ handleClickTotalDeaths }
                onChangeCountry={ onChangeCountry }
                loader={ loader }
                isPlot={ isPlot }
                setButton={ setButton }
                fetchHistory={ fetchHistory }
                chartData={ chartData }
                selectedCountryHistory={ selectedCountryHistory }
              />
              <InfoSection 
                isOpen={ isOpen }
                setIsOpen={ setIsOpen }
                activeTab={ activeTab }
                setActiveTab={ setActiveTab }
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Footer profiles={ FooterConstant }/>
    </div>
  )
}

export default Covid
