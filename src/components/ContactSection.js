import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ContactFormSection from '../components/ContactFormSection'
import ContactMapSection from '../components/ContactMapSection'
import ContactFormSubmited from '../components/FormSubmited'
import ErrorPopUp from '../components/ErrorPopUp'


/**
 * ContactSection component
 * 
 * @param {boolean} param.hasGoogleMap 
 * @param {object} param.formSectionData
 * @param {string} param.templateType
 * @param {string} param.language
 * @param {string} param.backendUrl
 */
const ContactSection = ({ hasGoogleMap, mapSectionData, formSectionData, templateType, language, backendUrl }) => {

  const [ successfullySubmitted, setSuccessfullySubmitted ] = useState(false);
  const [ errorSending, setErrorSending ] = useState(false);
  
  /**
   * Handlles successfull submit
   */
  const handleSuccessfullSubmit = () => setSuccessfullySubmitted(true)

  /**
   * Toggles error popup
   * 
   * @param {boolean} shouldShow 
   */
  const showErrorPopup = shouldShow => setErrorSending(shouldShow)

  return (
    <div className="contact-section">
      { successfullySubmitted && !errorSending ? (
        <ContactFormSubmited language={language}/>
      ) : (
        <>
          { templateType === 'contact' && hasGoogleMap && <ContactMapSection data={mapSectionData} />}
          <ContactFormSection 
            sectionData={formSectionData} 
            templateType={templateType} 
            language={language} 
            backendUrl={backendUrl}
            onSuccessfullSubmit={handleSuccessfullSubmit}
            showErrorPopup={showErrorPopup}
          />
          {errorSending && <ErrorPopUp onClose={() => showErrorPopup(false)} language={language} />}
        </>
      )}
    </div>
  )
}

ContactSection.propTypes = {
  hasGoogleMap: PropTypes.bool, 
  formSectionData: PropTypes.object, 
  templateType: PropTypes.string, 
  language: PropTypes.string, 
  backendUrl: PropTypes.string
}

export default ContactSection;
