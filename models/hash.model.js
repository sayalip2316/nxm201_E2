const mongoose=require("mongoose")

const hashSchema=mongoose.Schema({
    id:{type:Number,required:true},
    password:{type:String, required:true}
},{
    versionKey:false
})

const HashModel=mongoose.model("hashedpwd",hashSchema)

module.exports={HashModel}