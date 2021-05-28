const { Schema, model } = require('mongoose');

const catSchema = new Schema(
  {
    name: String,
    age: {
      type: Number,
      min: 0,
      max: 35,
    },
    isVaccinated: {
      type: Boolean,
      default: false,
    },
    owner: {
      name: String,
      age: Number,
    },
    features: {
      type: Array,
      set: data => (!data ? [] : data),
    },
  },
  { versionKey: false, timestamps: true }
);

const Cat = model('cat', catSchema);

module.exports = Cat;
