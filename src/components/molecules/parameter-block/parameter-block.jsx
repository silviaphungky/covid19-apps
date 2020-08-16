import React from 'react'
import { Label } from 'reactstrap'
import CheckBox from '../../atoms/custom-input/custom-input-checkbox'
import PropTypes from 'prop-types'

const propTypes = {
  isPlot                    : PropTypes.object,
  handleClickActiveCases    : PropTypes.func,
  handleClickTotalRecovered : PropTypes.func,
  handleClickTotalDeaths    : PropTypes.func
}

const defaultProps = {
  isPlot                    : {},
  handleClickActiveCases    : ()=> {alert('clicked')},
  handleClickTotalRecovered : ()=> {alert('clicked')},
  handleClickTotalDeaths    : ()=> {alert('clicked')}
}

const ParameterBlock = ({
  isPlot,
  handleClickActiveCases,
  handleClickTotalRecovered,
  handleClickTotalDeaths
}) => (
  <div className='mt-4'>
    <Label>
      Parameter
    </Label>
    <CheckBox
      id='active-cases'
      label='Active cases'  
      isChecked={ isPlot['active cases'] }
      handleChange={ handleClickActiveCases }
    />
    <CheckBox
      id='total-recovered'
      label='Total recovered'
      isChecked={ isPlot['total recovered'] }
      handleChange={ handleClickTotalRecovered }
    />
    <CheckBox
      id='total-deaths'
      label='Total deaths'
      isChecked={ isPlot['total deaths'] }
      handleChange={ handleClickTotalDeaths }
    />
  </div>
)

ParameterBlock.propTypes = propTypes
ParameterBlock.defaultProps = defaultProps

export default ParameterBlock
