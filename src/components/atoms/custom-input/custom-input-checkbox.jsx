import React, { useState } from 'react'
import { CustomInput } from 'reactstrap'
import PropTypes from 'prop-types'

const propTypes = {
  id           : PropTypes.string,
  label        : PropTypes.string,
  isChecked    : PropTypes.object,
  handleChange : PropTypes.func
}

const defaultProps = {
  id           : '',
  label        : '',
  isChecked    : {},
  handleChange : () => {}
}

const CheckBox = ({
  id,
  label,
  isChecked,
  handleChange
}) => 
{
  const [checked, setChecked] = useState(isChecked)
  return(
    <CustomInput
      key={ isChecked }
      type='checkbox'
      id={ id }
      label={ label }
      checked={ checked }
      onChange={ ()=> {
        handleChange() 
        setChecked(!checked)
      } }
    />
  )
}

CheckBox.propTypes = propTypes
CheckBox.defaultProps = defaultProps

export default CheckBox
