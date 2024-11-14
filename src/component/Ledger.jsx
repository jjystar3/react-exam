import React from 'react'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ledgerSlice } from '../store/ledgerSlice';
import { setSelectedValue } from '../store/ledgerSlice';

// useDispatch: 스토어에 있는 state를 변경하는 함수
// useSelector: 스토어에 있는 state를 조회하는 함수

// todo ui를 반환하는 컴포넌트
export const Ledger = () => {

  const [input, setInput] = useState('');
  
  const dispatch = useDispatch();

  const ledgerlist = useSelector((state) => state.ledger.ledgerlist);
  const result = useSelector((state) => state.ledger.result);

  const selectedValue = useSelector((state) => state.ledger.radio);

  const handleChange = (event) => {
    dispatch(setSelectedValue({ ledger: event.target.value, value: null, newValue: null, id: null }));
  };

  return (
    <div>
      <div>
      <label htmlFor="income">수입</label>
        <input type="radio" id="income" name="ledger" value="income" checked={selectedValue === "income"} onChange={handleChange}/>
        <label htmlFor="expense">지출</label>
        <input type="radio" id="expense" name="ledger" value="expense" checked={selectedValue === "expense"} onChange={handleChange} />
      </div>
    
      <label htmlFor="money">금액 </label>
      <input
        type="text"
        id='money'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={()=>{
        // 디스패치에 'ADD'액션을 전달 + TODO 데이터 함께 전달
        dispatch(ledgerSlice.actions.add({ ledger: selectedValue, value: result, newValue: input}));
        setInput('');
      }}>등록</button>
      <h4>총금액:{result}</h4>
      <ul>
        {/* 배열의 map함수를 사용하여 li 태그 생성 */}
        {/* jsx에서 태그를 동적으로 생성할때는 key 입력해야함 */}
        {ledgerlist.map(todo => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() =>
              // 디스패치에 'ADD'액션을 전달
              // 삭제 -> 단건삭제 또는 일괄삭제
              // 단건삭제 -> TODO의 ID
              dispatch(ledgerSlice.actions.delete({ ledger: todo.ledger, value: result, newValue: todo.value, id: todo.id}))}>
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}