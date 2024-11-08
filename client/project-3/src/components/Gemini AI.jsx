import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState, useRef, useEffect } from "react";

const genAI = new GoogleGenerativeAI("AIzaSyARB8jwdrxH2Uql4QWJFUm6vyMaqOoTN8U");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default function GeminiAi({ onClose }) {
  const [response, setResponse] = useState("");
  const [genre, setGenre] = useState("");
  const formRef = useRef(null);

  const handleSend = async () => {
    try {
      const prompt = `Berikan saya tata cara pengambilan foto ${genre}`;
      const result = await model.generateContent(prompt);
      setResponse(result.response.text());
    } catch (error) {
      console.log("🚀 ~ handleSend ~ error:", error);
    }
  };

  // Close the form if a click happens outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div ref={formRef} className="p-4 bg-white rounded-md shadow-md">
      <h2 className="text-black text-lg font-semibold mb-2 text-center">
        Gemini AI Photo Instructions
      </h2>

      <input
        type="text"
        placeholder="Enter photo genre (e.g., landscape, portrait)"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-2"
      />
      <button
        onClick={handleSend}
        className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition mb-4"
      >
        Generate Instructions
      </button>
      {response && (
        <div className="mt-4 p-2 bg-black border rounded text-white">
          <h3 className="font-semibold">Instructions:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}
