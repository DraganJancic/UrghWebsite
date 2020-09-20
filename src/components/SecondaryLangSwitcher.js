import React from 'react'
import PropTypes from "prop-types"
import { Link } from 'gatsby'

//Language switcher component for secondary header 
export default function SecondaryLangSwitcher({ language, translations, windowWidth, isFrontPage = false }) {

  const englText = windowWidth > 1024 ? 'En' : 'English'
  const icelandicText = windowWidth > 1024 ? 'Is' : 'Íslenska'
  const currTranslation = language === 'is_IS' ? englText : icelandicText

  return (
    <div className="secondary-header__language">
      {windowWidth > 1024
        ? <>
          <Link
            to={translations}
            className={`secondary-header__language-item ${language === 'is_IS' ? 'secondary-header__language-item--inactive' : 'secondary-header__language-item--active'}`}>
            {icelandicText}
          </Link>
          <Link
            to={translations}
            className={`secondary-header__language-item ${language === 'en_US' ? 'secondary-header__language-item--inactive' : 'secondary-header__language-item--active'}`}>
            {englText}
          </Link>
        </>
        : <Link to={translations} className="secondary-header__language-mobile">
          {currTranslation}
        </Link>
      }
    </div>
  )
}
SecondaryLangSwitcher.propTypes = {
  language: PropTypes.string,
  translations: PropTypes.string
}