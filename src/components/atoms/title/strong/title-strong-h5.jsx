import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  text: PropTypes.string
}

const defaultProps = {
  text: ''
}

const TitleH5Strong = ({ text }) => (
  <h5>
    <strong>
      { text }
    </strong>
  </h5>
)

TitleH5Strong.propTypes = propTypes
TitleH5Strong.defaultProps = defaultProps

export default TitleH5Strong
