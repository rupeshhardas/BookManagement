// const ReviewModel= require('../models/reviewModel')
// const BookModel=require('../models/bookModel')
// const mongoose=require('mongoose')
// const isValid= function(value){

//     if(typeof (value)== 'undefined' || typeof (value)== 'null'){return false}
//     if(typeof (value)== 'string' && value.trim().length ==0){return false}
//     return true
// }


// const isValidObjectId = function (ObjectId) {
//     return mongoose.Types.ObjectId.isValid(ObjectId)
// }


// const createReview= async function(req,res){
//      try{
//         const data=req.body
        
//         if(Object.keys(data)==0){return res.status(400).send("data is missing")}

//        const bookId1=req.params.bookId

//        if (!isValidObjectId(bookId1)) 
//        { return res.status(400).send(' Invalid Format of bookId')}

//        const bookDetails=await BookModel.findById(bookId1)
//         if(!bookDetails){return res.status(400).send("bookId does not exist")}
        



//         const{ reviewedBy,reviewedAt,rating,review}=data

//         const req0=isValid(data.bookId)
//         if(!req0){ return res.status(400).send("bookId is required")}

//        let bookId=data.bookId.trim()
   
//        if (!isValidObjectId(bookId)) 
//        { return res.status(400).send(' Invalid Format of bookId')}

//      let findBookid = await BookModel.findById(bookId)
//     if (!findBookid) return res.status(400).send("Bookid is not valid")
//        data.bookId=bookId

    

//         const req1=isValid(reviewedBy)
//         if(!req1){ return res.status(400).send("reviewedBy is required")}

//         const req2=isValid(reviewedAt)
//         if(!req2){ return res.status(400).send("reviewedAt is required")}

//         const req3=isValid(rating)
//         if(!req3){ return res.status(400).send("rating is required")}

//         const req4=isValid(review)
//         if(!req4){ return res.status(400).send("review is required")}

//         if(rating < 1 ||  rating > 5)
//         {
//             return res.status(400).send("ratings should be in 1 to 5")
//         }
//         let isdeleteded = bookDetails.isDeleted
//        if(bookId1 ===bookId){
//         if (isdeleteded == false) {
//             const saveData= await ReviewModel.create(data)
//             const saveData1= await ReviewModel.find({ bookId:bookDetails._id, isDeleted: false }).select({ _id: 1, bookId: 1, reviewedBy: 1, reviewedAt: 1, rating: 1, review: 1 })
//             const saveData2= await ReviewModel.find({ bookId: bookDetails._id, isDeleted: false }).count()
//             const  bookDetailsWithReviewDetails={
//                 _id:bookDetails._id,
//                 title:bookDetails.title,
//                 excerpt:bookDetails.excerpt,
//                 userId:bookDetails.userId,
//                 category:bookDetails.category,
//               subcategory:bookDetails.subcategory,
//               deleted:bookDetails.deleted,
//               reviews:saveData2,
//               deletedAt: bookDetails.deletedAt,
//               releasedAt: bookDetails.releasedAt,
//               createdAt:bookDetails.createdAt,
//               updatedAt: bookDetails.updatedAt,
//               reviewsData:saveData1
                
//              }
//             return res.status(201).send({status:true,data:bookDetailsWithReviewDetails})
//         } else {

//             return res.status(400).send({ status: false, msg: "book is already deleted" })
//         }
//     }else{ return res.status(400).send(" bookId does not match ")}
//     }

//     catch(err){
//         res.status(500).send({error:err.message})
//     }
        
    

// }

// const updatedReview= async function(req,res){
//     try{
//         const data=req.body
//         const review=data.review
//         const rating=data.rating
//         const reviewedBy=data.reviewedBy
//         const bookId=req.params.bookId
//         const reviewId=req.params.reviewId

//         if(Object.keys(data)==0){return res.status(400).send("data is missing")}

//         if (!isValidObjectId(bookId)) 
//         { return res.status(400).send(' Invalid Format of bookId')}

//         if (!isValidObjectId(reviewId)) 
//         { return res.status(400).send(' Invalid Format of reviewId')}
 
 


//         const bookDetails= await BookModel.findById(bookId)
//         if(!bookDetails){ return res.status(400).send("invalid bookId")}

