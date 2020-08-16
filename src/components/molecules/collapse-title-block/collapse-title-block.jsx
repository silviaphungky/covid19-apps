import React from 'react'
import { Row, Col } from 'reactstrap'
import TitleH5Strong from '../../atoms/title/strong/title-strong-h5'
import PropTypes from 'prop-types'
import FaCalender from '../../atoms/fontawesome/calender/fa-calender'
import FaChevronUp from '../../atoms/fontawesome/chevron-up/fa-chevron-up'
import FaChevronDown from '../../atoms/fontawesome/chevron-down/fa-chevron-down'

const propTypes = {
  text                : PropTypes.string,
  isOpen              : PropTypes.object,
  icon                : PropTypes.elementType,
  handleClickCollapse : PropTypes.func
}

const defaultProps = {
  text                : 'statistic',
  isOpen              : {},
  icon                : <FaCalender />,
  handleClickCollapse : () => {alert('collapse clicked')}
}

const CollapseTitleBlock = ({
  text,
  isOpen,
  icon,
  handleClickCollapse
}) => (
  <Row
    className='covid__cursor--pointer text-blue'
    onClick={ ()=> {
      handleClickCollapse()
    } }
  >
    <Col>
      <span className='float-left mr-3'>
        { icon }
      </span>
      <span className='float-left'>
        <TitleH5Strong text={ text } />
      </span>
      <span className='float-right'>
        { 
          isOpen 
            ? <FaChevronUp />
            : <FaChevronDown />
        }
      </span>
    </Col>
  </Row>
)

CollapseTitleBlock.propTypes = propTypes
CollapseTitleBlock.defaultProps = defaultProps

export default CollapseTitleBlock
