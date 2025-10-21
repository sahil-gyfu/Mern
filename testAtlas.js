const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://sahilgadhi6762_db_user:Sahil6762@merncluster.jywlfmk.mongodb.net/studentDB?retryWrites=true&w=majority";

mongoose.connect(mongoURI)
  .then(() => console.log("✅ Connected to Atlas"))
  .catch(err => console.error("❌ Connection error:", err));
