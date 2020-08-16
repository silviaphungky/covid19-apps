import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  text: PropTypes.string
}

const defaultProps = {
  text: ''
}

const TitleH3Strong = ({ text }) => (
  <h3>
    <strong>
      { text }
    </strong>
  </h3>
)

TitleH3Strong.propTypes = propTypes
TitleH3Strong.defaultProps = defaultProps

export default TitleH3Strong
