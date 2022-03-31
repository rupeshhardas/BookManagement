const bookModel = require("../models/bookModel")
const reviewModel = require("../models/reviewModel")
const jwt = require('jsonwebtoken')
const mongoose=require('mongoose')
const { now } = require("moment")



const isValid = function (value) {
    if (typeof (value) == "undefined" || typeof (value) == "null") { return false }
    if (typeof (value) == "string" && value.trim().length == 0) { return false }
    return true
}

const isValidObjectId = function (ObjectId) {
    return mongoose.Types.ObjectId.isValid(ObjectId)
}

const createBook = async function (req, res) {
    try {
        const data = req.body
        const userID = data.userId.trim()
        let token = req.headers["x-api-key"];
        if (!token) return res.status(400).send({ status: false, msg: "token must be present" })

        let decodedtoken = jwt.verify(token, "Book-Management")
        if(!decodedtoken) return res.status(400).send({error:"token expired"})
        let userlogin = decodedtoken.userId

        if (Object.keys(data) == 0) { return res.status(400).send({ status: false, msg: 'data is missing' }) }
    
        

        const { title, excerpt,  ISBN, category, subcategory, releasedAt } = data

        const req0 = isValid(title)
        if (!req0) return res.status(400).send("title is required")


        const req1 = isValid(excerpt)
        if (!req1) return res.status(400).send("excerpt is required")

        const req2 = isValid(userID.trim())
        if (!req2) return res.status(400).send("userId is required")

        if (!isValidObjectId(userID)) { return res.status(400).send({ status: false, msg: 'Invalid Format of userId' }) }

        if (userID != userlogin) { return res.status(400).send({ status: false, msg: "userId is not belongs to you" }) }

        const req3 = isValid(ISBN)
        if (!req3) return res.status(400).send("ISBN is required")


        const req4 = isValid(category)
        if (!req4) return res.status(400).send("category is required")

        const req5 = isValid(subcategory)
        if (!req5) return res.status(400).send("subcategory  is required")

        const req6 = isValid(releasedAt)
        if (!req6) return res.status(400).send("relese date is required")

        if (!(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/.test(releasedAt.trim())))
            return res.status(400).send({ status: false, msg: "date format is not valid" })


        const findNumber = await bookModel.findOne({ ISBN: data.ISBN })
        if (findNumber) return res.status(400).send("ISBN is issued to another book please choose another one")


        const findTitle = await bookModel.findOne({ title: data.title })
        if (findTitle) return res.status(400).send("title is already given please choose another title")

        let bookDetail = await bookModel.create(data)
        res.status(201).send({ status: true, data: bookDetail })
    }
    catch (error) {
        return res.status(500).send({ error: error.message })
    }
}


const getBooks = async function (req, res) {
    try {

        const data = req.query

        let findBook = await bookModel.find({ $and: [data, { isDeleted: false }] }).sort({ title: 1 }).select({ _id: 1, title: 1, excerpt: 1, userId: 1, category: 1, releasedAt: 1, reviews: 1 })
        if (findBook.length == 0) return res.status(404).send({ status: false, mgs: "no Books available" })
        res.status(200).send({ status: true, message: "book details", data: findBook })
    }
    catch (error) {
        return res.status(500).send({ msg: error.message })
    }

}

const getDetailsBooks = async function (req, res) {
    try {
        const data = req.params.bookId

        if (!isValidObjectId(data)) { return res.status(400).send({ status: false, msg: 'Invalid Format of bookId' }) }

        let findBook = await bookModel.findOne({ _id: data, isDeleted: false })
        if (!findBook) return res.status(404).send({ status: false, msg: "NO books available" })

        let Stored = findBook

        let findId = findBook._id
        let findReviewscount = await reviewModel.find({ bookId: findId, isDeleted: false }).count()
        let findReviews = await reviewModel.find({ bookId: findId, isDeleted: false }).select({ _id: 1, bookId: 1, reviewedBy: 1, reviewedAt: 1, rating: 1, review: 1 })
        if (!findReviews) return res.status(400).send("no reviews yet")

        let Details = {
            _id: Stored._id, title: Stored.title, excerpt: Stored.excerpt, userId: Stored.userId, ISBN: Stored.ISBN,
            category: Stored.category, subcategory: Stored.subcategory, reviews: findReviewscount, isDeleted: Stored.isDeleted,
            releasedAt: Stored.releasedAt, createdAt: Stored.createdAt, updatedAt: Stored.updatedAt, reviewsData: findReviews
        }

        res.status(200).send({ status: true, message: "Book list", Data: Details })
    }
    catch (error) {
        return res.status(500).send({ msg: error.message })
    }

}

const updateBook = async function (req, res) {
    try {
        const data = req.body
        const data1 = req.params.bookId
        const title = data.title
        const ISBN = data.ISBN
        const excerpt = data.excerpt
        const releasedAt = data.releasedAt

        if(Object.keys(data)==0){return res.status(400).send('data is missing')}

        if (!isValidObjectId(data1)) { return res.status(400).send({ status: false, msg: 'Invalid Format of bookId' }) }

        let findId = await bookModel.findById(data1)
        if (!findId) return res.status(404).send({ status: false, msg: "book not available" })

        let data2 = findId.isDeleted

        if (data2 === false) {
            let findTitle = await bookModel.findOne({ title: title })
            if (findTitle) return res.status(400).send("Title is already given please choose another name")

            let findIsbn = await bookModel.findOne({ ISBN: ISBN })
            if (findIsbn) return res.status(400).send("Number is given to another book choose anothor book number")

            let updateBook1 = await bookModel.findOneAndUpdate({ _id: data1 }, { title: title, ISBN: ISBN, excerpt: excerpt, releasedAt: releasedAt }, { new: true })
            res.status(200).send({ status: true, message: "success", data: updateBook1 })

        } else {
            return res.status(404).send({ status: false, msg: "Book is already deleted" })
        }
    }
    catch (error) {
        return res.status(500).send({ msg: error.message })
    }


}


const deleteBook = async function (req, res) {
    try {
        const data = req.params.bookId

        if (!isValidObjectId(data)) { return res.status(400).send({ status: false, msg: 'Invalid Format of bookId' }) }

        let findBook = await bookModel.findById(data)
        if (!findBook) return res.status(404).send({ status: false, msg: "book not exist" })

        if (findBook.isDeleted == false) {

            let findupdate = await bookModel.findOneAndUpdate({ _id: data }, { isDeleted: true, deletedAt: new Date() }, { new: true })
            res.status(200).send({ status: true, message: "success", data: findupdate })

        } else {
            return res.status(404).send({ status: false, msg: "book is already deleted" })
        }
    }
    catch (error) {
        return res.status(500).send({ msg: error.message })
    }

}


module.exports.createBook = createBook
module.exports.getBooks = getBooks
module.exports.getDetailsBooks = getDetailsBooks
module.exports.updateBook = updateBook
module.exports.deleteBook = deleteBook












