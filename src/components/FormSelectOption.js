import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import './FormInput.scss'
import './FormSelectOption.scss'

/**
 * FormSelectOption component
 * 
 * @param {string} param.value 
 * @param {array} param.options
 * @param {function} param.onChange
 * @param {boolean} param.error
 * @param {string} param.placeholder
 * 
 * 
 */
const FormSelectOption = ({ value, options, onChange, error = false, placeholder, lang }) => {
  
  const [ isOpen, setIsOpen ] = useState(false);
  const [ isFocused, setIsFocused ] = useState(false);
  const [ labelPosition, setLabelPosition ] = useState('');

  
  /**
   * Toggles select dropdown
   */
  const toggleDropDown = () => {
    if(!isOpen) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }

  /**
   * Handles focus event
   */
  const handleFocus = () => setIsFocused(true);
  
  /**
   * Handles blur event
   */
  const handleBlur = () => {
    setIsFocused(false)
    setIsOpen(false)
  }

  /**
   * Handles selecting value
   * 
   * @param {string} value 
   */
  const onOptionClicked = value => () => {
    onChange(value);
    setIsOpen(false); 
  };

  useEffect(() => {
    if(isFocused || value) {
      setLabelPosition('up');
    } else {
      if(!value && !isOpen) {
        setLabelPosition('down');
      }
    }
  }, [isFocused, value, isOpen])

  return (
    <div className={`custom-select ${error ? 'custom-select--error' : ''}`}>
      
      <div className="custom-select__inner-wrapper">
        <div 
          className="custom-select__header" 
          onClick={toggleDropDown} 
          tabIndex="0"
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          {value}
        </div>
        {isOpen && (
          <div className="custom-select__list-wrapper">
            <ul className="custom-select__list">
              {options.map((option, index) => (
                <li 
                  className={`custom-select__list-item ${!value && index === 0 ? 'custom-select__list-item--gray' : ''} ${value && value === option ? 'custom-select__list-item--selected' : ''}`} 
                  onMouseDown={onOptionClicked(option)} 
                  key={index}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <span className={`custom-select__label custom-select__label--${labelPosition}`}>{placeholder}</span>
      {error && <p className="custom-select__error-msg">
        {value === '' ? (lang === 'is_IS' ? 'This field is required(IS)' : 'This field is required'): ''}
        </p>}
    </div>
  )

}


FormSelectOption.propTypes = {
  value: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
  error: PropTypes.bool,
  placeholder: PropTypes.string,
  lang: PropTypes.string,
}



export default FormSelectOption;