import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import { prune, include as includes } from 'underscore.string'
import find from 'lodash/find'

export default function ReadNext(props) {
  const { pages, post } = props
  const { readNext } = post

  if (!readNext) return null

  const nextPost = find(pages, (page) =>
    includes(page.path, readNext.slice(1, -1))
  )

  // Create pruned version of the body.
  const html = nextPost.data.body
  const body = prune(html.replace(/<[^>]*>/g, ''), 200)

  return (
    <div>
      <h6>
        READ THIS NEXT:
      </h6>
      <h3>
        <Link
          to={{
            pathname: prefixLink(nextPost.path),
            query: {
              readNext: true,
            },
          }}
        >
          {nextPost.data.title}
        </Link>
      </h3>
      <p>{body}</p>
      <hr />
    </div>
  )
}

ReadNext.propTypes = {
  post: React.PropTypes.object.isRequired,
  pages: React.PropTypes.array,
}
