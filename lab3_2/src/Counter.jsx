import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Counter = () => {
  const [ language, setLanguage ] = useState('en');
  const [count, setCount] = useState(0);
  const translations = {
    en:{
        counterText: (num)=>`${num} click${num!==1 ? "s" :""}`,
        reset:'Reset',
        english:'English',
        russian:'Russian'
    },
    ru:{
        counterText: (num)=>{
            if (num%10===1 && num%100!==11) return `${num} клик`;
            if ([2,3,4].includes(num%10) && ![12,13,14].includes(num%100)) return `${num} клика`;
            return `${num} кликов`;
        },
        reset:'Сбросить',
        english:'Английский',
        russian:'Русский'
    }
  };
  const handleLanguageChange = (lng) => {
    setLanguage(lng);
  };

  const handleIncrement = () => {
    setCount(count=>count + 1);
  };

  const handleReset = () => {
    setCount(0);
  };

  return (
    <div className="container mt-5 d-flex flex-column align-items-center">
      <div className="btn-group mb-4" role="group">
        <button
          type="button"
          className={`btn mb-3 ${language === 'en' ? 'btn-primary' : 'btn-outline-primary'}`}
          data-testid="en"
          onClick={() => handleLanguageChange('en')}
        >
          {translations[language].english}
        </button>
        <button
          type="button"
          className={`btn mb-3 ${language === 'ru' ? 'btn-primary' : 'btn-outline-primary'}`}
          data-testid="ru"
          onClick={() => handleLanguageChange('ru')}
        >
          {translations[language].russian}
        </button>
      </div>
      <button
        type="button"
        className="btn btn-info mb-3"
        data-testid="counter"
        onClick={handleIncrement}
      >
        {translations[language].counterText(count)}
      </button>
      <button
        type="button"
        className="btn btn-warning"
        data-testid="reset"
        onClick={handleReset}
      >
        {translations[language].reset}
      </button>
    </div>
  );
};
export default Counter;