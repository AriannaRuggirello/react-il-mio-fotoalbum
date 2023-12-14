
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient;
const { postSchema } = require('../utilities/validation_schema');

async function index(req, res) {
    try {
      

        const where = {};
        const { page = 1, limit = 10, available, title } = req.query;

        // filtro per disponibilità
        if (title) {
            where.title = {
                contains: title,
            };
        }

        // Query per ottenere il numero totale di elementi
        const totalItems = await prisma.post.count({ where });

        // Calcola il numero totale di pagine disponibili
        const totalPages = Math.ceil(totalItems / limit);

        // Calcola l'offset in base alla pagina e al limite
        const offset = (page - 1) * limit;

        const posts = await prisma.post.findMany({
            where,
            take: parseInt(limit),
            skip: offset,
            include: {
                category: true
            }
        });

        res.json({
            posts,
            totalPages,
            currentPage: parseInt(page),
            totalItems
        });
    } catch (error) {
       
        res.status(500).json({ error: 'Errore nella index del post' });
    }
}

async function show(req, res) {
    try {
        const { id } = req.params;
        const post = await prisma.post.findUnique({
        where: { id: parseInt(id) },
        include: {
            category: true,
            },
        });
        if (post) {
        res.json(post);
        } else {
        res.status(404).json({ error: "post non trovato" });
        }
    } catch (error) {
        res.status(500).json({ error: 'Errore nella show del post' });
    }
   
    }

async function store(req, res) {
    try {
        // *** validazione
        const { error } = postSchema.validate(req.body);
        if (error) {
        return res.status(400).json({ error: error.details[0].message });
        }

        const data = req.body;
        // Creo un nuovo post utilizzando i dati dalla richiesta
        const post = await prisma.post.create({
         data:req.body,
       
        });
        
        // Ritorno il nuovo post come risposta JSON
        res.json(post);
    } catch (error) {
        // console.error(error);
        res.status(500).json({ error: 'Errore nella store del post' });
    }
  
}
   
async function update(req, res) {
    try {
        const { id } = req.params;

        // *** validazione
        const { error } = postSchema.validate(req.body);
        if (error) {
        return res.status(400).json({ error: error.details[0].message });
        }

        const post = await prisma.post.update({
        where: { id: parseInt(id) },
        data: req.body,
        include:{category:true}
        });
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: 'Errore nell update del post' });
        
    }

    }

async function destroy(req, res) {
    try {
        const { id } = req.params;
        const post = await prisma.post.delete({
        where: { id: parseInt(id) },
        });
        res.json(post); 
    } catch (error) {
        res.status(500).json({ error: 'Errore nella destroy del post' });
        
    }
 
    }


    module.exports={
        index,
        show,
        store,
        update,
        destroy

    }


  
        