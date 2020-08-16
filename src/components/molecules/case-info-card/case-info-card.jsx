import React from 'react'
import { Row } from 'reactstrap'
import FaHeart from '../../atoms/fontawesome/heart/fa-heart'
import CaseInfoCol from '../case-info-col/case-info-col'
import FaExclamationTriangle from '../../atoms/fontawesome/excalamtion-triangle/fa-exclamation-triangle'
import FaTimesCircle from '../../atoms/fontawesome/times-circle/fa-times-cirlce'
import PropTypes from 'prop-types'

const propTypes = {
  active    : PropTypes.string,
  newCase   : PropTypes.string,
  recovered : PropTypes.string,
  deaths    : PropTypes.string,
  newDeaths : PropTypes.string
}

const defaultProps = {
  active    : '0',
  newCase   : '+1',
  recovered : '0',
  deaths    : '0',
  newDeaths : '+1'
}

const CaseInfoCard = ({
  active,
  newCase,
  recovered,
  deaths,
  newDeaths
}) => (
  <Row className='py-3'>
    <CaseInfoCol
      icon={ <FaExclamationTriangle /> }
      cases={ active }
      newCase={ newCase }
      text='Active'
      color='yellow'
    />
    <CaseInfoCol
      icon={ <FaHeart /> }
      cases={ recovered }
      newCase={ null }
      text='Recovered'
      color='tosca'
    />
    <CaseInfoCol
      icon={ <FaTimesCircle /> }
      cases={ deaths }
      newCase={ newDeaths }
      text='Deaths'
      color='danger'
    />
  </Row>
)

CaseInfoCard.propTypes = propTypes
CaseInfoCard.defaultProps = defaultProps

export default CaseInfoCard
