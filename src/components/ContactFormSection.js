import React from 'react'
import PropTypes from 'prop-types'
import ContactForm from './ContactForm'
import Img from 'gatsby-image'
import { Link } from 'gatsby'
import flagImg from '../images/flag-colour.svg'
import penImg from '../images/pen-colour.svg'
import emailImg from '../images/email-blue.svg'
import phoneImg from '../images/phone.svg'
import './ContactFormSection.scss'



/**
 * ContactFormSection component
 * 
 * @param {object} param.sectionData 
 * @param {string} param.sectionData 
 * @param {string} param.language
 * @param {string} param.backendUrl
 * @param {function} param.onSuccessfullSubmit
 * @param {function} param.showErrorPopup
 * 
 * @returns {JSX Element}
 */
const ContactFormSection = ({ sectionData, templateType, language, backendUrl, onSuccessfullSubmit, showErrorPopup }) => {

  const { title, description, contactForm, moreLinksTitle, additionalContacts } = sectionData
  return (
    <div className={`form-section form-section--${templateType}`}>
      <div className="form-section__inner-wrapper">

        <div className="form-section__top">
          <h2 className="form-section__top-title">{title}</h2>
          <div 
            className="form-section__top-description"
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
        </div>
        
        <ContactForm 
          data={contactForm} 
          language={language} 
          type={templateType} 
          backendUrl={backendUrl}
          onSuccessfullSubmit={onSuccessfullSubmit}
          showErrorPopup={showErrorPopup}
        />

        <div className="form-section__bottom">
          <h5 className="form-section__bottom-title">{moreLinksTitle}</h5>
          <div className={`form-section__bottom-links form-section__bottom-links--${templateType}`}>
            {
              templateType !== 'contact' ? (
                Object.entries(additionalContacts).map(([repeaterType, repeaterData], index) => {
                  if(repeaterType === 'emails') {
                    return repeaterData && repeaterData.map( item => {
                      return (
                      <a href={`mailto:${item.email}`} key={index} className="info-link">
                        <img src={emailImg} alt="Red flag" />
                        <span>{item.email}</span>
                      </a>
                      )
                    })
                  } else {
                    return repeaterData && repeaterData.map( item => {
                      return (
                        <a href={`tel:${item.phone}`} key={index} className="info-link">
                          <img src={phoneImg} alt="Pencil"/>
                          <span>{item.phone}</span>
                        </a>
                      )
                    })
                  }
                })
              ) : (
                <>
                  <Link 
                    to={ language === 'is_IS' ? '/report-violation-is' : '/en/report-violation'} 
                    className="page-link"
                  >
                    <img src={flagImg} alt="Red flag" />
                    <span>
                      { language === 'is_IS' ? 'Tilkynna um brot' : 'Report violation' }
                    </span>
                  </Link>
                  <Link 
                    to={ language === 'is_IS' ? '/file-a-complaint-is' : '/en/file-a-complaint'} 
                    className="page-link"
                  >
                    <img src={penImg} alt="Pencil"/>
                    <span>
                      { language === 'is_IS' ? 'Leggja fram kvörtun' : 'File a complaint' }
                    </span>
                  </Link>
                </>
              )
            }
          </div>
        </div>

      </div>
    </div>
  )
}

ContactFormSection.prototype = {
  sectionData: PropTypes.object,
  templateType: PropTypes.string,
  language: PropTypes.string,
  backendUrl: PropTypes.string, 
  onSuccessfullSubmit: PropTypes.func, 
  showErrorPopup: PropTypes.func
}

export default ContactFormSection;