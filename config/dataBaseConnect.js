// dataBaseConnect;
const { connect } = require("mongoose");

// const Cat = mongoose.model("Cat", { name: String });

// const kitty = new Cat({ name: "Zildjian" });
// kitty.save().then(() => console.log("meow"));
const dataBaseConnect = async () => {
  try {
    const db = await connect(process.env.MONGODB_URI);
    console.log(
      `Database is connected. Name: ${db.connection.name}. Port: ${db.connection.port}. Host: ${db.connection.host}`
        .green.bold.italic
    );
  } catch (error) {
    console.log(error.message.red.bold);
    process.exit(1);
  }
};

module.exports = dataBaseConnect;
