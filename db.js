const mongoose=require("mongoose")

const connectDB = async()=>{
    
    try {
        const USER=await mongoose.connect(process.env.mongo_url)
        console.log("Data service is avaliable")
    } catch (error) {
        console.log(error)

        
    }
}


module.exports=connectDB;