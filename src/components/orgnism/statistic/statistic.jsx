import React from 'react'
import { Card, CardBody,Collapse } from 'reactstrap'
import InputSearch from '../../atoms/input/input-search'
import CaseInfoCard from '../../molecules/case-info-card/case-info-card'
import TitleDateBlock from '../../molecules/title-date-block/title-date-block'
import CollapseTitleBlock from '../../molecules/collapse-title-block/collapse-title-block'
import FaCalender from '../../atoms/fontawesome/calender/fa-calender'
import PropTypes from 'prop-types'

const propTypes = {
  time                     : PropTypes.string,
  isOpen                   : PropTypes.object,
  countryOptions           : PropTypes.object,
  handleClickCountry       : PropTypes.func,
  selectedCountryStatistic : PropTypes.string,
  active                   : PropTypes.string,
  newCase                  : PropTypes.string,
  recovered                : PropTypes.string,
  deaths                   : PropTypes.string,
  newDeaths                : PropTypes.string
}

const defaultProps = {
  time                     : '',
  isOpen                   : {},
  countryOptions           : {},
  handleClickCountry       : ()=> {},
  selectedCountryStatistic : '',
  active                   : '',
  newCase                  : '',
  recovered                : '',
  deaths                   : '',
  newDeaths                : ''
}

const Statistic = ({
  time,
  isOpen,
  setIsOpen,
  countryOptions,
  handleClickCountry,
  selectedCountryStatistic,
  active,
  newCase,
  recovered,
  deaths,
  newDeaths
}) => {

  const hanldleClickCollapse = () => {
    isOpen.country = !isOpen.country
    setIsOpen({ ...isOpen })
  }

  return(
    <>
      <Card className='rounded shadow border-0 mt-4 mb-3'>
        <CardBody>
          <CollapseTitleBlock 
            text='Statistic'
            isOpen={ isOpen.country }
            handleClickCollapse={ hanldleClickCollapse }
            icon={ <FaCalender /> }
          />

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
                  <TitleDateBlock
                    text={ `Covid-19 Cases in ${ selectedCountryStatistic }` }
                    time={ time }
                    isFaGlobe={ false }
                  />
                  <CaseInfoCard
                    active={ active }
                    newCase={ newCase }
                    recovered={ recovered }
                    deaths={ deaths }
                    newDeaths={ newDeaths }
                  />
                </Card>
                : null
            }
          </Collapse>
        </CardBody>
      </Card>
    </>
  )
}

Statistic.propTypes = propTypes
Statistic.defaultProps = defaultProps

export default Statistic
