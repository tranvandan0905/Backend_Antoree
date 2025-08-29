const QuizQuestion = require("../model/QuizQuestion.model")
const GetQuizQuestion = async (req, res) => {
  try {
    const { type } = req.query;

    if (!type) {
      return res.status(400).json({
        errorCode: 1,
        data: [],
        message: "Thiếu type!"
      });
    }
    const dataQuizQuestion = await QuizQuestion.aggregate([
      { $match: { type } },
      { $sample: { size: 10 } },
    ]);

    return res.status(200).json({
      errorCode: 0,
      data: dataQuizQuestion,
      message: "Lấy danh sách thành công!",
    });
  } catch (error) {
    return res.status(500).json({
      errorCode: 1,
      data: [],
      message: error.message || "Có lỗi xảy ra!",
    });
  }
};


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
const CheckQuizAnswers = async (req, res) => {
    try {
        const { answers } = req.body;

        if (!answers || !Array.isArray(answers)) {
            return res.status(400).json({
                data: [],
                message: "Thiếu dữ liệu câu trả lời!"
            });
        }
        const results = await Promise.all(
            answers.map(async (ans) => {
                const question = await QuizQuestion.findById(ans.questionId);
                if (!question) return { correct: false };

                return {
                    questionId: ans.questionId,
                    isCorrect: question.answer === ans.userAnswer
                };
            })
        );
        const correctCount = results.filter(r => r.isCorrect).length;

        return res.status(200).json({
            data: {
                total: answers.length,
                correct: correctCount,
                details: results
            },
            message: "Chấm điểm thành công!"
        });
    } catch (error) {
        return res.status(500).json({
            data: [],
            message: error.message || "Có lỗi xảy ra!"
        });
    }
};

module.exports={GetQuizQuestion,PostQuizQuestion,CheckQuizAnswers};