//         const FindReview= await ReviewModel.findById(reviewId)
//         if(!FindReview){ return res.status(400).send("invalid reviewId")}
        

    
//         if(bookId==FindReview.bookId){

//          if(bookDetails.isDeleted ===false){


//         if(FindReview.isDeleted ===false){

//    const UpdateReview =await ReviewModel.findOneAndUpdate({_id:reviewId,bookId:bookId},{review:review,rating:rating,reviewedBy:reviewedBy},{new:true})
//    const saveData1= await ReviewModel.find({ bookId: bookDetails._id, isDeleted: false }).select({ _id: 1, bookId: 1, reviewedBy: 1, reviewedAt: 1, rating: 1, review: 1 })
//    const saveData2= await ReviewModel.find({ bookId: bookDetails._id, isDeleted: false }).count()
//    const  bookDetailsWithReviewDetails={
//     _id:bookDetails._id,
//     title:bookDetails.title,
//     excerpt:bookDetails.excerpt,
//     userId:bookDetails.userId,
//     category:bookDetails.category,
//   subcategory:bookDetails.subcategory,
//   deleted:bookDetails.deleted,
//   reviews:saveData2,
//   deletedAt: bookDetails.deletedAt,
//   releasedAt: bookDetails.releasedAt,
//   createdAt:bookDetails.createdAt,
//   updatedAt: bookDetails.updatedAt,
//   reviewsData:saveData1
    
//  }
//     return res.status(202).send({status:true,data:bookDetailsWithReviewDetails})

//         }else{
//             return res.status(400).send("reviewData is already Deleted")
//         }
//     }else{
//             return res.status(400).send("BookData is already Deleted")
//         }
//     }
// else{
//         return res.status(400).send(" id does not match")
//     }
       
    
//     }catch(err){
//         return res.status(500).send({error:err.message})
//     }
// }


// const deletedReview= async function(req,res){
// try{  


//     const bookId=req.params.bookId
//     const reviewId=req.params.reviewId

//     if (!isValidObjectId(bookId)) 
//     { return res.status(400).send(' Invalid Format of bookId')}

//     if (!isValidObjectId(reviewId)) 
//     { return res.status(400).send(' Invalid Format of reviewId')}

    
//     const bookDetails= await BookModel.findById(bookId)
//     if(!bookDetails){ return res.status(400).send("invalid bookId")}

    
//     const FindReview= await ReviewModel.findById(reviewId)
//     if(!FindReview){ return res.status(400).send("invalid reviewId")}
    


//     if(bookId==FindReview.bookId){
//      if(bookDetails.isDeleted ===false){
//     if(FindReview.isDeleted ===false){

//         const deleteReview =await ReviewModel.findOneAndUpdate({_id:reviewId},{isDeleted:true,deleteAt:new Date()},{new:true})
        
//          const saveData1= await ReviewModel.find({ bookId: bookDetails._id, isDeleted: false }).select({ _id: 1, bookId: 1, reviewedBy: 1, reviewedAt: 1, rating: 1, review: 1 })
//          const saveData2= await ReviewModel.find({ bookId: bookDetails._id, isDeleted: false }).count()
//          const  bookDetailsWithReviewDetails={
//           _id:bookDetails._id,
//           title:bookDetails.title,
//           excerpt:bookDetails.excerpt,
//           userId:bookDetails.userId,
//           category:bookDetails.category,
//         subcategory:bookDetails.subcategory,
//         deleted:bookDetails.deleted,
//         reviews:saveData2,
//         deletedAt: bookDetails.deletedAt,
//         releasedAt: bookDetails.releasedAt,
//         createdAt:bookDetails.createdAt,
//         updatedAt: bookDetails.updatedAt,
//         reviewsData:saveData1
          
//        }

//               return res.status(202).send({status:true,msg:'selected reviewData is deleted',data:bookDetailsWithReviewDetails})
     
//              }else{
//                  return res.status(400).send("reviewData is already Deleted")
//              }
//           }
//           else{
//                  return res.status(400).send("BookData is already Deleted")
//              }
//             }else{
//                 return res.status(400).send(" id does not match")
//             }

 
//   }catch(err){
//     return res.status(500).send({error:err.message})
// }
// }






