import React from 'react'
import Helmet from 'react-helmet'
import fecha from 'fecha'
import { config } from 'config'
import ReadNext from 'components/ReadNext'
import Bio from 'components/Bio'

export default function MarkdownWrapper(props) {
  const { route } = props
  const post = route.page.data

  return (
    <div>
      <Helmet title={`${post.title} | ${config.blogTitle}`} />
      <div className="markdown">
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.body }} />
        {post.date &&
          <em>
            Posted {fecha.format(new Date(post.date), 'MMMM D, YYYY')}
          </em>
        }
        <hr />
        <ReadNext post={post} pages={route.pages} />
        <Bio />
      </div>
    </div>
  )
}

MarkdownWrapper.propTypes = {
  route: React.PropTypes.object,
}
