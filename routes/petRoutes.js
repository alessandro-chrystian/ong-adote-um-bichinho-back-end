import express from 'express';
import Pet from '../models/Pet.js';
import { verifyAdmin } from '../middlewares/authMiddleware.js';
import { updatePet } from '../controllers/petController.js';

const router = express.Router();

router.post('/', verifyAdmin, async(req, res) => {
    const {name, description, image} = req.body;
    const createdBy = req.userId;

    try {
        const petsCount = await Pet.countDocuments();
        if (petsCount >= 20) {
            return res.status(400).json({message: 'Limite de 20 pets alcançado.'})
        }
        const newPet = new Pet({ name, description, image, createdBy });
        await newPet.save();
        res.status(201).json(newPet);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar o pet', error });
    }
})

router.get('/', async (req, res) => {
    try {
        const pets = await Pet.find().limit(20);
        res.status(200).json(pets);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter os pets', error });
    }
})

router.put('/:id', verifyAdmin, updatePet);

router.delete('/:id', verifyAdmin, async (req, res) => {
    try {
        await Pet.findByIdAndDelete(req.params.id);
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar o pet', error });
    }
});

export default router;