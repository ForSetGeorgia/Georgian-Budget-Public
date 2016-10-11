const React = require('react')
const { Link } = require('react-router')
const LocaleLink = require('./LocaleLink')
const Svg = require('js/components/Svg')

const Navigation = React.createClass({
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
      <div className='app-navigation'>

        <button type='button' className='app-navigation-button' onClick={this.toggleShowMenu}>
          Menu
        </button>

        <div className={menuClassName}>
          <Link
            to='/ka/explore'
            className='app-navigation-menu-link'
          >
            Explore
          </Link>
          <Link
            to='/ka/about'
            className='app-navigation-menu-link'
          >
            შესახებ
          </Link>
          <LocaleLink
            text='ქა'
            locale='ka'
            className='app-navigation-menu-link'
          />
          <LocaleLink
            text='En'
            locale='en'
            className='app-navigation-menu-link'
          />
          <a
            href='https://www.facebook.com/sharer/sharer.php'
            className='app-navigation-menu-link'
          >
            <Svg
              className='app-navigation-menu-link-img'
              markup={require('public/images/facebook_icon')}
            />
          </a>
          <a
            href='https://twitter.com/share'
            className='app-navigation-menu-link'
          >
            <Svg
              className='app-navigation-menu-link-img'
              markup={require('public/images/twitter_icon')}
            />
          </a>
        </div>
      </div>
    )
  }
})
module.exports = Navigation
