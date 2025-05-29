const EmotionEntry = require('../models/EmotionEntry');

exports.createEntry = async (req, res) => {
    try {
        const newEntry = new EmotionEntry(req.body);
        await newEntry.save();
        res.status(201).json(newEntry);
    } catch (err) {
        console.error("Erro ao criar registro:", err);
        res.status(400).json({ message: err.message });
    }
};

exports.getEntriesByPatient = async (req, res) => {
    try {
        const entries = await EmotionEntry.find({ pacienteId: req.params.pacienteId }).sort({ dataRegistro: -1 });
        res.json(entries);
    } catch (err) {
        console.error("Erro ao buscar registros do paciente:", err);
        res.status(500).json({ message: err.message });
    }
};

exports.getEntryById = async (req, res) => {
    try {
        const entry = await EmotionEntry.findById(req.params.id);
        if (!entry) {
            return res.status(404).json({ message: 'Registro não encontrado.' });
        }
        res.json(entry);
    } catch (err) {
        console.error("Erro ao buscar registro por ID:", err);
        res.status(500).json({ message: err.message });
    }
};

exports.updateEntry = async (req, res) => {
    try {
        const updatedEntry = await EmotionEntry.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedEntry) {
            return res.status(404).json({ message: 'Registro não encontrado para atualização.' });
        }
        res.json(updatedEntry);
    } catch (err) {
        console.error("Erro ao atualizar registro:", err);
        res.status(400).json({ message: err.message });
    }
};

exports.deleteEntry = async (req, res) => {
    try {
        const deletedEntry = await EmotionEntry.findByIdAndDelete(req.params.id);
        if (!deletedEntry) {
            return res.status(404).json({ message: 'Registro não encontrado para exclusão.' });
        }
        res.json({ message: 'Registro excluído com sucesso!' });
    } catch (err) {
        console.error("Erro ao excluir registro:", err);
        res.status(500).json({ message: err.message });
    }
};