import { config } from "dotenv";
config();
import { query } from "./connection.js";
import { 
    errorMessajeSQL,
 } from '../utils/aux.methods.db.js';
import axios from 'axios';
import { Pokemon } from '../models/Pokemon.js'


const pokemons = [];

async function requestData() {
    console.log('\nRequesting Data...');
    
    const len = parseInt(process.env.DB_LENGTH) + 2;
    for (let i = 2; i < len; i++) {
        
        const pokemonAPI = await axios.get(process.env.POKEMONS_API + i);
        const pokeprops = await pokemonAPI?.data;
        const pokeDesc = `${pokeprops?.name} is an animal that is from order ${pokeprops?.order}, heights ${pokeprops?.height} meters, weighs ${pokeprops?.weight} kilograms and has ${pokeprops?.moves.length} movements and ${pokeprops?.stats.length} abilities.`;
        
        pokemons.push(new Pokemon(pokeprops?.name,
            pokeprops?.sprites?.front_default,
            pokeprops?.stats[1]?.base_stat,
            pokeprops?.stats[2]?.base_stat,
            pokeDesc
        ));
        
        console.log('Rows requested: ', pokemons.length);
    }
};
        
async function populateDb(){
    
    await requestData();
    
    let sqlInsert = 'INSERT INTO pokemons(name,image,attack,defense,description) VALUES ';
    for (let i = 0; i < pokemons.length; i++) {
        sqlInsert += `('${pokemons[i]?.name}','${pokemons[i]?.image}',${pokemons[i]?.attack},${pokemons[i]?.defense},'${pokemons[i]?.description}')`;
        if (i != (pokemons.length - 1)) {
            sqlInsert += ','
        }
    }
    
    sqlInsert+= ';';
    await query(sqlInsert);
    
};

(async function () {
    const result = await query('SELECT COUNT(id) FROM pokemons;');
    const lenData = result[0]['COUNT(id)'];
    if (!lenData) {
        await populateDb();
        console.log('DB populated successfully!');
    }
    else {
        console.log('DB is already full with ', lenData, 'rows');
    }
    process.exit();
}());


    


