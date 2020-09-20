import React, { useState, useEffect, useRef } from 'react'
import PropTypes from "prop-types"

export default function SearchFieldForm({
  placeholder, value, onSearchSubmit
}) {
  //State
  const [isPlaceholderSet, setIsPlaceholderSet] = useState(false)
  const [placeholderState, setPlaceholderState] = useState(placeholder)
  //Refs
  const searchInputRef = useRef(null)

  const setPlaceholder = () => isPlaceholderSet ? null : setPlaceholderState('Typing...')

  useEffect(() => {
    //If user is on search page without any searched value set focus on input
    placeholder === '' && searchInputRef.current.focus()
  }, [])

  return (
    <input ref={searchInputRef} type="text" placeholder={placeholderState} value={value}
      onChange={(e) => {
        setPlaceholder()
        setIsPlaceholderSet(true)
        onSearchSubmit(e)
      }}
      onKeyPress={onSearchSubmit}
    />
  )
}


SearchFieldForm.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onSearchSubmit: PropTypes.func
}