import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

export default function SearchField({ placeholder, value, onChange, onKeyDown, isSearchOpen }) {

  const searchField = useRef(null)

  //Set focus on input field
  useEffect(() => {
    isSearchOpen && searchField.current.focus()
  }, [isSearchOpen])

  return (
    <input ref={searchField} type="text" placeholder={placeholder} value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  )
}

SearchField.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  isSearchOpen: PropTypes.bool

}