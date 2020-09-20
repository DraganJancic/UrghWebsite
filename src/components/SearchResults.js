import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types"

import lunr from 'lunr'

//Components
import { Link } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
//Internal componentes
import Header from './Header'
import Footer from './Footer'
//Styles
import './SearchResults.scss'

// https://stackoverflow.com/a/24006120/2255980
// this function will convert the absolute paths that GraphQL gives us 
// into relative paths, which is what Gatsby Link needs.
// so for example 
// this https://localhost:8000/a-post-about-bagels 
// becomes /a-post-about-bagels
function localiseUrl(url) {
  try {
    const newURL = new URL(url)
    return newURL.pathname
  } catch {
    return url
  }
}

// the user must type this many characters before a search will happen
const minCharacters = 3
// we trim the results text to this value, else we dont know how much content 
// we're rendering onto the page
const contentCharLimit = 180

// this builds Lunr's index. It's a necessary step to using Lunr.
// With enormous sites this could become slow, so a future task might be to 
// pre-build the index when Gatsby builds (probably in gatsby-node.js)
// https://lunrjs.com/guides/index_prebuilding.html
function getIndex(posts) {
  return lunr(function () {
    // this line fixes an issue where a search for "bage" will return "bagel" 
    // results (which is good)
    // but a search for "bagel" wont. (it was dropping results for fully 
    // formed queries)
    // https://github.com/olivernn/lunr.js/issues/295#issuecomment-354481360
    this.pipeline.remove(lunr.stemmer)
    this.ref('id')
    this.field('title')
    this.field('content')

    posts.map(post => {
      return this.add({
        id: post.id,
        title: post.title,
        content: post.content,
      })
    })
  })
}

