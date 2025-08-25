const express = require('express');
const connection = require('./config/db');

const app = express();
app.use(express.json());
(async () => {
    try {
        await connection();
        console.log("Kết nối MongoDB thành công!");
    } catch (error) {
        console.log(" Lỗi kết nối DB:", error);
    }
})();
app.get("/", async (req, res) => {
    return res.status(200).json("test thành công!");
});
app.listen(5000, () => {
    console.log(" Server đang chạy");
});
