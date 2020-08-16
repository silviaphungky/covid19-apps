import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  text: PropTypes.string
}

const defaultProps = {
  text: ''
}

const TitleH6Strong = ({ text }) => (
  <h6>
    <strong>
      { text }
    </strong>
  </h6>
)

TitleH6Strong.propTypes = propTypes
TitleH6Strong.defaultProps = defaultProps

export default TitleH6Strong
