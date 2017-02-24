module.exports = num => {
  const match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/)
  if (!match) return 0

  const numberDigitsRightOfDecimal = (match[1] ? match[1].length : 0)
  const scientificNotationAdjustment = (match[2] ? +match[2] : 0)

  return Math.max(0, numberDigitsRightOfDecimal - scientificNotationAdjustment)
}
