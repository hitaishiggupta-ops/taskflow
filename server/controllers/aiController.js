const { GoogleGenerativeAI } =
require("@google/generative-ai");

exports.suggestEstimate = async (req, res) => {

    try {

        if (!process.env.GEMINI_API_KEY) {

            return res.json({

                estimatedEffort: "2 hours",

                suggestedDueDate: "Tomorrow",

                reason: "Fallback response"

            });

        }

        const genAI = new GoogleGenerativeAI(
            process.env.GEMINI_API_KEY
        );

        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash"
        });

        const prompt = `

Task title:
${req.body.title}

Description:
${req.body.description}

Return only JSON:

{
"estimatedEffort":"",
"suggestedDueDate":"",
"reason":""
}

`;

        const result =
            await model.generateContent(prompt);

        const response =
            result.response.text();

        res.json({
            suggestion: response
        });

    }

    catch (error) {

        res.json({

            estimatedEffort: "2 hours",

            suggestedDueDate: "Tomorrow",

            reason: "Fallback response"

        });

    }

};