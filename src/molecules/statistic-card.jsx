import React from 'react'
import { Row, Col } from 'reactstrap'

const StatisticCard = ({
  active,
  newCase,
  recovered,
  deaths,
  newDeaths
}) => (
  <Row className='py-3'>
    <Col className='text-center'>
      <h6 className='text-yellow'>
        <div>
          <i className="fas fa-exclamation-triangle" />
        </div>
        <div className='covid__header__text--nowrap position-absoluteext--nowrap'>
          <strong>
            { active }
          </strong>
        </div>
        <p>
          <small className='text-gray'>
            { newCase }
          </small>
        </p>
        <p className='mt-3'>
          <small className='text-gray'>
            Active
          </small>
        </p>
      </h6>
    </Col>
    <Col className='position-relative text-center'>
      <h6 className='text-tosca'>
        <div>
          <i className="fas fa-heart" />
        </div>
        <div className='header__text--nowrap'>
          <strong>
            { recovered }
          </strong>
        </div>

        <p className='covid__recovered-text mt-3'>
          <small className='text-gray'>
            Recovered
          </small>
        </p>
      </h6>
    </Col>
    <Col className='text-center'>
      <h6 className='text-danger'>
        <div>
          <i className="fas fa-times-circle" />
        </div>
        <div className='header__text--nowrap'>
          <strong>
            { deaths }
          </strong>
        </div>
        <p>
          <small className='text-gray'>
            { newDeaths }
          </small>
        </p>
        <p className='mt-3'>
          <small className='text-gray'>
            Deaths
          </small>
        </p>
      </h6>
    </Col>
  </Row>
)

export default StatisticCard
