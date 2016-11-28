const snakeToCamel = s => s.replace(/(_\w)/g, m => m[1].toUpperCase())

module.exports = { snakeToCamel }
