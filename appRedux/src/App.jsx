// src/App.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { depositMoney, withdrawMoney } from './features/bankSlice';

export default function App() {
  const dispatch = useDispatch();
  
  // Read both parameters from the whiteboard
  const personalBalance = useSelector((state) => state.bank.personalBalance);
  const atmVaultCash = useSelector((state) => state.bank.atmVaultCash);
  const history = useSelector((state) => state.bank.transactionHistory);

  const [inputAmount, setInputAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleTransaction = (type) => {
    const value = parseFloat(inputAmount);

    if (isNaN(value) || value <= 0) {
      setErrorMessage('Please enter a valid amount.');
      return;
    }

    if (type === 'withdraw') {
      // CASE 1: Your personal account doesn't have enough money
      if (value > personalBalance) {
        setErrorMessage('Transaction Declined: Insufficient personal account funds.');
        return;
      }
      
      // CASE 2: The ATM machine shortfalls cash in the dispenser (Your suggestion!)
      if (value > atmVaultCash) {
        setErrorMessage(`ATM Machine Error: Temporary shortfall of cash in dispenser. This machine only has $${atmVaultCash} remaining.`);
        return;
      }
    }

    // Clear statuses on success
    setErrorMessage('');
    setInputAmount('');

    if (type === 'deposit') dispatch(depositMoney(value));
    if (type === 'withdraw') dispatch(withdrawMoney(value));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '500px', margin: '0 auto' }}>
      <h2>🏦 Smart ATM Terminal</h2>

      {/*  PERSONAL ACCOUNT DISPLAY */}
      <div style={{ background: '#0056b3', color: 'white', padding: '15px', borderRadius: '8px', marginBottom: '10px' }}>
        <p style={{ margin: 0, fontSize: '12px' }}>Your Personal Balance</p>
        <h3 style={{ margin: '5px 0 0 0' }}>${personalBalance.toFixed(2)}</h3>
      </div>

      {/* PHYSICAL MACHINE VAULT LEDGER (For simulation purposes) */}
      <div style={{ background: '#f8f9fa', border: '1px dashed #666', padding: '10px', borderRadius: '8px', marginBottom: '20px', fontSize: '13px' }}>
         <strong>ATM hardware status:</strong> Physical dispenser cash pool = <strong>${atmVaultCash}</strong>
      </div>

      {/* TRANSACTION BOX */}
      <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
        <input 
          type="number" 
          placeholder="Enter amount" 
          value={inputAmount}
          onChange={(e) => setInputAmount(e.target.value)}
          style={{ width: '93%', padding: '10px', marginBottom: '10px' }}
        />

        {/* DYNAMIC ERROR WARNING */}
        {errorMessage && (
          <p style={{ color: '#d93025', background: '#fce8e6', padding: '10px', borderRadius: '4px', fontSize: '13px', fontWeight: 'bold' }}>
             {errorMessage}
          </p>
        )}

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => handleTransaction('deposit')} style={{ flex: 1, padding: '10px', background: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}>Deposit</button>
          <button onClick={() => handleTransaction('withdraw')} style={{ flex: 1, padding: '10px', background: '#dc3545', color: 'white', border: 'none', cursor: 'pointer' }}>Withdraw</button>
        </div>
      </div>
    </div>
  );
}