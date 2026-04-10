import React, { useState } from 'react';
import './App.css';
import InputText from './components/inputText';
import ButtonAnalyze from './components/ButtonAn';
import Loader from './components/loader';
import Result from './components/result';

function App() {
  const [text, setText] = useState('');   
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false); 


  const handleAnalyze = async () => {
    if (!text) return;

    setLoading(true);
    setResult('');


    const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${API_KEY}`;
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: text }] 
            }
          ]
        })
      });

      const data = await response.json();

      // Проверка на наличие ответа в структуре Google API
      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        setResult(data.candidates[0].content.parts[0].text);
      } else {
        setResult('AI не смог сформировать ответ. Проверьте консоль.');
        console.error('Ошибка API или пустой ответ:', data);
      }
    } catch (error) {
      console.error('Ошибка при запросе к Gemini:', error);
      setResult('Произошла ошибка при обращении к Google AI.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App"> 
      <h1>Ai Helper</h1>
      
      <h2>Input</h2>
      <InputText value={text} setValue={setText} />
      
      <p>Вы печатаете текст: <strong>{text}</strong></p>

      <ButtonAnalyze 
        title={loading ? "Analyzing..." : "Analyze"} 
        onClick={handleAnalyze} 
        disabled={loading} 
      />

      <hr />



      {loading ? <Loader /> : <Result text={result} />}
    </div>
  );
}

export default App;