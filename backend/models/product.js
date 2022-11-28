const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Porfavor ingrese un nombre para su producto"],
    trim: true,
    
  },
  price: {
    type: Number,
    required: [true, "Porfavor ingrese un precio para su venta"],
    trim: true,
    maxLength: [5, "El precio del producto no puede pasar sobre las 5 cifras"],
    default: 0,
  },
  description: {
    type: String,
    required: [true, "Por favor ingresa una descripcion"],
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Selecciona una categoria"],
    enum: {
      values: ["Ninguna Categoria","Rolls Especiales", "Rolls sin Arroz", "Rolls Apanados","Rolls Frios", "Vegi Rolls", "APPETIEZERS","Bebestibles","Salsas y Extras"],
      message: "Por favor selecciona una categoria",
    },
  },
  seller: {
    type: String,
    default: "Fukusuke Sushi",
  },
  stock: {
    type: Number,
    requried: [true, "Por favor Ingresa una cantidad para su Venta"],
    default: 0,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
