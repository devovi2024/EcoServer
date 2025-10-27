const FeatureModel = require('../models/FeaturesModel');

const FeaturesListService = async (req) => {
  try {
    const features = await FeatureModel.find({});
    return { status: "success", data: features };
  } catch (error) {
    return { status: "fail", message: error.message };
  }
};

module.exports = {
  FeaturesListService,
};
