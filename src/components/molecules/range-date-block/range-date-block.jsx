import React from 'react'
import { FormGroup, Label, Row, Col } from 'reactstrap'
import ReactDatePicker from 'react-datepicker'
import PropTypes from 'prop-types'

const propTypes = {
  startDate    : PropTypes.number,
  endDate      : PropTypes.number,
  setStartDate : PropTypes.func,
  setEndDate   : PropTypes.func
}

const defaultProps = {
  startDate    : new Date(),
  endDate      : new Date(),
  setStartDate : ()=> {},
  setEndDate   : ()=> {}
}

const RangeDateBlock = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate
}) => (
  <Row>
    <Col xs='12' sm='12' md='6' lg='6' xl='6'>
      <FormGroup>
        <Label className='pr-3'>
          From
        </Label>
        <ReactDatePicker
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
      <ReactDatePicker
        className='w-100'
        dateFormat='yyyy/MM/dd'
        selected={ endDate }
        onChange={ (date) => setEndDate(date) }
        minDate={ startDate }
        maxDate={ new Date() }
      />
    </Col>
  </Row>
)

RangeDateBlock.propTypes = propTypes
RangeDateBlock.defaultProps = defaultProps

export default RangeDateBlock
