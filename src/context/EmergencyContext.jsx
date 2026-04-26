import React, { createContext, useState, useEffect } from 'react';

export const EmergencyContext = createContext();

export const EmergencyProvider = ({ children }) => {
  const [walletBalance, setWalletBalance] = useState(50);
  const [securityDeposit, setSecurityDeposit] = useState(0);
  const [pendingDue, setPendingDue] = useState(0);
  const [todaySpent, setTodaySpent] = useState(0);
  const [hasRequestedToday, setHasRequestedToday] = useState(false);
  const [userStatus, setUserStatus] = useState('ACTIVE');
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'Credit Limit', amount: 50, date: 'Just now', icon: '💰', category: 'Credit' },
  ]);

  useEffect(() => {
    if (pendingDue > 0) {
      setUserStatus('RESTRICTED');
    } else {
      setUserStatus('ACTIVE');
    }
  }, [pendingDue]);

  const addTransaction = (type, amount, category = 'Credit') => {
    const newTx = {
      id: Date.now(),
      type,
      amount,
      category,
      date: 'Today',
      icon: category === 'Credit' ? '📈' : '📉'
    };
    setTransactions(prev => [newTx, ...prev].slice(0, 5));
  };

  const handleSpendBalance = (amount) => {
    if (walletBalance <= 0) {
      return { success: false, message: "No balance available. Please request next amount." };
    }

    if (amount <= 0) {
      return { success: false, message: "Invalid amount." };
    }

    if (amount > walletBalance) {
      return { success: false, message: "Insufficient wallet balance." };
    }

    if (amount > 50) {
      return { success: false, message: "Daily spend limit exceeded. You can only spend up to ₹50 in a single transaction." };
    }

    if (todaySpent + amount > 50) {
      return { success: false, message: `Daily spend limit exceeded. You have already spent ₹${todaySpent} today. You can only spend ₹${50 - todaySpent} more today.` };
    }

    setWalletBalance(prev => prev - amount);
    setPendingDue(prev => prev + amount);
    setTodaySpent(prev => prev + amount);
    addTransaction('Spent Balance', amount, 'Debit');
    return { success: true };
  };

  const handleAddDeposit = (amount) => {
    if (securityDeposit > 0) {
      return { success: false, message: "Security deposit is a one-time payment. You have already made your deposit." };
    }

    if (amount < 500 || amount > 1000) {
      return { success: false, message: "Invalid deposit. Please enter an amount between 500 and 1000." };
    }

    setSecurityDeposit(amount);
    addTransaction('Security Deposit', amount, 'Credit');
    return { success: true };
  };

  const handleRequestNextAmount = (reasonCategory, reasonDetails) => {
    if (securityDeposit === 0) {
      return { success: false, message: "You must make a security deposit first to request more balance." };
    }

    if (walletBalance >= 50) {
      return { success: false, message: "Your current wallet balance is ₹" + walletBalance + ". Please spend your available balance first before requesting more." };
    }

    if (hasRequestedToday) {
      return { success: false, message: "You have already made a request today. Only one request is allowed per day." };
    }

    const nextAmount = 50;
    setWalletBalance(prev => prev + nextAmount);
    setHasRequestedToday(true);
    addTransaction('Limit Requested', nextAmount, 'Credit');
    return { success: true, message: `Successfully added ₹${nextAmount} to your wallet balance.` };
  };

  return (
    <EmergencyContext.Provider value={{
      walletBalance,
      securityDeposit,
      pendingDue,
      todaySpent,
      userStatus,
      hasRequestedToday,
      transactions,
      addTransaction,
      handleSpendBalance,
      handleAddDeposit,
      handleRequestNextAmount,
      setPendingDue // exposed for manual resetting due
    }}>
      {children}
    </EmergencyContext.Provider>
  );
};
