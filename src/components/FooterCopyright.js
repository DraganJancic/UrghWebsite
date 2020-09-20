import React from 'react'
import PropTypes, { node } from "prop-types"
import { Link } from 'gatsby';

export default function FooterCopyright({ languageCopyrightMenu }) {

  const { menuItems: { nodes } } = languageCopyrightMenu;

  //limiting user to 6 links
  const maximumLinks = nodes.slice(0, 6);

  return (
    <div className="footer__copy-wrapper content-wrapper">
      <div className="footer__items">
        {
          maximumLinks.map((link, index) => {
            return (
              <div className="footer__items-link" key={index}>
                <Link to={link.path}>
                  <p className="small">{link.label}</p>
                </Link>
              </div>
            )
          })
        }
      </div>
      <p className="footer__items-copyright small">© SHÍ {(new Date().getFullYear())}.</p>
    </div>
  )
}

FooterCopyright.propTypes = {
  languageCopyrightMenu: PropTypes.object
}