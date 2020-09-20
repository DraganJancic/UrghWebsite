import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'

export const PageTemplate = ({ content }) => {
  return (
    <main className="content" dangerouslySetInnerHTML={{ __html: content }} />
  )
}
PageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
}

const Page = ({ data }) => {

  // const { wordpressPage: page } = data
  return (
    <Layout>
      <PageTemplate title={page.title} content={page.content} />
    </Layout>
  )
}