// module.exports.createReview=createReview
// module.exports.updatedReview=updatedReview
// module.exports.deletedReview=deletedReview



// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// const UserModel = require('../models/userModel')
// const BookModel=require('../models/bookModel')
// const ReviewModel=require('../models/reviewModel')
// const jwt = require('jsonwebtoken')


// const mongoose=require('mongoose')

// const isValid= function(value){

//     if(typeof (value)== 'undefined' || typeof (value)== 'null'){return false}
//     if(typeof (value)== 'string' && value.trim().length ==0){return false}
//     return true

// }
// const isValidRequestBody = function (requestbody) {
//     return Object.keys(requestbody).length > 0
// }

// const isValidObjectId = function (ObjectId) {
//     return mongoose.Types.ObjectId.isValid(ObjectId)
// }


// const createBook= async function(req,res){

// try
// {
//     const token = req.headers["x-api-key"]
//     if (!token) { return res.status(404).send("token must be present") }

//     const decodedToken = jwt.verify(token, 'Book-Management')
//     if (!decodedToken) { return res.status(400).send("token is invalid") }

//     const data =req.body
//     if(Object.keys(data)==0){return res.status(400).send('data  is missing')}


//     let userId = data.userId.trim()
// // userId is required
//    const req8= isValid(userId)
//    if(!req8){ return res.status(400).send('userId is required')}

//     if (!isValidObjectId(userId)) 
//     { return res.status(400).send(' Invalid Format of userId')}
    

//     const findUser = await UserModel.findById(userId)
//    if (!findUser) { return res.status(400).send('user does not exist') }

//         data.userId = data.userId.trim()



    
//     //console.log(data)
//     // const title=data.title.trim()
//     // const excerpt=data.excerpt.trim()
//     // const ISBN=data.ISBN.trim()
//     // const category=data.category.trim()
//     // const subcategory=data.subcategory.trim()
//     const{title,excerpt,ISBN,category,subcategory,releasedAt}=data
//     //if(!userId){return res.status(400).send("userID is required")} (by this trim is not handled)


    
//     // title is required
//     const req0= isValid(title)
//     if(!req0){ return res.status(400).send('title is required')}

//     // title should be unique
//     const titleAlreadyUsed= await BookModel.findOne({title:title})
//     if(titleAlreadyUsed){ return res.status(400).send('title should be unique')}

    
//     // excerpt is required
//     const req1= isValid(excerpt)
//     if(!req1){ return res.status(400).send('excerpt is required')}

//    // userId validation
//   // const userId=data.userId.trim()
//     // const User= await UserModel.findById(userId)
//     // if(!User){ return res.status(400).send("invalid userId")}
   


//     // ISBN is required
//     const req3= isValid(ISBN)
//     if(!req3){ return res.status(400).send('ISBN is required')}

//     // ISBN should be unique
//     const ISBNisAlreadyUsed= await BookModel.findOne({ISBN})
//     if(ISBNisAlreadyUsed){ return res.status(400).send('ISBN should be unique')}

    
//     const req4= isValid(category)
//     if(!req4){ return res.status(400).send('category is required')}

    
//     const req5= isValid(subcategory)
//     if(!req5){ return res.status(400).send('subcategory is required')}

//     const req6= isValid(releasedAt)
//     if(!req6){ return res.status(400).send('releasedAt is required')}
  
  
//     if(!(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/.test(releasedAt.trim())))
//          return res.status(400).send({status:false,msg:"date format is not valid"})

//          if (findUser._id != decodedToken.userId) {
//             return res.status(400).send('user is not allowed to create Book')
//         }

   
//     const saveData=await BookModel.create(data);
//     res.status(201).send({status:true,data:saveData})
// }
// catch(err){
//     res.status(500).send({error:err.message})
// }
// }

// const getBook = async function (req, res) {
//     try {
//         const queryParams = req.query
//         const filterQueryParams = { isDeleted: false }
       
//       // if(Object.keys(queryParams).length>0  && Object.values(queryParams)==0){ return res.status(400).send("please provide value to key")}
    
    


