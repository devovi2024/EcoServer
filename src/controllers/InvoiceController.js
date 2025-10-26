const {
  CreateInvoiceService,
  PaymentSuccessService,
  PaymentFailService,
  PaymentCancelService,
  PaymentIPNService,
  InvoiceListService,
  InvoiceProductListService,
} = require("../services/InvoiceServices");

// Create Invoice
exports.CreateInvoice = async (req, res) => {
  let result = await CreateInvoiceService(req);
  res.status(200).json(result);
};

// Payment Success
exports.PaymentSuccess = async (req, res) => {
  let result = await PaymentSuccessService(req);
  res.status(200).json(result);
};

// Payment Fail
exports.PaymentFail = async (req, res) => {
  let result = await PaymentFailService(req);
  res.status(200).json(result);
};

// Payment Cancel
exports.PaymentCancel = async (req, res) => {
  let result = await PaymentCancelService(req);
  res.status(200).json(result);
};

// Payment IPN
exports.PaymentIPN = async (req, res) => {
  let result = await PaymentIPNService(req);
  res.status(200).json(result);
};

// Invoice List
exports.InvoiceList = async (req, res) => {
  let result = await InvoiceListService(req);
  res.status(200).json(result);
};

// Invoice Product List
exports.InvoiceProductList = async (req, res) => {
  let result = await InvoiceProductListService(req);
  res.status(200).json(result);
};
