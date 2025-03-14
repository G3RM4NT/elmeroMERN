import { Schema, model } from "mongoose";

const reviewsSchema = new Schema(
  {
    comment: {
      type: String,
      require: true,
    },
    rating: {
      type: Number,
      require: true,
      max: 5
    },
    idCliente: {
      type: Schema.Types.ObjectId,
      ref: "Cientes",
      require: true
    },
   
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("Reviews", reviewsSchema);
