const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
    trim: true,
    maxLength: [100, "product name cannot exceed 100 characters"]
  },
  price: {
    type: Number,
    required: [true, "Please enter product price"],
    trim: true,
    maxLength: [5, "product price cannot exceed 5 characters"],
    default: 0.0
  },
  description: {
    type: String,
    required: [true, "Please enter product description"]
  },
  ratings: {
    type: Number,
    default: 0
  },
  images: [
    {
      public_id: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      }
    }
  ],
  category: {
    type: String,
    required: [true, "Please select category for this product"],
    enum: {
      values: [
        "Maki",
        "Uruamaki",
        "Nigiri",
        "Sashimi",
        "Futomaki",
        "Temaki",
        "Gunkan",
        "Entrantes",
        "Tempura",
        "Bebestibles"
      ],
      message: "Please select correct category for product"
    }
  },
  seller:{
    type:String,
    default: "Fukusuke Sushi"
  }
  ,
  stock: {
    type: Number,
    requried: [true, "Please enter product stock"],
    maxLength: [5, "product name cannot exceed 5 characters"],
    default: 0
  },
  numberOfReviews: {
    type: Number,
    default: 0
  },
  reviews: [
    {
      name: { type: String, requried: true },
      rating: { type: Number, required: true },
      comment: { type: String, required: true }
    }
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
},
  createdAt:{
    type:Date,
    default:Date.now
  }
});

module.exports = mongoose.model("Product", productSchema);
