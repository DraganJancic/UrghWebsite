import React from 'react'
import PropTypes from "prop-types"
import FooterSubMenuItem from './FooterSubMenuItem'


export default function FooterMenuItem({ languageMenu }) {

  const { menuItems: { nodes } } = languageMenu;

  //filtering parent elements from menu
  const menuItemParent = nodes.filter(node => node.parentDatabaseId === 0)

  return (
    //iterating trough parent nodes and displaying them
    menuItemParent.map((node, index) => {
      return (
        <div key={index} className="footer__menu">
          <h6 className="footer__menu-title">{node.label}</h6>
          <FooterSubMenuItem menuItemChild={node} />
        </div>
      )
    })
  )
}

FooterMenuItem.protoTypes = {
  languageMenu: PropTypes.object
}