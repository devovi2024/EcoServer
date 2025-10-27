const { FeaturesListService } = require("../services/FeaturesServices");

exports.FeaturesList = async (req, res) => {
  const result = await FeaturesListService(req);
  res.status(200).json(result);
};