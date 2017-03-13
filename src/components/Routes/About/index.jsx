const React = require('react')
const PageSection = require('./PageSection')

const About = () => (
  <div className='gb-About'>
    <PageSection name='about' />
    <PageSection name='understanding_the_georgian_budget' />
    <PageSection name='methodology' />
  </div>
)

module.exports = About
