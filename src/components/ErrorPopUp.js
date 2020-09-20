import React from 'react'
import PropTypes from 'prop-types'
import errorImg from '../images/error.svg'
import './ErrorPopUp.scss'


/**
 * ErrorPopUp component
 * 
 * @param {function} param.onClose
 * @param {string} param.language
 * @returns {JSX Element}
 */
export default function ErrorPopUp({ onClose, language }) {

  const translations = {
    title: language === 'is_IS' ? 'Villa. Netþjónn svarar ekki!' : 'Error: Server not responding!',
    text: language === 'is_IS' ?
      'Vandamál kom upp við að senda beiðni þína. Vinsamlegast reyndu aftur.' :
      'There was a problem sending your request. Please try again.'
  }

  return (
    <div className={`error-popup`}>
      <button className="error-popup__close-btn" onClick={onClose}></button>
      <div className="error-popup__content">
        <div className="error-popup__content-image-wrapper">
          <img src={errorImg} alt="Error" className="error-popup__content-image"/>
        </div>
        <h6 className="error-popup__content-title">{translations.title}</h6>
        <p className="error-popup__content-message">{translations.text}</p>
      </div>
      
    </div>
  )
}


ErrorPopUp.propTypes = {
  onClose: PropTypes.func, 
  language: PropTypes.string
}