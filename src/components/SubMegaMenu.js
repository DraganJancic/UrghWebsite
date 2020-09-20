import React from 'react'
import PropTypes from "prop-types"

//Components 
import MegaMenuItem from './MegaMenuItem'
//Styles
import './SubMegaMenu.scss'

// Sub mega menu is sub menu which is specific, and it shows up olny if parrent menu item has class mega-menu
export default function SubMegaMenu({ childItems, isOpen }) {

  const { nodes } = childItems

  return (
    <div className={isOpen ? 'sub-mega-menu sub-mega-menu--open' : 'sub-mega-menu'}>
      {nodes.map((item, index) => {
        return (
          <MegaMenuItem key={index} title={item.label} href={item.path} childItems={item.childItems} iconClass={item.cssClasses} />
        )
      })}
    </div>
  )
}

SubMegaMenu.propTypes = {
  childItems: PropTypes.object,
  isOpen: PropTypes.bool
}