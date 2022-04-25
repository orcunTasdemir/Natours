const mongoose = require('mongoose');
const dotenv = require('dotenv');
//read config file
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<DATABASE_PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log('DB connection successful!'));

// const testTour = new Tour({
//   name: 'The Forest Hiker3',
//   rating: 4.7,
//   price: 497,
// });

// testTour
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log('Error');
//   });

const app = require('./app');

console.log(process.env);

//START SERVER
const port = process.env.PORT || 3000; // default
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
