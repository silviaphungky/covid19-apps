import React from 'react'
import { FormGroup, Label, Input } from 'reactstrap'
import PropTypes from 'prop-types'

const propTypes = {
  label        : PropTypes.string,
  options      : PropTypes.array,
  handleChange : PropTypes.func
}

const defaultProps = {
  label        : 'change label',
  options      : [],
  handleChange : ()=> {alert('option was clicked')}
}

const InputSearch = ({
  label,
  options,
  handleChange
}) => (
  <FormGroup>
    <Label>
      { label }
    </Label>
    <Input
      type='select'
      onChange={ (e)=> handleChange(e) }
    >
      <option value='' />
      {
        options.map((option, index) => (
          <option 
            key={ `option-${index}` }
            value={ option }
          >
            { option }
          </option>
        )) 
      }
    </Input>
  </FormGroup>
)

InputSearch.propTypes = propTypes
InputSearch.defaultProps = defaultProps

export default InputSearch
