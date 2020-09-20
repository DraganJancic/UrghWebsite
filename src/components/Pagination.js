import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { navigate } from "@reach/router"

import './Pagination.scss'

export default function Pagination({ currentPage, newsPageCount, language }) {

  const [navInputVal, setNavInputVal] = useState(currentPage)
  const [archivePageSlug, setArchivePageSlug] = useState(language.locale === 'is_IS' ? 'frettir' : 'news')

  const submitNewPage = (e) => e.keyCode === 13 && navigate(`/${archivePageSlug}/${navInputVal}`)

  return (
    <nav className="pagination">
      {/* Previous page link */}

      <Link
        title="Go to previous page"
        className={`pagination__box pagination__box--prev ${currentPage == 1 && 'pagination__box--prev-unactive'}`}
        to={currentPage === 2 ? '/frettir' : `/frettir/${currentPage - 1}`}>
      </Link>
      {/* Navigation Input field */}
      <div className="pagination__nav">
        <input
          className="pagination__nav-curr"
          onChange={(e) => setNavInputVal(parseInt(e.target.value) === 1 ? '' : parseInt(e.target.value) > newsPageCount ? newsPageCount : e.target.value)}
          value={navInputVal}
          type="number"
          min="0"
          max={newsPageCount}
          onKeyDown={(e) => submitNewPage(e)}
        />
        <div className="pagination__nav-total"> / {newsPageCount}</div>
      </div>

      {/* Next page link */}

      <Link
        className={`pagination__box pagination__box--next ${currentPage === newsPageCount && 'pagination__box--next-unactive'}`}
        title="Go to next page"
        to={`/frettir/${currentPage + 1}`}>
      </Link>

    </nav>
  )
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  newsPageCount: PropTypes.number,
  language: PropTypes.object
}