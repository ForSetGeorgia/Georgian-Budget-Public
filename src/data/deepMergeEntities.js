const mergeAttributes = (newAttribute, oldAttribute) => {
  if (!oldAttribute) {
    return newAttribute
  } else if (Array.isArray(newAttribute)) {
    return [...new Set([].concat(oldAttribute).concat(newAttribute))]
  } else if (newAttribute !== null && typeof newAttribute === 'object') {
    return Object.assign(
      {},
      oldAttribute,
      newAttribute
    )
  } else {
    return newAttribute
  }
}

const mergeEntityData = (oldEntity, newEntity) => {
  if (!oldEntity) return newEntity
  const combinedEntity = Object.assign({}, oldEntity)

  for (let key in newEntity) {
    combinedEntity[key] = mergeAttributes(newEntity[key], oldEntity[key])
  }

  return combinedEntity
}

const deepMergeEntities = (oldEntities, newEntities) => {
  if (Object.keys(oldEntities).length === 0) {
    return Object.assign({}, oldEntities, newEntities)
  }

  const combined = Object.assign({}, oldEntities)

  for (let key in newEntities) {
    combined[key] = mergeEntityData(oldEntities[key], newEntities[key])
  }

  return combined
}

module.exports = deepMergeEntities
