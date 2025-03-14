//Array de metodos (C R U D)
const ReviewsController = {};
import ReviewsModel from "../models/Review.js";

// SELECT
ReviewsController.getreviews = async (req, res) => {
  const Reviews = await ReviewsModel.find().populate('idCliente');
  res.json(Reviews);
};

// INSERT
ReviewsController.createreviews = async (req, res) => {
  const {comment,
    rating,
    idCliente
     } = req.body;

  const newClient = new ReviewsModel({ 
    comment,
    rating,
    idCliente});
  await newClient.save();
  res.json({ message: "reviews saved" });
};

// DELETE
ReviewsController.deletereviews = async (req, res) => {
  const deletedClient = await ReviewsModel.findByIdAndDelete(req.params.id);
  if (!deletedClient) {
    return res.status(404).json({ message: "reviews no find" });
  }
  res.json({ message: "reviews deleted" });
};

// UPDATE
ReviewsController.updatereviews = async (req, res) => {
  // Solicito todos los valores
  const { comment,
    rating,
    idCliente } = req.body;
  // Actualizo
  await ReviewsModel.findByIdAndUpdate(
    req.params.id,
    {
        comment,
        rating,
        idCliente
    },
    { new: true }
  );
  // muestro un mensaje que todo se actualizo
  res.json({ message: "reviews updated" });
};

export default ReviewsController;