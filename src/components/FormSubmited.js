import React, { useEffect } from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import './FormSubmited.scss'
import submittedImg from '../images/form-submitted.svg'

/**
 * FormSubmitted component
 * 
 * @param {string} param.language 
 * @returns {JSX Element}
 */
export default function FormSubmitted({ language }) {

  const translations = {
    title: language === 'is_IS' ? 'Eyðublað sent!' : 'Form submitted successfully!',
    text: language === 'is_IS' ? (
      'Þakka þér fyrir að senda okkur þetta eyðublað. Við munum hafa samband fljótlega. Fyrir frekari fyrirspurnir, hafðu samband við'
    ) : (
      'Thank you for sending us this form. We will get back to you soon. For any further inquiries, please contact'
    ),
    linkText: language === 'is_IS' ? 'Fara á heimasíðu' : 'Go to home'
  }


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className="form-submitted">
      <div className="form-submitted__inner-wrapper">
        <img src={submittedImg} alt="Form submitted" className="form-submitted__image"/>
        <h1 className="form-submitted__title">{translations.title}</h1>
        <p className="form-submitted__text">{translations.text} <a href="mailto:shi@hi.is">shi@hi.is</a>.</p>
        <Link 
          to={language === 'is_IS' ? '/' : '/en'}
          className="form-submitted__link"
        >
          {translations.linkText}
        </Link>
      </div>
    </div>
  )
}


FormSubmitted.propTypes = {
  language: PropTypes.string
}