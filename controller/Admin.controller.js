const jwt = require("jsonwebtoken");
const Admin = require("../model/Admin.model");

const LoginAdmin = async (req, res) => {
  try {
    const { name, password } = req.body;
    const SECRET_KEY = "dan09052003";
    const checkAdmin = await Admin.findOne({ name });
    if (!checkAdmin) {
      throw new Error("Tài khoản của quý khách không tồn tại!");
    }
    if (password !== checkAdmin.password) {
      throw new Error("Sai mật khẩu!");
    }
    const token = jwt.sign(
      { id: checkAdmin._id, name: checkAdmin.name },
       SECRET_KEY,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      data: { error: false, token },
      message: "Đăng nhập thành công!"
    });
  } catch (error) {
    return res.status(400).json({
      data: [],
      message: error.message || "Có lỗi xảy ra!"
    });
  }
};
const PostAdmin = async (req, res) => {
    try {
        let { name,password } = req.body;
        const newadmin = await Admin.create({ name,password  });

        return res.status(201).json({
            data: newadmin,
            message: "Đăng ký thành công!"
        });
    } catch (error) {
        return res.status(500).json({
            data: [],
            message: error.message || "Có lỗi xảy ra!"
        });
    }
};
module.exports = { LoginAdmin, PostAdmin};
