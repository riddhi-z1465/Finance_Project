import { useState, useEffect } from 'react';

const TransactionList = ({ refreshTrigger }) => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch('http://localhost:3000/api/transactions', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => setTransactions(data))
            .catch(err => console.error('Error fetching transactions:', err));
    }, [refreshTrigger]);

    return (
        <div className="glass-card fade-in" style={{ animationDelay: '0.2s' }}>
            <h3><i className="fas fa-list"></i> Recent Transactions</h3>
            <ul>
                {transactions.length === 0 ? (
                    <li style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '20px' }}>
                        No transactions yet.
                    </li>
                ) : (
                    transactions.map((t, index) => (
                        <li key={t._id} className="transaction-item fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                            <div className="transaction-info">
                                <span className="transaction-desc">{t.description}</span>
                                <span className="transaction-type">
                                    {t.type === 'income' ? <i className="fas fa-arrow-up"></i> : <i className="fas fa-arrow-down"></i>} {t.type}
                                </span>
                            </div>
                            <span className={`transaction-amount ${t.type === 'income' ? 'amount-income' : 'amount-expense'}`}>
                                {t.type === 'income' ? '+' : '-'}${t.amount}
                            </span>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default TransactionList;
