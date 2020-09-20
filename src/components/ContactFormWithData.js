import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from "gatsby"
import ContactForm from './ContactForm'

/**
 * ContactFormWithData component
 * 
 * @param {string} param.language - current language
 * @param {string} props.type - possible values: 'contact', 'complaint', 'report'
 * 
 * @returns {JSX Element}
 */
export default function ContactFormWithData({ language, type }) {
  return (
    <StaticQuery 
      query={graphql`
        query {
          allWp {
            nodes {
              optionsPage {
                options_page {
                  contactFormsOptions {
                    complaint {
                      additionalText
                      additionalTextEn
                      reasons {
                        email
                        reason
                        reasonEn
                      }
                    }
                    contact {
                      reasons {
                        email
                        reason
                        reasonEn
                      }
                      subtitle
                      subtitleEn
                      title
                      titleEn
                    }
                    report {
                      additionalText
                      additionalTextEn
                      reasons {
                        email
                        reason
                        reasonEn
                      }
                    }
                  }
                }
              }
              generalSettings {
                url
              }
            }
          }
        }
      `}
      render={
        data => {
          const { allWp: { nodes }} = data;
          const { optionsPage: { options_page: { contactFormsOptions }}, generalSettings: { url} } = nodes[0]

          return <ContactForm data={contactFormsOptions} language={language} type={type} backendUrl={url}/> 
        }
      }
    />
  )
}

ContactFormWithData.propTypes = {
  language: PropTypes.string,
  type: PropTypes.string,
}