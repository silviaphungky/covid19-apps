import React from 'react'
import { Card, CardBody, Collapse } from 'reactstrap'
import NavTab from '../../atoms/nav-tab/nav-tab'
import PropTypes from 'prop-types'
import CollapseTitleBlock from '../../molecules/collapse-title-block/collapse-title-block'
import FaFileAlt from '../../atoms/fontawesome/file-alt/fa-file-alt'

const propTypes = {
  isOpen          : PropTypes.object,
  setIsOpen       : PropTypes.func,
  activeTab       : PropTypes.number,
  setActiveTab    : PropTypes.func,
  openSymptoms    : PropTypes.object,
  setOpenSymptoms : PropTypes.func
}

const defaultProps = {
  isOpen          : {},
  setIsOpen       : ()=> {},
  activeTab       : 1,
  setActiveTab    : ()=> {},
  openSymptoms    : {},
  setOpenSymptoms : ()=> {}
}

const Information = ({
  isOpen,
  setIsOpen,
  activeTab,
  setActiveTab,
  openSymptoms,
  setOpenSymptoms
}) => {

  const handleClickCollapse = () => {
    isOpen.info = !isOpen.info
    setIsOpen({ ...isOpen })
  }

  return(
    <Card className='shadow round border-0'>
      <CardBody>
        <CollapseTitleBlock
          text='Information'
          icon={ <FaFileAlt /> }
          isOpen={ isOpen.info }
          handleClickCollapse={ handleClickCollapse }
        />
        <Collapse isOpen={ isOpen.info }>
          <NavTab 
            activeTab={ activeTab }
            setActiveTab={ setActiveTab }
            openSymptoms={ openSymptoms }
            setOpenSymptoms={ setOpenSymptoms }
          />
        </Collapse>
      </CardBody>
    </Card>
  )
}

Information.propTypes = propTypes
Information.defaultProps = defaultProps

export default Information
