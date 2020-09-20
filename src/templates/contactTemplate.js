import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ContactSection from '../components/ContactSection'


export default function contactTemplate({ data, pageContext }) {

  const { wpPage: { contact: { templateType, hasGoogleMap, googleMapSection, contactFormSection }, translations, language }, allWp } = data
  const { menuInfo: { data: { allWpMenu } }, footerInfo: { data: { allWp: { nodes: [optionsPage] } } } } = pageContext
  const { nodes: [settings] } = allWp

  return (
    <div className="contact-template">
      <Header menuData={allWpMenu} language={language} translations={translations} />
      <main>
        <ContactSection
          hasGoogleMap={hasGoogleMap}
          mapSectionData={googleMapSection}
          formSectionData={contactFormSection}
          templateType={templateType}
          language={language.locale}
          backendUrl={settings.generalSettings.url}
        />
      </main>
      <Footer menuData={allWpMenu} language={language} footerOptionsPage={optionsPage} />
    </div >
  )
}

contactTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired
}

export const contactTemplateQuery = graphql`
  query contactTemplateQuery($id: String!) {
    wpPage(id: {eq: $id}) {
      id
      language {
        locale
      }
      translations {
        uri
      }
      contact {
        templateType
        hasGoogleMap
        contactFormSection {
          description
          fieldGroupName
          moreLinksTitle
          title
          contactForm {
            description
            disclaimer
            fieldGroupName
            title
            reasonsForContact {
              email
              reason
            }
          }
          additionalContacts {
            emails {
              email
              fieldGroupName
            }
            phones {
              fieldGroupName
              phone
            }
          }
        }
        googleMapSection {
          sectionTitle
          fieldGroupName
          googleMap {
            latitude
            longitude
            zoom
          }
          contactDetails {
            addressInfo {
              title
              info
              icon {
                file: localFile {
                  childImageSharp {
                    resolutions {
                      ...GatsbyImageSharpResolutions_withWebp_tracedSVG
                    }
                  }
                }
              }
            }
            emailInfo {
              title
              info
              icon {
                file: localFile {
                  childImageSharp {
                    resolutions {
                      ...GatsbyImageSharpResolutions_withWebp_tracedSVG
                    }
                  }
                }
              }
            }
            phoneInfo {
              title
              info
              icon {
                file: localFile {
                  childImageSharp {
                    resolutions {
                      ...GatsbyImageSharpResolutions_withWebp_tracedSVG
                    }
                  }
                }
              }
            }
            officeHours {
              title
              info
              icon {
                file: localFile {
                  childImageSharp {
                    resolutions {
                      ...GatsbyImageSharpResolutions_withWebp_tracedSVG
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    allWp {
      nodes {
        generalSettings {
          url
        }
      }
    }
  }
`
