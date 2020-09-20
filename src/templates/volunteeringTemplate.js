import React from 'react'
import { graphql } from 'gatsby'
import VolunteeringHeader from '../components/VolunteeringHeader'
import VolunteeringAssociationsSection from '../components/VolunteeringAssociationsSection'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function volunteeringTemplate({ data, pageContext }) {

  const { wpPage: { translations, language, volunteering: { volunteeringIntro, volunteeringRepeater  } } } = data

  const { menuInfo: { data: { allWpMenu } }, footerInfo: { data: { allWp: { nodes: [optionsPage] } } } } = pageContext

  return (
    <>
      <Header menuData={allWpMenu} language={language} translations={translations} />
        <section className="volunteering">
          <div className="volunteering__wrapper content-wrapper">
            <VolunteeringHeader volunteeringHeaderData={volunteeringIntro} />
            <VolunteeringAssociationsSection volunteeringAssociationsData={volunteeringRepeater} />
          </div>
        </section>
      <Footer menuData={allWpMenu} language={language} footerOptionsPage={optionsPage} />
    </>
  )
}


export const volunteeringPageQuery = graphql`
  query volunteeringPage($id: String!) {
    wpPage(id: {eq: $id}) {
      translations {
        slug
        uri
      }
      language {
        locale
      }
      volunteering {
        volunteeringIntro {
          volunteeringDescription
          volunteeringTitle
          volunteeringHeroImage {
            file: localFile {
              heroImage: childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
          }
        }
        volunteeringRepeater {
          sectionImage {
            file: localFile {
              sectionIcon: childImageSharp {
                fluid(maxWidth: 55) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
          }
          sectionTitle
          sectionRepeater {
            subsectionTitle
            subsectionDescription
            subsectionName
            subsectionEmail
            subsectionPhone
          }
        }
      }
    }
  }
`