//       let keys = Object.keys(queryParams);
//       for(let i=0; i<keys.length; i++){
//           if(!(queryParams[keys[i]])) return res.status(400).send({status:false, message:"Please provide proper filters"})
//           queryParams[keys[i]]=queryParams[keys[i]].trim();
//           if(!(queryParams[keys[i]])) return res.status(400).send({status:false, message:"Please provide proper filters"})
  
//       }
       
//         if (isValidRequestBody(queryParams)) {
          
//             const { userId, category, subcategory } = queryParams

//             if (isValid(userId) && isValidObjectId(userId)) {
//                 filterQueryParams["userId"] = userId.trim()
//             }
            

//             if (isValid(category)) {
//                 filterQueryParams["category"] = category.trim()
//             }

//             if (isValid(subcategory)) {
//                 filterQueryParams["subcategory"] = subcategory.trim()
//             }
//         }
//         const findBook = await BookModel.find(filterQueryParams).select({ _id: 1, title: 1, excerpt: 1, userId: 1, category: 1, releasedAt: 1, reviews: 1 }).sort({ title: 1 }).count()
//         const findBook1 = await BookModel.find(filterQueryParams).select({ _id: 1, title: 1, excerpt: 1, userId: 1, category: 1, releasedAt: 1, reviews: 1 }).sort({ title: 1 })
        
//         if (findBook1.length == 0) {
//             return res.status(404).send({ status: false, message: "No Books Found" })
//         }
//         return res.status(201).send({ status: true, message: "Books Find Successfully", count: findBook, data: findBook1 })
//     }

//     catch (err) {
//         res.status(500).send({ error: err.message })
//     }
// }


// // const getBook = async function(req, res) {
// //     try{
// //           const data= req.query
// //one more way//line138//find({$and:[data,{isDeleted:false}]})
// //one more way//line138// let data2={ isDeleted:false,...data} //and then//find(data2)
// //         const findBook = await BookModel.find(data).find({isDeleted : false}).select({_id:1,title:1,excerpt:1,userId:1,category:1,reviews:1,releasedAt:1}).sort({title:1})
// //         console.log(findBook)
// //         if(findBook.length==0){
// //             return res.status(400).send({status:false,msg:"no books found"})
// //         }
// //         return res.status(200).send({status:true,msg:findBook})
// //     }catch(err){
// //     res.status(500).send({error:err.message})
// // }
// // }



// const getBookByParams= async function(req,res){
// try{

//     let bookId=req.params.bookId

//     if (!isValidObjectId(bookId)) 
//     { return res.status(400).send(' Invalid Format of userId')}

//     let bookDetails= await BookModel.findById(bookId)
//     if(!bookDetails){return res.status(400).send(" invalid bookId ")}



//     console.log(bookDetails)
//   if(bookDetails.isDeleted === false){
//     let reviewDetails2= await ReviewModel.find({bookId:bookDetails._id}).count()
//     let reviewDetails= await ReviewModel.find({bookId:bookDetails._id}).select({ _id: 1, bookId: 1, reviewedBy: 1, reviewedAt: 1, rating: 1, review: 1 })
//     console.log(reviewDetails)


//   const  bookDetailsWithReviewDetails={
//       _id:bookDetails._id,
//       title:bookDetails.title,
//       excerpt:bookDetails.excerpt,
//       userId:bookDetails.userId,
//       category:bookDetails.category,
//     subcategory:bookDetails.subcategory,
//     deleted:bookDetails.deleted,
//     reviews:reviewDetails2,
//     deletedAt: bookDetails.deletedAt,
//     releasedAt: bookDetails.releasedAt,
//     createdAt:bookDetails.createdAt,    
//     updatedAt: bookDetails.updatedAt,
//     reviewsData:reviewDetails
      
//    }
// console.log(bookDetailsWithReviewDetails)

//     return res.status(200).send({status:true,data:bookDetailsWithReviewDetails})
// }else{
//   return res.status(400).send(" book is deleted")
// }


// }catch(err){
//     return res.status(500).send({error:err.message})
// }
// }

// const updateBooks = async function (req, res) {
//     const data = req.body
//     const title = data.title
//     const ISBN = data.ISBN
//     const excerpt = data.excerpt
//     const releasedAt = data.releasedAt

//     if(Object.keys(data)==0){return res.status(400).send('data  is missing')}

   
//     let bookId=req.params.bookId

