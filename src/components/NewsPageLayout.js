import React from 'react'
import PropTypes from 'prop-types'

//Components 
import SingleNewsPreview from '../components/SingleNewsPreview'
import Pagination from './Pagination'

//Styles 
import './SingleNewsPreview.scss'
import './global-styles/_global.scss'

//Layout for News archive page 
export default function NewsPageLayout({ newsData, currPageSlug, menuData, language, translations, currentPage, limit, newsPageCount, skip }) {
  return (
    <>
      <div className="archive-news content-wrapper">
        <h1>{language.locale === 'is_IS' ? 'Fréttir' : "News"}</h1>
        {newsData.map((item, index) =>
          <SingleNewsPreview
            key={index}
            title={item.title}
            date={item.date}
            link={item.slug}
            image={item.featuredImage}
            readMore={language.locale === 'is_IS' ? 'Lestu meira' : 'Read more'}
          />)
        }
        <Pagination
          currentPage={currentPage}
          limit={limit}
          newsPageCount={newsPageCount}
          skip={skip}
          language={language}
          currPageSlug={currPageSlug}
        />
      </div>
    </>
  )
}

NewsPageLayout.propTypes = {
  newsData: PropTypes.array,
  menuData: PropTypes.object,
  translations: PropTypes.array,
  language: PropTypes.object,
}
