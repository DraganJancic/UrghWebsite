import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import FrontPageLayout from '../components/FrontPageLayout'

import '../components/global-styles/_global.scss';

// Pass flexible content to Front Page Layout
/**
 * frontpageFlexibleContetQuery query data from ACF homeFlexibleContent component
 * FrontPageTemplate pass array of components, getting from frontpageFlexibleContetQuery object to FrontPageLayout
 */
export default function FrontPageTemplate({ data, pageContext }) {
  //Get array of components
  const { wpPage: { translations, language, homeFlexibleContent: { homecontent } } } = data
  const { isFrontPage, menuInfo: { data: { allWpMenu } }, footerInfo: { data: { allWp: { nodes: [optionsPage] } } } } = pageContext
  return (
    <div className="front-page">
      <FrontPageLayout isFrontPage={isFrontPage} menuData={allWpMenu} translations={translations} homeComponents={homecontent} language={language} footerOptionsPage={optionsPage} />
    </div>
  )
}

FrontPageTemplate.propTypes = {
  data: PropTypes.object.isRequired
}

//Query flexible content for homepage
export const frontpageFlexibleContetQuery = graphql`
  query pageByID($id: String!) {
    wpPage(id: {eq: $id}) {
      translations {
        slug
        uri
      }
      homeFlexibleContent {

        homecontent {

          ... on WpPage_Homeflexiblecontent_Homecontent_Homehero {
            fieldGroupName
            subtitle
            title
            image {
              file: localFile {
                heroImage: childImageSharp {
                  fluid{
                  ...GatsbyImageSharpFluid_noBase64
                  }
                }
              }
            }
          }
          # 
          ... on WpPage_Homeflexiblecontent_Homecontent_HomeBanner {
            fieldGroupName
            url
            mobileImage {
              mobileFile: localFile {
                mobileObjectImage: childImageSharp {
                  resolutions {
                    ...GatsbyImageSharpResolutions_withWebp_tracedSVG
                  }
                }
              }
            }
            desktopImage {
              localFile {
                childImageSharp {
                  resolutions(quality: 100, width: 1000) {
                    ...GatsbyImageSharpResolutions_withWebp_tracedSVG
                  }
                }
              }
            }
          }

          #Highlights component
          ... on WpPage_Homeflexiblecontent_Homecontent_HighlightsComponent {
            description
            fieldGroupName
            title
            url
            image {
              localFile {
                childImageSharp {
                  resolutions {
                    ...GatsbyImageSharpResolutions_withWebp_tracedSVG
                  }
                }
              }
            }
          }
          # Latest news - in this component we get only title from ACF, of component should full data from allWpPosts object
          ... on WpPage_Homeflexiblecontent_Homecontent_LatestNews {
            fieldGroupName
            title
          }
          ... on WpPage_Homeflexiblecontent_Homecontent_BannerSlider {
            fieldGroupName
            slider {
              url
              bannerImage {
                localFile {
                  childImageSharp {
                    resolutions(quality: 100, width: 1000) {
                      ...GatsbyImageSharpResolutions_withWebp_tracedSVG
                    }
                  }
                }
              }
              bannerImageMobile {
                localFile {
                  childImageSharp {
                    resolutions {
                      ...GatsbyImageSharpResolutions_withWebp_tracedSVG
                    }
                  }
                }
              }
            }
          }
          # Linking Cards Component
          ... on WpPage_Homeflexiblecontent_Homecontent_LinkCards {
            fieldGroupName
            linkCards {
              fieldGroupName
              squareOrReportCard
              title
              url {
                url
              }
              icon {
                localFile {
                  childImageSharp {
                    resolutions {
                      ...GatsbyImageSharpResolutions_withWebp_tracedSVG
                    }
                  }
                }
              }
            }
            mainLinkCard {
              mainLinkCardSubtitle
              mainLinkCardTitle
              mainLinkCardUrl
              mainLinkCardImage {
                localFile {
                  childImageSharp {
                    resolutions {
                      ...GatsbyImageSharpResolutions_withWebp_tracedSVG
                    }
                  }
                }
                altText
              }
            }
          }
        }
      } 
      language {
        locale
      }
    }
  }
`

