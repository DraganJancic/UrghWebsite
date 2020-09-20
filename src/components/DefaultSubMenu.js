import React from 'react'
import PropTypes from "prop-types"
import { Link } from "gatsby"

//Default sub menu on website
export default function DefaultSubMenu({ childItems, isOpen }) {
  const { nodes } = childItems;

  return (
    <div className={isOpen ? 'default-sub-menu default-sub-menu--open' : 'default-sub-menu'}>
      <div className="mega-child-menu">
        {nodes.map((item, index) => <Link key={index} to={item.path}>{item.label}</Link>)}
      </div>
    </div>
  )
}

DefaultSubMenu.propTypes = {
  childItems: PropTypes.object.isRequired,
  isOpen: PropTypes.bool
}