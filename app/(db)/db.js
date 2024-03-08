import mongoose from "mongoose";


async function ConnectDB() {
  
  try {
    await mongoose.connect(process.env.NEXT_MONGODB_URL);
    console.log("Connected to Database");
  } catch(error) {
    console.log("Error Connectin To database",error);
    
  }
}

export default ConnectDB;