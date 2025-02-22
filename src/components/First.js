import React, { useEffect, useState } from 'react'
import { useNavigate} from 'react-router-dom';

function First() {
    const [showBracket, setShowBracket] = useState(false);
    const [showName, setShowName] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const[textSize,setTextSize]=useState('text-[15rem]');
    const[brtextSize,setBrTextSize]=useState('text-sm');
    const[nameOpacity,setNameOpacity]=useState('0');
    const[bracketOpacity,setbracketNameOpacity]=useState('0');
    const[buttonOpacity,setbuttonNameOpacity]=useState('0');
    const navigate=useNavigate();

    useEffect(()=>{
        const timer1= setTimeout(()=>{
            setShowName('true');
            setNameOpacity('100');
        },1000)

        const timer2= setTimeout(()=>{
            setTextSize('text-9xl');
            setShowBracket('true');
            setbracketNameOpacity('100');
            setBrTextSize('text-5xl');
        },2000)

        const timer3= setTimeout(()=>{
            setShowButton('true');
            setbuttonNameOpacity('100');
        },4000)
    },[])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 via-blue-500 to-blue-900">
        {showName && (
            <p className={` text-center ${textSize} font-bold transition-all ${nameOpacity} ease-in duration-1000 text-white `}>
            Akinator
            </p>
        )}
        {showBracket && (
            <p className={`text-white mt-2 transition-all ease-in duration-1000 ${bracketOpacity} ${brtextSize}`}>
            (but in reverse)
            </p>
        )}

        {showButton && (
            <button onClick={()=>navigate("/diff")} className={`mt-6 px-6 py-3 bg-blue-500 text-white text-3xl font-bold rounded-xl shadow-md hover:bg-blue-600 
            transition duration-300 opacity-100 ease-in ${buttonOpacity} w-48`}>
            Start
            </button>
        )}
    </div>
  )
}

export default First