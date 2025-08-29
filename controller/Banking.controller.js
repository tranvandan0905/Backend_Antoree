const axios = require("axios");
const crypto = require("crypto");
const { PostLead } = require("./Lead.controller");
// Tạo yêu cầu thanh toán MoMo
const momo = async (req, res) => {
  try {
    const { email } = req.body;
    const amount = 1000000;

    // MoMo config
    const accessKey = "F8BBA842ECF85";
    const secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
    const partnerCode = "MOMO";
    const orderInfo = "Thanh toán xu bằng MoMo";
    const redirectUrl = "http://localhost:3000";
    const ipnUrl = "http://localhost:5000/api/momo/ipn";
    const requestType = "payWithMethod";
    const orderId = partnerCode + Date.now();
    const requestId = orderId;
    const extraData = Buffer.from(JSON.stringify({ email, amount })).toString("base64");
    const autoCapture = true;
    const lang = "vi";

    const rawSignature =
      `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}` +
      `&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}` +
      `&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}` +
      `&requestId=${requestId}&requestType=${requestType}`;

    const signature = crypto
      .createHmac("sha256", secretKey)
      .update(rawSignature)
      .digest("hex");

    // Body gửi MoMo
    const requestBody = {
      partnerCode,
      partnerName: "Test",
      storeId: "MomoTestStore",
      requestId,
      amount,
      orderId,
      orderInfo,
      redirectUrl,
      ipnUrl,
      lang,
      requestType,
      autoCapture,
      extraData,
      orderGroupId: "",
      signature
    };

    const option = {
      method: "POST",
      url: "https://test-payment.momo.vn/v2/gateway/api/create",
      headers: { "Content-Type": "application/json" },
      data: requestBody
    };

    const response = await axios(option);
    if (response.data && response.data.resultCode === 0 && response.data.payUrl) {
      await axios.post(ipnUrl, {email: email, resultCode: 0,});
    }
    return res.status(200).json(response.data);
  } catch (error) {
    console.error("MoMo Create Error:", error.response?.data || error.message);
    return res.status(500).json({ message: "Lỗi gửi yêu cầu thanh toán MoMo" });
  }
};

const handleMoMoIPN = async (req, res) => {
  try {
    const { resultCode,email } = req.body;
    if (parseInt(resultCode) !== 0) {
      return res.status(400).json({ message: "MoMo thông báo thanh toán thất bại", detail: message });
    }
    if (email) {
      await PostLead(email);
    }
    return res.status(200).json({
      message: "Giao dịch MoMo thành công, tài liệu sẽ gửi đến bạn trong thời gian tới!"
    });
  } catch (err) {
    console.error("MoMo IPN Error:", err.response?.data || err.message);
    return res.status(500).json({ message: "Lỗi xử lý IPN từ MoMo" });
  }
};

module.exports = {
  momo,
  handleMoMoIPN
};
