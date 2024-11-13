const express = require('express');
const router = express.Router();
const Report = require('../models/Reports'); // Corrected file path and filename capitalization
const Product = require('../models/Products'); // Corrected file path and filename capitalization
const fetchuser = require('../middleware/fetchuser'); // Import the existing fetchuser middleware

// Create a new report (requires user to be authenticated)
router.post('/createreport', fetchuser, async (req, res) => {
  try {
    const { productId, proofLink, description } = req.body;
    // const userId = req.user._id; // Access user ID from the JWT token

    // Find the product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    console.log("in backennd", product);

    // Create a new report
    const newReport = new Report({
      productId,
      proofLink,
      description,
    //   userId,
      status: 'pending', // Default status for new reports
    });

    console.log("new report", newReport);

    // Save the report in the database
    await newReport.save();

    res.status(201).json({ message: 'Report submitted successfully', report: newReport });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error submitting report', error });
  }
});

// Delete report (requires user to be authenticated)
router.delete('/deletereport/:reportId', fetchuser, async (req, res) => {
  try {
    const { reportId } = req.params;

    // Find and delete the report by ID
    const report = await Report.findByIdAndDelete(reportId);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.status(200).json({ message: 'Report deleted successfully', report });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting report', error });
  }
});

// Get all reports (for admin or authorized users)
// Get all reports (for admin or authorized users)
router.get('/getreports', fetchuser, async (req, res) => {
    try {
      const reports = await Report.find()
        .populate('productId', 'productName')  // Populate only the `name` field from the Product model
        .exec(); // Ensure the query is executed
  
      res.status(200).json(reports);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching reports', error });
    }
  });
  

module.exports = router;
