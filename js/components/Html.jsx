// Only used on server

const React = require('react')

module.exports = (props) => {
  const { htmlAttributes, title, meta, body, link, bundleJSFileName, url } = props

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
      </body>
    </html>
  )
}
