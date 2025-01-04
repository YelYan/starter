const mongoose = require("mongoose")

const connectDatabse = async () => {
try {
    await mongoose.connect(process.env.MONGO_URL)
} catch (error) {
    console.log(`${error}`.red);
}
}

module.exports = connectDatabse
