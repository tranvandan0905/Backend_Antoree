const RequestDetail = require("../model/RequestDetail.model");
const { PostAnalytics } = require("./Analytics.controller");
const GetRequestDetail = async (req, res) => {
    try {
        const dataLead = await RequestDetail.find({});
        return res.status(200).json({
            data: dataLead,
            message: "Lấy danh sách thành công!"
        })
    } catch (error) {
        return res.status(500).json({
            data: [],
            message: error.message || 'Có lỗi xảy ra!',
        });

    }

}
const UpdateRequestDetail = async (req, res) => {
    try {
        const _id = req.params.id;
        const { isSent } = req.body;
        const requestDetail = await RequestDetail.findById(_id);
        if (!requestDetail) {
            return res.status(404).json({
                data: [],
                message: "RequestDetail không tồn tại!"
            });
        }
        const updatedRequestDetail = await RequestDetail.findByIdAndUpdate(
            _id,
            {
                $set: {
                    isSent: isSent !== undefined ? isSent : requestDetail.isSent,
                    email: email || requestDetail.email,
                },
            },
            { new: true }
        );

        return res.status(200).json({
            data: updatedRequestDetail,
            message: "Update thành công!"
        });
    } catch (error) {
        return res.status(500).json({
            data: [],
            message: error.message || 'Có lỗi xảy ra!',
        });
    }
}

const PostRequestDetail = async (req, res) => {
    try {
        let { email } = req.body;

        if (!email) {
            return res.status(400).json({
                data: [],
                message: "Thiếu dữ liệu email"
            });
        }

        const checkEmail = await RequestDetail.findOne({ email });
        if (checkEmail) {
            return res.status(409).json({
                data: [],
                message: "Bạn đã đăng ký nhận tài liệu trước đó!"
            });
        }
        // const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        // const userAgent = req.headers['user-agent'];
        // await PostAnalytics(ip, userAgent)
        const newRequestDetail = await RequestDetail.create({ email });

        return res.status(201).json({
            data: newRequestDetail,
            message: "Đăng ký nhận tài liệu thành công!"
        });
    } catch (error) {
        return res.status(500).json({
            data: [],
            message: error.message || "Có lỗi xảy ra!"
        });
    }
};

module.exports = { GetRequestDetail, PostRequestDetail,UpdateRequestDetail };