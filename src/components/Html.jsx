// Only used on server

const React = require('react')

module.exports = (props) => {
  const {
    htmlAttributes,
    title,
    meta,
    body,
    mainJs,
    mainCss
  } = props

  return (
    <html {...htmlAttributes}>
      <head>
        {meta}

        {title}
        <link rel='stylesheet' href={`/public/bundles/${mainCss}`} />
        <link rel='shortcut icon' type='image/png' href='/public/favicon.ico' />
        <link href="https://fonts.googleapis.com/css?family=Roboto+Mono" rel="stylesheet" />
      </head>
      <body>
        <div id="app-container">
          <div dangerouslySetInnerHTML={{ __html: body }} />
        </div>

        <script src={`/public/bundles/${mainJs}`}></script>
      </body>
    </html>
  )
}
