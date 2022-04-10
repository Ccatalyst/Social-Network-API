const mong = require("mongoose");
mong.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/socialnetworkapi", { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = mong.connection;
