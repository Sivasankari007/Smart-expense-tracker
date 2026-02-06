import { ExpenseProvider } from './context/ExpenseContext';
import Dashboard from './components/Dashboard';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Analytics from './components/Analytics';
import './App.css';

function App() {
  return (
    <ExpenseProvider>
      <div className="container">
        <header className="app-header">
          <h1 className="title">Smart Expense Tracker</h1>
        </header>

        <Dashboard />

        <div className="main-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          <ExpenseForm />
          <ExpenseList />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <Analytics />
          </div>
        </div>
      </div>
    </ExpenseProvider>
  );
}

export default App;
