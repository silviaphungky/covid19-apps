import React from 'react'
import { Container, Row } from 'reactstrap'
import ProfileIcon from '../../atoms/profile/profile-icon'
import PropTypes from 'prop-types'

const propTypes = {
  profiles: PropTypes.array
}

const defaultProps = {
  profiles: [{}]
}

const Footer = ({ profiles }) => (
  <div className='bg-blue'>
    <Container className='text-center mt-4'>
      <Row className='py-2'>
        {
          profiles.map((profile, index)=>(
            <ProfileIcon
              key={ `profile-${index}` }
              href={ profile.href }
              icon={ profile.icon }
              username={ profile.username }
            />
          ))
        }
      </Row>
    </Container>
  </div>
)

Footer.propTypes = propTypes
Footer.defaultProps = defaultProps

export default Footer
