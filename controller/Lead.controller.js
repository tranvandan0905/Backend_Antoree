const Lead = require("../model/Lead.model");
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
const UpdateLead = async (req, res) => {
    try {
        const _id = req.params.id;
        const { isSent } = req.body;
        const lead = await Lead.findById(_id);
        if (!lead) {
            return res.status(404).json({
                data: [],
                message: "Lead không tồn tại!"
            });
        }
        const updateLead = await Lead.findByIdAndUpdate(
            _id,
            {
                $set: {
                    isSent: isSent !== undefined ? isSent : lead.isSent,
                    email: email || lead.email,
                    score: score || lead.score,
                },
            },
            { new: true }
        );

        return res.status(200).json({
            data: updateLead,
            message: "Update thành công!"
        });
    } catch (error) {
        return res.status(500).json({
            data: [],
            message: error.message || 'Có lỗi xảy ra!',
        });
    }
}

module.exports = { GetLead, PostLead ,UpdateLead};