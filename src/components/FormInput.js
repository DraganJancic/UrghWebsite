import React from 'react';
import PropTypes from 'prop-types'
import './FormInput.scss'

/**
 * FormInput component
 * 
 * Renders input(type:text), input(type:number) or textarea based on provided 'type' prop
 * 
 * @param {string} param.value
 * @param {function} param.onChange
 * @param {boolean} param.error
 * @param {string} param.placeholder
 * @param {string} param.type
 * @param {string} param.lang
 * 
 * @returns {JSX Element}
 */
const FormInput = ({ value, onChange, error = false, placeholder, type, lang}) => {

  return (
    <div className={`form-input ${error ? 'form-input--error' : ''}`}>
      
      {
        (() => {
          switch (type) {
            case 'name':
            case 'email':
              return <input type="text" className="form-input__input" value={value} onChange={e => onChange(e.target.value)} required autoComplete="nope"/>
            case 'phone':
              return <input type="number" className="form-input__input" value={value} onChange={e => onChange(e.target.value)} required autoComplete="nope"/>
            case 'message':
              return <textarea value={value} onChange={e => onChange(e.target.value)} required/>
            default:
              return null
          }
        })(type)
      }
      <span className="form-input__floating-label">{placeholder}</span>
      {error && <p className="form-input__error-msg">
        {value === '' ? 
          (lang === 'is_IS' ? 'Fylla þarf út þennan reit' : 'This field is required') : 
          ( type === 'email' ? 
            (lang === 'is_IS' ? 'Vinsamlegast sláðu inn gilt netfang' : 'Please enter valid email') : 
            '')}
        </p>}
    </div>
  )

}

FormInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.bool,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  lang: PropTypes.string,
}


export default FormInput;