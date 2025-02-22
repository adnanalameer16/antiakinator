import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import First from './components/First.js';
import Diff from './components/Diff.js';
import Ch from './components/Ch.js';
import Text from './components/Text.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<First />} />
        <Route path="/diff" element={<Diff />} />
        <Route path="/ch" element={<Ch />} />
        <Route path="/text" element={<Text />} />
      </Routes>
    </Router>
  );
}

export default App;
