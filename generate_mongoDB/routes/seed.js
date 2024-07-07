// routes/seed.js
const express = require("express");
const router = express.Router();
const faker = require("faker");
const Invoice = require("../models/Invoice");
const { v4: uuidv4 } = require('uuid');

function generateUniqueInvoiceNumber() {
    // Tạo số ngẫu nhiên 10 chữ số và kiểm tra sự duy nhất
    let maHoaDon;
    do {
        maHoaDon = Math.floor(1000000000 + Math.random() * 9000000000);
    } while (!isUniqueInvoiceNumber(maHoaDon));
    return maHoaDon;
}
async function isUniqueInvoiceNumber(maHoaDon) {
    // Kiểm tra xem mã hóa đơn đã tồn tại trong cơ sở dữ liệu chưa
    const existingInvoice = await Invoice.findOne({ maHoaDon });
    return !existingInvoice;
}

// Route để tạo dữ liệu mẫu
router.get("/seed", async (req, res) => {
    const seed_count = 100000;
    let invoiceData = [];

    for (let i = 0; i < seed_count; i++) {
        // const maHoaDon = faker.datatype.number({ min: 100000, max: 999999 });
        // Generate unique ID
        const maHoaDon = generateUniqueInvoiceNumber();
        const kyHieu = faker.random.alphaNumeric(5).toUpperCase();
        const soHoaDon = faker.datatype.number({ min: 1, max: 1000 });
        const loTrinh = `${faker.address.city()} - ${faker.address.city()}`;
        const giaVe = faker.datatype.number({ min: 100000, max: 1000000 });
        const soGhe = `A${faker.datatype.number({ min: 1, max: 40 })}`;
        const soXe = faker.vehicle.vin().slice(0, 7).toUpperCase();
        const thoiGianXuatBen = faker.date.future();
        const ngayKhoiHanh = faker.date.between(thoiGianXuatBen, faker.date.future());

        invoiceData.push({
            maHoaDon,
            kyHieu,
            soHoaDon,
            loTrinh,
            giaVe,
            soGhe,
            soXe,
            thoiGianXuatBen,
            ngayKhoiHanh
        });
    }

    // try {
    //     await Invoice.insertMany(invoiceData);
    //     res.status(200).send("Data seeded successfully!");
    // } catch (error) {
    //     console.error("Error seeding data:", error);
    //     res.status(500).send("Error seeding data");
    // }
    const batchSize = 500; // Số lượng document mỗi batch
    const totalDocs = invoiceData.length;

for (let i = 0; i < totalDocs; i += batchSize) {
    const batch = invoiceData.slice(i, i + batchSize);
    try {
        await Invoice.insertMany(batch);
        console.log(`Batch ${i / batchSize + 1} seeded successfully!`);
    } catch (error) {
        console.error(`Error seeding batch ${i / batchSize + 1}:`, error.message);
    }
}
});

module.exports = router;
