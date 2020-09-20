import React from 'react'
import PropTypes from "prop-types"
import { Link } from "gatsby"

export default function FooterSubMenuItem({ menuItemChild }) {

  const { childItems: { nodes } } = menuItemChild;

  return (
    <div className={`footer__menu-items${nodes.length > 7 ? '--split' : ''}`}>
      {
        //iterating trough child elements and displaying them in parent elements
        nodes.map((node, index) => {
          return (
            <div className="footer__menu-items-links" key={index}>
              <Link to={node.path}>
                <p className="strong">{node.label}</p>
              </Link>
            </div>
          )
        })
      }
    </div>
  )
}

FooterSubMenuItem.propTypes = {
  childNodes: PropTypes.object
}