const React = require('react')
const Brand = require('js/components/header/Brand')
const NavigationMenu = require('js/components/header/NavigationMenu')

const Header = React.createClass({
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
    let menuClassName = 'app-navigation'
    if (this.state.menuIsShownOnSmallScreens) {
      menuClassName += ' is-shown-on-small-screens'
    }

    return (
      <div className='app-header'>
        <header className='app-header-content'>
          <div className='app-header-content-brandAndButton'>
            <Brand />

            <button type='button' className='app-header-content-brandAndButton-button' onClick={this.toggleShowMenu}>
              Menu
            </button>
          </div>

          <NavigationMenu className={menuClassName} />
        </header>
      </div>
    )
  }
})

module.exports = Header
