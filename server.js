const express = require('express');
const connection = require('./config/db');
const routeAPI= require('./route/routeAPI.route')
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
(async () => {
    try {
        await connection();
        console.log("Kết nối MongoDB thành công!");
    } catch (error) {
        console.log(" Lỗi kết nối DB:", error);
    }
})();
app.use('/api',routeAPI)
app.listen(5000, () => {
    console.log(" Server đang chạy");
});
