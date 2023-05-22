const express=require("express")
const {connection}=require("./db")
const {hashRouter}=require("./routes/hash.routes")
const {userRouter}=require("./routes/user.route")
const {productRouter}=require("./routes/product.route")
const {router}=require("./routes/logout.route")
require("dotenv").config()

const app=express()
app.use(express.json())

app.use(hashRouter)
app.use("/user",userRouter)
app.use("/products",productRouter)
app.use("/user",router)

app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("Connected to db")
        console.log("server is listening on port 4500") 
    } catch (error) {
        console.log(error)
    }
   
})