const React = require('react')
const Svg = require('src/components/shared/Svg')
const nedLogo = require('public/images/ned_logo')

const Footer = () => (
  <div className='gb-Footer'>
    <footer className='gb-Footer-content'>
      <div>
        <span className='gb-Footer-content-copyright'>© </span><span>{(new Date()).getFullYear()}</span>
      </div>

      <div className='gb-Footer-content-right'>
        <a className='gb-Footer-content-right-ned' href='http://www.ned.org/' target='blank' title="National Endowment for Democracy">
          <Svg markup={nedLogo} />
        </a>

        <a href='https://jumpstart.ge/' target='blank'>
          <img src='/public/images/jumpstart_logo.png' alt="JumpStart's Logo" />
        </a>
      </div>
    </footer>
  </div>
)

module.exports = Footer
