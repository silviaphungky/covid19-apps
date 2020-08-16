import React from 'react'
import { Card, CardBody, Row, Col, Collapse, Spinner } from 'reactstrap'
import InputSearch from '../../atoms/input/input-search'
import ButtonDefault from '../../atoms/button/button-default'
import CollapseTitleBlock from '../../molecules/collapse-title-block/collapse-title-block'
import FaChartArea from '../../atoms/fontawesome/chart-area/fa-chart-area'
import ParameterBlock from '../../molecules/parameter-block/parameter-block'
import RangeDateBlock from '../../molecules/range-date-block/range-date-block'
import ChartLine from '../../atoms/chart/chart-line'
import PropTypes from 'prop-types'

const propTypes = {
  isOpen                    : PropTypes.object,
  setIsOpen                 : PropTypes.func,
  startDate                 : PropTypes.number,
  setStartDate              : PropTypes.func,
  endDate                   : PropTypes.number,
  setEndDate                : PropTypes.func,
  countryOptions            : PropTypes.array,
  handleClickActiveCases    : PropTypes.func,
  handleClickTotalRecovered : PropTypes.func,
  handleClickTotalDeaths    : PropTypes.func,
  onChangeCountry           : PropTypes.func,
  loader                    : PropTypes.elementType,
  isPlot                    : PropTypes.object,
  setButton                 : PropTypes.func,
  fetchHistory              : PropTypes.func,
  chartData                 : PropTypes.object,
  selectedCountryHistory    : PropTypes.string
}

const defaultProps = {
  isOpen                    : {},
  setIsOpen                 : () => {},
  startDate                 : new Date(),
  setStartDate              : () => {},
  endDate                   : new Date(),
  setEndDate                : () => {},
  countryOptions            : [],
  handleClickActiveCases    : () => {},
  handleClickTotalRecovered : () => {},
  handleClickTotalDeaths    : () => {},
  onChangeCountry           : () => {},
  loader                    : <Spinner />,
  isPlot                    : {},
  setButton                 : () => {},
  fetchHistory              : () => {},
  chartData                 : {},
  selectedCountryHistory    : ''
}

const History = ({
  isOpen,
  setIsOpen,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  countryOptions,
  handleClickActiveCases,
  handleClickTotalRecovered,
  handleClickTotalDeaths,
  onChangeCountry,
  loader,
  isPlot,
  setButton,
  fetchHistory,
  chartData,
  selectedCountryHistory
}) => {
  const hanldleClickCollapse = () => {
    isOpen.history = !isOpen.history
    setIsOpen({ ...isOpen })
  }

  return(
    <div>
      <Card className='shadow round border-0 mb-3'>
        <CardBody>

          <CollapseTitleBlock
            text='History'
            isOpen={ isOpen.history }
            handleClickCollapse={ hanldleClickCollapse }
            icon={ <FaChartArea /> }
          />

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

                  { /*Datetime*/ }
                  <RangeDateBlock
                    startDate={ startDate }
                    endDate={ endDate }
                    setStartDate={ setStartDate }
                    setEndDate={ setEndDate }
                  />
                </Col>

                <Col xs='12' sm='12' md='4' lg='4' xl='4'>
                  { /*Parameter*/ }
                  <ParameterBlock 
                    isPlot={ isPlot }
                    handleClickActiveCases={ handleClickActiveCases }
                    handleClickTotalRecovered={ handleClickTotalRecovered }
                    handleClickTotalDeaths={ handleClickTotalDeaths }
                  />
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
            <Row className='mt-4'>
              <Col sm='12' lg={{ size: '8', offset: '2' }}>
                {
                  loader
                    ? <div className='mt-3'>{ loader }</div>
                    :<ChartLine 
                      chartData={ chartData }
                      options={{ 
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
    </div>
  )
}

History.propTypes = propTypes
History.defaultProps = defaultProps

export default History

