import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Header from '../components/Header'
import AboutHero from '../components/AboutHero'
import MeetCouncil from '../components/MeetCouncil'
import MembersComponent from '../components/MembersComponent'
import Footer from '../components/Footer'

/**
 * This is about us page which contains 3 components
 * 
 * @param {object} data
 * @param {object} pageContext
 */
export default function councilPeopleTemplate({ data, pageContext }) {
  const { wpPage: { translations, language, title, Council_and_people_template: { header, councilRepeater, memberRepeater } } } = data
  const { menuInfo: { data: { allWpMenu } }, footerInfo: { data: { allWp: { nodes: [optionsPage] } } } } = pageContext

  return (
    <>
      <Header menuData={allWpMenu} language={language} translations={translations} />
      <div className="about-us">
        <AboutHero pageTitle={title} heroData={header} />
        <MeetCouncil councilData={councilRepeater} language={language} />
        <MembersComponent memberData={memberRepeater} language={language} />
      </div>
      <Footer menuData={allWpMenu} language={language} footerOptionsPage={optionsPage} />
    </>
  )
}


councilPeopleTemplate.propTypes = {
  data: PropTypes.object,
  pageContext: PropTypes.object
}

export const aboutPageQuery = graphql`
  query aboutPageByID($id: String) {
    wpPage(id: {eq: $id}) { 
      translations {
        uri
      }
      language {
        locale
      }
      title
      Council_and_people_template {
        header {
          description
          title
          image {
            file: localFile {
              aboutHeroImage: childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
        councilRepeater {
          name
          description
          email
          image {
            file: localFile {
              councilCardImage: childImageSharp {
                resolutions {
                  ...GatsbyImageSharpResolutions_withWebp_tracedSVG
                }
              }
            }
          }
          name
          position
          description
          email
          socialsRepeater {
            fieldGroupName
            url
            socialIcon {
              file: localFile {
                councilSocialImage: childImageSharp {
                  fluid(maxWidth: 20){
                    ...GatsbyImageSharpFluid_noBase64
                  }
                }
              }
            }
          }
        }
        memberRepeater {
          description
          email
          name
          image {
            file: localFile {
              memberCardImage: childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
          }
        }
      }
    }
  }
`
