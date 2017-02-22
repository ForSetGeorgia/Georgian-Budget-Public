const ReactGA = require('react-ga')
const googleAnalyticsId = process.env.GOOGLE_ANALYTICS_ID
if (googleAnalyticsId) ReactGA.initialize(googleAnalyticsId)

const logPageView = () => {
  if (!window || !googleAnalyticsId) return
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
}

module.exports = logPageView
