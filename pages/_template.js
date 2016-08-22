import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import { config } from 'config'
import loadFonts from 'utils/dynamic-fonts-loader'

loadFonts()

export default function Template(props) {
  const { location, children } = props
  let header
  if (location.pathname === prefixLink('/')) {
    header = (
      <h1>
        <Link to={prefixLink('/')}>
          {config.blogTitle}
        </Link>
      </h1>
    )
  } else {
    header = (
      <h3>
        <Link to={prefixLink('/')}>
          {config.blogTitle}
        </Link>
      </h3>
    )
  }

  return (
    <article>
      <header>
        {header}
      </header>
      {children}
    </article>
  )
}

Template.propTypes = {
  children: React.PropTypes.any,
  location: React.PropTypes.object,
  route: React.PropTypes.object,
}
