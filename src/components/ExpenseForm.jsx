import { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import './ExpenseForm.css';

const categories = ['Food', 'Transport', 'Entertainment', 'Bills', 'Shopping', 'Other'];

export default function ExpenseForm() {
    const { addExpense } = useExpenses();
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState(categories[0]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !amount) return;

        addExpense({
            title,
            amount: parseFloat(amount),
            category
        });

        setTitle('');
        setAmount('');
        setCategory(categories[0]);
    };

    return (
        <form className="expense-form card" onSubmit={handleSubmit}>
            <h3>Add Transaction</h3>
            <div className="form-group">
                <label>Description</label>
                <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="e.g. Grocery"
                    required
                />
            </div>
            <div className="form-row">
                <div className="form-group">
                    <label>Amount (₹)</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Category</label>
                    <select value={category} onChange={e => setCategory(e.target.value)}>
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
            </div>
            <button type="submit" className="btn-primary">Add Expense</button>
        </form>
    );
}
