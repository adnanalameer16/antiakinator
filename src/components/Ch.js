import React, { useRef, useEffect, useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';

function Ch() {
  const choiceRef = useRef(null);
  const [focused, setFocused] = useState(false);
  const [choice, setchoice] = useState(''); 
  const navigate=useNavigate();
  const location = useLocation();
  const difficulty = location.state;

  useEffect(() => {
    const choiceContainer = choiceRef.current;

    const handlechoiceClick = (event) => {
      if (event.target.tagName === 'BUTTON') {
        const selectedchoice = event.target.textContent;

        if (choice === selectedchoice) {
          setchoice('');
          setFocused(false);
        } else {
          setchoice(selectedchoice);
          setFocused(true);
        }
      }
    };

    const handleClickOutside = (event) => {
      if (choiceContainer && !choiceContainer.contains(event.target)) {
        setchoice('');
        setFocused(false);
      }
    };

    choiceContainer.addEventListener('click', handlechoiceClick);
    document.addEventListener('click', handleClickOutside);

    return () => {
      choiceContainer.removeEventListener('click', handlechoiceClick);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [choice]);

    return(
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 via-blue-500 to-blue-900 text-white space-y-8">
            <div className="flex flex-col items-center space-y-4">
                <p className="text-4xl font-semibold">Choose your topic</p>
                <div ref={choiceRef} className="flex space-x-4">
                <button className={`w-40 h-20 bg-white text-blue-800 text-xl font-bold rounded-xl shadow-md hover:bg-blue-400 transition duration-300 ${focused ? 'focus:ring-2 focus:ring-red-500':'' }`}>Cricket</button>
                <button className={`w-40 h-20 bg-white text-blue-800 text-xl font-bold rounded-xl shadow-md hover:bg-blue-400 transition duration-300 ${focused ? 'focus:ring-2 focus:ring-red-500':'' }`}>Mollywood</button>
                <button className={`w-40 h-20 bg-white text-blue-800 text-xl font-bold rounded-xl shadow-md hover:bg-blue-400 transition duration-300 ${focused ? 'focus:ring-2 focus:ring-red-500':'' }`}>Hollywood</button>
                </div>
            </div>
            <div>
                <button 
                onClick={() => {
                  navigate("/text", { state: { df: difficulty, ch: choice } });
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

        
    )
}

export default Ch