import React from 'react'
import PropTypes from 'prop-types'
// import Header from './Header'
import HomeHero from './HomeHero'
import HomeBanner from './HomeBanner'
import LatestNewsComponent from './LatestNewsComponent'
import BannerSlider from './BannerSlider'
import HighlightsComponent from './HighlightsComponent'
import LinkCards from './LinkCards'

import Header from './Header'
import Footer from './Footer'

export default function FrontPageLayout({ isFrontPage, homeComponents, menuData, language, translations, footerOptionsPage }) {

  return (
    <>
      <Header isFrontPage={isFrontPage} menuData={menuData} language={language} translations={translations} />
      <main>
        {
          homeComponents.map((content, index) => {
            switch (content.__typename) {
              case "WpPage_Homeflexiblecontent_Homecontent_Homehero":
                const { image: { file: { heroImage } } } = content
                return <HomeHero title={content.title} subtitle={content.subtitle} heroImage={heroImage} key={index} />
              case "WpPage_Homeflexiblecontent_Homecontent_HomeBanner":
                const { desktopImage, mobileImage } = content
                return <HomeBanner url={content.url} desktopImage={desktopImage} mobileImage={mobileImage} key={index} />
              case "WpPage_Homeflexiblecontent_Homecontent_LatestNews":
                return <LatestNewsComponent key={index} language={language} />
              case "WpPage_Homeflexiblecontent_Homecontent_BannerSlider":
                return <BannerSlider slider={content.slider} key={index} />
              case "WpPage_Homeflexiblecontent_Homecontent_HighlightsComponent":
                return <HighlightsComponent description={content.description} title={content.title} link={content.url} image={content.image} language={language} key={index} />
              case "WpPage_Homeflexiblecontent_Homecontent_LinkCards":
                return <LinkCards linkCards={content.linkCards} mainLinkCard={content.mainLinkCard} language={language} key={index} />
              default:
                break;
            }
          })
        }
      </main>
      <Footer menuData={menuData} language={language} footerOptionsPage={footerOptionsPage} />
    </>
  )
}

FrontPageLayout.propTypes = {
  homeComponents: PropTypes.array,
  language: PropTypes.object

}