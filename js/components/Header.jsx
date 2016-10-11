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
    let menuClassName = 'app-navigation-menu'
    if (this.state.menuIsShownOnSmallScreens) {
      menuClassName += ' is-shown-on-small-screens'
    }

    return (
      <div className='app-header'>
        <header className='app-header-content'>
          <Brand />

          <button type='button' className='app-navigation-button' onClick={this.toggleShowMenu}>
            Menu
          </button>

          <NavigationMenu className={menuClassName} />
        </header>
      </div>
    )
  }
})

module.exports = Header
