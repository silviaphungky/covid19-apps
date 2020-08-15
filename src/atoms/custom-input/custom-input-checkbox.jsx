import React, { useState } from 'react'
import { CustomInput } from 'reactstrap'

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


export default CheckBox
