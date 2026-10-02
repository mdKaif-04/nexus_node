import mongoose from "mongoose"

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('DB Connected')
    }
    catch (err) {
        console.log('DB error ${err}')
    }
}
export default connectDb
