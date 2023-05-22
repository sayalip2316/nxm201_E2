const express=require("express")
const productRouter=express.Router()
const {ProductModel}=require("../models/product.model")
const [authenticate, authorize]=require("../middlewares/auth.middleware")

productRouter.get("/",authenticate,async(req,res)=>{
    try {
        const products=await ProductModel.find()
        res.status(200).send({Products:products})
    } catch (error) {
        res.status(400).send({error:error.message})
    }
})
const EnumRole = {
    SELLER : "Seller",
    USER : "User"
    }

productRouter.post("/addproducts",authenticate,authorize([EnumRole.SELLER]),async(req,res)=>{
    try {
        const products=new ProductModel(req.body)
        await products.save()
        res.status(200).send({msg:"Product added successfully"})
    } catch (error) {
        res.status(400).send({error:error.message})
    }
})

productRouter.delete("/deleteproducts/:id",async(req,res)=>{
    try {
        const {id}=req.params
        await ProductModel.findByIdAndDelete({_id:id})
        res.status(200).send({msg:"Product deleted successfully"})
    } catch (error) {
        res.status(400).send({error:error.message})
    }
})

module.exports={productRouter}