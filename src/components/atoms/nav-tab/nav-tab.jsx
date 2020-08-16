import React from 'react'
import { Nav, NavItem, NavLink, TabContent, TabPane, Row, Col, Collapse } from 'reactstrap'
import PropTypes from 'prop-types'

const propTypes = {
  activeTab       : PropTypes.number,
  setActiveTab    : PropTypes.func,
  openSymptoms    : PropTypes.object,
  setOpenSymptoms : PropTypes.func
}

const defaultProps = {
  activeTab       : 1,
  setActiveTab    : () => {},
  openSymptoms    : {},
  setOpenSymptoms : () => {}
}


const NavTab = ({
  activeTab,
  setActiveTab,
  openSymptoms,
  setOpenSymptoms
}) => (
  <div className='mt-3'>
    <Nav 
      className='covid__navtab--scrollable'
      tabs 
      fill 
    >
      <NavItem
        onClick={ ()=> setActiveTab(1) }
      >
        <NavLink active={ activeTab === 1 ? true : false }>
          Symptoms
        </NavLink>
      </NavItem>
      <NavItem
        onClick={ ()=> setActiveTab(2) }
      >
        <NavLink active={ activeTab === 2 ? true : false }>
          Prevention
        </NavLink>
      </NavItem>
      <NavItem
        onClick={ ()=> setActiveTab(3) }
      >
        <NavLink active={ activeTab === 3 ? true : false }>
          Treatments
        </NavLink>
      </NavItem>
    </Nav>
                
    <TabContent activeTab={ activeTab }>
      <TabPane tabId={ 1 } className='pt-3 px-2'>
        <div>
          <h6>
            <strong>
              Most common symptoms
            </strong>
          </h6>
          <Row className='mt-3 mb-4'>
            <Col sm='12' lg={{ size: '6', offset: '3' }}>
              <img 
                src='/common-symptoms.jpg' 
                width='100%'
                alt='common-symptoms'
              />
            </Col>
          </Row>
          <hr />
          <h6 
            onClick={ ()=> {
              openSymptoms.less = !openSymptoms.less
              setOpenSymptoms({ ...openSymptoms })
            } }
          >
            <strong>
              Less common symptoms
            </strong>
            <span className='float-right'>
              {
                openSymptoms.less ? '-' : '+'
              }
            </span>
          </h6>
          <Collapse isOpen={ openSymptoms.less }>
            <ul>
              <li>
                aches and pains
              </li>
              <li>
                sore throat
              </li>
              <li>
                diarrhoea
              </li>
              <li>
                conjunctivitis
              </li>
              <li>
                headache
              </li>
              <li>
                loss of taste or smell
              </li>
              <li>
                a rash on skin, or discolouration of fingers or toes
              </li>
            </ul>
          </Collapse>
          <hr />
          <h6
            onClick={ ()=> {
              openSymptoms.serious = !openSymptoms.serious
              setOpenSymptoms({ ...openSymptoms })
            } }
          >
            <strong>
              Serious symptoms
            </strong>
            <span className='float-right'>
              {
                openSymptoms.serious? '-' : '+'
              }
            </span>
          </h6>
          <Collapse isOpen={ openSymptoms.serious }>
            <ul>
              <li>
                difficulty breathing or shortness of breath
              </li>
              <li>
                chest pain or pressure
              </li>
              <li>
                loss of speech or movement
              </li>
            </ul>
          </Collapse>
          <hr />
        </div>
      </TabPane>
      <TabPane tabId={ 2 } className='pt-3 px-2'>
        <div>
          <div>
            To prevent the spread of COVID-19:
          </div>
          <ul>
            <li>
              Clean your hands often. Use soap and water, or an alcohol-based hand rub.
            </li>
            <li>
              Maintain a safe distance from anyone who is coughing or sneezing.
            </li>
            <li>
              Wear a mask when physical distancing is not possible.
            </li>
            <li>
              Don’t touch your eyes, nose or mouth.
            </li>
            <li>
              Cover your nose and mouth with your bent elbow or a tissue when you cough or sneeze.
            </li>
            <li>
              Stay home if you feel unwell.
            </li>
            <li>
              If you have a fever, cough and difficulty breathing, seek medical attention.
            </li>
          </ul>
        </div>
      </TabPane>
      <TabPane tabId={ 3 } className='pt-3 px-2'>
        <div>
          <strong>
            Self care
          </strong>
        </div>
        <div className='mt-3'>
          If you feel sick you should rest, drink plenty of fluid, and eat nutritious food. 
          Stay in a separate room from other family members, and use a dedicated bathroom if possible. 
          Clean and disinfect frequently touched surfaces.
        </div>
        <div className='mt-3'>
          Everyone should keep a healthy lifestyle at home. Maintain a healthy diet, sleep, stay active, and make social contact with loved ones 
          through the phone or internet. Children need extra love and attention from adults during difficult times. Keep to regular routines 
          and schedules as much as possible.
        </div>
        <div className='mt-3'>
          It is normal to feel sad, stressed, or confused during a crisis. Talking to people you trust, 
          such as friends and family, can help. If you feel overwhelmed, talk to a health worker or counsellor.
        </div>
      </TabPane>
    </TabContent>
  </div>
)

NavTab.propTypes = propTypes
NavTab.defaultProps = defaultProps

export default NavTab