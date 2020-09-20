import React from 'react'
import PropTypes from "prop-types"
//components
import SecondaryMenu from './SecondaryMenu'
import SocialsComponent from './SocialsComponent'
import SecondaryLangSwitcher from './SecondaryLangSwitcher'
//Styles
import './SecondaryHeader.scss'

export default function SecondaryHeader({ menuItems, language, translations = { uri: '/' }, windowWidth, isFrontPage }) {

  return (
    <div className="secondary-header">
      <div className="secondary-header__wrapper">
        <SecondaryMenu menuItems={menuItems} />
        <SecondaryLangSwitcher isFrontPage={isFrontPage} language={language} translations={translations.uri ? translations.uri : `/${translations.slug}`} windowWidth={windowWidth} />
        <SocialsComponent />
      </div>
    </div>
  )
}

SecondaryHeader.propTypes = {
  menuItems: PropTypes.object,
  language: PropTypes.string,
  translations: PropTypes.object,
  windowWidth: PropTypes.number

}
