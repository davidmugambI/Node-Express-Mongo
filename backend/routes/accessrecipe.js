const express = require('express');

const router = express.Router();

const Recipe = require('../models/recipe');

module.exports = router;

router.post('/',(req,res,next)=>{
    const recipe = new Recipe({
        title : req.body.title,
        ingredients : req.body.ingredients,
        instructions: req.body.instructions,
        time : req.body.time,
       difficulty : req.body.difficulty

    });
    recipe.save().then(
        ()=>{
            res.status(201).json({
                message: 'Recipe saved successfully'
            })
        }
    ).catch(
        (error)=>{
            res.status(400).json({
                error: error
            });
        }
    );
});

// Get all recipes
router.get('/', (req,res,next)=>{
    Recipe.find().then(
        (recipe) =>{
            res.status(200).json(recipe);
        }
    ).catch(
        (error) =>{
            res.status(400).json({
                error: error
            });
        }
    );
});

// Get one recipe
router.get('/:id', (req,res,next)=>{
    Recipe.findOne({
        _id:req.params.id
    }).then(
        (recipe) =>{
            res.status(200).json(recipe);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error:error
            });
        }
    );
});

// edit recipe
router.put('/:id',(req,res,next)=>{
    const recipe = new Recipe({
        _id: req.params.id,
        title : req.body.title,
        ingredients : req.body.ingredients,
        instructions: req.body.instructions,
        time : req.body.time,
       difficulty : req.body.difficulty
    });
    Recipe.updateOne({_id:req.params.id}, recipe).then(
        ()=>{
            res.status(201).json({
                message: 'Recipe updated successfully'
            });
        }
    ).catch(
        (error)=>{
            res.status(400).json({
                error:error
            });
           
        }
    );
});


// delete recipe

router.delete('/:id', (req,res,next)=>{
    Recipe.deleteOne({_id:req.params.id}).then(
        ()=>{
            res.status(200).json({
                message: "Recipe deleted!"
            });
        }
    ).catch(
        (error)=>{
            res.status(400).json({
                error: error
            });
        }
    );
});