//     if (!isValidObjectId(bookId)) 
//     { return res.status(400).send(' Invalid Format of userId')}

//     let findId = await BookModel.findById(bookId)
//     if (!findId) return res.status(404).send({ status: false, msg: "book not available" })

//     let data2 = findId.isDeleted

//     if (data2 === false) {
//         let findTitle = await BookModel.findOne({ title:title })
//         if (findTitle) return res.status(400).send("Title is already given please choose another name")
    
//         let findIsbn = await BookModel.findOne({ ISBN:ISBN })
//         if (findIsbn) return res.status(400).send("Number is given to another book choose anothor book number")

//         let updateBook1 = await BookModel.findOneAndUpdate({ _id: bookId }, { title: title, ISBN: ISBN, excerpt: excerpt, releasedAt: releasedAt }, { new: true })
//      //   if (!updateBook1) return res.status(404).send({ status: false, msg: "Book is not available" })
//         res.status(200).send({ status: true, message: "success", data: updateBook1 })

//     } else {
//         return res.status(404).send({ status: false, msg: "Book is already deleted" })
//     }


// }




// // const updateBooks= async function(req,res){
// //     try{
// //         const data=req.body
// //         const bookId=req.params.bookId

// //         const bookId2=await BookModel.findById(bookId)
// //         if(!bookId2){return res.status(400).send("bookId does not exist")}

// //     if (bookId2.isDeleted=== false) {
// // const updateBook= await BookModel.findOneAndUpdate({_id:bookId},data,{new:true})

// // return res.status(202).send({status:true,data:updateBook})
// //     }else{
// //         return res.status(404).send({ status: false, msg: "blog has been already deleted" })
// //     }
    

// //     }catch(err){
// //         return res.status(500).send({error:err.message})
// //     }

// // }


// const deleteBooks = async function (req,res){
//     try{
//         const bookId=req.params.bookId

//         if(!isValidObjectId(bookId.trim())){
//             return res.status(400).send({ status : false, msg : "Invalid bookId"})
//         }
   
//         const bookId1= await BookModel.findById(bookId)
//         if(!bookId1){return res.status(404).send("bookId does not exist")}

//         if(bookId1.isDeleted=== false){
//             const deletebook = await BookModel.findOneAndUpdate({_id:bookId},{isDeleted:true,deletedAt: new Date()},{new:true})
//             res.status(200).send({ status: true, message: 'deleted successfully',data:deletebook })
//         }else{
//             {return res.status(400).send("already deleted")}
//         }

//     }catch(err){
//         return res.status(500).send({error:err.message})
//     }
// }






// module.exports.createBook=createBook
// module.exports.getBook=getBook
// module.exports.getBookByParams=getBookByParams
// module.exports.updateBooks=updateBooks
// module.exports.deleteBooks=deleteBooks

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// const jwt=require ('jsonwebtoken')

// const isValid = function (value) {
//     if (typeof (value) == "undefined" || typeof (value) == "null") { return false }
//     if (typeof (value) == "string" && value.trim().length == 0) { return false }
//     if (typeof (value) == "string" && value.trim().length > 1) { return true }
//     return true
// }

// const createUser = async function (req, res) {
//     try {
//          const data = req.body
//          if(Object.keys(data)==0){return res.status(400).send('data  is missing')}

//         let { name,password} = data
     
//         const req0 = isValid(data.title)
//         if (!req0) {
//             return res.status(400).send("title is required")
//         }
//         const title=data.title.trim()

//      // title shoulb be  enum
//         const isValidTitle = function (title) {
//             return ["Mr", "Mrs", "Miss"].indexOf(title) !== -1
//         }

//         if (!isValidTitle(title)) {
//             return res.status(400).send({ status: false, message: `${title} title is not valid` })
//         }
// //        // name is requires

//         const req1 = isValid(name)
//         if (!req1) {
//             return res.status(400).send("name is required")
//         }
//       // phone is required
         
//         const req2 = isValid(data.phone)
//         if (!req2) {
//             return res.status(400).send("phone is required")
//         }
//         const phone=data.phone.trim()
       
//         //phone is already used
//         const phoneIsAlreadyUsed = await UserModel.findOne({ phone: phone })
//         if (phoneIsAlreadyUsed) {
//             return res.status(400).send("phone is already exist")
//         }
//       //  phone must be valid
//         if (!(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/.test(phone))) {
//             return res.status(400).send("phone is invalid")
//         }

