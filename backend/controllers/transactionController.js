import { Transaction } from '../models/transactionSchema.js';

export const createTransaction = async (req, res, next) => {
    try {
        const transaction = await Transaction.create({ ...req.body, userId: req.user.id });
        res.status(201).json(transaction);
    } catch (err) {
        next(err);
    }
};

export const getTransactions = async (req, res, next) => {
    try {
        const transactions = await Transaction.find({ userId: req.user.id });
        res.status(200).json(transactions);
    } catch (err) {
        next(err);
    }
};

export const getTransactionById = async (req, res, next) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        res.status(200).json(transaction);
    } catch (err) {
        next(err);
    }
};

export const updateTransaction = async (req, res, next) => {
    try {
        const transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.status(200).json(transaction);
    } catch (err) {
        next(err);
    }
};

export const deleteTransaction = async (req, res, next) => {
    try {
        await Transaction.findByIdAndDelete(req.params.id);
        res.status(204).json();
    } catch (err) {
        next(err);
    }
};
