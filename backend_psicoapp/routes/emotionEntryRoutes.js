const express = require('express');
const router = express.Router();
const emotionEntryController = require('../controllers/emotionEntryController');

router.post('/', emotionEntryController.createEntry);
router.get('/:pacienteId', emotionEntryController.getEntriesByPatient);
router.get('/:id', emotionEntryController.getEntryById);
router.put('/:id', emotionEntryController.updateEntry);
router.delete('/:id', emotionEntryController.deleteEntry);

module.exports = router;