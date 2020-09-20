import React from 'react'
import PropTypes from "prop-types"
import FooterMenuItem from './FooterMenuItem'
import FooterContact from './FooterContact'
import FooterCopyright from './FooterCopyright'
import './Footer.scss'
import './FooterCopyright.scss';
import './FooterMenuItem.scss'

export default function Footer({ menuData, language, footerOptionsPage }) {


  const { menus } = menuData;
  const { locale } = language;
  const { optionsPage: { footerOptions: { contactFooter } } } = footerOptionsPage;

  //checking which language is selected and passing adequate menu
  let languageMenu =
    locale === 'is_IS'
      ? menus.find(menu => menu.locations[0] === 'MENU_3')
      : menus.find(menu => menu.locations[0] === 'MENU_3___EN');

  //checking which language is selected for secondary footer and passing adequate menu
  let languageCopyrightMenu =
    locale === 'is_IS'
      ? menus.find(menu => menu.locations[0] === 'MENU_4')
      : menus.find(menu => menu.locations[0] === 'MENU_4___EN');


  return (
    <footer className="footer">
      <div className="footer__wrapper content-wrapper">
        <FooterMenuItem languageMenu={languageMenu} />
        <FooterContact contactFooter={contactFooter} locale={locale} />
      </div>
      <div className="footer__copy">
        <FooterCopyright languageCopyrightMenu={languageCopyrightMenu} />
      </div>
    </footer>
  )
}

Footer.propTypes = {
  menuData: PropTypes.object,
  language: PropTypes.object,
  footerOptionsPage: PropTypes.object
}