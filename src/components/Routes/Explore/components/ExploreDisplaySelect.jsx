const React = require('react')
const { func, string } = React.PropTypes
const { connect } = require('react-redux')

const ButtonSelector = require('src/components/shared/ButtonSelector')
const {
  switchDisplayToDetails,
  getSelectedExploreDisplay
 } = require('src/data/ducks/explore')

const ExploreDisplaySelect = React.createClass({
  propTypes: {
    selectedExploreDisplay: string.isRequired,
    switchDisplayToDetails: func.isRequired
  },

  options () {
    return [
      {
        value: 'list',
        label: 'Show List'
      },
      {
        value: 'details',
        label: 'Show Details'
      }
    ]
  },

  handleChangeEvent (value) {
    this.props.switchDisplayToDetails(value)
  },

  render () {
    const { selectedExploreDisplay } = this.props

    return (
      <ButtonSelector
        handleChangeEvent={this.handleChangeEvent}
        options={this.options()}
        selectedValue={selectedExploreDisplay}
      />
    )
  }
})

const mapStateToProps = state => ({
  selectedExploreDisplay: getSelectedExploreDisplay(state)
})

const mapDispatchToProps = dispatch => ({
  switchDisplayToDetails: value => { dispatch(switchDisplayToDetails()) }
})

module.exports = connect(mapStateToProps, mapDispatchToProps)(ExploreDisplaySelect)
