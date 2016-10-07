const React = require('react')
const Brand = require('js/components/header/Brand')
const Navigation = require('js/components/header/Navigation')

const Header = () => (
  <div className='app-header'>
    <header className='app-header-content'>
      <Brand />
      <Navigation />
    </header>
  </div>
)

module.exports = Header
