import React from 'react'
import { Button } from 'reactstrap'

const ButtonDefault = ({ 
  className,
  text,
  isDisabled,
  color,
  handleClick
}) => (
  <Button
    className={ className }
    color={ color }
    disabled={ isDisabled }
    onClick={ ()=>{ handleClick()} }
  >
    { text }
  </Button>
)

export default ButtonDefault
