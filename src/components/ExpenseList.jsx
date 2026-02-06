import { useExpenses } from '../context/ExpenseContext';
import './ExpenseList.css';

export default function ExpenseList() {
    const { expenses, deleteExpense } = useExpenses();

    if (expenses.length === 0) {
        return (
            <div className="card expense-list-empty">
                <p>No transactions yet. Add one to get started!</p>
            </div>
        );
    }

    return (
        <div className="expense-list-container">
            <h3>History</h3>
            <div className="expense-list">
                {expenses.map(expense => (
                    <div key={expense.id} className="expense-item card">
                        <div className="expense-info">
                            <span className="expense-title">{expense.title}</span>
                            <span className="expense-date">
                                {new Date(expense.date).toLocaleDateString(undefined, {
                                    month: 'short', day: 'numeric', year: 'numeric'
                                })}
                            </span>
                            <span className="expense-category tag">{expense.category}</span>
                        </div>
                        <div className="expense-actions">
                            <span className="expense-amount">₹{expense.amount.toFixed(2)}</span>
                            <button
                                onClick={() => deleteExpense(expense.id)}
                                className="btn-delete"
                                aria-label="Delete expense"
                            >
                                &times;
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
