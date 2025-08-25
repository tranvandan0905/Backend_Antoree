const QuizQuestion = require("../model/QuizQuestion.model")
const GetQuizQuestion = async(req,res)=>{
    try {
        const dataQuizQuestion= await QuizQuestion.find({});
        return res.status(200).json({
            data: dataQuizQuestion,
            message: "Lấy danh sách thành công!"
        })
    } catch (error) {
        return res.status(400).json({
                data: [],
                message: error.message || 'Có lỗi xảy ra!',
            });

    }

}
const PostQuizQuestion = async (req, res) => {
    try {
        const { question,options,answer,type} = req.body;

        if (!question || !options || !answer) {
            return res.status(400).json({
                data: [],
                message: "Thiếu dữ liệu"
            });
        }

        const newQuizQuestion = await QuizQuestion.create({ question,options,answer,type });

        return res.status(201).json({
            data: newQuizQuestion,
            message: "Thêm QuizQuestion thành công!"
        });
    } catch (error) {
        return res.status(500).json({
            data: [],
            message: error.message || "Có lỗi xảy ra!"
        });
    }
};
module.exports={GetQuizQuestion,PostQuizQuestion};