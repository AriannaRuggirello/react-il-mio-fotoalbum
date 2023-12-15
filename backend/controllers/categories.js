const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient;
const { categorySchema } = require('../utilities/validation_schema');

async function index(req, res) {
    try {
        const categories = await prisma.category.findMany({
            // Includi i post associati
            include: {
                posts: true,
            },
        });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Errore nella index della category' });
    }
}

async function show(req, res) {
    try {
        const { id } = req.params;
        const category = await prisma.category.findUnique({
            where: { id: parseInt(id) },
            // Includi i post associati
            include: {
                posts: true,
            },
        });
        if (category) {
            res.json(category);
        } else {
            res.status(404).json({ error: "category non trovata" });
        }
    } catch (error) {
        res.status(500).json({ error: 'Errore nella show della category' });
    }
}

async function store(req, res) {
    try {  
        // Validazione
        const { error } = categorySchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        
        const category = await prisma.category.create({
            // Creazione di una nuova category utilizzando i dati dalla richiesta
            data: req.body,
        });

        res.json(category);
    } catch (error) {
        res.status(500).json({ error: 'Errore nella store della category' });
    }
}

async function update(req, res) {
    try {
        const { id } = req.params;
        const category = await prisma.category.update({
            where: { id: parseInt(id) },
            data: req.body,
        });
        res.json(category); 
    } catch (error) {
        res.status(500).json({ error: 'Errore nell update della category' });
    }
}

async function destroy(req, res) {
    try {
        const { id } = req.params;
        const category = await prisma.category.delete({
            where: { id: parseInt(id) },
        });
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: 'Errore nella destroy della category' });
    }
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy
};
