import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import FormInput from './FormInput'
import FormSelectOption from './FormSelectOption'
import formImage from '../images/contact-form.svg'
import loaderImage from '../images/button-loader.png'
import { fetchWithTimeout } from '../utils/utils'

import './ContactForm.scss'

/**
 * ContactForm component
 * 
 * @param {object} props.data - form data from backend
 * @param {string} props.language - current language
 * @param {string} props.type - possible values: 'contact', 'complaint', 'report'
 * @param {string} props.backendUrl
 * @param {function} props.onSuccessfullSubmit
 * @param {func} props.showErrorPopup
 * 
 * @returns {JSX Element}
 */
function ContactForm({ data, language, type, backendUrl, onSuccessfullSubmit, showErrorPopup }) {

  const { title, description, reasonsForContact, disclaimer } = data;

  const [ name, setName ] = useState('')
  const [ email, setEmail ] = useState('');
  const [ phone, setPhone ] = useState('');
  const [ reason, setReason ] = useState('');
  const [ message, setMessage ] = useState('');

  const [ allReasons, setAllReasons ] = useState(null);
  const [ submited, setSubmited ] = useState(false)
  const [ showLoader, setShowloader ] = useState(false);

  
  const isNativeLang = language === 'is_IS'

  const translations = {
    labels: {
      fullName: isNativeLang ? 'Fullt nafn' : 'Full Name',
      email: isNativeLang ? 'Netfang' : 'Email',
      phone: isNativeLang ? 'Sími' : 'Phone',
      reason: isNativeLang ? 
        (type === 'contact' ? 'Ástæða samskipta' : 'Ástæða kvörtunar') : 
        (type === 'contact' ? 'Reason for contact' : 'Reason for complaint'),
      message: isNativeLang ? 
      (type === 'contact' ? 'Skilaboð' : 'Segðu okkur frá því') : 
      (type === 'contact' ? 'Message' : 'Tell us about it')
    },
    buttonText: isNativeLang ? 'Senda' : 'Submit'
  }

  /**
   * Extracts contact reasons from options array
   * 
   * @param {array} optionsArr 
   * @returns {array}
   */
  const getReasons = optionsArr => {
    const reasonsArr = ['']
    if(optionsArr.length > 0) {
      optionsArr.forEach(option => reasonsArr.push(option.reason))
    } 
    return reasonsArr;
  }

  /**
   * Validates email
   * 
   * @param {string} email 
   * @returns {boolean}
   */
  const validateEmail = (email) => {
    let regularExpression = /^(([^.\s@]+(\.[^.\s@]+)*))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/;
    
    if(regularExpression.test(email)) {
      return true;
    }
    return false;
  }
  
  /**
   * Extracts email from options based on selected contact reason or email from only option
   * 
   * @param {*} reason 
   * @param {*} options 
   */
  const getEmailFromOptions = (reason, options) => {
    if(options.length > 1) {
      const selectedOption = options.filter( option => option.reason === reason )
      return selectedOption[0].email;
    } else {
      return options[0].email;
    }
  }

  /**
   * Sends contact form data to 'forms' endpoint
   * 
   * @param {object} data 
   */
  const sendFormData = data => fetch(`${backendUrl}/wp-json/student/v1/forms`,{
     method: "POST", 
     headers: {'Content-Type': 'application/json'}, 
     body: JSON.stringify(data) 
    }
  )

  /**
   * Handles form submit and local state based on server response
   * 
   * @param {Event} e 
   */
  const onSubmit = e => {
    e.preventDefault();
    setSubmited(true)

    if(name && validateEmail(email) && message) {
      showErrorPopup(false)
      // if there are more then one option and reason is not set, bail
      if(!reason && reasonsForContact.length > 1) return

      setShowloader(true);
      
      fetchWithTimeout(
        sendFormData, 
        {
          mail_to: getEmailFromOptions(reason, reasonsForContact),
          full_name: name,
          email: email,
          phone: phone,
          reason: reason,
          message: message
        }, 
        10000
      ) 
      .then(response => {
        setShowloader(false);
        setSubmited(false)
        onSuccessfullSubmit()

        if(!response.ok) {
          throw new Error(`${response.statusText}`)
        }
      })
      .catch(e => {
        console.error(e)
        showErrorPopup(true)
        setShowloader(false);
      })
    } 
  }


  useEffect(() => {
    setAllReasons(getReasons(reasonsForContact))
  }, [])

  return (
    <div className={`contact-form contact-form--${type}`}>
      {
        type === 'contact' && (
          <div className="contact-form__header">
            <img src={formImage} alt="Form image" className="contact-form__header-image"/>
            <h3 className="contact-form__header-title">{title}</h3>
            <p className="contact-form__header-subtitle">{description}</p>
          </div>
        )
      }
      <form autoComplete="nope">
        <div className="form-group">
          <FormInput 
            value={name} 
            onChange={setName} 
            error={submited && !name}
            placeholder={translations.labels.fullName}
            type='name'
            lang={language}
          />
        </div>

        <div className="form-group">
          <FormInput 
            value={email} 
            onChange={setEmail} 
            error={submited && !validateEmail(email)}
            placeholder={translations.labels.email}
            type='email'
            lang={language}
          />
        </div>

        {
          type === 'report' && (
            <div className="form-group">
              <FormInput 
                value={phone} 
                onChange={setPhone} 
                error={submited && !phone}
                placeholder={translations.labels.phone}
                type='phone'
                lang={language}
              />
            </div>
          )
        }

        { reasonsForContact.length > 1 && (
           <div className="form-group">
            <FormSelectOption 
              value={reason}
              options={allReasons}
              onChange={setReason} 
              error={submited && !reason}
              placeholder={translations.labels.reason}
              type='options'
              lang={language}
            />
         </div>
        )}

        <div className="form-group">
          <FormInput 
            value={message} 
            onChange={setMessage} 
            error={submited && !message}
            placeholder={translations.labels.message}
            type='message'
            lang={language}
          />
        </div>

        {
          type !== 'contact' && (
            <p className="contact-form__additional-text">{disclaimer}</p>
          )
        }
        
        <button 
          onClick={onSubmit} 
          className="contact-form__submit-btn"
        >
          {
            !showLoader ? 
            translations.buttonText :
            <span><img src={loaderImage} alt="Button loader" /></span>
          }
        </button>
        </form>
    </div>
  )
}

ContactForm.propTypes = {
  data: PropTypes.object,
  language: PropTypes.string,
  type: PropTypes.string,
  backendUrl: PropTypes.string,
  onSuccessfullSubmit: PropTypes.func,
  showErrorPopup: PropTypes.func
}

export default ContactForm;