// Only used on server

const React = require('react')

module.exports = (props) => {
  const {
    htmlAttributes,
    title,
    meta,
    body,
    mainJs,
    mainCss,
    url
  } = props

  return (
    <html {...htmlAttributes}>
      <head>
        {meta}
        <meta data-react-helmet='true' property='og:url' content={url} />

        {title}
        <link rel='stylesheet' href={mainCss} />
        <link rel='shortcut icon' type='image/png' href='/public/favicon.ico' />
        <link href="https://fonts.googleapis.com/css?family=Roboto+Mono" rel="stylesheet" />
      </head>
      <body>
        <div id="app-container">
          <div dangerouslySetInnerHTML={{ __html: body }} />
        </div>

        <script src={mainJs}></script>
      </body>
    </html>
  )
}
