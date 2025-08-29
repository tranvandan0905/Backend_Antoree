const AnalyticsModel = require("../model/Analytics.model");
const Lead = require("../model/Lead.model");
const RequestDetailModel = require("../model/RequestDetail.model");
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
                    email: lead.email,
                    score:  lead.score,
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

const stats= async (req, res) => {
  try {
    // Tổng doanh thu (tính các lead đã gửi)
    const totalRevenue = await Lead.aggregate([
      { $match: { isSent: true } },
      { $group: { _id: null, total: { $sum: "$score" } } },
    ]);

    // Doanh thu theo tháng
    const revenueByMonth = await Lead.aggregate([
      { $match: { isSent: true } },
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: "$score" },
        },
      },
      { $sort: { "_id": 1 } },
    ]).then((data) =>
      data.map((x) => ({ month: `Tháng ${x._id}`, total: x.total }))
    );

    // Tổng lượt truy cập
    const totalVisitors = await AnalyticsModel.countDocuments();

    // Thống kê trình duyệt
    const browserAgg = await AnalyticsModel.aggregate([
      {
        $group: { _id: "$userAgent", count: { $sum: 1 } },
      },
    ]);
    const browserCount = {};
    browserAgg.forEach((b) => {
      browserCount[b._id] = b.count;
    });

    // Thống kê người dùng
    const totalFree = await RequestDetailModel.countDocuments();
    const totalFull = await Lead.countDocuments();

    // Lấy 10 visitor gần nhất
    const latestVisitors = await AnalyticsModel.find()
      .sort({ visitedAt: -1 })
      .limit(10);

    res.json({
      totalRevenue: totalRevenue[0]?.total || 0,
      revenueByMonth,
      totalVisitors,
      browserCount,
      totalFree,
      totalFull,
      latestVisitors,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { GetLead, PostLead ,UpdateLead,stats};