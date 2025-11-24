import { useState } from 'react';

const TransactionForm = ({ onTransactionAdded }) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('expense');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const transaction = { description, amount: Number(amount), type };

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/api/transactions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(transaction)
            });

            if (response.ok) {
                setDescription('');
                setAmount('');
                onTransactionAdded();
            }
        } catch (error) {
            console.error('Error adding transaction:', error);
        }
    };

    return (
        <div className="glass-card fade-in">
            <h3><i className="fas fa-plus-circle"></i> Add New</h3>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <input
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <select value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>
                <button type="submit" className="submit-btn">
                    Add Transaction <i className="fas fa-arrow-right"></i>
                </button>
            </form>
        </div>
    );
};

export default TransactionForm;
