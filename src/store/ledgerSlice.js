import { createSlice } from '@reduxjs/toolkit';

const calculateResult = (legder, value, newValue) => {
  switch (legder) {
    case "income":
      return value + newValue;
    case "expense":
      return value - newValue;
    default:
      return null;
  }
};

const calculateResult2 = (legder, value, newValue) => {
  switch (legder) {
    case "income":
      return value - newValue;
    case "expense":
      return value + newValue;
    default:
      return null;
  }
};

export const ledgerSlice = createSlice({
  name: 'ledgerSlice',
  initialState: { ledgerlist: [], result: 0, radio: "income" },
  reducers: {
    add: (state, action) => {      
      const { ledger, value, newValue } = action.payload;
      state.result = calculateResult(ledger, Number(value), Number(newValue));
      let newId = 0;
      if(state.ledgerlist.length > 0){
        newId = state.ledgerlist.length;
      }
      let text = "";
      if(ledger === "income"){
        text = "(수입)"
      }else if(ledger === "expense"){
        text = "(지출)"
      }
      state.ledgerlist.push({ id: newId, text: `${text} ${newValue}`, ledger: ledger, value: newValue});
    },
    delete: (state, action) => {
      const { ledger, value, newValue, id } = action.payload;
      state.result = calculateResult2(ledger, state.result, Number(newValue));
      let list = state.ledgerlist;
      state.ledgerlist = list.filter(todo => todo.id !== id);
    },
    setSelectedValue: (state, action) => {
      const { ledger, value, newValue, id } = action.payload;
      state.radio = ledger;
    }
  },
});

export const { setSelectedValue } = ledgerSlice.actions;