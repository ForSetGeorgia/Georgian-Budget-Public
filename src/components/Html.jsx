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
    url,
    imageUrl,
    appId
  } = props

  return (
    <html {...htmlAttributes}>
      <head>
        {meta}
        <meta data-react-helmet='true' property='og:url' content={url} />
        <meta data-react-helmet='true' property='og:image' content={imageUrl} />
        {/* explanation of og:image:width and :height - https://developers.facebook.com/docs/sharing/best-practices/#precaching */}
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='750' />
        <meta property='fb:app_id' content={appId} />

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
