const db = require('../../config/db')
const { date } = require('../../lib/utils')


module.exports = {
    all(callback) {
        db.query(`SELECT recipes.*, chefs.name AS chefs_name
        FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)`, function(err, results) {
            if(err) throw `Database error! ${err}`

            callback(results.rows)
        })
    },
    create(data) {
        const query = `
            INSERT INTO recipes (
                chef_id,
                title,
                image,
                ingredients,
                preparation,
                information,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `

        const values = [
            data.chef,
            data.title,
            data.image,
            data.ingredients,
            data.preparation,
            data.information,
            date(Date.now()).iso
        ]

        return db.query(query, values)
    },
    find(id, callback) {
        db.query (`
            SELECT recipes.*, chefs.name AS chefs_name
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            WHERE recipes.id = $1`, [id], function(err, results){
                if(err) throw `Database error! ${err}`

                callback(results.rows[0])
            })
    },
    findTotalRecipes(id, callback) {
        db.query(`SELECT recipes.*, count(recipes) AS total_recipes
        FROM recipes
        LEFT JOIN recipes ON (recipes.recipe_id = recipes.id)
        WHERE recipes.id = $1
        GROUP BY recipes.id`, [id], function(err, results) {
            if(err) throw `Database error! ${err}`

            callback(results.rows[0])
        })
    },
    update(data, callback) {
        const query = `
        UPDATE recipes SET
            chef_id=($1),
            image=($2),
            title=($3),
            ingredients=($4),
            preparation=($5),
            information=($6)
        WHERE id = $7
        `

        const values = [
            data.chef,
            data.image,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            data.id
        ]

        db.query(query, values, function(err, results){
            if(err) throw `Database error! ${err}`

            callback()
        })
    },
    chefsSelectOptions(callback) {
        db.query(`SELECT name, id FROM chefs`, function(err, results){
            if(err) throw `Database error! ${err}`

            callback(results.rows)
        })
    },
    delete(id, callback) {
        db.query(`DELETE FROM recipes WHERE id = $1`, [id], function(err, results) {
            if(err) throw `Database error! ${err}`

            return callback()
        })
    }
}