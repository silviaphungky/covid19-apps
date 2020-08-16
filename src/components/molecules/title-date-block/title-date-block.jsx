import React from 'react'
import { Row, Col } from 'reactstrap'
import TitleH4Strong from '../../atoms/title/strong/title-stronng-h4'
import PropTypes from 'prop-types'

const propTypes = {
  text      : PropTypes.string,
  time      : PropTypes.string,
  isFaGlobe : PropTypes.bool
}

const defaultProps = {
  text      : '',
  time      : '',
  isFaGlobe : false
}

const TitleDateBlock = ({
  text,
  time,
  isFaGlobe
}) => (
  <>
    <Row>
      <Col>
        {
          isFaGlobe 
            ?   <span className='mr-2 float-left'>
              <i className="fas fa-globe fa-2x" />
            </span>
            :null
        }
        <span className='float-left'>
          <TitleH4Strong text={ text } />
        </span>
      </Col>
    </Row>
    <small className='text-blue'>
      Last updated at { time }
    </small>
  </>
)

TitleDateBlock.propTypes = propTypes
TitleDateBlock.defaultProps = defaultProps

export default TitleDateBlock
