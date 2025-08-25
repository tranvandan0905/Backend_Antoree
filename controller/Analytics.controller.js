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
const PostAnalytics = async (ip, userAgent) => {
        const newAnalytics = await Analytics.create({ ip, userAgent });
        return newAnalytics;

};
module.exports={GetAnalytics,PostAnalytics};