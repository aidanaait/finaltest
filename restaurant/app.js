const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const {urlencoded} = require("body-parser");
const Restaurants = require("./models/Restaurant");
const app = express();
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));
//Database connection
const url = "mongodb://localhost:27017/Restaurants";
mongoose.connect(url)
app.get("/restaurants", async (req, res) => {
    const restaurants = await Restaurants.find()
    res.send(restaurants);
});
app.delete(
    '/restaurant/:id',
    async (req, res) => {
        await Restaurants.deleteOne({'_id': req.params.id});
        res.send({})
    })

app.put("/restaurant/:id", async (req, res) => {
    const restaurant = await Restaurants.findById(req.params.id);
    restaurant.stars = req.body.rating;
    await restaurant.save();
    res.send({});
});
app.get("/restaurant/:id", async (req, res) => {
    console.log("ID")
    const user = await Restaurants.findById(req.params.id);
    res.send(user);
});
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`The server is up and listening on port ${port}`);
});

