import React from 'react'
import PropTypes from 'prop-types'
import BackgroundImage from 'gatsby-background-image'
import './InfoPageLayout.scss'
import Header from './Header'
import Footer from './Footer'

/**
 * Info Page Layout
 * this page template contains only info repeater
 * For now Student clubs, Student grants & New students guide use this page template
 */
export default function InfoPageLayout({ infoRepeater, pageTitle, menuData, language, translations, footerOptionsPage }) {

  const { subtitle, repeater } = infoRepeater
  const { locale } = language

  return (
    <>
      <Header menuData={menuData} language={language} translations={translations} />
      <main>
        <div className="info">
          <div className="content-wrapper">
            <div className="info__headlines">
              <h2>{pageTitle}</h2>
              <p>{subtitle}</p>
            </div>
            <div className="info__repeater">
              {
                repeater.map((content, index) => {
                  return (
                    <div className="info__repeater-wrapper" key={index}>
                      <div className={`info__repeater-image--${!content.hasLink ? 'small' : 'big'}`}>
                        <BackgroundImage fluid={content.icon.localFile.childImageSharp.fluid} />
                      </div>
                      <div className="info__repeater-content">
                        <h5>{content.title}</h5>
                        <p dangerouslySetInnerHTML={{ __html: content.description }} />
                        {
                          content.hasLink
                          && <div className="info__repeater-link">
                            <a href={content.url} target="_blank" className="read-more-link--light">
                              {locale === 'is_IS' ? 'Læra meira' : 'Learn more'}
                            </a>
                          </div>
                        }
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </main>
      <Footer menuData={menuData} language={language} footerOptionsPage={footerOptionsPage} />
    </>
  )
}

InfoPageLayout.propTypes = {
  infoRepeater: PropTypes.object.isRequired,
  pageTitle: PropTypes.string.isRequired,
  menuData: PropTypes.object,
  language: PropTypes.object,
  translations: PropTypes.array,
  footerOptionsPage: PropTypes.object
}