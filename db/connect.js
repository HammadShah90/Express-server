import mongoose from 'mongoose';

const connectDB = (uri) => {
    const connectDataBase = mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    console.log("Connected with DataBase");
    return connectDataBase;
}

export default connectDB