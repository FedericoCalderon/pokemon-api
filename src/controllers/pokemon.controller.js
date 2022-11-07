import { query } from '../db/connection.js';
import { Pokemon } from '../models/Pokemon.js'
import { databaseMessages } from '../utils/aux.methods.db.js'


export async function getAllPokemons(req, res) {
    
    const queryParams  = req.query;

    let response = {
        data: [],
        info: "",
    };

    if (queryParams.start == undefined || queryParams.end == undefined ) {
        res.statusCode = 400;
        response.info = "No query params specified";
        return res.send(response)
    }

    let result = null;
    result = await query(`SELECT id,name,image,attack,defense,description FROM pokemons WHERE id BETWEEN ${queryParams.start} AND ${queryParams.end}`);
    
    try {
        res.statusCode = 200;
        response.data = result;
        response.info = databaseMessages.okDatabase;
        return res.json(response);
    }
    catch (err) {
        console.error(err);
        response.info = databaseMessages.errorDatabase;
        res.statusCode = 500;
        return res.json(response);
    }

}

export async function getOnePokemon(req, res) {
    
    let response = {
        data: [],
        info: "",
    };

    let result = null;
    let { id } = req.params;
    let sql = `SELECT * FROM pokemons WHERE id=${id} LIMIT 1;`;

    result = await query(sql);
    
    try {
        res.statusCode = 200;
        response.data = result;
        response.info = databaseMessages.okDatabase;

        return res.json(response);

    } catch (err) {
        console.error(err);
        response.info = databaseMessages.errorDatabase;
        res.statusCode = 500;
        return res.json(response);
    }
    
}

export async function postOnePokemon(req, res) {
    const { body } = req;
    
    const noData = body.name == "" || body.image == "";
    
    const response = {
        data: [],
        info: "",
    };
    
    if (noData) {
        res.statusCode = 200;
        response.info = "No name or image provided";
        return res.send(response);
    };

    const newPokemon = new Pokemon(
        body?.name,
        body?.image,
        body?.attack,
        body?.defense,
        body?.description);
        

    try {
        const queryInsert = await query(`INSERT INTO pokemons (name, image, attack, defense, description)
        VALUES ('${newPokemon?.name}', '${newPokemon?.image}', ${newPokemon?.attack}, ${newPokemon?.defense}, '${newPokemon?.description}');`);
        
        res.statusCode = 200;

        response.info = databaseMessages.okDatabase;
        response.data = [newPokemon];

        console.log("INSERT: affectedRows",queryInsert.affectedRows)
    
        return res.json(response);
    }
    catch (err) {
        console.error(err);
        res.statusCode = 500;
        response.info = databaseMessages.errorDatabase;

        return res.json(response);
    }


}

export async function putOnePokemon(req, res) {
    
    const { id } = req.params;
    const { body } = req;

    const editPokemon = new Pokemon(
        body?.name,
        body?.image,
        body?.attack,
        body?.defense,
        body?.description);
        
        const response = {
            data: [],
            info: "",
        };

    try {
        const queryPut = await query(`UPDATE pokemons SET name='${editPokemon?.name}',image='${editPokemon?.image}',attack=${editPokemon?.attack},defense=${editPokemon?.defense},description='${editPokemon?.defense}' WHERE id=${id};`);
        
        res.statusCode = 200;
        response.data = [editPokemon];
        response.info = databaseMessages.okDatabase;

        console.log("UPDATE: affectedRows",queryPut.affectedRows)
    
        return res.json(response);
    }
    catch (err) {
        console.error(err);
        
        res.statusCode = 500;
        response.data = [];
        response.info = databaseMessages.errorDatabase;

        res.json(response);
    }
}

export async function deleteOnePokemon(req, res) {
    const { id } = req.params;
    

    const response = {
        data: [],
        info: "",
    };

    try {
        const queryDelete = await query(`DELETE FROM pokemons WHERE id=${id};`);
        
        res.statusCode = 200;

        response.data = [];
        response.info = databaseMessages.okDatabase;
        
        res.json(response);
    }
    catch (err) {
        console.error(err);
        
        res.statusCode = 500;
        response.data = [];
        response.info = databaseMessages.errorDatabase;
        
        res.json(response);
    }
}
