// Only used on server

const React = require('react')

module.exports = (props) => {
  const { title, meta, body, link, bundleJSFileName, url } = props

  return (
    <html lang="en">
      <head>
        {meta}

        {title}
        {link}

      </head>
      <body>
        <div id="app-container">
          <div dangerouslySetInnerHTML={{ __html: body }} />
        </div>

        <script src={`/public/${bundleJSFileName}`}></script>
      </body>
    </html>
  )
}
