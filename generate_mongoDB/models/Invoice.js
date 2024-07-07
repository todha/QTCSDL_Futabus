// models/Invoice.js

const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const invoiceSchema = new mongoose.Schema({
    maHoaDon: { type: Number, required: true, unique: true, min: 1000000000, max: 9999999999 },
    kyHieu: { type: String, required: true },
    soHoaDon: { type: Number, required: true },
    loTrinh: { type: String, required: true },
    giaVe: { type: Number, required: true },
    soGhe: { type: String, required: true },
    soXe: { type: String, required: true },
    thoiGianXuatBen: { type: Date, required: true },
    ngayKhoiHanh: { type: Date, required: true },
}, { timestamps: true });

invoiceSchema.plugin(uniqueValidator);

const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;
