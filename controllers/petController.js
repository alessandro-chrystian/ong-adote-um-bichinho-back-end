import Pet from "../models/Pet.js";

export const updatePet = async (req, res) => {
    const { id } = req.params;
    const { name, description, image } = req.body;

    try {
        const pet = await Pet.findById(id);
        if (!pet) {
            return res.status(404).json({ msg: 'Pet não encontrado' });
        }

        pet.name = name !== undefined ? name : pet.name;
        pet.description = description !== undefined ? description : pet.description;
        pet.image = image !== undefined ? image : pet.image;

        await pet.save();
        res.status(200).json(pet); 
    } catch (error) {
        res.status(500).json({ msg: 'Erro ao atualizar pet', error });
    }
};