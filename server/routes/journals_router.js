const express = require('express')
const router = express.Router()

const journal = require('../controllers/journals_controller')

router.get('/',journal.getAllJournals)
router.post('/addMainCategory', journal.addMainCategory)
router.get('/allMainCategory', journal.getAllMainCategory);
router.delete('/deleteMainCategory/:id',journal.removeMainCategory)

router.post('/addSubCategory', journal.addSubCategory);
router.get('/allSubCategory', journal.getAllSubCategory);
router.delete('/deleteSubCategory/:id',journal.removeSubCategory)

router.post('/createJournal',journal.addJournals)
router.get('/:id',journal.getAllJournalsById)
router.put('/:id',journal.updateJournals)
router.delete('/:id',journal.deleteJournals)
router.get('/getFile/:path',journal.fetchJournalsFile)

module.exports = router;