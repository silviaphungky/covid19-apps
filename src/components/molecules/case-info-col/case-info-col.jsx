import React from 'react'
import { Col } from 'reactstrap'
import PropTypes from 'prop-types'
import FaExclamationTriangle from '../../atoms/fontawesome/excalamtion-triangle/fa-exclamation-triangle'

const propTypes = {
  icon    : PropTypes.elementType,
  cases   : PropTypes.string,
  newCase : PropTypes.string,
  text    : PropTypes.string,
  color   : PropTypes.string
}

const defaultProps = {
  icon    : <FaExclamationTriangle />,
  cases   : '0',
  newCase : '+1',
  text    : 'Active',
  color   : 'yellow'
}

const CaseInfoCol = ({
  icon,
  cases,
  newCase,
  text,
  color
}) => (
  <Col className='postion-relative text-center'>
    <h6 className={ `text-${color}` }>
      { icon }
      <div className='covid__text--nowrap position-relative'>
        <strong>
          { cases }
        </strong>
      </div>
      <p className='pb-3'>
        <small className='text-gray'>
          { newCase }
        </small>
      </p>
      <p >
        <small className='covid__case-text text-gray'>
          { text }
        </small>
      </p>
    </h6>
  </Col>
)

CaseInfoCol.propTypes = propTypes
CaseInfoCol.defaultProps = defaultProps

export default CaseInfoCol