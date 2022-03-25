const mongoose=require('mongoose')
const userSchema= new mongoose.Schema({


    title: {
    type: String,
     required:true,
     enum:["Mr", "Mrs", "Miss"]
    },
    name: {
        type:String, 
        required:true
        },
    phone: {
        type:String,
     match:[/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/],
        required:true,
         unique:true
        },
    email: {
        type:String,
        required:true, 
        trim:true,
        match:[/^([\w]*[\w\.]*(?!\.)@gmail.com)$/, 'Please fill a valid email address'],
     unique:true
    }, 
    password: {
       type: String,
       required:true,
        minLen :8, 
        maxLen: 15
    },
    address: {
        street:  String ,
        city: String ,
        pincode: String 
      },
  



},{timestamps:true})

module.exports=mongoose.model("user",userSchema)