import React from 'react'
import { Link } from 'react-router'
import sortBy from 'lodash/sortBy'
import { prefixLink } from 'gatsby-helpers'
import access from 'safe-access'
import { config } from 'config'
import include from 'underscore.string/include'
import Helmet from 'react-helmet'

import Bio from 'components/Bio'

export default function BlogIndex(props) {
  const { route } = props
  const pageLinks = []

  const sortedPages = sortBy(route.pages, (page) =>
    access(page, 'data.date')
  ).reverse()
  sortedPages.forEach((page) => {
    if (access(page, 'file.ext') === 'md' && !include(page.path, '/404')) {
      const title = access(page, 'data.title') || page.path
      pageLinks.push(
        <li
          key={page.path}
        >
          <Link to={prefixLink(page.path)}>
            {title}
          </Link>
        </li>
      )
    }
  })
  return (
    <div>
      <Helmet title={config.blogTitle} />

      <Bio />
      <ul>
        {pageLinks}
      </ul>
    </div>
  )
}

BlogIndex.propTypes = {
  route: React.PropTypes.object,
}
