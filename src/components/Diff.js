import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Diff() {
  const difficultyRef = useRef(null);
  const [focused, setFocused] = useState(false);
  const [difficulty, setDifficulty] = useState('');
  const navigate=useNavigate();



  useEffect(() => {
    const difficultyContainer = difficultyRef.current;

    const handleDifficultyClick = (event) => {
      if (event.target.tagName === 'BUTTON') {
        const selectedDifficulty = event.target.textContent;

        if (difficulty === selectedDifficulty) {
          setDifficulty('');
          setFocused(false);
        } else {
          setDifficulty(selectedDifficulty);
          setFocused(true);
        }
      }
    };

    const handleClickOutside = (event) => {
      if (difficultyContainer && !difficultyContainer.contains(event.target)) {
        setDifficulty('');
        setFocused(false);
      }
    };

    difficultyContainer.addEventListener('click', handleDifficultyClick);
    document.addEventListener('click', handleClickOutside);

    return () => {
      difficultyContainer.removeEventListener('click', handleDifficultyClick);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [difficulty]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 via-blue-500 to-blue-900 text-white space-y-8">
      <div className="flex flex-col items-center space-y-4">
        <p className="text-4xl font-semibold">Choose your difficulty</p>
        <div ref={difficultyRef} className="flex space-x-4">
          <button className={`w-40 h-20 bg-white text-blue-800 text-xl font-bold rounded-xl shadow-md hover:bg-blue-400 transition duration-300 ${focused ? 'focus:ring-2 focus:ring-red-500':'' }`}>Easy</button>
          <button className={`w-40 h-20 bg-white text-blue-800 text-xl font-bold rounded-xl shadow-md hover:bg-blue-400 transition duration-300 ${focused ? 'focus:ring-2 focus:ring-red-500':'' }`}>Medium</button>
          <button className={`w-40 h-20 bg-white text-blue-800 text-xl font-bold rounded-xl shadow-md hover:bg-blue-400 transition duration-300 ${focused ? 'focus:ring-2 focus:ring-red-500':'' }`}>Difficult</button>
        </div>
      </div>
      <div>
        <button 
          onClick={() => {
            const data = { df: difficulty };
            navigate('/ch',{state: data});
          }} 
          className={`w-64 py-4 text-xl font-semibold rounded-2xl shadow-lg transition duration-300 ${
            focused ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-400 text-gray-700 cursor-not-allowed'
          }`}
          disabled={!focused}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default Diff;
