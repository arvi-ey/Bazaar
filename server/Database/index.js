const mongoose = require('mongoose');

exports.DatabaseConnection = async (URL) => {
    try {
        await mongoose.connect(`${URL}`)
        console.log(`Database connected succesfully`)
    }
    catch (error) {
        console.log(error)
    }
}
