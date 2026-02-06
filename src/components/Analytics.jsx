import { useExpenses } from '../context/ExpenseContext';
import './Analytics.css';

export default function Analytics() {
    const { expenses, totalExpenses } = useExpenses();

    if (expenses.length === 0) return null;

    const categoryTotals = expenses.reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + Number(curr.amount);
        return acc;
    }, {});

    const sortedCategories = Object.entries(categoryTotals)
        .sort(([, a], [, b]) => b - a);

    return (
        <div className="card analytics-card">
            <h3>Spending by Category</h3>
            <div className="category-list">
                {sortedCategories.map(([category, amount]) => {
                    const percentage = ((amount / totalExpenses) * 100).toFixed(1);
                    return (
                        <div key={category} className="category-item">
                            <div className="category-header">
                                <span>{category}</span>
                                <span>{percentage}%</span>
                            </div>
                            <div className="category-bar-bg">
                                <div
                                    className="category-bar-fill"
                                    style={{ width: `${percentage}%` }}
                                ></div>
                            </div>
                            <div className="category-amount">₹{amount.toLocaleString()}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
