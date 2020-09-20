import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"


//hooks 
import { useScrollPosition } from '../hooks/useScrollPosition';
import { useCurrentWidth } from '../hooks/useResize';
//Components
import PrimaryMenu from './PrimaryMenu'
import SecondaryHeader from './SecondaryHeader'
import SearchField from './SearchField'
import SearchFieldForm from './SearchFieldForm'

import './Header.scss'
import './Menu.scss'


export default function Header({
  menuData, language, translations, isOnStartSearchOpen = false,
  isOnSearchPage = false, onSearchSubmit, searchParamValue, isFrontPage = false
}) {
  const { menus } = menuData
  const { locale } = language
  const [primaryMenu, setPrimaryMenu] = useState()
  const [secondaryMenu, setSecondaryMenu] = useState()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(isOnStartSearchOpen)
  const [searchValue, setSearchValue] = useState('')
  //Header state animations
  const [hideOnScroll, setHideOnScroll] = useState(true)

  //Custom hooks 
  const w = typeof window !== `undefined` ? window : null;
  const windowWidth = useCurrentWidth()

  //Check is scroll to top or bottom 
  useScrollPosition(({ prevPos, currPos }) => {

    const isShow = currPos.y >= prevPos.y
    if (isShow !== hideOnScroll) setHideOnScroll(isShow)

  }, [hideOnScroll])

  const redirectToSearch = () => language.locale === 'en_US' ? w.location.replace(`/search?${searchValue}`) : w.location.replace(`/leit?${searchValue}`)
  // Split menus data 
  useEffect(() => {

    menus.map(menu => {
      const { locations: [menuLocation] } = menu
      if (locale === 'is_IS') {
        menuLocation === 'MENU_1' && setPrimaryMenu(menu.menuItems)
        menuLocation === 'MENU_2' && setSecondaryMenu(menu.menuItems)
      } else {
        menuLocation === 'MENU_1___EN' && setPrimaryMenu(menu.menuItems)
        menuLocation === 'MENU_2___EN' && setSecondaryMenu(menu.menuItems)
      }

    })
  }, [menus])
  //Get array of components
  return (
    <>
      {w !== null ?
        <header className={isSearchOpen && windowWidth < 1024 ? "main-header main-header--menu-open" : `main-header main-header--closed main-header--${hideOnScroll ? 'big' : 'small'}`}>
          {windowWidth < 1024
            ?
            <div className={`main-header__cont-wrapper ${isSearchOpen ? 'main-header__cont-wrapper--open' : ''}`}>
              <div className='main-header__search-bar'>
                <div className="main-header__search-bar-close"
                  onClick={() => setIsSearchOpen(false)}
                  role="button" onKeyDown={() => setIsSearchOpen(false)} tabIndex={0} aria-label="search close"></div>
                {!isOnSearchPage ?
                  <SearchField
                    placeholder="Typing..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={(e) => e.keyCode === 13 ? redirectToSearch() : null}
                    isSearchOpen={isSearchOpen}

                  />
                  :
                  <SearchFieldForm
                    placeholder={searchParamValue}
                    onSearchSubmit={onSearchSubmit}
                  />
                }
              </div>
              <div className="main-header__wrapper">
                <div
                  className="main-header__search"
                  onClick={() => {
                    setIsSearchOpen(!isSearchOpen)
                    setIsMenuOpen(false)
                  }}
                  role="button" onKeyDown={() => {
                    setIsSearchOpen(!isSearchOpen)
                    setIsMenuOpen(false)
                  }}
                  tabIndex={0}
                  aria-label="search close"
                >
                </div>
                <Link className="main-header__logo" to="/"></Link>
                <div
                  className={isMenuOpen ? 'main-header__hamburger-btn main-header__hamburger-btn--open' : 'main-header__hamburger-btn'}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  role="button" onKeyDown={() => setIsMenuOpen(!isMenuOpen)} tabIndex={0} aria-label="search close"
                >
                </div>
              </div>
              <div className={isMenuOpen ? 'menu menu--open' : 'menu'}>
                {primaryMenu !== undefined ? <PrimaryMenu menuItems={primaryMenu} /> : null}
                {secondaryMenu !== undefined ? <SecondaryHeader isFrontPage={isFrontPage} menuItems={secondaryMenu} language={locale} translations={translations !== undefined ? translations[0] : { slug: "/search" }} windowWidth={windowWidth} /> : null}
              </div>
            </div>
            : <>
              <div className="main-header__wrapper">
                <div className={`main-header__secondary-header main-header__secondary-header--${hideOnScroll ? 'open' : 'hidden'} `} >
                  {secondaryMenu !== undefined ? <SecondaryHeader isFrontPage={isFrontPage} menuItems={secondaryMenu} language={locale} windowWidth={windowWidth} translations={translations[0]} /> : null}
                </div>
                {/* Primary header */}
                <div className={`main-header__primary-header main-header__primary-header--${hideOnScroll ? 'open' : 'hidden'}`}>
                  <div className="main-header__primary-header-wrapper">
                    <Link className="main-header__logo" to="/"></Link>
                    {primaryMenu !== undefined ? <PrimaryMenu menuItems={primaryMenu} /> : null}
                    {/* Search  */}
                    <div className="main-header__search search">
                      <div className={isSearchOpen ? "main-header__search-wrap main-header__search-wrap--open" : "main-header__search-wrap"}>
                        <div className="main-header__search-bar">
                          <div className="main-header__search-bar-close"
                            onClick={() => setIsSearchOpen(false)}
                            role="button" onKeyDown={() => setIsSearchOpen(false)} tabIndex={0} aria-label="search close"
                          ></div>
                          {!isOnSearchPage ?
                            <SearchField
                              placeholder="Typing..."
                              value={searchValue}
                              onChange={(e) => setSearchValue(e.target.value)}
                              onKeyDown={(e) => e.keyCode === 13 ? redirectToSearch() : null}
                              isSearchOpen={isSearchOpen}

                            />
                            :
                            <SearchFieldForm
                              placeholder={searchParamValue}
                              onSearchSubmit={onSearchSubmit}
                            />
                          }

                        </div>
                        <div
                          className="main-header__search-icon"
                          onClick={() => setIsSearchOpen(true)}
                          role="button" onKeyDown={() => setIsSearchOpen(true)} tabIndex={0} aria-label="search close"

                        ></div>
                      </div>
                    </div>
                    {/* Search end  */}
                  </div>
                </div>
              </div>
            </>
          }
        </header>
        : null
      }
    </>

  )
}

Header.propTypes = {
  menuData: PropTypes.object,
  translations: PropTypes.array,
  language: PropTypes.object,
  isOnStartSearchOpen: PropTypes.bool,
  isOnSearchPage: PropTypes.bool,
  onSearchSubmit: PropTypes.func,
  searchParamValue: PropTypes.string
}


