import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import NewsPageLayout from '../components/NewsPageLayout'
import Header from '../components/Header'

import '../components/global-styles/_global.scss';

export default function newsArchiveTemplate({ data, pageContext }) {
  //Get array of components
  const { allWpPost: { nodes }, wpPage: { translations, language } } = data
  const { currentPage, limit, newsPageCount, skip, menuInfo: { data: { allWpMenu } } } = pageContext
  const currentLanguageNews = nodes.filter(item => item.language.locale === language.locale)

  return (
    <div className="news-archive">
      <Header menuData={allWpMenu} language={language} translations={translations} />
      <NewsPageLayout
        language={language}
        newsData={currentLanguageNews}
        currentPage={currentPage}
        limit={limit}
        newsPageCount={newsPageCount}
        skip={skip}
      />
    </div>
  )
}

export const newsQuery = graphql`
  query newsById($id: String, $skip: Int!, $limit: Int!) {
    wpPage(id: {eq: $id}) {
      translations {
        uri
      }
      language {
        locale
      }
      slug
    }
    allWpPost(sort: {fields: [date], order:DESC}, limit: $limit, skip: $skip) {
      nodes {
        title
        date(formatString: "MMMM DD, YYYY")
        slug
        language {
          locale
        }
        featuredImage {
          node {
            file: localFile {
              newsImage: childImageSharp {
                fluid(maxWidth: 400) {
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

newsArchiveTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired
}