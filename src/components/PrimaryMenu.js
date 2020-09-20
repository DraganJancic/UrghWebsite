import React, { useState, useEffect, useRef } from 'react'
import PropTypes from "prop-types"
import { Link } from "gatsby"

//Components 
import SubMegaMenu from './SubMegaMenu'
import DefaultSubMenu from './DefaultSubMenu'
import './PrimaryMenu.scss'
import './SubMegaMenu.scss'
import './SubDefaultMenu.scss'

// Main menu on webiste, getting data from Primary Menu from WP admin
export default function PrimaryMenu({ menuItems, inputSearchVal }) {

  const { nodes } = menuItems

  const [topMenuItems, setTopMenuItems] = useState([])
  //For now we don't need child menu items, but we can use it later in project
  const [childMenuItems, setChildMenuItems] = useState([])
  const [isMegaMenuOpen, setisMegaMenuOpen] = useState(false)
  const [isDefaultMenuOpen, setisDefaultMenuOpen] = useState(false)

  //refs
  const menuItemRef = useRef([])

  //Dynamicaly create ref for all menu items with sub menu
  menuItemRef.current = topMenuItems.map((item) => item.childItems.nodes.length !== 0 ? React.createRef() : null)

  //Get all items without parrent id 
  function setTopMenuItemsHandler() {
    nodes.map(menuItem => {
      menuItem.parentDatabaseId === 0
        ? setTopMenuItems((topMenuItems) => [...topMenuItems, menuItem])
        : setChildMenuItems((childMenuItems) => [...childMenuItems, menuItem])
    })
  }

  /**
   * In app we have dynamically created menu element, so it couldn't be predictable how menu items with default child menu items will menu contains
   * So for each menu item with children ref is created, and then using index of clicked element certain submenu will be opened
   * 
   * @param {index} index 
   */
  function openSubMenu(index) {

    //Clicked menu item
    const currentMenuElement = menuItemRef.current[index].current
    // Submenu of clicked element
    const subMenuElement = menuItemRef.current[index].current.nextElementSibling

    currentMenuElement.classList.contains('open')
      ? currentMenuElement.classList.remove("open")
      : currentMenuElement.classList.add("open")

    subMenuElement.classList.contains('default-sub-menu--open')
      ? subMenuElement.classList.remove("default-sub-menu--open")
      : subMenuElement.classList.add("default-sub-menu--open")

  }

  //Use effect 
  useEffect(() => {
    setTopMenuItemsHandler();
  }, [])


  return (

    <div className="primary-menu">
      <div className="primary-menu__wrapper">
        <div className="primary-menu__menu">
          {topMenuItems.map((item, index) => {
            if (item.childItems.nodes.length !== 0) {
              return (
                <div
                  className={`primary-menu__menu-item primary-menu__menu-item--top-item primary-menu__menu-item--has-child ${item.cssClasses[0] === "menu-item--mega-menu" ? 'mega-menu' : 'default-menu'}`}
                  key={index}>
                  <p className={item.cssClasses[0] === "menu-item--mega-menu"
                    ? `${isMegaMenuOpen ? 'open' : ''}`
                    : `${isDefaultMenuOpen ? 'open' : ''} `}
                    onClick={() =>
                      item.cssClasses[0] === "menu-item--mega-menu"
                        ? setisMegaMenuOpen(!isMegaMenuOpen)
                        : openSubMenu(index)}
                    ref={menuItemRef.current[index]}
                  >
                    {item.label}
                  </p>
                  {item.cssClasses[0] === "menu-item--mega-menu"
                    ? <SubMegaMenu childItems={item.childItems} isOpen={isMegaMenuOpen} />
                    : <DefaultSubMenu childItems={item.childItems} isOpen={isDefaultMenuOpen} />}
                </div>
              )
            } else {
              return (
                <Link className={`primary-menu__menu-item primary-menu__menu-item--top-item`}
                  to={item.path} key={index}>
                  {item.label}
                </Link>
              )
            }
          }
          )}
        </div>
      </div>
    </div >
  )
}

PrimaryMenu.propTypes = {
  menuItems: PropTypes.object.isRequired
}