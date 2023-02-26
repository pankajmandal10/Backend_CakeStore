const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/CakeStore");
const ProductSchema = new mongoose.Schema({
  name: String,
  title: String,
  price: Number,
  category: String,
  rating: Object,
  discriptio: String,
  image: String,
});

// const main = async () => {
//   const ProductsModel = mongoose.model("productlists", ProductSchema);
//   let data = new ProductsModel({
//     title: "Chochallaty - Foldsack No. 1 Backpack, Fits 15 Laptops",
//     price: 1200,
//     description:
//       "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
//     category: "men's clothing",
//     image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
//     rating: {
//       rate: 3.9,
//       count: 120,
//     },
//   });
//   let result = await data.save();
//   console.log(result);
// };
// main();

// const updateData = async () => {
//   const ProductsModel = mongoose.model("productlists", ProductSchema);
//   let data = await ProductsModel.updateOne(
//     { name: "cake1" },
//     {
//       $set: { price: 1000, name: "cakess" },
//     }
//   );
//   console.log(data);
// };
// updateData();

// const deletData = async () => {
//   const product = mongoose.model("productlists", ProductSchema);
//   let data = await product.deleteOne({ name: "cake1" });
//   console.log(data);
// };
// deletData();

// const findInDb = async () => {
//   const product = mongoose.model("productlists", ProductSchema);
//   let data = await product.find({
//     title: "Chochallaty - Foldsack No. 1 Backpack, Fits 15 Laptops",
//   });
//   console.log(data);
// };
// findInDb();
