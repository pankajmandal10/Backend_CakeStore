const dbConnect = require("./mongodb");

// const main = async () => {
//   let data = await dbConnect();
//   data = await data.find({ category: "men's clothing" }).toArray();
//   console.warn(data);
// };
// main();

// const insertData = async () => {
//   const db = await dbConnect();
//   db.insertOne({
//     title: "Mens Casual Slim Fit",
//     price: 15.99,
//     description:
//       "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
//     category: "men's clothing",
//     image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
//     rating: {
//       rate: 2.1,
//       count: 430,
//     },
//   });
// };
// insertData();

// const updateData = async () => {
//   const db = await dbConnect();
//   const result = await db.updateOne(
//     {
//       price: 109.95,
//     },
//     { $set: { price: 6000 } }
//   );
//   console.log(result);
// };
// updateData();
