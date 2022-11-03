import { Schema, model, models } from 'mongoose'

const farmerSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    identifier: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    image: {
      type: String,
      trim: true
    },
    coordinates: [],
    hydricRegime: {
      type: String,
      trim: true,
      required: true
    },
    municipality: {
      type: String,
      trim: true,
      required: true
    },
    state: {
      type: String,
      trim: true,
      required: true
    },
    snowArea:  {
      type: Number,
      trim: true,
      required: true
    },
    agricultureTechnology: {
      type: String,
      trim: true,
      required: true
    },
    hydricRegime: {
      type: String,
      trim: true,
      required: true
    }
  },
  {
    timestamps: true
  }
)

module.exports = models.Farmers || model('Farmers', farmerSchema)
