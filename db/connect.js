import mongoose from 'mongoose';

const connectDB = (uri) => {
    const connectDataBase = mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    console.log("Connect with DataBase");
    return connectDataBase;
}

export default connectDB