const booksModel = require('../models/book_model');
const contributorsModel = require('../models/contributors_model');
const chapterModel = require('../models/chapter_model')
var mongoose = require('mongoose');

const getAllBooks = async (req, res) => {
    let books;
    let contributor;
    let bookData = []; 
    let contributorData = [];
    let bookContent ;
    let allBooks;
    try {

//   books = await booksModel.find()
        books = await booksModel.aggregate([
            {
                $lookup: {
                    from: 'contributors',
                    localField: 'contributorId',
                    foreignField: '_id',
                    as: 'allBooks'
                }
            }
        ]);
        console.log(books.length)

        // if(books.length > 0) {
        //       contributorData = Object.values(books[0].allBooks[0].contributors);
        //     console.log(contributorData);
        //     console.log(typeof(contributorData));
        //     console.log(typeof(books[0].allBooks[0].contributors));

        // }
        
      

        // console.log(books);
 // contributor = await contributorsModel.find();       
        // for(let i= 0; i<books.length;i++){
        //     let contributorId = books[i].contributorId;
        //     console.log('una nga for loop');
        // //     bookContent = books[i];
        //     for(let j = 0; j<contributor.length; j++){
        //         console.log('ning sud ka ari?');
        //         console.log(contributorId , contributor[j]._id)
        //         console.log(contributor[j]._id.equals(contributorId));
        //         if(contributor[j]._id.equals(contributorId)){
        //             console.log('here2');
        //             // books[i].listOfContributor = contributor[j]
                  
        //             contributorData = contributor[j];
                    
        //         }
        //     }
        // //     bookData += {bookContent,contributorData} 
        //     let tempBook = books[i];
            
        //         bookData = bookData.concat({tempBook,contributorData});
        // }
        // console.log(bookData);
    // bookData = [books,contributor]
    } catch (err) {
        console.log(err);
    }
    if (!books) {
        return res.status(404).json({ message: "No books found" });
    }
    return res.status(200).json({ books, message: "successfully Retrieved" });

}

const getById = async (req, res, next) => {
    const id = req.params.id;
    let contributors;
    let book;
    let bookData;
    let bookContainer;
    try {
        book = await booksModel.findById(id);
        bookContainer = book;
        console.log(book)
        const contributorId = book.contributorId;
        contributors = await contributorsModel.findById(contributorId)
        console.log(contributors)
        bookData = [bookContainer,contributors];
        // console.log(bookId)
    } catch (err) {
        console.log(err)
    }
    if (!book) {
        return res.status(204).json({ message: "Nothing found" });
    }
    return res.status(200).json({ bookData, message: "Found!" })
}


const addBooks = async (req, res, next) => {
    console.log(req.body.addBooks);
    const { bookTitle, chapterId, bookEdition, bookVolume, bookPublisher, bookPlacePublished, bookPublisherDate, categoryId, subjectId} = req.body.addBooks;
    let book;
    try {
        console.log(req.body.Contributors);
        // insert contributor
        const contributors = req.body.Contributors;
        const    contributorData = new contributorsModel({
            contributors
        });
        const result = await contributorData.save();
       
        // end

        // get contributor id
        const contributorId = result._id;
        let bookCoverId; 
   
        if(req.body.bookCoverId == 'id' ) {   
            bookCoverId = null;
         
            // console.log('fileCehckingjControl', file);
        }
        // end

        // insert book

        book = new booksModel({
            bookTitle,
            contributorId,
            chapterId,
            bookEdition,
            bookVolume,
            bookPublisher,
            bookPlacePublished,
            bookPublisherDate,
            categoryId,
            subjectId,
            bookCoverId,
          
        });
        await book.save();
        console.log(book, "Check the adding of book Cover Id");
    } catch (err) {
        console.log(err)
    }
    if (!book) {
        return res.status(500).json({ message: "Not added" })
    }
    return res.status(201).json({ book, message: "Book Successfully added" })
}



const updateBooks = async (req, res, next) => {
    const id = req.params.id;
    const { bookTitle, contributorId, chapterId, bookEdition, bookVolume, bookPublisher, bookPlacePublished, bookPublisherDate, bookDescription, categoryId, subjectId} = req.body.bookData;
    const contributors = req.body.contributors;
    const chapterData = req.body.chapterData;

    console.log(chapterData);
    console.log(chapterId);
    console.log(chapterId == [] && chapterData == [])
    let book;
    console.log('idTeting2',res.params)
    console.log('idTeting3',req.body)
    
    let bookCoverId; 
   
    if(req.body.bookCoverId !== 'id' ) {   
      
        bookCoverId = mongoose.Types.ObjectId(req.body.bookCoverId);
        // console.log('fileCehckingjControl', file);
    }else {
        bookCoverId = null;
    }
   
    try {
        
        // if(!chapterId && chapterData !=[] ){
        //     console.log('here I am');
        // }

        book = await booksModel.findByIdAndUpdate(id, {
            bookTitle,
            chapterId,
            bookEdition,
            bookVolume,
            bookPublisher,
            bookPlacePublished,
            bookPublisherDate,
            bookDescription,
            categoryId,
            subjectId,
            bookCoverId,
            
        });
        book = await book.save()

        let  contributor = await contributorsModel.findByIdAndUpdate(contributorId, {
            contributors
        })
        await contributor.save();
      

    } catch (err) {
        console.log(err)
    }
    if (!book) {
        return res.status(404).json({ message: "Update failed" })
    }
    return res.status(200).json({ book, message: "Update Success" })
}



const deleteBooks = async (req, res, next) => {
    const id = req.params.id;
    let book;
    try {
        const bookFind = await booksModel.findById(id);
        console.log(bookFind)
        const contributorsId = bookFind.contributorId
        console.log(contributorsId)
        book = await booksModel.findByIdAndRemove(id)
        await contributorsModel.findByIdAndRemove(contributorsId);
    } catch (err) {
        console.log(err)
    }
    if (!book) {
        return res.status(404).json({ message: "Delete Failed" })
    }
    return res.status(200).json({ message: "Delete Success" })
}


const fetchBooksFile = function(req,res){
   
    res.download('images/books/'+req.params.path)
}

const getAllContributors = async (req, res) => {
   
    let contributor;
   
    try {   
        contributor = await contributorsModel.find()
        console.log(contributor);
    } catch (err) {
        console.log(err);
    }
    if (!contributor) {
        return res.status(404).json({ message: "No books found" });
    }
    return res.status(200).json({ contributor, message: "successfully added" });

}

exports.getAllBooks = getAllBooks;
exports.addBooks = addBooks;
exports.getById = getById;
exports.updateBooks = updateBooks;
exports.deleteBooks = deleteBooks;
exports.fetchBooksFile = fetchBooksFile;
exports.getAllContributors = getAllContributors;