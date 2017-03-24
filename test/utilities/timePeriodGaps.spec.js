// Makes ESLint ignore mocha-related global variables
/* eslint-env mocha */

const { expect } = require('chai')

const getMissingTimePeriod = require('src/utilities/timePeriodGaps')
const { getMissingTimePeriodMontly, getMissingTimePeriodQuarterly, getMissingTimePeriodYearly } = getMissingTimePeriod

describe('getMissingTimePeriodMontly', () => {
  it('gets empty array if passed array is empty', () => {
    expect(getMissingTimePeriodMontly([])).to.deep.eq([])
  })
  it('gets empty array if passed array has one time period', () => {
    expect(getMissingTimePeriodMontly(['y2015_m01'])).to.deep.eq([])
  })
  it('gets empty array if passed array has more than one time period, but no gaps found', () => {
    expect(getMissingTimePeriodMontly(['y2014_m12', 'y2015_m01', 'y2015_m02', 'y2015_m03'])).to.deep.eq([])
  })

  it('gets array of missed time period, when gaps found', () => {
    expect(getMissingTimePeriodMontly(['y2014_m10', 'y2015_m02', 'y2015_m03', 'y2015_m06'])).to.deep.eq(['y2014_m11', 'y2014_m12', 'y2015_m01', 'y2015_m04', 'y2015_m05'])
  })
})

describe('getMissingTimePeriodQuarterly', () => {
  it('gets empty array if passed array is empty', () => {
    expect(getMissingTimePeriodQuarterly([])).to.deep.eq([])
  })
  it('gets empty array if passed array has one time period', () => {
    expect(getMissingTimePeriodQuarterly(['y2015_q1'])).to.deep.eq([])
  })
  it('gets empty array if passed array has more than one time period, but no gaps found', () => {
    expect(getMissingTimePeriodQuarterly(['y2014_q4', 'y2015_q1', 'y2015_q2', 'y2015_q3'])).to.deep.eq([])
  })

  it('gets array of missed time period, when gaps found', () => {
    expect(getMissingTimePeriodQuarterly(['y2014_q1', 'y2015_q1', 'y2015_q2', 'y2015_q4'])).to.deep.eq(['y2014_q2', 'y2014_q3', 'y2014_q4', 'y2015_q3'])
  })
})

describe('getMissingTimePeriodYearly', () => {
  it('gets empty array if passed array is empty', () => {
    expect(getMissingTimePeriodYearly([])).to.deep.eq([])
  })
  it('gets empty array if passed array has one time period', () => {
    expect(getMissingTimePeriodYearly(['y2015'])).to.deep.eq([])
  })
  it('gets empty array if passed array has more than one time period, but no gaps found', () => {
    expect(getMissingTimePeriodYearly(['y2014', 'y2015', 'y2016', 'y2017'])).to.deep.eq([])
  })

  it('gets array of missed time period, when gaps found', () => {
    expect(getMissingTimePeriodYearly(['y2012', 'y2015', 'y2016', 'y2017'])).to.deep.eq(['y2013', 'y2014'])
  })
})
