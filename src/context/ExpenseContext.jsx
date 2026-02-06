import { createContext, useState, useEffect, useContext } from 'react';

const ExpenseContext = createContext();

export const useExpenses = () => useContext(ExpenseContext);

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('expenses');
    return saved ? JSON.parse(saved) : [];
  });

  const [budget, setBudget] = useState(() => {
    const saved = localStorage.getItem('budget');
    return saved ? JSON.parse(saved) : 5000;
  });

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('budget', JSON.stringify(budget));
  }, [budget]);

  const addExpense = (expense) => {
    setExpenses(prev => [{ ...expense, id: crypto.randomUUID(), date: new Date().toISOString() }, ...prev]);
  };

  const deleteExpense = (id) => {
    setExpenses(prev => prev.filter(exp => exp.id !== id));
  };

  const totalExpenses = expenses.reduce((acc, curr) => acc + Number(curr.amount), 0);
  const balance = budget - totalExpenses;

  return (
    <ExpenseContext.Provider value={{
      expenses,
      addExpense,
      deleteExpense,
      budget,
      setBudget,
      totalExpenses,
      balance
    }}>
      {children}
    </ExpenseContext.Provider>
  );
};
