const React = require('react')

const Footer = () => (
  <div className='gb-Footer'>
    <footer className='gb-Footer-content'>
      <div>
        <span className='gb-Footer-content-copyright'>© </span><span>{(new Date()).getFullYear()}</span>
      </div>

      <img src='/public/images/jumpstart_logo.png' alt="JumpStart's Logo" />
    </footer>
  </div>
)

module.exports = Footer
