const React = require('react')
const { string } = React.PropTypes
const Brand = require('./components/Brand')
const Navigation = require('./components/Navigation')

const Header = React.createClass({
  propTypes: {
    shareUrl: string
  },
  getInitialState () {
    return {
      menuIsShownOnSmallScreens: false
    }
  },

  toggleShowMenu () {
    this.setState({
      menuIsShownOnSmallScreens: !this.state.menuIsShownOnSmallScreens
    })
  },

  render () {
    return (
      <div className='gb-Header'>
        <header className='gb-Header-content'>
          <div className='gb-Header-content-brandAndButton'>
            <Brand />

            <button type='button' className='gb-Header-content-brandAndButton-button' onClick={this.toggleShowMenu}>
              <span className='gb-Header-content-brandAndButton-button-bar'></span>
              <span className='gb-Header-content-brandAndButton-button-bar'></span>
              <span className='gb-Header-content-brandAndButton-button-bar'></span>
            </button>
          </div>
          <Navigation showOnSmallScreens={this.state.menuIsShownOnSmallScreens} shareUrl={this.props.shareUrl} />
        </header>
      </div>
    )
  }
})

module.exports = Header
