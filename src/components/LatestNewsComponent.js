import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Link } from 'gatsby'
//Defautl image
import defaultImage from '../images/default-discount.png'
//Styles
import './LatestNewsComponent.scss'

/**
 * In this component I am using static query to get all news and then I filter it bu language
 * Better option will be to filter it in page query, but I don't know how inser parameter for that
 * So I am passing language and then filter query by language.locale
 * @param {object} language 
 */
export default function LatestNewsComponent({ language }) {

  const { locale } = language

  const isIcelandic = locale === 'is_IS'

  // Url for archive page & prefix for single page uri
  const singleNewsUriPrefix = isIcelandic ? '/frettir' : '/en/news'
  //Text vaiables 
  const titleText = isIcelandic ? 'Allar fréttir' : 'Latest news'
  const seeAllText = isIcelandic ? 'Nýjustu fréttir' : 'See all news'

  //Static query where I get all news 
  const allNews = useStaticQuery(graphql`
    query allNewsQuery {
      allWpPost {
        posts: nodes {
          title
          date(formatString: "MMMM DD, YYYY")
          uri
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
          language {
            locale
          }
        }
      }
    }
  `)

  const { allWpPost: { posts } } = allNews

  //Get only current langugage post & return 3 newest posts
  const latestPost = posts.filter(post => post.language.locale === locale).slice(0, 3)

  return (
    <section className="latest-news">
      <div className="latest-news__wrapper content-wrapper">
        <h3>{titleText}</h3>
        <div className="latest-news__item-wrapp">
          {latestPost.map((item, key) => <div className="latest-news__item" key={key}>
            <Link to={singleNewsUriPrefix + item.uri} >
              {item.featuredImage
                ? <Img className="latest-news__item-image" fluid={item.featuredImage.node.file.newsImage.fluid} alt={item.title} />
                : <img src={defaultImage} alt={item.title} className="latest-news__item-image" />
              }
            </Link>
            <p className="small">{item.date}</p>
            <Link to={singleNewsUriPrefix + item.uri}>
              <h5>
                {item.title.length < 140 ? item.title : item.title.substring(1, 140)}
              </h5>
            </Link>
          </div>)}
        </div>
        <div className="latest-news__link">
          <Link to={singleNewsUriPrefix} className="read-more-link--light">{seeAllText}</Link>

        </div>
      </div>
    </section>
  )
}

LatestNewsComponent.propTypes = {
  language: PropTypes.objectOf(PropTypes.string)
}