import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import SingleNewsLayout from '../components/SingleNewsLayout'
import Header from '../components/Header'
import Footer from '../components/Footer'

/**
 * Article Page Template
 * 
 * @param {object} data
 * @param {object} pageContext
 *
 * @returns {JSX Element}
 */
export default function articleTemplate({ data, pageContext }) {

  const { wpArticle: { translations, language, title, content, featuredImage } } = data

  const articleImage = featuredImage && featuredImage.node.file.articleImage

  const { hasSocials, menuInfo: { data: { allWpMenu } }, footerInfo: { data: { allWp: { nodes: [optionsPage] } } }, sideBanners: { data: { allWp: { nodes: [optionsPageData] } } } } = pageContext

  return (
    <>
      <Header menuData={allWpMenu} language={language} translations={translations} />
      <SingleNewsLayout
        title={title}
        content={content}
        featuredPostArticleImage={articleImage}
        optionsPageData={optionsPageData}
        hasSocials={hasSocials}
      />
      <Footer menuData={allWpMenu} language={language} footerOptionsPage={optionsPage} />
    </>
  )
}

articleTemplate.propTypes = {
  data: PropTypes.object,
  pageContext: PropTypes.object
}

//Query all fields for article template
export const articleQery = graphql`
  query articleByID($id: String!) {
    wpArticle(id: {eq: $id}) {
      translations {
        slug
      }
      language {
        locale
      }
      title
      content
      featuredImage {
        node {
          file: localFile {
            articleImage: childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
        }
      }
    }
  }
`

