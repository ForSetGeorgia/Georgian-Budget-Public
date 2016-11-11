// Only used on server

const React = require('react')

module.exports = (props) => {
  const {
    htmlAttributes,
    title,
    meta,
    body,
    link,
    bundleJSFileName,
    url,
    Env
  } = props

  const liveReload = Env === 'development' ? <script src='http://localhost:35729/livereload.js'></script> : ''

  return (
    <html {...htmlAttributes}>
      <head>
        {meta}

        {title}
        {link}

      </head>
      <body>
        <div id="app-container">
          <div dangerouslySetInnerHTML={{ __html: body }} />
        </div>

        <script src={`/public/bundles/${bundleJSFileName}`}></script>
        {liveReload}
      </body>
    </html>
  )
}
