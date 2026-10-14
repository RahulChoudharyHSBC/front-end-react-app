import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  personalBalance: 25000,  // Your personal bank account money
  atmVaultCash: 1500,     // The physical cash left inside this specific ATM dispenser
  transactionHistory: [],
};

const bankSlice = createSlice({
  name: 'bank',
  initialState,
  reducers: {
    depositMoney: (state, action) => {
      const amount = Number(action.payload);
      if (amount > 0) {
        state.personalBalance += amount;
        state.atmVaultCash += amount; // Depositing puts cash back into the machine vault
        
        state.transactionHistory.unshift({
          id: Date.now(),
          type: 'Deposit',
          amount: amount,
          date: new Date().toLocaleTimeString(),
        });
      }
    },
    withdrawMoney: (state, action) => {
      const amount = Number(action.payload);
      // Ensure both conditions are met in the central manager
      if (amount > 0 && state.personalBalance >= amount && state.atmVaultCash >= amount) {
        state.personalBalance -= amount;
        state.atmVaultCash -= amount; // Physical cash leaves the machine dispenser
        
        state.transactionHistory.unshift({
          id: Date.now(),
          type: 'Withdrawal',
          amount: amount,
          date: new Date().toLocaleTimeString(),
        });
      }
    }
  }
});

export const { depositMoney, withdrawMoney } = bankSlice.actions;
export default bankSlice.reducer;