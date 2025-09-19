import dotenv from 'dotenv';
import problemModel from '../models/problem-model.js';
dotenv.config();

const createProblem = async (req, res) => {
    try {

    } catch(err) {
        console.log(`error in create problem controller ${err}`);
        return res.status(500).json({
            msg: "Internal server error"
        })
    }
}

const updateProblem = async (req, res) => {
    try {

    } catch(err) {
        console.log(`error in problem update controller ${err}`);
        return res.status(500).json({
            msg: "Internal server error"
        })
    }
}

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