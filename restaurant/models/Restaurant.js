const mongoose = require('mongoose');
const restaurantSchema = new mongoose.Schema({
    location: {
        type: String,
    },
    title: {
        type: String,
    },
    stars: {
        type: Number
    }
})
restaurantSchema.method('toJSON', function () {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
});
const Restaurants = mongoose.model("Restaurants", restaurantSchema);
module.exports = Restaurants;

