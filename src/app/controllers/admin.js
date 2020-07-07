const fs = require('fs')
const data = require('../../../data.json')

exports.index = function (req, res) {
	return res.render('admin/recipes/recipes', {recipes: data.recipes })
}

exports.create = function (req, res) {
	return res.render('admin/recipes/create')
}

exports.post = function (req, res) {
  const keys = Object.keys(req.body)

  for (key in keys) {
    if (req.body[keys] == '') {
      return res.send('please fill all fields')
    }
	}
	
	let = { name,image, title , information, ingredients, author, preparation } = req.body

	data.recipes.push({
		name,
		image,
		title,
		information,
		ingredients,
		author,
		preparation,
	})

	fs.writeFile("data.json", JSON.stringify( data, null, 2 ), function(err){
		if(err){
			return res.send("Write error")
		}
		return res.redirect("/admin/recipes")
	})
}

exports.show = function (req, res) {
	const { id } = req.params

	const foundRecipe = data.recipes.find(function (recipe) { 
		return recipe.id == id 
	})

	if(!foundRecipe) return res.send("Receita não encontrada")

	const recipe = {
		...foundRecipe
	}

	return res.render("admin/recipes/show", {recipe: recipe})

}

exports.edit = function (req, res){
	const { id } = req.params
	const foundRecipe = data.recipes.find(function(recipe) {
			return recipe.id == id
	})
	if (!foundRecipe) return res.send("NOT FOUND")

	const recipe = {
			...foundRecipe,
	}

	return res.render('admin/recipes/edit', { recipe })

}

exports.put = function (req, res) {
	const { id } = req.body
	let index = 0

	const foundRecipe = data.recipes.find(function(recipe, foundIndex) {
		if(id == recipe.id) {
			index = foundIndex
			return true
		}
	})

	if(!foundRecipe) return res.send("Receita não existe")

	const recipe = {
		...foundRecipe,
		...req.body,
	
	}

	data.recipes[index] = recipe

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send('Write error')

    return res.redirect(`/admin/recipes/${id}`)
  })
}

exports.delete = function (req, res) {
	const { id } = req.body
	const filteredRecipes = data.recipes.filter(function(recipe) {
		return recipe.id != id
		
	})
	data.recipes = filteredRecipes

	fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
		if (err) return res.send("Erro ao deletar receita")

		return res.redirect("/admin/recipes")
	})
}


