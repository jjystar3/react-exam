import './App.css';
import { Ledger } from './component/Ledger';
import { Provider } from 'react-redux';
import { store } from './store/store';

function App() {
  return (
    <div>
    <h3>가계부</h3>
      <Provider store={store}>
        <Ledger></Ledger>
      </Provider>
    </div>
  );
}

export default App;
