import { Schema, model, models } from 'mongoose'

const workSchema = new Schema(
  {
    type: {
      type: String,
      trim: true
    },
    quantity: {
      type: Number,
      trim: true
    },
    longitude: {
      type: Number,
      trim: true
    },
    implementationDate: {
      type: Date,
      trim: true
    },
    area: {
      type: Number,
      trim: true
    },
    volume: {
      type: Number,
      trim: true
    },
    species: {
      type: String,
      trim: true
    },
    site: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
)

module.exports = models.Works || model('Works', workSchema)
