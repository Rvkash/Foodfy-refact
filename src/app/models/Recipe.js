const db = require('../../config/db')
const { date } = require('../../lib/utils')


module.exports = {
    all(callback) {
		db.query(`
		SELECT * 
		FROM recipes`, function(err, results){
			if(err) throw `Database Error ${err}`


            callback(results.rows)
        })
        
    },
    create(data, callback ) {
        const query = `
			INSERT INTO recipes (
				chef_id,
				image,
				title,
				author,
				preparation,
				ingredients,
				information,
				created_at
			) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
			  RETURNING id
		`

		const values = [
			data.chef_id,
			data.image,
			data.title,
			data.author,
			data.preparation,
			data.ingredients,
			data.information,
			date(Date.now()).iso
		]

		db.query(query, values, function(err, results) {
			if(err) throw `Database Error ${err}`

            
            callback(results.rows[0])

		})
    },
    find(id, callback) {
		db.query(`
		SELECT * 
		FROM recipes
		 WHERE id = $1`, [id], function(err, results){
			if(err) throw `Database Error ${err}`


            callback(results.rows[0])
        })
	},
	update(data, callback) {
		const query = `
			UPDATE recipes SET 	
				chef_id=($1),
				image=($2),
				title=($3),
				author=($4),
				ingredients=($5),
				information=($6),
				preparation=($7)
			WHERE id = $8
		`

		const values = [
			data.chef_id,
			data.image,
			data.title,
			data.author,
			data.ingredients,
			data.information,
			data.preparation,
			data.id
		]

		db.query(query, values, function(err, results){
			if(err) throw `Database Error ${err}`


			callback()
		})
	},
	delete(id, callback) {
		db.query(`
		DELETE 
		FROM recipes 
		WHERE id = $1`, [id], function(err, results){
			if(err) throw `Database Error ${err}`

			callback()
		})

	}
}