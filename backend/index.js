// ***importo express
const express= require('express');
// ***importo dotenv
const dotenv = require('dotenv').config();
// ***express
const app = express();
// ***porta
const port = 3000;
// ***importo cors
const cors = require("cors");
const path = require('path');


// abilitiamo cors
app.use(cors());

// *** rotte
const postsRouter = require("./routers/posts");
const categoriesRouter = require("./routers/categories");
const authsRouter = require("./routers/auth");


//***application/json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// registro le rotte
app.use("/posts", postsRouter);
app.use("/categories", categoriesRouter);
app.use("/", authsRouter )
app.use('/public', express.static(path.join(__dirname, 'public')));

// Middleware di gestione degli errori
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Errore interno del server');
  });
  
// ***ascolto del server
app.listen(port,()=>{
	console.log(`app attiva su http://localhost:${port}`);
});
