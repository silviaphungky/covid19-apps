import React from 'react'
import { Card } from 'reactstrap'
import TitleDateBlock from '../../molecules/title-date-block/title-date-block'
import CaseInfoCard from '../../molecules/case-info-card/case-info-card'
import PropTypes from 'prop-types'

const propTypes = {
  worldTime : PropTypes.string,
  active    : PropTypes.string,
  newCase   : PropTypes.string,
  recovered : PropTypes.string,
  deaths    : PropTypes.string,
  newDeaths : PropTypes.string
}

const defaultProps = {
  worldTime : 'Sat August 16 2020',
  active    : '0',
  newCase   : '+1',
  recovered : '0',
  deaths    : '0',
  newDeaths : '+1'
}

const Worldwide = ({
  worldTime,
  active,
  newCase,
  recovered,
  deaths,
  newDeaths
}) => (
  <div>
    <TitleDateBlock 
      text='WORLDWIDE'
      time={ worldTime }
      isFaGlobe={ true }
    />

    <Card className='rounded shadow border-0 mt-3'>
      <CaseInfoCard
        active={ active }
        newCase={ newCase }
        recovered={ recovered }
        deaths={ deaths }
        newDeaths={ newDeaths }
      />
    </Card>
  </div>
)

Worldwide.propTypes = propTypes
Worldwide.defaultProps = defaultProps

export default Worldwide
