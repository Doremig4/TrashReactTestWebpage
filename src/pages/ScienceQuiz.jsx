import React, { useState, useEffect } from 'react';
import { scienceQuestions } from '../data/questions';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, RefreshCw, ArrowLeft, ThumbsUp, ThumbsDown } from 'lucide-react';

export function ScienceQuiz({ onNavigate }) {
  const [gameQuestions, setGameQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false);

  // Initialize game on mount
  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    // 1. Shuffle all questions safely
    const shuffledAll = [...scienceQuestions].sort(() => Math.random() - 0.5);
    // 2. Select first 5 for the game
    const count = Math.min(5, shuffledAll.length);
    const selected = shuffledAll.slice(0, count);

    setGameQuestions(selected);
    setCurrentIndex(0);
    setScore(0);
    setIsFinished(false);
    setShowResult(false);
    setLastAnswerCorrect(false);
  };

  const handleAnswer = (userAnswer) => {
    if (showResult) return;

    const currentQuestion = gameQuestions[currentIndex];
    // userAnswer is boolean (true/false)
    const isCorrect = userAnswer === currentQuestion.isTrue;
    setLastAnswerCorrect(isCorrect);

    if (isCorrect) {
      setScore(s => s + 1);
    }

    setShowResult(true);

    // Wait slightly longer for reading explanation
    setTimeout(() => {
      if (currentIndex < gameQuestions.length - 1) {
        setCurrentIndex(i => i + 1);
        setShowResult(false);
      } else {
        setIsFinished(true);
      }
    }, 2500);
  };

  if (gameQuestions.length === 0) return null;

  if (isFinished) {
    return (
      <div className="quiz-container">
        <motion.div
          className="card result-card"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <h2>퀴즈 종료!</h2>
          <div className="score-display">
            <span className="score-number">{score}</span>
            <span className="score-total">/ {gameQuestions.length}</span>
          </div>
          <p>
            {score === gameQuestions.length ? "똒똒이 레벨! 🧠" :
              score > gameQuestions.length / 2 ? "좀 치시네요! 🧪" : "지능이 딸리시군요! 🥼"}
          </p>
          <div className="actions">
            <button className="btn btn-primary" onClick={startNewGame}>
              <RefreshCw size={20} /> 다시 하기
            </button>
            <button className="btn btn-secondary" onClick={() => onNavigate('home')}>
              <ArrowLeft size={20} /> 홈으로
            </button>
          </div>
        </motion.div>

        {/* Helper function or component for styles would be cleaner, but keeping inline for consistency */}
        <GameStyles />
      </div>
    );
  }

  const currentQuestion = gameQuestions[currentIndex];

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <button className="back-btn" onClick={() => onNavigate('home')}>
          <ArrowLeft size={20} />
        </button>
        <div className="progress">
          문제 {currentIndex + 1} / {gameQuestions.length}
        </div>
        <div className="score-badge">점수: {score}</div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="question-card"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="icon-wrapper">
            <span className="science-icon">🔬</span>
          </div>
          <h3 className="question-text">{currentQuestion.question}</h3>

          {showResult && (
            <motion.div
              className={`explanation ${lastAnswerCorrect ? 'correct' : 'wrong'}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="result-icon">
                {lastAnswerCorrect ? <CheckCircle /> : <XCircle />}
                <span>{lastAnswerCorrect ? "정답입니다!" : "틀렸습니다!"}</span>
              </div>
              <p>{currentQuestion.explanation}</p>
            </motion.div>
          )}

          <div className={`controls ${showResult ? 'disabled' : ''}`}>
            <button
              className="ox-btn btn-o"
              onClick={() => handleAnswer(true)}
              disabled={showResult}
            >
              <ThumbsUp size={32} />
              <span>O (진실)</span>
            </button>

            <button
              className="ox-btn btn-x"
              onClick={() => handleAnswer(false)}
              disabled={showResult}
            >
              <ThumbsDown size={32} />
              <span>X (거짓)</span>
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      <GameStyles />
    </div>
  );
}

function GameStyles() {
  return (
    <style>{`
        .quiz-container {
          max-width: 600px;
          margin: 0 auto;
        }

        .quiz-header {
           display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          color: var(--color-text-muted);
        }

        .back-btn {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          padding: 0.5rem;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .back-btn:hover {
            background: rgba(255, 255, 255, 0.2);
        }

        .question-card, .result-card {
           background-color: var(--color-bg-card);
          border-radius: var(--radius-lg);
          padding: 3rem 2rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .icon-wrapper {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .question-text {
          font-size: 1.5rem;
          margin-bottom: 2rem;
          line-height: 1.4;
        }

        .controls {
          display: flex;
          gap: 2rem;
          justify-content: center;
          margin-top: 2rem;
          transition: opacity 0.3s;
        }
        
        .controls.disabled {
          opacity: 0.5;
          pointer-events: none;
        }

        .ox-btn {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-weight: 800;
          font-size: 1.2rem;
          transition: transform 0.2s;
          color: white;
          border: none;
          cursor: pointer;
        }

        .ox-btn:hover {
          transform: scale(1.1);
        }
        
        .ox-btn:active {
          transform: scale(0.95);
        }

        .btn-o {
          background: linear-gradient(135deg, #22c55e, #16a34a);
          box-shadow: 0 4px 15px rgba(34, 197, 94, 0.4);
        }

        .btn-x {
           background: linear-gradient(135deg, #ef4444, #dc2626);
           box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4);
        }

        .explanation {
          margin: 1rem 0;
          padding: 1rem;
          border-radius: var(--radius-md);
          background: rgba(255, 255, 255, 0.05);
        }

        .explanation.correct {
          background: rgba(34, 197, 94, 0.1);
          color: var(--color-accent-success);
        }

        .explanation.wrong {
          background: rgba(239, 68, 68, 0.1);
          color: var(--color-accent-error);
        }

        .result-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }
        
        .score-display {
           font-size: 4rem;
          font-weight: 800;
          margin: 2rem 0;
        }
        
        .score-number {
          color: var(--color-secondary);
        }

        .score-total {
          color: var(--color-text-muted);
           font-size: 2rem;
        }

        .actions {
           display: flex;
          gap: 1rem;
          justify-content: center;
        }
      `}</style>
  );
}
