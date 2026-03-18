import colors from "colors"
import mongoose from "mongoose"


const connectDb = async () => {
    try {
        let conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Database it successfully connected to ${conn.connection.name}`.bgGreen)
    } catch (error) {
        console.log(`Database connection failed`,error)
    }
}
export default connectDb