const mongoose=require("mongoose")
const bcrypt=require("bcrypt")

const productSchema=new mongoose.Schema({
    name:{type:String, required:true},
    description:{type:String, required:true},
    price:{type:Number, required:true}
},{
    versionKey:false
})

// userSchema.pre('save',async function(next){
//     try {
//         const salt= await bcrypt.genSalt(8)
//         const hashedPassword=await bcrypt.hash(this.password,salt)
//         this.password=hashedPassword
//         next()
//     } catch (error) {
//         next(error)
//     }
   
// })

const ProductModel=mongoose.model("product",productSchema)
module.exports = {ProductModel}