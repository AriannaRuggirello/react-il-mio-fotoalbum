const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { hashPassword } = require("../utilities/hashPassword");
const { authSchema } = require('../utilities/validation_schema');
const bcrypt = require ("bcrypt");
const jsonwebtoken = require("jsonwebtoken");


async function comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }

async function register(req, res, next) {
    try {
        // Validazione dei dati della richiesta
        const { error } = await authSchema.validateAsync(req.body);

        if (error) {
            // Se la validazione fallisce, restituisci un errore 400 con i dettagli dell'errore di validazione
            return res.status(400).json({ error: error.details[0].message });
        }

        // recupera i dati dalla richiesta
        const data = req.body;
     

        const existingUser = await prisma.user.findUnique({
            where: {
              email: data.email, // Assicurati che 'data' contenga l'indirizzo email
            },
          });
          
          if (existingUser) {
            // L'indirizzo email è già presente nel database, restituisci un errore
            return res.status(400).json({ error: 'L\'indirizzo email è già registrato' });
          }

        // Hashing della password con bcrypt
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // Crea un nuovo utente
        const user = await prisma.user.create({
            data: {
                ...data,
                password: hashedPassword,
            },
        });

        // Genera un token JWT mediante la funzione generateToken
        const token = jsonwebtoken.sign(user, process.env.JWT_SECRET, {
            expiresIn: "1h",
            });

        // Risposta al client con token e utente
        res.json({ token, user });
    } catch (error) {
        console.error(error);
        // Gestione degli errori durante la registrazione
        res.status(500).json({ error: "Errore nella creazione dell'utente" });
    }
}

async function login(req, res) {
    try {
      // Recuperare l'utente tramite email.
      const { email, password } = req.body;
      // Verificare se la password fornita
      // dall'utente è uguale a quella hashata
      // presente nel database.
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
  
      if (!user) throw new Error("L'utente non esiste");
  
      const isPasswordValid = await comparePassword(password, user.password);
  
      if (!isPasswordValid) throw new Error("Errore nelle credenziali");
  
      // restituire il token di
      // accesso e le informazioni dell'utente al
      // client.
      const token = jsonwebtoken.sign(
        {
          userId: user.id,
          userEmail: user.email,
          userPssword: user.password,

          
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
  
      res.json({ token, user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Errore durante il login" });
    }
  }
  

// export const logout =(req,res)=>{

// }

module.exports = {
    register,
    login
}
