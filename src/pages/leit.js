import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'


import SearchResults from '../components/SearchResults'

export default function LeitPage() {

  const data = useStaticQuery(graphql`{
    wpPage {
      language {
        locale
      }
      translations {
        slug
      }
    }
    allWpPost {
      nodes {
        id
        title
        link
        slug
        nodeType
        language {
          locale
        }
        featuredImage {
          node {
            file: localFile {
              image: childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
          }
        }
      }
    }
    allWpPage {
      nodes {
        id
        title
        content
        link
        nodeType
        language {
          locale
        }
      }
    }
    allWpDiscount {
      nodes {
        id
        title
        content
        nodeType
        language {
          locale
        }
        featuredImage {
          node {
            file: localFile {
              image: childImageSharp {
                fluid(maxWidth: 400) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
          }
        }
      }
    }
    allWpOrganization {
      nodes {
        id
        title
        link
        nodeType
        content
        language {
          locale
        }
      }
    }
    allWpMenu {
      menus: nodes {
        name
        locations
        menuItems {
          nodes {
            databaseId
            parentDatabaseId
            label
            cssClasses
            parentId
            path
            childItems {
              nodes {
                databaseId
                parentDatabaseId
                cssClasses
                label
                path
                order
                parentId
                childItems {
                  nodes {
                    databaseId
                    parentDatabaseId
                    cssClasses
                    label
                    parentId
                    path
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
        optionsPage {
          footerOptions: options_page {
            fieldGroupName
            contactFooter {
              address
              email
              phone
              workingHours
            }
          }
        }
      }
    }

  }`)
  const language = {
    locale: 'is_IS'
  }

  const translations = [{
    slug: '/search'
  }]
  return (
    <SearchResults data={data} language={language} translations={translations} />
  )
}