//       // email is required
//         const req3 = isValid(data.email)
//         if (!req3) {
//             return res.status(400).send("email is required")
//         }
//         const email=data.email.trim()

//         //email is valid
//         const emailIsAlreadyUsed = await UserModel.findOne({ email: email })
//         if (emailIsAlreadyUsed) {
//             return res.status(400).send("email is already exist")
//         }

//         //email is invalid
//         if (!(/^([\w][\w\.](?!\.)@gmail.com)$/.test(email))) {
//             return res.status(400).send("email is invalid")
//         }

//       // password is required
//         const req4 = isValid(password)
//         if (!req4) {
//             return res.status(400).send("password is required")
//         }

//     //password should be between 8 to 15
//         if (password.trim().length < 8 || password.trim().length > 15) {
//             return res.status(400).send("password should be between 8 to 15")
//         }


//         if (!isValid(data.address)) {
//             res.status(400).send({ status: false, message: "User address is required" })
//             return
//         }

        
//         if(!isValid(data.address.street))
//         return res.status(400).send({ status : false, msg : "street is required" })
 
        
//         if(!isValid(data.address.city))
//         return res.status(400).send({ status : false, msg : "city is required" })

        
//         if(!isValid(data.address.pincode))
//         return res.status(400).send({ status : false, msg : "pincode is required" })
//         const pincode =req.body.address.pincode.trim()

//         if(!(/^[1-9][0-9]{5}$/.test(pincode)))
//         { return  res.status(400).send("pincode is invalid")}


    


//         const createData = await UserModel.create(data)
//         res.status(201).send({ status: true, data: createData })
//     }
//     catch (err) {
//         res.status(500).send({ error: err.message })
//     }

// }



// const loginUser=async function(req,res){
//     try{
//     const data=req.body
//     if(Object.keys(data)==0){return res.status(400).send('data  is missing')}
   
//     const {email, password } = data


// //email is required
//     const req3 = isValid(email)
//     if (!req3) {
//         return res.status(400).send("email is required")
//     }

//     //password is required
//     const req4 = isValid(password)
//     if (!req4) {
//         return res.status(400).send("password is required")
//     }

//     // email is not registered
//       const findEmail= await UserModel.findOne({email:email})
//       if(!findEmail){ return res.status(400).send("email is not registered")}

//      // password is invalid
//       const findPassword= await UserModel.findOne({password:password})
//       if(!findPassword){ return res.status(400).send("Password is invalid")}


// if(findEmail && findPassword)
// {
//     // creating token
//     const  token =  jwt.sign({
//         userId:findEmail._id,
//         iat:Math.floor(Date.now() /1000),
//         exp:Math.floor(Date.now() /1000)+ 60*30
//      },'Book-Management')
//      res.header('x-api-key',token)
//      return res.status(200).send({ status: true, message: 'User login successfully', token: token })
// }
// }
// catch (err) {
//     //return res.status(401).send({error: "jwt expired"})
//     res.status(500).send({ error: err.message })
// }
// }

// module.exports.loginUser = loginUser

// module.exports.createUser = createUser



// // const UserModel = require('../models/userModel')
// // const jwt = require('jsonwebtoken')
// // //const validate = require('validator');
// // //const { request } = require('express');

// // const isValid = (value) => {

// //     if (typeof (value) === 'undefined' || typeof (value) === 'null') {
// //         return false;
// //     }
// //     if (typeof (value) === "string" && value.trim().length === 0) {
// //         return false;
// //     }
// //     return true
// // }

// //const title = requestBody.title.trim()
// // const isValidTitle = (title) => {
// //     return ['Mr', 'Mrs', 'Miss'].indexOf(title) !== -1
// // }

// // const isValidEmail = (email) => {
// //     if (validate.isEmail(email)) {
// //         return true
// //     }
// // }


// // const isValidRequestBody = (requestBody) => {
// //     return Object.keys(requestBody).length > 0
// // }

// // const createUser = async function (req, res) {
// //     try {

// //         let requestBody = req.body;
// //         if (!isValidRequestBody(requestBody)) {
// //             return res.status(400).send({ status: false, message: "Invalid request Parameters. Please provide User Details" })
// //         }

