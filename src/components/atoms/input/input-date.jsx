import React from 'react'
import { Label, Input, FormGroup } from 'reactstrap'
import PropTypes from 'prop-types'

const propTypes = {
  label        : PropTypes.string,
  handleChange : PropTypes.func
}

const defaultProps = {
  label             : 'change label',
  handleChangeInput : () => {alert('input was changed')}
}

const InputDate = ({
  label,
  handleChange
}) => (
  <FormGroup>
    <Label>
      { label }
    </Label>
    <Input
      type='date'
      onChange={ (e)=>handleChange(e) }
      min="<?= date('2020-06-01'); ?>"
    />
  </FormGroup>
)

InputDate.propTypes = propTypes
InputDate.defaultProps = defaultProps

export default InputDate