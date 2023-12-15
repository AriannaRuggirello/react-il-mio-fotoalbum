const { PrismaClient } = require('@prisma/client');
const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs"); 

const prisma = new PrismaClient();

const {postSchema} = require('../utilities/validation_schema');

const uploader = multer({ dest: "public/img" });

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
                categories: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });

        res.json({
            posts,
            totalPages,
            currentPage: parseInt(page),
            totalItems
        });
    } catch (error) {
        res.status(500).json({ error: 'Errore nella index del post', details: error.message });
    }
}


async function show(req, res) {
    try {
        const { id } = req.params;
        const postId = parseInt(id);
        
        if (isNaN(postId)) {
          res.status(400).json({ error: 'L\'ID del post non è valido' });
          return;
        }
        
        const post = await prisma.post.findUnique({
          where: { id: postId },
          include: {
            category: true,
          },
        });
        
    } catch (error) {
        res.status(500).json({ error: 'Errore nella show del post', details: error.message });
    }
}


async function store(req, res) {
    try {
        // *** validazione
        const { error } = postSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        if (!req.file) {
            return res.status(400).json({ error: 'Carica un\'immagine valida' });
        }

        const tempPath = req.file.path;
        const targetPath = "public/img/" + req.file.originalname;

        fs.renameSync(tempPath, targetPath);

        const data = req.body;

        const categoryIds = req.body.categoryId.map(id => parseInt(id));


        const post = await prisma.post.create({
            data: {
                title: data.title,
                description: data.description,
                image: req.file.path,
                available: data.available === "true",
                categories: {
                    connect: categoryIds.map(categoryId => ({ id: categoryId }))
                }
            },
           
        });

        // Ritorno il nuovo post come risposta JSON
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: 'Errore nella store del post', details: error.message });
    }
}


async function update(req, res) {
    try {
        const { id } = req.params;

        // Verifica se il post esiste
        const existingPost = await prisma.post.findUnique({
            where: { id: parseInt(id) },
        });

        if (!existingPost) {
            return res.status(404).json({ error: 'Post non trovato' });
        }

        const { title, description, available } = req.body;
        
        // Verifica se categoryId è definito e se è un array
        const categoryIds = req.body.categoryId && Array.isArray(req.body.categoryId)
            ? req.body.categoryId.map(id => parseInt(id))
            : [];

        // Verifica se è presente un nuovo file
        const imagePath = req.file ? req.file.path : undefined;

        const updatedPost = await prisma.post.update({
            where: { id: parseInt(id) },
            data: {
                title,
                description,
                image: imagePath,
                available: available === "true",
                // Collega le nuove categorie solo se sono fornite nella richiesta
                categories: {
                    connect: categoryIds.map(categoryId => ({ id: categoryId })),
                },
            },
            // Include solo il campo 'category' se necessario
            include: categoryIds.length > 0 ? { category: true } : undefined,
        });

        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ error: 'Errore nell update del post', details: error.message });
    }
}






async function destroy(req, res) {
    try {
        const { id } = req.params;

        const post = await prisma.post.findUnique({
            where: { id: parseInt(id) },
        });

        if (!post) {
            return res.status(404).json({ error: 'Post non trovato' });
        }

        const deletedPost = await prisma.post.delete({
            where: { id: parseInt(id) },
        });

        if (post.image) {
            const imgPath = `public/uploads/${post.image}`;

            fs.unlink(imgPath, (error) => {
                if (error) {
                    console.error('Errore durante l\'eliminazione del file:', error);
                } else {
                    console.log('File eliminato con successo.');
                }
            });
        }

        res.json(deletedPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Errore nella cancellazione del post', details: error.message });
    }
}


module.exports = {
    index,
    show,
    store,
    update,
    destroy
};
