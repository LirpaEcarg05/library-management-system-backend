const Journal = require('../models/journals_model');
const contributorsModel = require('../models/contributors_model')
const mainSubjectModel = require('../models/main-subjects_model')
const categoryModel = require('../models/sub-category_model')

const getAllJournals = async (req, res, next) => {
    let journals;
    try {
        journals = await Journal.find();
    } catch (error) {
        console.log(error)
    }
    if (!journals) {
        return res.status(404).json({ message: "Unable to find out" })
    }
    return res.status(200).json({ journals, message: "Able to found" })
   
}
const getAllJournalsById = async (req, res, next) => {
    const id = req.params.id;
    let contributors;
    let journals;
    let journalData;
    let journalContainer
    try {
        journals = await Journal.findById(id);
        journalContainer = journals;
        const contributorId = journals.contributorId;
        contributors = await contributorsModel.findById(contributorId)
        journalData = [journalContainer,contributors]
    } catch (error) {
        console.log(error)
    }
    if (!journals) {
        return res.status(204).json({ message: "No journals found" })
    }
    return res.status(200).json({ journalData, message: "Successfully find" })

}
const addJournals = async (req, res, next) => {
    let journals;
    const { articleTitle, journalTitle, fromPage, toPage, volume, issue, publicationStatus,placeOfPublication, publicationDate, file } = req.body.addJournals;
    let contributorData;
    let subjectData;
    let categoryData;
    try {
        const contributors = req.body.Contributors;
        contributorData = new contributorsModel({
            contributors
        })

        const result = await contributorData.save();
        const contributorId = result._id;
        journals = new Journal({
            articleTitle,
            journalTitle,
            contributorId,
            fromPage,
            toPage,
            volume,
            issue,
            publicationStatus,
            placeOfPublication,
            publicationDate,
            file
        });
        console.log(journals)
        await journals.save();

    } catch (error) {
        console.log(error);
    }
    if (!journals) {
        return res.status(500).json({ message: "Failed" })
    }
    return res.status(201).json({ journals, message: "Success" });
}



const updateJournals = async (req, res, next) => {
    console.log(req.body);
    const id = req.params.id;
    const { articleTitle, journalTitle, contributorId, fromPage, toPage, volume, issue, publicationStatus,placeOfPublication, publicationDate, file } = req.body.journalData;
    let journals;
    let contributors = req.body.newcontributorsData;

    try {
        journals = await Journal.findByIdAndUpdate(id, {
            articleTitle,
            journalTitle,
            fromPage,
            toPage,
            volume,
            issue,
            publicationStatus,
            placeOfPublication,
            publicationDate,
            file
        });
        
        journals = await journals.save();
        let contributorsData = await contributorsModel.findByIdAndUpdate(contributorId, {
            contributors
        });
        await contributorsData.save();
        
    } catch (error) {
        console.log(error)
    }
    if (!journals) {
        return res.status(404).json({ message: "Failed" })
    }
    return res.status(200).json({ journals, message: "Success update" });
}

const deleteJournals = async (req, res, next) => {
    const id = req.params.id;
    let journals;
    let journalFindId;
    try {
        journalFindId = await Journal.findById(id)
        console.log(journalFindId);
        const getContributorId = journalFindId.contributorId
        journals = await Journal.findByIdAndRemove(id)
        await contributorsModel.findByIdAndRemove(getContributorId)
    } catch (error) {
        console.log(error)
    }
    if (!journals) {
        return res.status(404).json({ message: "Unable to delete journal" })
    }
    return res.status(200).json({ message: "Successfully deleted" })

}

const fetchJournalsFile = function(req,res){
   
    res.download('images/journals/'+req.params.path)
}

exports.getAllJournals = getAllJournals;
exports.addJournals = addJournals;
exports.getAllJournalsById = getAllJournalsById;
exports.updateJournals = updateJournals;
exports.deleteJournals = deleteJournals;
exports.fetchJournalsFile = fetchJournalsFile;