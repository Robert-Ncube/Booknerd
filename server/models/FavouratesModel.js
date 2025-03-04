import mongoose from "mongoose";

const FavouratesSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  bookId: {
    type: String,
    required: true,
  },
});

const Favourates = mongoose.model("Favourates", FavouratesSchema);

export default Favourates;