//         // Extracting Parameters

//         // const { title, name, phone, email, password, address } = req.body;

//         // // Validating....

//         // if (!isValid(title)) {
//         //     res.status(400).send({ status: false, message: "Title is required" })
//         //     return
//         // }

//         // if (!isValidTitle(title)) {
//         //     res.status(400).send({ status: false, message: "Title Should Be Among Mr , Mrs , Miss" })
//         //     return
//         // }

//         // if (!isValid(name)) {
//         //     res.status(400).send({ status: false, message: "User Name is required" })
//         //     return
//         // }

//         // if (!isValid(phone)) {
//         //     res.status(400).send({ status: false, message: "User phone number is required" })
//         //     return
//         // }

//         // if (!isValid(email)) {
//         //     res.status(400).send({ status: false, message: "User email is required" })
//         //     return
//         // }

//         // if (!validate.isEmail(email)) {
//         //     return res.status(400).send({ status: false, msg: "Invalid Email" })
//         // }

//         // if (!isValid(password)) {
//         //     res.status(400).send({ status: false, message: "User password is required" })
//         //     return
//         // }

//         // if (password.trim().length < 8 || password.trim().length > 15) {
//         //     res.status(400).send({ status: false, message: "password should be 8 to 15 characters" })
//         //     return
//         // }

//         // if(!isValidRequestBody(address))
//         //   return res.status(400).send({ status : false, msg : "address" })

//         // if (!isValid(address)) {
//         //     res.status(400).send({ status: false, message: "User address is required" })
//         //     return
//         // }

//         // if(!isValid(address.street))
//         // return res.status(400).send({ status : false, msg : "street is required" })
 
        
//         // if(!isValid(address.city))
//         // return res.status(400).send({ status : false, msg : "city is required" })

        
//         // if(!isValid(address.pincode))
//         // return res.status(400).send({ status : false, msg : "pincode" })
        

//         // const isPhoneAlreadyUsed = await UserModel.findOne({ phone });

//         // if (isPhoneAlreadyUsed) {
//         //     res.status(400).send({ status: false, message: `${phone} is Already Registered` })
//         //     return
//         // }

//         // const isEmailAlreadyUsed = await UserModel.findOne({ email });

//         // if (isEmailAlreadyUsed) {
//         //     res.status(400).send({ status: false, message: `${email} is Already Registered` })
//         //     return
//         // }


// //         const userData = await UserModel.create( req.body );
// //         return res.status(201).send({ status: true, message: 'User Created Successfully', user: userData })
        

// //     } catch (err) {
// //         //if(SyntaxError == true)
// //         //res.send()
// //         return res.status(500).send({ status: false, message: err.message })
        
// //     }
// // }




// ////   login_Part   ////
// // const loginUser = async function (req, res) {
// //     try {

// //         const requestBody = req.body;

// //         if (!isValidRequestBody(requestBody)) {
// //             res.status(400).send({ status: false, message: "Invalid request parameters . Please Provide login Details" })
// //         }

// //         const { email, password } = requestBody

// //         if (!isValid(email)) {
// //             res.status(400).send({ status: false, message: "Email is required" })
// //             return
// //         }

// //         if (!validate.isEmail(email)) {
// //             return res.status(400).send({ status: false, message: "Invalid email" })
// //         }

// //         if (!isValid(password)) {
// //             return res.status(400).send({ status: false, message: "Password is required" })
// //         }

// //         let user = await UserModel.findOne({ email, password });

// //         if (!user)
// //             return res.status(404).send({ status: false, message: "User Not Found , plz check Credentials", });


// //         const token = jwt.sign({
// //             user : user._id,
// //             iat: Math.floor(Date.now() / 1000),
// //             exp: Math.floor(Date.now() / 1000) + 10 * 60 * 60
// //         }, 'Book-Management')

// //         res.header('x-api-key', token)
// //         res.status(200).send({ status: true, message: `User login successfully`, data: { token } })

// //     } catch (error) {
// //         res.status(500).send({ status: false, message: error.message })
// //         return
// //     }

// // };

// //  module.exports.loginUser = loginUser

// //  module.exports.createUser = createUser