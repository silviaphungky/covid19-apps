import React from 'react'
import { Button } from 'reactstrap'
import PropTypes from 'prop-types'

const propTypes = {
  className   : PropTypes.string,
  text        : PropTypes.string,
  isDisabled  : PropTypes.bool,
  color       : PropTypes.string,
  handleClick : PropTypes.func
}

const defaultProps = {
  className   : '',
  text        : '',
  isDisabled  : true,
  color       : 'primary',
  handleClick : () => {}
}

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

ButtonDefault.propTypes = propTypes
ButtonDefault.defaultProps = defaultProps

export default ButtonDefault
