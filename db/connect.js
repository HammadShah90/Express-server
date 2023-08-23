import mongoose from 'mongoose';

const uri = ""

const connectDB = () => {
    console.log("Connect DB");
    return mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}

export default connectDB