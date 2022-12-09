import mongoose from "mongoose"

mongoose.connect("mongodb+srv://shahmir_99:firecape188@cluster0.pppostr.mongodb.net/imageStack?retryWrites=true&w=majority").then(() => {
    console.log("Connection With mongodb Successfully")
}).catch((error) => {
    console.log(error.message)
})






// mongoose.connect("mongodb://127.0.0.1:27017/memories").then(() => {
//     console.log("Connection With mongodb Successfully")
// }).catch((error) => {
//     console.log(error.message)
// })