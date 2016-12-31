// Only used on server

const React = require('react')

module.exports = (props) => {
  const {
    htmlAttributes,
    title,
    meta,
    body,
    bundleJSFileName,
    mainCss,
    url,
    Env
  } = props

  const liveReload = Env === 'development' ? <script src='http://localhost:35729/livereload.js'></script> : ''

  return (
    <html {...htmlAttributes}>
      <head>
        {meta}

        {title}
        <link rel='stylesheet' href={`/public/bundles/${mainCss}`} />
        <link rel='shortcut icon' type='image/png' href='/public/favicon.ico' />
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
