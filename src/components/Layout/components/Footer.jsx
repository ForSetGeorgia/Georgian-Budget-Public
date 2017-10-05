const React = require('react')
const { string } = React.PropTypes
const { FormattedMessage, FormattedDate } = require('react-intl')
const Svg = require('src/components/shared/Svg')
const nedLogo = require('public/images/ned_logo')

const lastUpdatedMessage = lastUpdatedDate => (
  <span>
    <FormattedMessage
      id='app.footer.lastUpdated'
      defaultMessage='Last Updated'
    />: <FormattedDate
      value={lastUpdatedDate}
    />
  </span>
)

const Footer = ({ lastUpdatedDate }) => (
  <div className='gb-Footer'>
    <footer className='gb-Footer-content'>
      <div>
        <span className='gb-Footer-content-copyright'>© </span><span>{(new Date()).getFullYear()}</span>
      </div>

      <div>
        {lastUpdatedDate && lastUpdatedMessage(lastUpdatedDate)}
      </div>

      <div className='gb-Footer-content-right'>
        <a className='gb-Footer-content-right-ned' href='http://www.ned.org/' target='blank' title="National Endowment for Democracy">
          <Svg markup={nedLogo} />
        </a>

        <a href='https://forset.ge/' target='blank'>
          <img src='/public/images/forset.svg' alt="ForSet's Logo" />
        </a>
      </div>
    </footer>
  </div>
)

Footer.propTypes = {
  lastUpdatedDate: string
}

module.exports = Footer
