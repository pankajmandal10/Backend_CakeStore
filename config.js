const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.connect(
  "mongodb+srv://pankajmandal10696:f2nJpE6hC7Ki9qPx@cluster0.4moybyc.mongodb.net/CakeStore",
  {
    useNewUrlParser: true,
  }
);

//  end pankaj code
