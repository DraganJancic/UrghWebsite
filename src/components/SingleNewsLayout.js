import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import SocialsShareComponent from './SocialsShareComponent'
import SideBanner from './SideBanner'

import defaultImage from '../images/default-article-img.png'

import '../components/SingleNewsLayout.scss'

/**
 * We are using the SingleNewsLayout component to display content for the single news and single articles components
 * 
 * @param {string} title
 * @param {string} content
 * @param {string} date
 * @param {string} slug
 * @param {string} postSlugTranslationName
 * @param {object} newsImage
 * @param {object} language
 * @param {boolean} hasSocials
 * @param {object} optionsPageData
 * 
 * @returns {JSX Element}
 */
export default function SingleNewsLayout({ 
  title, 
  content, 
  date, 
  slug, 
  postSlugTranslationName, 
  featuredPostArticleImage, 
  hasSocials,
  language, 
  optionsPageData
}) {

  return (
    <section className="single-news">
      <div className="single-news__wrapper content-wrapper">
        {featuredPostArticleImage ? <Img
        className="single-news__featured-img"
        fluid={featuredPostArticleImage.fluid}
        /> : <img className="single-news__default-img" src={`${defaultImage}`} alt="Default Image" />}
        <div className="single-news__post">
          <div className={`${hasSocials ? 'single-news__main-content' : 'single-news__main-content--no-socials'}`}>
            {hasSocials && <p className="single-news__date small">{date}</p>}
            <h2 className="single-news__title">{title}</h2>
            <div className="single-news__content" dangerouslySetInnerHTML={{ __html: content }} />
          </div>
          {hasSocials && <SocialsShareComponent 
            title={title} 
            language={language} 
            slug={slug} 
            postSlugTranslationName={postSlugTranslationName} 
          />}
          <SideBanner sideBannersData={optionsPageData} /> 
        </div>
      </div> 
    </section>
  )
}

SingleNewsLayout.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  date: PropTypes.string,
  slug: PropTypes.string,
  postSlugTranslationName: PropTypes.string,
  newsImage: PropTypes.object,
  language: PropTypes.object,
  hasSocials: PropTypes.bool,
  optionsPageData: PropTypes.object
}