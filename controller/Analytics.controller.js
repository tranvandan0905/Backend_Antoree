const Analytics = require("../model/Analytics.model")
const GetAnalytics = async(req,res)=>{
    try {
        const dataAnalytics= await Analytics.find({});
        return res.status(200).json({
            data: dataAnalytics,
            message: "Lấy danh sách thành công!"
        })
    } catch (error) {
        return res.status(400).json({
                data: [],
                message: error.message || 'Có lỗi xảy ra!',
            });

    }

}
const PostAnalytics = async (req, res) => {
    try {
        const { ip, userAgent } = req.body;

        if (!ip || !userAgent) {
            return res.status(400).json({
                data: [],
                message: "Thiếu ip hoặc userAgent"
            });
        }

        const newAnalytics = await Analytics.create({ ip, userAgent });

        return res.status(201).json({
            data: newAnalytics,
            message: "Thêm Analytics thành công!"
        });
    } catch (error) {
        return res.status(500).json({
            data: [],
            message: error.message || "Có lỗi xảy ra!"
        });
    }
};
module.exports={GetAnalytics,PostAnalytics};