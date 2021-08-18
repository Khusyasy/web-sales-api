require("dotenv").config();
const seeder = require('mongoose-seed');
const faker = require('faker');
const mongoose = require('mongoose');

const usersFakes = [];
const transactionFakes = [];

for(let i = 0; i < 100; i++) {
  let user = {
    _id: mongoose.Types.ObjectId(),
    email: faker.internet.email(),
    password: faker.datatype.string(),
    status: "user",
  };
  usersFakes.push(user);
  let n = 3 - Math.ceil(Math.random() * 2);
  for(let j = 0; j < n; j++) {
    let transaction = {
      _id: mongoose.Types.ObjectId(),
      service: faker.commerce.productName(),
      total: faker.commerce.price(),
      transactionDate: faker.date.between('2021-08-01', '2021-08-31'),
      userId: user._id,
    };
    transactionFakes.push(transaction);
  }
}

// add admin data
usersFakes.push({
  _id: mongoose.Types.ObjectId(),
  email: "admin@admin.com",
  password: "admin",
  status: "admin",
});

const data = [
  {
    'model': 'User',
    'documents': usersFakes,
  },
  {
    'model': 'Transaction',
    'documents': transactionFakes,
  }
];

// Connect to MongoDB via Mongoose
seeder.connect(process.env.DB_CONNECTION_STRING, function() {
 
  // Load Mongoose models
  seeder.loadModels([
    'models/User.js',
    'models/Transaction.js'
  ]);
 
  // Clear specified collections
  seeder.clearModels(['User', 'Transaction'], function() {
 
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function() {
      seeder.disconnect();
    });
 
  });
});
