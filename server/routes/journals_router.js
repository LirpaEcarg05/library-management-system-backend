const express = require('express')
const router = express.Router()

const journal = require('../controllers/journals_controller')

router.get('/',journal.getAllJournals)
router.post('/',journal.addJournals)
router.get('/:id',journal.getAllJournalsById)
router.put('/:id',journal.updateJournals)
router.delete('/:id',journal.deleteJournals)
router.get('/getFile/:path',journal.fetchJournalsFile)

module.exports = router;