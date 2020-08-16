import React from 'react'
import { Col } from 'reactstrap'
import PropTypes from 'prop-types'

const propTypes = {
  href     : PropTypes.string,
  icon     : PropTypes.object,
  username : PropTypes.string
}

const defaultProps = {
  href     : '',
  icon     : <div />,
  username : ''
}

const ProfileIcon = ({
  href,
  icon,
  username
}) => (
  <Col>
    <a 
      className='text-white'
      href={ href }
    >
      <span className='pr-2'>
        { icon }
      </span>
      <span>
        { username }
      </span>
    </a>
  </Col>
)

ProfileIcon.propTypes = propTypes
ProfileIcon.defaultProps = defaultProps

export default ProfileIcon
