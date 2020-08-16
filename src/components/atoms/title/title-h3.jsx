import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  text: PropTypes.string
}

const defaultProps = {
  text: ''
}

const TitleH3 = ({ text }) => (
  <h3>
    { text }
  </h3>
)

TitleH3.propTypes = propTypes
TitleH3.defaultProps = defaultProps

export default TitleH3
