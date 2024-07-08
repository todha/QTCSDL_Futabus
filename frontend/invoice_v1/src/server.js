// server/server.js
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();
// app.use(cors());

// mongoose.connect('mongodb://localhost:27017/invoice', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Define schema and model
// const invoiceSchema = new mongoose.Schema({
//   maHoaDon: Number,
//   kyHieu: String,
//   soHoaDon: Number,
//   loTrinh: String,
//   giaVe: Number,
//   soGhe: String,
//   soXe: String,
//   thoiGianXuatBen: Date,
//   ngayKhoiHanh: Date,
// });

// const Invoice = mongoose.model('Invoice', invoiceSchema);

// // API endpoint to fetch invoice by maHoaDon
// app.get('/api/Invoice/:maHoaDon', async (req, res) => {
//   try {
//     const invoice = await Invoice.findOne({ maHoaDon: parseInt(req.params.maHoaDon) });
//     if (invoice) {
//       res.json(invoice);
//     } else {
//       res.status(404).send('Invoice not found');
//     }
//   } catch (error) {
//     res.status(500).send('Error fetching invoice');
//   }
// });

// // Start the server
// app.listen(5000, () => {
//   console.log('Server is running on http://localhost:8085');
// });
