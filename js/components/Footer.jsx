const React = require('react')

const Footer = () => (
  <div className='gb-Footer'>
    <footer className='gb-Footer-content'>
      <div>
        <span className='gb-Footer-content-copyright'>© </span><span>{(new Date()).getFullYear()}</span>
      </div>

      <a href='https://jumpstart.ge/' target='blank'>
        <img src='/public/images/jumpstart_logo.png' alt="JumpStart's Logo" />
      </a>
    </footer>
  </div>
)

module.exports = Footer
