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
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);

catSchema.virtual('info').get(function () {
  return `${this.name} is ${this.age} years old.`;
});

const Cat = model('cat', catSchema);

module.exports = Cat;
