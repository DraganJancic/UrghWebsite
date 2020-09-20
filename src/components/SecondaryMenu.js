import React from 'react'
import PropTypes from "prop-types"
import { Link } from 'gatsby'

import './SecondaryMenu.scss'

//Secondary menu component
export default function SecondaryMenu({ menuItems }) {
  const { nodes } = menuItems

  return (
    <div className="sec-menu">
      <div className="sec-menu__wrapper">
        {nodes.map((item, index) => <Link key={index} to={item.path}> {item.label} </Link>)}
      </div>
    </div >
  )
}
SecondaryMenu.propTypes = {
  //Menu items from secondary menu 
  menuItems: PropTypes.object
}
