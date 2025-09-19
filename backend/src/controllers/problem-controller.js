import dotenv from 'dotenv';
import problemModel from '../models/problem-model.js';
import getLanguageById, { submitBatch } from '../utils/problem-utility.js';
dotenv.config();


// problem create krega ye controller
const createProblem = async (req, res) => {
    try {
        const {title, description, difficulty, tags, visibleTestCases,
            hiddenTestCases, startCode, referenceSolution, problemCreator
        } = req.body;

        for(const {language, completecode} of referenceSolution) {
            // source code, stdin, language id, expected output
            const languageId = getLanguageById(language);

            const submissions = visibleTestCases.map((input, output)=> ({
                source_code: completecode,
                language_id: languageId,
                stdin: input,
                expected_output: output,
            }));

            const submitResult = await submitBatch(submissions);
        }
    } catch(err) {
        console.log(`error in create problem controller ${err}`);
        return res.status(500).json({
            msg: "Internal server error"
        })
    }
}


// problem update krega ye controller
const updateProblem = async (req, res) => {
    try {

    } catch(err) {
        console.log(`error in problem update controller ${err}`);
        return res.status(500).json({
            msg: "Internal server error"
        })
    }
}


// this will delete problem
const deleteProblem = async (req, res) => {
    try {

    } catch(err) {
        console.log(`error in problem delete ${err}`);
        return res.status(500).json({
            msg: "Internal server error"
        })
    }
}

export {
    createProblem,
    deleteProblem,
    updateProblem
}