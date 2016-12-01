const React = require('react')
const { func, string } = React.PropTypes
const { connect } = require('react-redux')

const ButtonSelector = require('js/components/shared/ButtonSelector')
const {
  setExploreDisplay,
  getSelectedExploreDisplay
 } = require('js/data/ducks/explore')

const ExploreDisplaySelect = React.createClass({
  propTypes: {
    selectedExploreDisplay: string.isRequired,
    setExploreDisplay: func.isRequired
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
    this.props.setExploreDisplay(value)
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
  setExploreDisplay: value => { dispatch(setExploreDisplay(value)) }
})

module.exports = connect(mapStateToProps, mapDispatchToProps)(ExploreDisplaySelect)
