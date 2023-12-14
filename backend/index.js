// ***importo express
const express= require('express');

// ***importo dotenv
const dotenv = require('dotenv').config();

// ***express
const app = express();

// ***porta
const port = 3000;

const postsRouter = require("./routers/posts");
const categoriesRouter = require("./routers/categories");


//***application/json
app.use(express.json());

// registro le rotte
app.use("/posts", postsRouter);
app.use("/categories", categoriesRouter);

// Middleware di gestione degli errori
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Errore interno del server');
  });
  
// ***ascolto del server
app.listen(port,()=>{
	console.log(`app attiva su http://localhost:${port}`);
});
