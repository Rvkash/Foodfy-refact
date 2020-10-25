const db = require('../../config/db')

module.exports = {
  all (callback) {
    db.query(`SELECT recipes.*, chefs.name AS chefs_name
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)`, function (err, results) {
      if (err) throw `Database error! ${err}`

      callback(results.rows)
    })
  },
  allChefs (callback) {
    db.query(`SELECT chefs.*, count(recipes) AS total_recipes
        FROM chefs
        LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
        GROUP BY chefs.id
        ORDER BY name ASC`, function (err, results) {
      if (err) throw `Database error! ${err}`

      callback(results.rows)
    })
  },

  findByRecipes (params) {
    const { search, limit, offset } = params
    let query = ''
    let filterQuery = ''
    let totalQuery = `(
            SELECT count(*) FROM recipes
        ) AS total`
    let orderBy = 'ORDER BY recipes.created_at DESC'

    if (search) {
      filterQuery = `
        WHERE recipes.title ILIKE '%${search}%'
        `

      totalQuery = `(
            SELECT count(*) FROM recipes
            ${filterQuery}
        ) AS total`

      orderBy = 'ORDER BY recipes.updated_at DESC'
    }

    query = `
    SELECT recipes.*, ${totalQuery}, chefs.name AS chef_name
    FROM recipes
    LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
    ${filterQuery}
    ${orderBy}
    LIMIT $1 OFFSET $2
    `

    return db.query(query, [limit, offset])
  },
  findChefs (id, callback) {
    db.query(`
            SELECT *
            FROM chefs
            WHERE id = $1`, [id], function (err, results) {
      if (err) throw `Database error! ${err}`

      callback(results.rows[0])
    })
  },
  findChefRecipes (id, callback) {
    db.query(`
            SELECT recipes.*, chefs.name AS chefs_name
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            WHERE chef_id = $1`, [id], function (err, results) {
      if (err) throw `Database error! ${err}`

      callback(results.rows)
    })
  },
  findChefTotalRecipes (id, callback) {
    db.query(`SELECT chefs.*, count(recipes) AS total_recipes
        FROM chefs
        LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
        WHERE chefs.id = $1
        GROUP BY chefs.id`, [id], function (err, results) {
      if (err) throw `Database error! ${err}`

      callback(results.rows[0])
    })
  },
  infoRecipes (id, callback) {
    db.query(`
            SELECT recipes.*, chefs.name AS chefs_name
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            WHERE recipes.id = $1`, [id], function (err, results) {
      if (err) throw `Database error! ${err}`

      callback(results.rows[0])
    })
  }
}
