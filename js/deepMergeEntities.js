const deepMergeEntities = (oldEntities, newEntities) => {
  if (Object.keys(oldEntities).length === 0) {
    return Object.assign({}, oldEntities, newEntities)
  }

  const combined = Object.assign({}, oldEntities)

  for (let key in newEntities) {
    combined[key] = Object.assign(
      {},
      oldEntities[key],
      newEntities[key]
    )
  }

  return combined
}

module.exports = deepMergeEntities
