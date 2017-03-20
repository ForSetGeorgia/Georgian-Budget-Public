const React = require('react')
const { func, string } = React.PropTypes
const { connect } = require('react-redux')

const Footer = require('./Footer')

const {
  getLastUpdatedDate,
  setLastUpdatedDate
} = require('src/data/ducks/explore')

const FooterContainer = React.createClass({
  propTypes: {
    setLastUpdatedDate: func.isRequired,
    lastUpdatedDate: string
  },

  componentDidMount () {
    if (this.props.lastUpdatedDate) return
    setTimeout(() => { this.props.setLastUpdatedDate('2005-05-04') }, 5000)
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

module.exports = connect(mapStateToProps, mapDispatchToProps)(FooterContainer)
