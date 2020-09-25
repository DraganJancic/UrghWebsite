import React from 'react'
import PropTypes from "prop-types"
import FooterSubMenuItem from './FooterSubMenuItem'
import { StaticQuery, graphql } from "gatsby"


export default function FooterMenuItem({ languageMenu, locale }) {
  return (
    <StaticQuery 
      query={graphql`
      {
        allWpMenu {
          menus: nodes {
            name
            locations
            menuItems {
              nodes {
                databaseId
                parentDatabaseId
                label
                cssClasses
                parentId
                path
                childItems {
                  nodes {
                    databaseId
                    parentDatabaseId
                    cssClasses
                    label
                    path
                    order
                    parentId
                    childItems {
                      nodes {
                        databaseId
                        parentDatabaseId
                        cssClasses
                        label
                        parentId
                        path
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
      render={
        data => {
          console.log('loging data: ',data)
          const menusz = data.allWpMenu.menus;

          //checking which language is selected and passing adequate menu
          let languageMenuz =
          locale === 'is_IS'
            ? menusz.find(menu => menu.locations[0] === 'MENU_3')
            : menusz.find(menu => menu.locations[0] === 'MENU_3___EN');

          //checking which language is selected for secondary footer and passing adequate menu
          // let languageCopyrightMenuz =
          //   locale === 'is_IS'
          //     ? menusz.find(menu => menu.locations[0] === 'MENU_4')
          //     : menusz.find(menu => menu.locations[0] === 'MENU_4___EN');

          console.log(languageMenuz)

          // console.log(menusz)

          const { menuItems: { nodes } } = languageMenuz;


          //filtering parent elements from menu
          const menuItemParent = nodes.filter(node => node.parentDatabaseId === 0)

          return (
            // iterating trough parent nodes and displaying them
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
      }
    />
  )

  // const { menuItems: { nodes } } = languageMenu;

  // //filtering parent elements from menu
  // const menuItemParent = nodes.filter(node => node.parentDatabaseId === 0)

  // return (
  //   //iterating trough parent nodes and displaying them
  //   menuItemParent.map((node, index) => {
  //     return (
  //       <div key={index} className="footer__menu">
  //         <h6 className="footer__menu-title">{node.label}</h6>
  //         <FooterSubMenuItem menuItemChild={node} />
  //       </div>
  //     )
  //   })
  // )
}

FooterMenuItem.protoTypes = {
  languageMenu: PropTypes.object
}