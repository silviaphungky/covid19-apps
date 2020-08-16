import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  text: PropTypes.string
}

const defaultProps = {
  text: ''
}

const TitleH4Strong = ({ text }) => (
  <h4>
    <strong>
      { text }
    </strong>
  </h4>
)

TitleH4Strong.propTypes = propTypes
TitleH4Strong.defaultProps = defaultProps

export default TitleH4Strong
