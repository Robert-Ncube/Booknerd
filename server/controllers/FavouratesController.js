import Favourates from "../models/FavouratesModel.js";

export const getAllFavouratesByUserId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: "Missing params: User ID!",
      });
    }

    const favourates = await Favourates.find({ userId: id });

    // if (!favourates) {
    //   return res.status(404).json({
    //     success: false,
    //     error: "Favourates not found for this user.",
    //   });
    // }

    res.status(200).json({ success: true, data: favourates });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server error: Could not get favourates.",
      details: error.message,
    });
  }
};

export const addFavourate = async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    if (!userId || !bookId) {
      return res.status(400).json({
        success: false,
        error: "Missing params: User ID or Book ID!",
      });
    }

    const existingFavourate = await Favourates.findOne({
      userId,
      bookId,
    });

    if (existingFavourate) {
      return res.status(400).json({
        success: false,
        error: "Favourate already exists for this user and book.",
      });
    }

    const newFavourate = new Favourates({ userId, bookId });
    await newFavourate.save();

    res.status(201).json({ success: true, data: newFavourate });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server error: Could not add favourate.",
      details: error.message,
    });
  }
};

export const deleteFavourate = async (req, res) => {
  try {
    const { id: userId, bookId } = req.params;

    if (!userId || !bookId) {
      return res.status(400).json({
        success: false,
        error: "Missing params: User ID or Book ID!",
      });
    }

    const deletedFavourate = await Favourates.findOneAndDelete({
      userId,
      bookId,
    });

    if (!deletedFavourate) {
      return res.status(404).json({
        success: false,
        error: "Favourate not found for this user and book.",
      });
    }

    res.status(200).json({ success: true, data: deletedFavourate });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server error: Could not delete favourate.",
      details: error.message,
    });
  }
};
