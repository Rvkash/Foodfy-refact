const db = require('../../config/db')
<<<<<<< HEAD
const { date } = require('../../lib/utils')


module.exports = {
    all(callback) {
        db.query(`SELECT * FROM recipes`, function(err, results){
			if(err) throw `Database Error ${err}`


            callback(results.rows)
        })
        
    },
    create(data, callback ) {
        const query =`
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
			data.author,
			data.title,
			data.ingredients,
			data.preparation,
			data.information,
			date(Date.now()).iso
		]

		db.query(query, values, function(err, results) {
			if(err) throw `Database Error ${err}`

            
            callback(results.rows[0])
			
		})
    },
    find(id, callback) {
        db.query(`SELECT * FROM recipes WHERE id = $1`, [id], function(err, results){
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
				ingredients=($4),
				information=($5),
				preparation=($6),
				author=($7)
			WHERE id = $8
		`

		const values = [
			data.chef_id,
			data.image,
			data.title,
			data.author,
			data.ingredients,
			data.preparation,
			data.information,
			data.id
		]

		db.query(query, values, function(err, results){
			if(err) throw `Database Error ${err}`


			callback()
		})
	},
	delete(id, callback) {
		db.query(`DELETE FROM recipes WHERE id = $1`, [id], function(err, results){
			if(err) throw `Database Error ${err}`

			return callback()
		})

	}
=======
const {date} = require('../lib/format')

module.exports = {
    all(callback) {
        db.query(`SELECT * FROM recipes`, function(err, results) {
            if(err) throw `Database error! ${err}`

            callback(results.rows)
        })
    },
    create(data, callback) {
        const query = `
            INSERT INTO recipes (
                image,
                title,
                ingredients,
                preparation,
                information,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `

        const values = [
            data.image,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            date(Date.now()).iso
        ]

        db.query(query, values, function(err, results) {
            if(err) throw `Database error! ${err}`

            callback(results.rows[0])
        })
    },
    find(id, callback) {
        db.query(`
        SELECT * 
        FROM recipes 
        WHERE id = $1`, [id], function(err, results){
            if(err) throw `Database error! ${err}`
            callback(results.rows[0])
        })
    },
    update(data, callback) {
        const query = `
        UPDATE recipes SET
            image=($1),
            title=($2),
            ingredients=($3),
            preparation=($4),
            information=($5)
        WHERE id = $6
        `

        const values = [
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
    delete(id, callback) {
        db.query(`DELETE FROM recipes WHERE id = $1`, [id], function(err, results){
            if(err) throw `Database error! ${err}`

            callback()

        })
    }
>>>>>>> 2b1cf99f0bc91a6c1253a7d4da18ccd4f5220512
}