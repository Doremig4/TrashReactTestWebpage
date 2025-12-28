import React, { useState, useEffect } from 'react';
import { vocabWords } from '../data/questions';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, RefreshCw, ArrowLeft } from 'lucide-react';

export function VocabGame({ onNavigate }) {
  const [gameQuestions, setGameQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  // Initialize game on mount
  useEffect(() => {
    startNewGame();
  }, []);

  const generateQuestions = () => {
    // 1. Shuffle all words safely
    const shuffledAll = [...vocabWords].sort(() => Math.random() - 0.5);
    // 2. Select first 5 for the game (or fewer if not enough words)
    const count = Math.min(5, shuffledAll.length);
    const selected = shuffledAll.slice(0, count);

    // 3. Generate options for each selected word
    return selected.map(question => {
      // Find distractors: words that are NOT the current question's word
      const availableDistractors = vocabWords.filter(w => w.word !== question.word);
      const distractors = availableDistractors
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(w => w.word);

      // Combine and shuffle options
      const options = [...distractors, question.word].sort(() => Math.random() - 0.5);

      return {
        ...question,
        options
      };
    });
  };

  const startNewGame = () => {
    const newQuestions = generateQuestions();
    setGameQuestions(newQuestions);
    setCurrentIndex(0);
    setScore(0);
    setIsFinished(false);
    setShowResult(false);
    setSelectedOption(null);
  };

  const handleAnswer = (option) => {
    if (showResult) return;

    const currentQuestion = gameQuestions[currentIndex];
    setSelectedOption(option);
    const isCorrect = option === currentQuestion.word;

    if (isCorrect) {
      setScore(s => s + 1);
    }

    setShowResult(true);

    setTimeout(() => {
      if (currentIndex < gameQuestions.length - 1) {
        setCurrentIndex(i => i + 1);
        setShowResult(false);
        setSelectedOption(null);
      } else {
        setIsFinished(true);
      }
    }, 1500);
  };

  // Prevent render if questions are not loaded yet
  if (gameQuestions.length === 0) return null;

  if (isFinished) {
    return (
      <div className="game-container">
        <motion.div
          className="card result-card"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <h2>게임 종료!</h2>
          <div className="score-display">
            <span className="score-number">{score}</span>
            <span className="score-total">/ {gameQuestions.length}</span>
          </div>
          <p>
            {score === gameQuestions.length ? "만점입니다! 🌟" :
              score > gameQuestions.length / 2 ? "훌륭해요! 👍" : "조금 더 분발하세요! 💪"}
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
        <GameStyles />
      </div>
    );
  }

  const currentQuestion = gameQuestions[currentIndex];

  return (
    <div className="game-container">
      <div className="game-header">
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
          <h3>다음 설명에 해당하는 단어는?</h3>
          <div className="definition">
            "{currentQuestion.definition}"
          </div>

          <div className="options-grid">
            {currentQuestion.options.map((option, idx) => {
              let btnClass = "option-btn";
              if (showResult) {
                if (option === currentQuestion.word) btnClass += " correct";
                else if (option === selectedOption) btnClass += " wrong";
              }

              return (
                <button
                  key={idx}
                  className={btnClass}
                  onClick={() => handleAnswer(option)}
                  disabled={showResult}
                >
                  {option}
                  {showResult && option === currentQuestion.word && <CheckCircle size={18} />}
                  {showResult && option === selectedOption && option !== currentQuestion.word && <XCircle size={18} />}
                </button>
              );
            })}
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
      .game-container {
        max-width: 800px;
        margin: 0 auto;
      }

      .game-header {
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
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border: none;
      }
      
      .back-btn:hover {
        background: rgba(255, 255, 255, 0.2);
      }

      .question-card, .result-card {
        background-color: var(--color-bg-card);
        border-radius: var(--radius-lg);
        padding: 2rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
        text-align: center;
      }

      .definition {
        font-size: 1.5rem;
        font-weight: 600;
        margin: 2rem 0;
        color: var(--color-primary);
        font-style: italic;
      }

      .options-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
      }

      .option-btn {
        padding: 1.5rem;
        background-color: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: var(--radius-md);
        color: var(--color-text-main);
        font-size: 1.1rem;
        transition: all 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        cursor: pointer;
        font-family: inherit;
      }

      .option-btn:hover:not(:disabled) {
        background-color: rgba(139, 92, 246, 0.1);
        border-color: var(--color-primary);
      }
      
      .option-btn:disabled {
        cursor: default;
      }

      .option-btn.correct {
        background-color: rgba(34, 197, 94, 0.2);
        border-color: var(--color-accent-success);
        color: var(--color-accent-success);
      }

      .option-btn.wrong {
        background-color: rgba(239, 68, 68, 0.2);
        border-color: var(--color-accent-error);
        color: var(--color-accent-error);
      }

      .score-display {
        font-size: 4rem;
        font-weight: 800;
        margin: 2rem 0;
      }
      
      .score-number {
        color: var(--color-primary);
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

      @media (max-width: 640px) {
        .options-grid {
          grid-template-columns: 1fr;
        }
      }
    `}</style>
  );
}