//Search result component render search header & search results
export default function SearchResults({ data, language, translations }) {

  const { allWpPost, allWpPage, allWpDiscount, allWpOrganization, allWpMenu, allWp: { nodes: [optionsPage] } } = data

  //Content is returned with html tags in string
  //So here using regex html tags will be removed from contnet
  allWpOrganization.nodes.map(item => {
    let regexContent = ''
    const regex = /(<([^>]+)>)/ig;
    if (item.content !== null) {
      regexContent = item.content.replace(regex, '')
    }
    item.content = regexContent
  })

  let allSearchData = [...allWpPage.nodes, ...allWpPost.nodes]
  allSearchData = allSearchData.concat(allWpDiscount.nodes, allWpOrganization.nodes)

  //Query search state
  const [query, setQuery] = useState('') // our search query string

  // getIndex calls lunr to generate the search index
  // we only ever want to run getIndex once, we store its return in state as idx
  const [idx, setIdx] = useState(null)
  let results = []
  if (idx && query && query.length >= minCharacters) {
    /**
     * In this search I am merging results on query 
     * the following will match all documents with words beginning with query and 
     * Following search matches all documents that have a word within 1 edit distance of query
     */
    results = idx.search(`${query}* ${query}~1`)
  }
  //Get paramter from url

  const getSearchParamsFromUrl = () => typeof window !== `undefined` ? window.location.search.substr(1) : null

  //submit search with parameter from url
  const submitsearchOnLoad = () => {
    // setQuery(getSearchParamsFromUrl().replace(/[|&!*#;$=%^_/?@":~<>()+,]/g, ""))
    setQuery(getSearchParamsFromUrl().replace(/%/g, "").replace(/20/g, ' '))
  }
  //On submit set query state

  const submitSearch = (e) => {
    // We will se do they want this regex or not, for now it's commented
    // setQuery(e.target.value.replace(/[|&!*#;$=%^_/?@":~<>()+,]/g, ""))
    setQuery(e.target.value)
  }

  //Node type text 
  const searchNodeType = (nodeType) => {
    switch (nodeType) {
      case 'Post':
        return 'News'
      case 'Page':
      case 'Organization':
        return 'Other'
      case 'Discount':
        return 'Discount'
    }
  }

  useEffect(() => {

    const idx = getIndex(allSearchData)
    setIdx(idx)
    getSearchParamsFromUrl()
    submitsearchOnLoad()

  }, [])


  /**
   * Depeans of CPT some urls will be modified 
   * Discount & Organisations don't have single pages so it redirect to archive page
   * For news url is modified, it has news/frettir before slug
   * Articles & pages url are unchangable
   * @param {object} post 
   * @param {string} postLink 
   */
  const searchResultLink = (post, postLink) => {
    if (post.nodeType === 'Post') {
      const cptTranslation = post.language.locale === 'en_US' ? '/en/news' : '/frettir';
      return `${cptTranslation}/${post.slug}`
    } else if (post.nodeType === 'Discount') {
      return post.language.locale === 'en_US' ? '/en/discounts' : '/afslaettir'
    } else if (post.nodeType === 'Organization') {
      return post.language.locale === 'en_US' ? '/en/student-organisation' : '/nemendafelog'
    } else {
      return postLink
    }
  }

  //Static content for search this page 
  const searchStaticContent = {
    pleaseType: language.locale === 'en_US' ? `Please type at least ${minCharacters} characters` : `Please type at least ${minCharacters} characters`,
    resultLenth: language.locale === 'en_US' ? `${results.length} results for` : `${results.length} results for`,
    noResult: language.locale === 'en_US' ? `No results found for ` : 'No result IS '
  }
  return (
    <>
      <Header
        menuData={allWpMenu}
        language={language}
        translations={translations}
        isOnStartSearchOpen={true}
        isOnSearchPage={true}
        onSearchSubmit={submitSearch}
        searchParamValue={getSearchParamsFromUrl() && getSearchParamsFromUrl().replace(/%/g, "").replace(/20/g, ' ')}
      />

      {/* Search lenght results */}
      <section className="search-count-res content-wrapper">
        <h2>
          {query.length < minCharacters && searchStaticContent.pleaseType}
          {!!results.length && query.length >= minCharacters && searchStaticContent.resultLenth}
          {!results.length && query.length >= minCharacters && searchStaticContent.noResult}
        </h2>
        <h2 className="strong">
          {`"${query}"`}
        </h2>
        <p>
          {!results.length && query.length >= minCharacters && `Sorry, your search query did not return any results.`}
        </p>
      </section>


      <section className="search-res content-wrapper">
        {/* ensure the minimum number of characters has been entered */}
        {query.length >= minCharacters &&
          <div className="search-res__wrapper">
            {results.map(searchResult => {
              // Filter through all of the graphql data provided by the parent component
              // to find the ID which matches the results provided by Lunr
              // and just grab the first and only item (it'll be a single item array)
              const post = allSearchData.filter(post => post.id === searchResult.ref)[0]

              const content = post.content ? post.content : null
              const contentCapped = `${content?.substring(0, contentCharLimit)}${content?.length > contentCharLimit ? '...' : ''}`

              const postLink = post.link ? localiseUrl(post.link) : post.nodeType === 'Discount' ? '/discounts' : '/organizations'

              return (
                <div key={post.id} className="search-res__single">
                  {post.featuredImage
                    ? <Link className="search-res__single-img-link" to={searchResultLink(post, postLink)}>
                      <BackgroundImage className="search-res__single-img" fluid={post.featuredImage.node.file.image.fluid} />
                    </Link>
                    : null
                  }
                  <div className="search-res__single-content">
                    <p className="search-res__single-node">{searchNodeType(post.nodeType)}</p>
                    <Link to={searchResultLink(post, postLink)}>
                      <h2>
                        {post.title}
                      </h2>
                    </Link>
                    {}
                    {content && (
                      <p
                        dangerouslySetInnerHTML={{
                          __html: contentCapped
                        }}
                      />
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        }

      </section>
      <Footer menuData={allWpMenu} language={language} footerOptionsPage={optionsPage} />

    </>
  )

}

SearchResults.propTypes = {
  data: PropTypes.object.isRequired
}