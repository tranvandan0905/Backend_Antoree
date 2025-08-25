const Lead = require("../model/Lead.model");
const { PostAnalytics } = require("./Analytics.controller");
const GetLead = async (req, res) => {
    try {
        const dataLead = await Lead.find({});
        return res.status(200).json({
            data: dataLead,
            message: "Lấy danh sách thành công!"
        })
    } catch (error) {
        return res.status(400).json({
            data: [],
            message: error.message || 'Có lỗi xảy ra!',
        });

    }

}
const PostLead = async (email) => {
    
        const newLead = await Lead.create({ email });
        return newLead;

};
module.exports = { GetLead, PostLead };