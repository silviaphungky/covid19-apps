import React, { useEffect, useState } from 'react'
import { Row, Col, FormGroup, Collapse,Spinner, Label, Card, CardBody, Container } from 'reactstrap'
import CovidApi from '../service/covid-api'
import { Line } from 'react-chartjs-2'
import InputSearch from '../atoms/input/input-search'
import CheckBox from '../atoms/custom-input/custom-input-checkbox'
import ButtonDefault from '../atoms/button/button-default'
import DatePicker from 'react-datepicker'
import TitleH3Strong from '../atoms/title/strong/title-strong-h3'
import TitleH4Strong from '../atoms/title/strong/title-stronng-h4'
import TitleH6Strong from '../atoms/title/strong/title-strong-h6'
import StatisticCard from '../molecules/statistic-card'
import TitleH5Strong from '../atoms/title/strong/title-strong-h5'
import NavTab from '../atoms/nav-tab/nav-tab'

const History = () => {

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
    active    : 0,
    new       : 0,
    recovered : 0
  })
  const [deaths, setDeaths] = useState({
    active : 0,
    deaths : 0,
    total  : 0
  })
  const [time, setTime] = useState('')

  const [worldCases, setWorldCases] = useState({
    active    : 0,
    new       : 0,
    recovered : 0
  })
  const [worldDeaths, setWorldDeaths] = useState({
    active : 0,
    deaths : 0,
    total  : 0
  })
  const [worldTime, setWorldTime] = useState('')


  const [activeTab, setActiveTab] = useState(1)

  const [openSymptoms, setOpenSymptoms] = useState({
    less    : false,
    serious : false
  })

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
          responses.map((res, index) => {
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

          fetchChart(label, yAxis)
        })
      
    }

    
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

  return(
    <div className='position-realtive'>
      <div className='covid__header-img'>
        <div className='covid__header-text'>
          <TitleH3Strong
            text='COVID-19 OVERVIEW'
          />
        </div>
      </div>

      <Card className='covid__card-wrapper border-0'>
        <CardBody>
          
          <Row>
            <Col sm='12' lg={{ size: '8', offset: '2' }}>

              <div>
                <Row>
                  <Col>
                    <span className='mr-2 float-left'>
                      <i className="fas fa-globe fa-2x" />
                    </span>
                    <span className='float-left'>
                      <TitleH4Strong text='WORLDWIDE' />
                    </span>
                  </Col>
                </Row>
                <small className='text-blue'>
                  Last updated at { worldTime }
                </small>

                <Card className='rounded shadow border-0 mt-3'>
                  <StatisticCard
                    active={ worldCases.active.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }
                    newCase={ worldCases.new }
                    recovered={ worldCases.recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }

                    deaths={ worldDeaths.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }
                    newDeaths={ worldDeaths.new }
                  />
                </Card>
              </div>

              <Card className='rounded shadow border-0 mt-4 mb-3'>
                <CardBody>
                  <Row
                    className='covid__cursor--pointer text-blue'
                    onClick={ ()=>{
                      isOpen.country = !isOpen.country
                      setIsOpen({ ...isOpen })
                    } }
                  >
                    <Col>
                      <span className='float-left mr-3'>
                        <i className="fas fa-calendar-day fa-2x"/>
                      </span>
                      <span className='float-left'>
                        <TitleH5Strong text='Statistic' />
                      </span>
                      <span className='float-right'>
                        { isOpen.country ? <i className="fas fa-chevron-up fa-lg"/> : <i className="fas fa-chevron-down fa-lg" /> }
                      </span>
                    </Col>
                  </Row>

                  <Collapse isOpen={ isOpen.country }>
                    <InputSearch
                      label='Country'
                      options={ countryOptions }
                      handleChange={ handleClickCountry }
                    />
                    {
                      selectedCountryStatistic
                        ?
                        <Card className='covid__statictic-card-wrapper'>
                          <TitleH6Strong text={`Covid-19 Cases in ${ selectedCountryStatistic }`} />
                          <small>
                            date: { time }
                          </small>
                          <StatisticCard
                            active={ cases.active.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }
                            newCase={ cases.new }
                            recovered={ cases.recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }
                            deaths={ deaths.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }
                            newDeaths={ deaths.new }
                          />
                        </Card>
                        : null
                    }
                  </Collapse>
                </CardBody>
              </Card>
  
              <Card className='shadow round border-0 mb-3'>
                <CardBody>
                  
                  <Row
                    className='covid__cursor--pointer text-blue'
                    onClick={ ()=>{
                      isOpen.history = !isOpen.history
                      setIsOpen({ ...isOpen })
                    } }
                  >
                    <Col>
                      <span className='float-left mr-3'>
                        <i className="fas fa-chart-area fa-2x"/>
                      </span>
                      <span className='float-left'>
                        <TitleH5Strong text='History' />
                      </span>
                      <span className='float-right'>
                        { isOpen.history ? <i className="fas fa-chevron-up fa-lg"/> : <i className="fas fa-chevron-down fa-lg" /> }
                      </span>
                    </Col>
                  </Row>

                  <Collapse isOpen={ isOpen.history }>

                    { /*border*/ }
                    <div className='border py-5 px-3'>
                      <Row>
                        <Col xs='12' sm='12' md='8' lg='8' xl='8'>

                          { /*Input country*/ }
                          <InputSearch
                            label='Country'
                            options={ countryOptions }
                            handleChange={ onChangeCountry }
                          />

                          <Row>
                            <Col xs='12' sm='12' md='6' lg='6' xl='6'>
                              <FormGroup>
                                <Label className='pr-3'>
                                  From
                                </Label>
                                <DatePicker
                                  className='w-100'
                                  dateFormat='yyyy/MM/dd'
                                  selected={ startDate }
                                  onChange={ (date) => setStartDate(date) }
                                  minDate={ new Date('2019/12/20') }
                                  maxDate={ new Date() }
                                />
                              </FormGroup>
                            </Col>
                            <Col>
                              <Label className='pr-3'>
                                To
                              </Label>
                              <DatePicker
                                className='w-100'
                                dateFormat='yyyy/MM/dd'
                                selected={ endDate }
                                onChange={ (date) => setEndDate(date) }
                                minDate={ startDate }
                                maxDate={ new Date() }
                              />
                            </Col>
                          </Row>
                        </Col>
                        <Col xs='12' sm='12' md='4' lg='4' xl='4'>

                          { /*Plot options*/ }
                          <div className='mt-4'>
                            <Label>
                              Parameter
                            </Label>
                            <CheckBox
                              id='active-cases'
                              label='Active cases'  
                              isChecked={ isPlot['active cases'] }
                              handleChange={ handleClickActiveCases }
                            />
                            <CheckBox
                              id='total-recovered'
                              label='Total recovered'
                              isChecked={ isPlot['total recovered'] }
                              handleChange={ handleClickTotalRecovered }
                            />
                            <CheckBox
                              id='total-deaths'
                              label='Total deaths'
                              isChecked={ isPlot['total deaths'] }
                              handleChange={ handleClickTotalDeaths }
                            />
                          </div>
                        </Col>
                      </Row>

                      { /*Search button*/ }
                      <ButtonDefault
                        className='w-100 my-4'
                        text='Search'
                        isDisabled={ setButton() }
                        color='primary'
                        handleClick={ fetchHistory }
                      />
                    </div>
                    <Row>
                      <Col sm='12' lg={{ size: '8', offset: '2' }}>
                        {
                          loader
                            ? <div className='mt-3'>{ loader }</div>
                            : <Line 
                              width={ 2 }
                              height={ 2 }
                              data={ chartData }
                              options = {{ 
                                title: {
                                  display : true,
                                  text    : `COVID-19 OVERVIEW IN ${selectedCountryHistory.toUpperCase()}`
                                },
                                scales: {
                                  yAxes: [{
                                    scaleLabel: {
                                      display     : true,
                                      labelString : 'cases'
                                    }
                                  }],
                                  xAxes: [{
                                    scaleLabel: {
                                      display     : true,
                                      labelString : 'date'
                                    }
                                  }]
                                },
                                responsive: true
                              }}
                            />
                        }
                      </Col>
                    </Row>
                  </Collapse>
                </CardBody>
              </Card>

              <Card className='shadow round border-0'>
                <CardBody>
                  <Row
                    className='covid__cursor--pointer text-blue'
                    onClick={ ()=>{
                      isOpen.info = !isOpen.info
                      setIsOpen({ ...isOpen })
                    } }
                  >
                    <Col>
                      <span className='float-left mr-3'>
                        <i className="fas fa-file-alt fa-2x"/>
                      </span>
                      <span className='float-left'>
                        <TitleH5Strong text='Information' />
                      </span>
                      <span className='float-right'>
                        { isOpen.info ? <i className="fas fa-chevron-up fa-lg"/> : <i className="fas fa-chevron-down fa-lg" /> }
                      </span>
                    </Col>
                  </Row>

                  <Collapse isOpen={ isOpen.info }>
                    <NavTab 
                      activeTab={ activeTab }
                      setActiveTab={ setActiveTab }
                      openSymptoms={ openSymptoms }
                      setOpenSymptoms={ setOpenSymptoms }
                    />
                  </Collapse>
                </CardBody>
              </Card>

            </Col>
          </Row>

        </CardBody>
      </Card>

      <div className='bg-blue'>
        <Container className='text-center mt-4'>
          <Row>
            <Col>
              <a 
                className='text-white'
                href='https://github.com/silviaphungky'
              >
                <span className='pr-2'>
                  <i className="fab fa-github"/>
                </span>
                <span>
                silviaphungky
                </span>
              </a>
            </Col>
            <Col>
              <a 
                className='text-white'
                href='https://www.instagram.com/_sisilp/'
              >
                <span>
                  <i className="fab fa-instagram" />
                </span>
                <span>
                _sisilp
                </span>
              </a>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default History
