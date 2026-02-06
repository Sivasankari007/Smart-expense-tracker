import { useExpenses } from '../context/ExpenseContext';
import './Dashboard.css';

export default function Dashboard() {
    const { budget, totalExpenses, balance } = useExpenses();

    const progress = Math.min((totalExpenses / budget) * 100, 100);

    return (
        <div className="dashboard-grid">
            <div className="card dashboard-card">
                <h4>Budget</h4>
                <input
                    type="number"
                    className="amount-input"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    min="0"
                />
            </div>
            <div className="card dashboard-card">
                <h4>Total Expenses</h4>
                <div className="amount text-danger">₹{totalExpenses.toLocaleString()}</div>
            </div>
            <div className="card dashboard-card">
                <h4>Balance</h4>
                <div className={`amount ${balance < 0 ? 'text-danger' : 'text-success'}`}>
                    ₹{balance.toLocaleString()}
                </div>
            </div>

            <div className="card dashboard-card progress-card">
                <div className="progress-header">
                    <span>Budget Usage</span>
                    <span>{Math.round(progress)}%</span>
                </div>
                <div className="progress-track">
                    <div
                        className="progress-fill"
                        style={{
                            width: `${progress}%`,
                            backgroundColor: progress > 90 ? 'var(--danger)' : 'var(--primary)'
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
}
