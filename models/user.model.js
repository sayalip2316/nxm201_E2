const mongoose=require("mongoose")
const bcrypt=require("bcrypt")

const userSchema=new mongoose.Schema({
    email:{type:String, required:true,unique:true},
    password:{type:String, required:true},
    role:{type:String, required:true}
})

userSchema.pre('save',async function(next){
    try {
        const salt= await bcrypt.genSalt(8)
        const hashedPassword=await bcrypt.hash(this.password,salt)
        this.password=hashedPassword
        next()
    } catch (error) {
        next(error)
    }
   
})

const UserModel=mongoose.model('Users',userSchema)

module.exports = UserModel