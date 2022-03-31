const UserModel = require('../models/userModel')
const jwt=require ('jsonwebtoken')
const mongoose=require('mongoose')

const isValid = function (value) {
    if (typeof (value) == "undefined" || typeof (value) == "null") { return false }
    if (typeof (value) == "string" && value.trim().length == 0) { return false }
    if (typeof (value) == "string" && value.trim().length > 1) { return true }
    return true
}

const createUser = async function (req, res) {
    try {
         const data = req.body

         if (Object.keys(data) == 0) { return res.status(400).send({ status: false, msg: 'data is missing' }) }

        let { name,password} = data
     
        const req0 = isValid(data.title)
        if (!req0) {
            return res.status(400).send("title is required")
        }
        const title=data.title.trim()

     // title shoulb be  enum
        const isValidTitle = function (title) {
            return ["Mr", "Mrs", "Miss"].indexOf(title) !== -1
        }

        if (!isValidTitle(title)) {
            return res.status(400).send({ status: false, message: `${title} title is not valid` })
        }
//        // name is requires

        const req1 = isValid(name)
        if (!req1) {
            return res.status(400).send("name is required")
        }
      // phone is required
         
        const req2 = isValid(data.phone)
        if (!req2) {
            return res.status(400).send("phone is required")
        }
        const phone=data.phone.trim()
       
        //phone is already used
        const phoneIsAlreadyUsed = await UserModel.findOne({ phone: phone })
        if (phoneIsAlreadyUsed) {
            return res.status(400).send("phone is already exist")
        }
      //  phone must be valid
        if (!(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/.test(phone))) {
            return res.status(400).send("phone is invalid")
        }

      // email is required
        const req3 = isValid(data.email)
        if (!req3) {
            return res.status(400).send("email is required")
        }
        const email=data.email.trim()

        //email is valid
        const emailIsAlreadyUsed = await UserModel.findOne({ email: email })
        if (emailIsAlreadyUsed) {
            return res.status(400).send("email is already exist")
        }

        //email is invalid
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            return res.status(400).send("email is invalid")
        }

      // password is required
        const req4 = isValid(password)
        if (!req4) {
            return res.status(400).send("password is required")
        }

    //password should be between 8 to 15
        if (password.trim().length < 8 || password.trim().length > 15) {
            return res.status(400).send("password should be between 8 to 15")
        }


        if (!isValid(data.address)) {
            res.status(400).send({ status: false, message: "User address is required" })
            return
        }

        
        if(!isValid(data.address.street))
        return res.status(400).send({ status : false, msg : "street is required" })
 
        
        if(!isValid(data.address.city))
        return res.status(400).send({ status : false, msg : "city is required" })

        
        if(!isValid(data.address.pincode))
        return res.status(400).send({ status : false, msg : "pincode is required" })
        const pincode =data.address.pincode.trim()

        if(!(/^[1-9][0-9]{5}$/.test(pincode)))
        { return  res.status(400).send("pincode is invalid")}


        const createData = await UserModel.create(data)
        res.status(201).send({ status: true, data: createData })
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }

}



const loginUser=async function(req,res){
    const data=req.body

    if (Object.keys(data) == 0) { return res.status(400).send({ status: false, msg: 'Please provide email and password' }) }
   
    const {email, password } = data


//email is required
    const req3 = isValid(email)
    if (!req3) {
        return res.status(400).send("email is required")
    }

    //password is required
    const req4 = isValid(password)
    if (!req4) {
        return res.status(400).send("password is required")
    }

    // email is not registered
      const findEmail= await UserModel.findOne({email:email})
      if(!findEmail){ return res.status(400).send("email is not registered")}

     // password is invalid
      const findPassword= await UserModel.findOne({password:password})
      if(!findPassword){ return res.status(400).send("Password is invalid")}


if(findEmail && findPassword)
{
    // creating token
    const  token =  jwt.sign({
        userId:findEmail._id,
        iat:Math.floor(Date.now() /1000),
        exp:Math.floor(Date.now() /1000)+ 10*60*60
     },'Book-Management')
     res.setHeader ("x-api-key",token)
     return res.status(200).send({ status: true, message: 'User login successfully', token: token })
}
}

module.exports.loginUser = loginUser

module.exports.createUser = createUser