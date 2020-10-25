/*eslint-disable*/
const Recipe = require('../models/Recipe')
const Chef = require('../models/Chef')

module.exports =  {
  async index(req, res) {
    try {
    const results = await Recipe.all()
    const recipes = results.rows
    recipes.splice(6, recipes.length)
    
    async function getImage(recipeId) {
      let results = await Recipe.files(recipeId)
      const file = results.rows[0]

      return `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`;
    }

      const recipesPromise = recipes.map(async recipe => {
        recipe.image = await getImage(recipe.id)
        return recipe
      })

      const allRecipes = await Promise.all(recipesPromise);

      return res.render('home/index', {recipes: allRecipes})
      }catch(err) {
      console.error(err)
  }
  },
  async recipes(req,res){
    try {
    const results = await Recipe.all()
    const recipes = results.rows

    async function getImage(recipeId) {
      let results = await Recipe.files(recipeId)
      const file = results.rows[0]

      return `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`;
    }
      const recipesPromise = recipes.map(async recipe => {
        recipe.image = await getImage(recipe.id)
        return recipe
      })

      const allRecipes = await Promise.all(recipesPromise);

      return res.render('home/recipes', { recipes: allRecipes });
    }catch(err) {
      console.error(err)
    }
  },
  async chefs(req,res){
    try{
      const result = Chef.all()
      const chefs = result.rows 

      async function getImage(file_id) {
        let results = await Chef.file(file_id)
        const file = results.rows[0]

        return `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`;
        
      }

      const chefsPromise = chefs.map(async chef => {
        chef.image = await getImage(chef.file_id)
        return chef
      })

      const allchefs = await Promise.all(chefsPromise)
      return res.render('home/chefs', {chefs: allChefs})

    }catch(err) {
      console.error(err)
    }

  },
  show(req,res) {
    Home.findChefs(req.params.id, function(chef) {
      if(!chef) return res.send('Chef not found!')

            Home.findChefTotalRecipes(chef.id, function(recipe){

                Home.findChefRecipes(chef.id, function(recipes){

                    chef.created_at = date(chef.created_at).format
        
                    return res.render('site/chefs/details', {chef, recipe, recipes})
                })
            })
        })
  },
  async search(req, res) {
    try {
      let { search, page, limit } = req.query;
      page = page || 1;
      limit = limit || 6;
      let offset = limit * (page - 1);

      const params = {
          search,
          limit,
          offset,
      };

      const results = await Recipe.findByRecipes(params);
      const recipes = results.rows;

      async function getImage(recipeId) {
          let results = await Recipe.files(recipeId);
          const file = results.rows[0];

          return `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`;
      }

      const recipesPromise = recipes.map(async recipe => {
          recipe.image = await getImage(recipe.id);
          return recipe;
      });

      const allRecipes = await Promise.all(recipesPromise);

      const pagination = {};

      if (recipes.length == 0) {
          pagination.total = 1;
          pagination.page = page;
      } else {
          pagination.total = Math.ceil(recipes[0].total / limit);
          pagination.page = page;
      }

      if (search) return res.render('home/search', { recipes: allRecipes, search, pagination });

      return res.render('home/recipes', { recipes: allRecipes, pagination });
  } catch (err) {
      console.error(err);
  }
  },
  about(req, res){
      return res.render('home/about')
  },
  async infoRecipes(req, res) {
    try {
    let results = await Recipe.find(req.params.id)
    const recipe = results.rows[0]

    if(!recipe) return res.send('Receita não encontrada')

    results = await Recipe.files(recipe.id)
    let files = results.rows
    files = files.map( file => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
    }))

    return res.render('home/infoRecipes', {recipe, files })
    }catch(err) {
      console.error(err)
    }
  }
}