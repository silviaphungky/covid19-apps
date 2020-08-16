import React from 'react'
import { Line } from 'react-chartjs-2'
import PropTypes from 'prop-types'

const propTypes = {
  chartData : PropTypes.object,
  options   : PropTypes.object
}

const defaultProps = {
  chartData : {},
  options   : {}
}

const ChartLine = ({
  chartData,
  options
}) => (
  <Line
    width={ 2 }
    height={ 2 }
    data={ chartData }
    options = { options }
  />
)

ChartLine.propTypes = propTypes
ChartLine.defaultProps = defaultProps

export default ChartLine
