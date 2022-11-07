import express from "express";
import {
    getAllPokemons,
    getOnePokemon,
    postOnePokemon,
    putOnePokemon,
    deleteOnePokemon
} from "../controllers/pokemon.controller.js"

var pokemonRoutes = express.Router();

// define the home page route
pokemonRoutes.get('/', getAllPokemons);
pokemonRoutes.get('/:id', getOnePokemon);
pokemonRoutes.post('/', postOnePokemon);
pokemonRoutes.put('/:id', putOnePokemon);
pokemonRoutes.delete('/:id', deleteOnePokemon);


export default pokemonRoutes;
