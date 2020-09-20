import React from 'react'
import PropTypes from "prop-types"
import SocialsComponent from './SocialsComponent'

export default function FooterContact({ contactFooter, locale }) {

  return (
    <div className="footer__menu">
      <h6 className="footer__menu-title">{locale === 'is_IS' ? 'Hafa samband' : 'Contact'}</h6>
      <div className="footer__menu-contact">
        <p className="footer__menu-contact-adress">{contactFooter.address}</p>
        <p>{contactFooter.phone}</p>
        <p>{contactFooter.email}</p>
        <p className="footer__menu-contact-hours">{locale === 'is_IS' ? 'Opnunartímar:' : 'Office Hours:'}</p>
        <p className="footer__menu-contact-time">{contactFooter.workingHours}</p>
        <SocialsComponent extraClass="footer__menu-contact-socials" />
      </div>
    </div>
  )
}

FooterContact.propTypes = {
  contactFooter: PropTypes.object
}