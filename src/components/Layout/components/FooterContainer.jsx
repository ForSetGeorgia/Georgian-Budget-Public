const React = require('react')
const axios = require('axios')
const { func, string } = React.PropTypes
const { injectIntl, intlShape } = require('react-intl')
const { connect } = require('react-redux')

const Footer = require('./Footer')

const {
  getLastUpdatedDate,
  setLastUpdatedDate
} = require('src/data/ducks/explore')

const FooterContainer = React.createClass({
  propTypes: {
    setLastUpdatedDate: func.isRequired,
    lastUpdatedDate: string,
    intl: intlShape.isRequired
  },

  componentDidMount () {
    const { locale } = this.props.intl

    if (this.props.lastUpdatedDate) return

    axios.get(`${process.env.API_URL}/${locale}/v1/last_updated_date`)
    .then(response => {
      if (!response || !response.data) return

      this.props.setLastUpdatedDate(response.data.last_updated_date)
    })
  },

  render () {
    return (
      <Footer {...this.props} />
    )
  }
})

const mapStateToProps = state => ({
  lastUpdatedDate: getLastUpdatedDate(state)
})

const mapDispatchToProps = dispatch => ({
  setLastUpdatedDate: date => dispatch(setLastUpdatedDate(date))
})

module.exports = injectIntl(connect(mapStateToProps, mapDispatchToProps)(FooterContainer))
