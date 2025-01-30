const mongoose = require("mongoose");
const uri =
  "mongodb+srv://ericchen:rarara96828@cluster0828eric.x6euv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0828eric";

dotenv.config();

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch((err) => console.error("MonogoDB connection error; ", err));
