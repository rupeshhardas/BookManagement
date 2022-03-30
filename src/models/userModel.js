const mongoose=require('mongoose')
const userSchema= new mongoose.Schema({


    title: {
    type: String,
      trim:true,
     required:true,
     enum:["Mr", "Mrs", "Miss"]
    },
    name: {
        type:String, 
        required:true,
        trim:true
        },
    phone: {
        type:String,
        trim:true,
     match:[/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/],
        required:true,
         unique:true
    
        },
    email: {
        type:String,
        trim:true,
        required:true, 
         match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
     unique:true
    }, 
    password: {
       type: String,
       required:true,
       trim:true,
        minLen :8, 
        maxLen: 15
    },
    address: {
        street:{
            type:String,
            trim:true
        },
        city:{
            type: String ,
            trim:true
        },
        pincode:{
            type:String ,
            match:[/^[1-9][0-9]{5}$/],
            trim:true
      },
    }

},{timestamps:true})

module.exports=mongoose.model("user",userSchema)