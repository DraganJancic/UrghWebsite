import React from 'react'
import PropTypes from "prop-types"
import MegaMenuSubMenu from './MegaMenuSubMenu'

export default function MegaMenuItem({ title, href, childItems, iconClass }) {

  return (
    <div className='mega-menu-item'>
      <div className={`${iconClass.map(className => ` ${className} `)}`}>
        <div to={href} className={`mega-menu-item__link`}>
          {title}
        </div>
      </div>

      <MegaMenuSubMenu childItems={childItems} />
    </div >
  )
}

MegaMenuItem.propTypes = {
  title: PropTypes.string,
  href: PropTypes.string,
  childItems: PropTypes.object,
  iconClass: PropTypes.array
}
