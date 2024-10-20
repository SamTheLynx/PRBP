const mongoose = require('mongoose');
const {Schema} = mongoose;


const restaurantSchema = new mongoose.Schema({
  RestaurantName: {
    type: String,
  },
  year: {
    type: Number,
  },
  dateOfCommission: {
    day: { type: Number },
    month: { type: Number },
    year: { type: Number }
  },
  RestaurantAddress:{
    type: String,
  },
  RestaurantTelegraphicAddress: {
    type: String,
  },
  RestaurantTelexNumber: {
    type: String
  },
  RestaurantTelephoneNumber: {
    type: String,
    match: /^[0-9]{11}$/  // Matches the format like 03008639175
  },
  location: {
    Province: { type: String },
    Town: { type: String },
    Street: { type: String },
    UC: { type: String }
  
  },
  nature: {
    type: String,
  },
  OwnerName: {
    type: String,
  },
  OwnerAddress: {
    type: String,
   
  },
  OwnerTelephonicAddress: {
    type: String,
    
  },
  OwnerTelephoneNumber: {
    type: String,
  },
  ManagerName: {
    type: String,
  },
  ManagerAddress: {
    type: String,
   
  },
  ManagerTelephoneNumber: {
    type: String,
    
  },
  OwnerTelephoneNumber: {
    type: String,
  },
  size: {
    totalArea: { type: String },
    pantryArea: { type: String },
    diningArea: { type: String },
    kitchenArea: { type: String}
  },
  cost: {
    furniture: { type: String },
    rent: { type: String },
    equipment: { type: String },
    capital: { type: String },
    investment: { type: String }
  },
  furniture: {
    reception: { type: String},
    telephone: { type: String },
    cloakRoom: { type: String },
    toilet: { type: String },
    carPark: { type: String },
    entertainment: { type: String},
    airConditioning: { type: String }
  },
  cuisines: {
    type: String,
    
  },
  guests: {
    type: String,
   
  },
  managerTotal: {
    type: Number,
   
  },
  receptionTrained: {
    type: Number,
   
  },
  billingExperienced: {
    type: Number,
   
  },
  cooksTotal: {
    type: Number,
    
  },
  cooksTrained: {
    type: Number,
   
  },
  othersTotal: {
    type: Number,
   
  },
  firstRate: {
    type: String,
   
  },
  secondRate: {
    type: String,
    
  },
  teleNumber: {
    type: String,
  }
});
  
  const Restaurant = mongoose.model('Restaurant', restaurantSchema);

  module.exports = Restaurant;