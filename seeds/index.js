const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp');


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});
const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '626c0b2b106a3d9f108de189',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'This is a fabulous vacation spot for young Rigbys!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dxkvnjgbl/image/upload/v1651519203/YelpCamp/gse52xqbrs8sq2gjxzxx.png',
                    filename: 'YelpCamp/gse52xqbrs8sq2gjxzxx',
                },
                {
                    url: 'https://res.cloudinary.com/dxkvnjgbl/image/upload/v1651519203/YelpCamp/rdqsmc113topeuc7gp7p.png',
                    filename: 'YelpCamp/rdqsmc113topeuc7gp7p',
                }
            ],

        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
