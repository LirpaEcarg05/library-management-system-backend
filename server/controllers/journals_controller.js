const Journal = require('../models/journals_model');
const contributorsModel = require('../models/contributors_model')
const mainSubjectModel = require('../models/main-subjects_model')
const categoryModel = require('../models/sub-category_model')
var mongoose = require('mongoose');

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
    let subCategory;
    let journals;
    let journalData;
    let journalContainer
    try {
        journals = await Journal.findById(id);
        journalContainer = journals;
        const contributorId = journals.contributorId;
        const categoryId = journals.categoryId;
        contributors = await contributorsModel.findById(contributorId)
        subCategory = await categoryModel.findById(categoryId)
        journalData = [journalContainer, contributors, subCategory]
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
    const { articleTitle, categoryId, subjectId, journalTitle, fromPage, toPage, volume, issue, publicationStatus, placeOfPublication, publicationDate} = req.body.addJournals;
    console.log(categoryId);
    let contributorData;
    // let subjectData;
    let categoryData;
    // console.log('idTeting1', req)
    // console.log('idTeting1',req.file.id)
    console.log('idTeting2',res.params)
    console.log('idTeting3',req.body.fileId)
    let file; 
   
    if(req.body.fileId !== 'id' ) {   
      
        file = mongoose.Types.ObjectId(req.body.fileId);
        // console.log('fileCehckingjControl', file);
    }else {
        file = null;
    }
   
 
    try {
        const contributors = req.body.Contributors;
        // const categoryName = req.body.subcategoryLists
        // const subjectName = req.body.categoryLists
        contributorData = new contributorsModel({
            contributors
        })
        // subjectData = new mainSubjectModel({
        //     subjectName
        // })
        // categoryData = new categoryModel({
        //     categoryName
        // })
        // const mainCategoryResult = await subjectData.save()
        // const subCategoryResult = await categoryData.save()
        const result = await contributorData.save();
        // const categoryId = subCategoryResult._id
        // const subjectId = mainCategoryResult._id
        const contributorId = result._id;
        journals = new Journal({
            articleTitle,
            journalTitle,
            contributorId,
            subjectId,
            categoryId,
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
    const { articleTitle, journalTitle, contributorId, subjectId, categoryId, fromPage, toPage, volume, issue, publicationStatus, placeOfPublication, publicationDate, file } = req.body.journalData;
    // let categoryId = [];
    // const categoryList = req.body.journalData.categoryId;
    // for(let item in categoryList){
    //     console.log(item);
    //     categoryId = categoryId.concat(item);
    // }
    let journals;
    let contributors = req.body.newcontributorsData;
    // let categoryName = req.body.subcategoryLists;
    // let mainCategory = req.body.categoryLists;
    try {
        journals = await Journal.findByIdAndUpdate(id, {
            articleTitle,
            journalTitle,
            fromPage,
            toPage,
            volume,
            issue,
            subjectId,
            categoryId,
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
        // let mainCategoryData = await mainSubjectModel.findByIdAndUpdate(subjectId,{
        //     mainCategory
        // })
        // await mainCategoryData.save()
        // let subCategoryData = await categoryModel.findByIdAndUpdate(categoryId,{
        //     categoryName
        // })  
        // await subCategoryData.save()

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

const addMainCategory = async (req, res, next) => {
    
    let mainCategory;
    const {subjectName} = req.body;

    try {
        mainCategory = new mainSubjectModel({
            subjectName
        })

        await mainCategory.save();
    } catch (error) {
        console.log(error);
    }
    if(!mainCategory) {
        return res.status(500).json({message: "Failed"})
    }
    return res.status(201).json({mainCategory, message: "Success"});
    
}

const getAllMainCategory = async (req, res, next) => {
    let allMainCategory;
    try {
        allMainCategory = await mainSubjectModel.find();    
    }catch (error) {
        console.log(error)
    }

    if(!allMainCategory){
        return res.status(404).json({message: 'Unable to find Main Category'})
    }

    return res.status(200).json({allMainCategory, message: 'Successfully retrieved all Main Category list'})

}
//DELETE MAIN CATEGORY
const removeMainCategory = async(req,res,next)=>{
    const id = req.params.id
    let mainCategory;
    try{
        mainCategory = await mainSubjectModel.findByIdAndRemove(id);
    }catch(err){
        console.log(err)
    }
    if(!mainCategory){
        return res.status(404).json({message:"Wala pa na delete"})
    }
    return res.status(200).json({mainCategory,message:"Delete na"})
}
//END OF MAIN CATEGORY

// SUB CATEGORY
const addSubCategory = async (req, res, next) => {
    
    let subCategory;
    const {categoryName} = req.body;

    try {
        subCategory = new categoryModel({
            categoryName
        })

        await subCategory.save();
    } catch (error) {
        console.log(error);
    }
    if(!subCategory) {
        return res.status(500).json({message: "Failed"})
    }
    return res.status(201).json({subCategory, message: "Success"});
    
}

const getAllSubCategory = async (req, res, next) => {
    let allSubCategory;
    try {
        allSubCategory = await categoryModel.find();
    }catch (error) {
        console.log(error)
    }

    if(!allSubCategory){
        return res.status(404).json({message: 'Unable to find Sub Category'})
    }

    return res.status(200).json({allSubCategory, message: 'Successfully retrieved all Sub Category list'})

}
//DELETE SUB CATEGORY
const removeSubCategory = async(req,res,next)=>{
    const id = req.params.id
    let SubCategory;
    try{
        SubCategory = await categoryModel.findByIdAndRemove(id);
    }catch(err){
        console.log(err)
    }
    if(!SubCategory){
        return res.status(404).json({message:"Not Deleted"})
    }
    return res.status(200).json({SubCategory,message:" Deleted"})
}
// END OF SUB CATEGORY

const fetchJournalsFile = function (req, res) {

    res.download('images/journals/' + req.params.path)
}

exports.getAllJournals = getAllJournals;
exports.addJournals = addJournals;
exports.getAllJournalsById = getAllJournalsById;
exports.updateJournals = updateJournals;
exports.deleteJournals = deleteJournals;
exports.fetchJournalsFile = fetchJournalsFile;
exports.addMainCategory = addMainCategory;
exports.getAllMainCategory = getAllMainCategory;
exports.removeMainCategory = removeMainCategory;  

exports.addSubCategory = addSubCategory;
exports.getAllSubCategory = getAllSubCategory;
exports.removeSubCategory = removeSubCategory;
