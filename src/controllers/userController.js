const UserModel = require('../models/userModel')
const jwt=require ('jsonwebtoken')

const isValid = function (value) {
    if (typeof (value) == undefined || typeof (value) == null) { return false }
    if (typeof (value) == "string" && value.trim().length == 0) { return false }
    return true
}

const createUser = async function (req, res) {
    try {
        const data = req.body

        const { name, title, phone, email, password } = data

        const req0 = isValid(title)
        if (!req0) {
            return res.status(400).send("title is required")
        }

        const isValidTitle = function (title) {
            return ["Mr", "Mrs", "Miss"].indexOf(title) !== -1
        }

        if (!isValidTitle(title)) {
            return res.status(400).send({ status: false, message: `${title} title is not valid` })
        }

        const req1 = isValid(name)
        if (!req1) {
            return res.status(400).send("name is required")
        }

        const req2 = isValid(phone)
        if (!req2) {
            return res.status(400).send("phone is required")
        }

        const phoneIsAlreadyUsed = await UserModel.findOne({ phone: phone })
        if (phoneIsAlreadyUsed) {
            return res.status(400).send("phone is already exist")
        }

        if (!(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/.test(phone))) {
            return res.status(400).send("phone is invalid")
        }


        const req3 = isValid(email)
        if (!req3) {
            return res.status(400).send("email is required")
        }
        const emailIsAlreadyUsed = await UserModel.findOne({ email: email })
        if (emailIsAlreadyUsed) {
            return res.status(400).send("email is already exist")
        }

        if (!(/^([\w]*[\w\.]*(?!\.)@gmail.com)$/.test(email))) {
            return res.status(400).send("email is invalid")
        }


        const req4 = isValid(password)
        if (!req4) {
            return res.status(400).send("password is required")
        }


        if (password.trim().length < 8 || password.trim().length > 15) {
            return res.status(400).send("password should be between 8 to 15")
        }


        const createData = await UserModel.create(data)
        res.status(201).send({ status: true, data: createData })
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }

}



const loginUser=async function(req,res){

    
    const {email, password } = data

    const req3 = isValid(email)
    if (!req3) {
        return res.status(400).send("email is required")
    }

    const req4 = isValid(password)
    if (!req4) {
        return res.status(400).send("password is required")
    }

      const findEmail= await UserModel.find({email:email})
      if(!findEmail){ return res.status(400).send("email is not registered")}


      const findPassword= await UserModel.find({password:password})
      if(!findPassword){ return res.status(400).send("Password is invalid")}


if(findEmail && findPassword)
{

    const  token =  jwt.sign({
        userId:findEmail._id,
        iat:Math.floor(Date.now() /1000),
        exp:Math.floor(Date.now() /1000)+ 10*60*60
     },'Book-Management')
     return res.status(200).send({ status: true, message: 'User login successfully', token: token })
}

}

module.exports.loginUser = loginUser

module.exports.createUser = createUser