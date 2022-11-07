// imports
import express, { json } from "express";
import morgan from "morgan";
import { config } from "dotenv";
import pokemonRoutes from "./routes/pokemon.route.js";
import { configHeadersToRoutes } from './utils/aux.methods.db.js';

//settings
config();
const app = express();
const port = Number(process.env.PORT) || 3001;

// middlewares
app.set('port', port);
app.use(morgan('dev'));
app.use(express.json());
app.use(configHeadersToRoutes)
app.use('/pokemons', pokemonRoutes);

// listening
app.listen(app.get('port'), function listenningOn() {
    console.log(`
Server is running... 
API: ${process.env.IP}:${app.get('port')}`);
});


