const express=require("express")
const mongoose=require("mongoose")
const app=express()
const dotenv=require("dotenv")
dotenv.config()
const productModel=require("./schema.js")
const connectDB=require("./db.js")
app.use(express.json())


mongoose.connect(process.env.mongo_url)
.then(()=>{
  console.log("connected to mongodb")
})
.catch((error)=>{
  console.log(error)
})



app.get("/",(req,res)=>{
    try {
       res.status(200).json("Welcome")
    } catch (error) {
       console.log(error)
       res.status(500).json("internal server error")
    }
})


app.post("/menu",async(req,res)=>{
 
  try {
    if(!req.body.name ||  !req.body.price){
      return res.status(400).json({message:"Required data is not avaliable"})
    }

    const product=new productModel(req.body)
    await product.save()
    res.status(200).json("Product added Successfully")

  } catch (error) {
    console.log(error)
    res.status(500).json("internal server error")
  }

})

app.get("/menu",async(req,res)=>{
  try {
    const menu= await productModel.find()
    return res.status(200).send(menu)
  } catch (error) {
    console.log(error)
    res.status(500).json("internal server error")
  }
})


app.put("/menu/:id",async(req,res)=>{
  try {
    const id=req.params.id

     let updatedproduct=await productModel.findByIdAndUpdate(id,req.body,{new:true})
     res.status(200).json({message:"product updated",data:updatedproduct})
  } catch (error) {
    console.log(error)
    res.status(500).json("internal server error")
  }
})

app.delete("/menu/:id",async(req,res)=>{
  try {
    const id=req.params.id
     await productModel.findByIdAndDelete(id)
     res.status(200).json({message:"product deleted"})
  } catch (error) {
    console.log(error)
    res.status(500).json("internal server error")
  }
})










app.listen(process.env.PORT,()=>{
  try {
    console.log(`server is running on http://localhost:${process.env.PORT}`)
  } catch (error) {
    console.log(error)
  }
})



