const jwt = require("jsonwebtoken");
const bookModel = require("../models/bookModel");

const isValidObjectId = function (ObjectId) {
    return mongoose.Types.ObjectId.isValid(ObjectId)
}


const authenticate = function (req, res, next) {
    try{
    let token = req.headers["x-api-key"];
    if (!token) return res.send({ status: false, msg: "token must be present" });

    let decodedtoken = jwt.verify(token, "Book-Management");
    if (!decodedtoken) return res.send({ status: false, msg: "invalid token" })
    next()
}
catch (error) {
    return res.status(500).send({ error: error.message })
}
}


const autherization = async function (req, res, next) {
    try{
    const data = req.params.bookId

    if (!isValidObjectId(data)) { return res.status(400).send({ status: false, msg: 'Invalid Format of bookId' }) }


    const findBook = await bookModel.findById(data)
    if (!findBook) return res.status(400).send("Book Id is not valid")

    const userId = findBook.userId
    let token = req.headers["x-api-key"];
    if (!token) return res.status(400).send({ status: false, msg: "token must be present" })

    let decodedtoken = jwt.verify(token, "Book-Management")
    let userlogin = decodedtoken.userId

    if (userId != userlogin) { return res.status(400).send({ status: false, msg: "user not allowed to modify another user book" }) }

    next()

}
catch (error) {
    return res.status(500).send({ error: error.message })
}

}




module.exports.authenticate = authenticate
module.exports.autherization = autherization