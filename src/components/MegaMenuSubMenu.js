import React from 'react'
import PropTypes from "prop-types"
import { Link } from "gatsby"

export default function MegaMenuSubMenu({ childItems }) {
  const { nodes } = childItems
  return (
    <div className="mega-child-menu">
      {nodes.map((item, index) => <Link key={index} to={item.path}>{item.label}</Link>)}
    </div>
  )
}

MegaMenuSubMenu.propTypes = {
  childItems: PropTypes.object.isRequired
}