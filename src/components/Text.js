import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import sendIcon from "./send.svg";
import genieIcon from "./genie.webp";
import userIcon from "./user.avif";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.REACT_APP_GROQ_API_KEY, dangerouslyAllowBrowser: true });

function Text() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tobeguessed, setTobeguessed] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [guess, setGuess] = useState("");
  const [gameStarted, setGameStarted] = useState(false); // ✅ Prevents re-execution

  const location = useLocation();
  const { df, ch } = location.state || {};

  useEffect(() => {
    if (gameStarted) return; // ✅ Ensures it runs only once

    const beginningofgame = async () => {
      setGameStarted(true); // ✅ Prevent re-execution

      const difficulty = df?.df;
      const choice = ch;
      const intoques = `I need you to give me the name of a ${choice} that is of ${difficulty} difficulty to guess in an Akinator game. Respond only with the name and nothing else.`;

      const response = await getGroqChatCompletion(intoques);
      setTobeguessed(response);

      const instructions = `Ask yes or no questions only. The genie will only respond to questions related to the game and nothing else. Once you get the answer, click on the guess option to submit the answer.`;
      setMessages((prev) => [...prev, { text: instructions, isUser: false }]);
    };

    beginningofgame();
  }, [gameStarted, df, ch]);

  const getGroqChatCompletion = async (prompt) => {
    try {
      const response = await groq.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "llama-3.3-70b-versatile",
      });
      return response.choices[0]?.message?.content.trim() || "Error";
    } catch (error) {
      console.error("Error calling Groq API:", error);
      return "Error";
    }
  };

  const sendPrompt = async (prompt) => {
    if (!tobeguessed) {
      alert("The game is still setting up. Please wait a moment.");
      return;
    }

    setLoading(true);
    setMessages((prev) => [...prev, { text: prompt, isUser: true }]);


    const formattedPrompt = `Answer only in yes or no. If the question is not related to ${tobeguessed}, reply with "not related". If the question is not a yes or no question, respond with "Ask only yes or no questions". Question: ${prompt}. I am talking about ${tobeguessed} `;

    const result = await getGroqChatCompletion(formattedPrompt);
    setMessages((prev) => [...prev, { text: result, isUser: false }]);
    setLoading(false);
  };

  const handleSend = (event) => {
    if (event.type === "keydown" && event.key !== "Enter") return;

    const textfield = document.querySelector("input");
    const value = textfield.value.trim();
    if (!value || loading) return;

    sendPrompt(value);
    textfield.value = "";
  };

  const handleGuessSubmit = () => {
    if (guess.toLowerCase() === tobeguessed.toLowerCase()) {
      alert("🎉 You Won!");
      setMessages((prev) => [...prev, { text: "Refresh and start a new game once you are ready.", isUser: false }]);
    } else {
      alert("❌ You Lost!");
      setMessages((prev) => [...prev, { text: "Refresh and start a new game once you are ready.", isUser: false }]);
      alert(`it was ${tobeguessed}`);
    }
    setShowPopup(false);
    setGuess("");
  };

  return (
    <div className="flex items-center justify-center h-[100vh] bg-gradient-to-b from-blue-900 via-blue-500 to-blue-900">
      <div className="w-2/4 h-3/4 bg-white shadow-2xl flex flex-col rounded-3xl">
        <div className="flex flex-1 flex-col overflow-y-auto p-4 space-y-4 custom-chatbox">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-end space-x-3 ${msg.isUser ? "self-end" : "self-start"}`}>
              <div className={`p-3 rounded-2xl shadow max-w-[100%] ${msg.isUser ? "bg-blue-200" : "bg-green-200"}`}>
                {msg.text}
              </div>
              <img
                src={msg.isUser ? userIcon : genieIcon}
                alt={msg.isUser ? "User" : "Genie"}
                className="w-10 h-10 rounded-full border border-gray-300"
              />
            </div>
          ))}

          {loading && (
            <div className="flex items-center space-x-3 self-start">
              <div className="bg-green-200 p-3 rounded-2xl shadow max-w-[100%]">Typing...</div>
              <img src={genieIcon} alt="Genie" className="w-10 h-10 rounded-full border border-gray-300" />
            </div>
          )}
        </div>

        <div className="p-2 border-t border-gray-300 bg-white rounded-b-3xl relative flex items-center">
          <button
            className="mr-2 p-2 bg-green-500 text-white rounded-lg"
            onClick={() => setShowPopup(true)}
          >
            Guess
          </button>

          <input
            type="text"
            placeholder="Ask a Question..."
            className="flex-1 p-2 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyDown={handleSend}
            disabled={loading}
          />

          <img
            src={sendIcon}
            alt="send-icon"
            className="ml-2 w-10 h-5 cursor-pointer"
            onClick={handleSend}
          />
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-2">Enter your guess:</h2>
            <input
              type="text"
              className="border p-2 rounded w-full"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
            />
            <div className="flex justify-around mt-4">
              <button className="bg-green-500 text-white p-2 rounded" onClick={handleGuessSubmit}>
                Submit
              </button>
              <button className="bg-red-500 text-white p-2 rounded" onClick={() => setShowPopup(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Text;
