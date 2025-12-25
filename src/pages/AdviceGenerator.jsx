import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowLeft, Send } from 'lucide-react';

const ADVICE_LIST = [
    "냉면",
    "무조건 해라.",
    "즐기는 것 또한 잊지 마라.",
    "답은 네가 생각핱 모습이 아닐지도 모른다.",
    "감사할 일이 있을 것이다.",
    "건강을 챙겨라.",
    "정신을 똑바로 차려라.",
    "다시 생각해보아라.",
    "네 목표를 다하라.",
    "진심을 다하라.",
    "열정은 가장 큰 원동력이다.",
    "성실히 임해라.",
    "니 인생이다.",
    "언젠가 빛이 들 날이 있을 것이다.",
    "사람을 챙겨라.",
    "인내심을 가져라.",
    "미래를 계획해라.",
    "포용해라.",
    "공부나 해라.",
    "경험을 쌓아라.",
    "영원한 건 절대 없어",
    "응",
    "아니",
    "다시 생각하고 되물어라.",
    "어머니께 여쭈어라.",
    "아버지께 여쭈어라.",
    "주변에서 해답을 찾아라.",
    "상념을 지워라.",
    "기회를 노려라.",
    "성인의 도움을 받아라.",
    "주변의 도움을 거절하지 말아라.",
    "악재는 피하는 것이 상책이다.",
    "어려운 길이 답일 때도 있다.",
    "경험을 쌓아라.",
    "답은 정해져 있다.",
    "네 장점을 생각하라.",
    "인공지능을 잘 사용해 보아라.",
    "네 자신을 되짚어 보아라.",
    "밥이나 먹어라.",
    "책에 답이 있을 것이다.",
    "이미 해결되었거나, 답이 네 코앞에 있을 것이다.",
    "지식을 쌓아라.",
    "되짚어라.",
    "상황을 생각해라.",
    "남에게 부끄럽지 않은 일을 하여라.",
    "내 알빠 아니다.",
    "적극적으로 임해라.",
    "산타한테 빌어라.",
    "상담 콜센터 국번없이 110",
    "기다려라,지금 생각중이다.",
    "일단 낮잠을 자라.",
    "지금이 완벽한 때다.",
    "모든 징조가 긍정적이다.",
    "네 직감을 따라라.",
    "확신을 가져라.",
    "성공이 코앞이다.",
    "더이상 지체라지 말아라.",
    "다른 길을 찾아라.",
    "잠시 멈추어라.",
    "노력이 답이다.",
    "생각보다 빨리 이루어 질 것이다.",
    "주의를 관찰해라.",
    "네 뜻에 따라라.",
    "당신의 애인에게 물어보아라. 아 혹시 애인이 없다면 유감이다.",
    "답변을 찾으려면 반대 방향으로 걸어가라.",
    "그 질문은 나중에 답변하도록 하겠다.",
    "때로는 과감한 판단이 좋은 선택일 때도 있다.",
    "그걸 왜 나한테 묻냐.",
    "하지 마라.",
    "네가 생각하는 가장 나은 행동이 답일 수 있다.",
    "나중에 흑역사로 남을지 모른다.",
    "아 몰라 어떻게든 되겄지;;.",
    "너무 늦었다.",
    "뒤.로.미.루.기",
    "굳이?",
    "아직 섣부른 판단이다.",
    "지금이 딱! 적절한 타이밍이다.",
    "그냥 넘겨라.",
    "내가 어떻게 아냐?",
    "너의 본능이 너를 이끌것이다.",
    "병신같은 고민이다.",
    "여자를 고르 듯 신중하게 선택해라."
];

export function AdviceGenerator({ onNavigate }) {
    const [inputText, setInputText] = useState('');
    const [result, setResult] = useState(null);
    const [isThinking, setIsThinking] = useState(false);

    const handleGetAdvice = (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        setIsThinking(true);
        setResult(null);

        // Simulate thinking time
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * ADVICE_LIST.length);
            setResult(ADVICE_LIST[randomIndex]);
            setIsThinking(false);
        }, 1500);
    };

    return (
        <div className="game-container">
            <div className="game-header">
                <button className="back-btn" onClick={() => onNavigate('home')}>
                    <ArrowLeft size={20} />
                </button>
                <div className="header-title">
                    <Sparkles size={20} className="icon-sparkle" />
                    <span>알려주세요 책님</span>
                </div>
                <div style={{ width: 40 }}></div> {/* Spacer for centering */}
            </div>

            <motion.div
                className="card content-card"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="disclaimer-box">
                    <p>⚠️ 추천된 해답을 맹목적으로 믿지 마십시오.</p>
                </div>

                <form onSubmit={handleGetAdvice} className="advice-form">
                    <label className="input-label">어떤 고민이 있으신가요?</label>
                    <div className="input-group">
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="고민을 입력하세요..."
                            className="advice-input"
                            disabled={isThinking}
                        />
                        <button
                            type="submit"
                            className="btn-send"
                            disabled={isThinking || !inputText.trim()}
                        >
                            <Send size={20} />
                        </button>
                    </div>
                </form>

                <AnimatePresence mode="wait">
                    {isThinking && (
                        <motion.div
                            className="status-message"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            key="thinking"
                        >
                            <div className="spinner"></div>
                            <p>책님이 고민을 듣고 계십니다...</p>
                        </motion.div>
                    )}

                    {result && !isThinking && (
                        <motion.div
                            className="result-container"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            key="result"
                        >
                            <span className="result-label">책님의 해답:</span>
                            <p className="result-text">"{result}"</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <style>{`
        .game-container {
          max-width: 600px;
          margin: 0 auto;
        }

        .game-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .header-title {
          font-size: 1.5rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--color-text-main);
        }

        .icon-sparkle {
          color: var(--color-primary);
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
          transition: background 0.2s;
        }
        
        .back-btn:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .content-card {
          background: var(--color-bg-card);
          border-radius: var(--radius-lg);
          padding: 2.5rem;
          box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .disclaimer-box {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: #fca5a5;
          padding: 1rem;
          border-radius: var(--radius-md);
          margin-bottom: 2rem;
          font-size: 0.9rem;
          text-align: center;
        }

        .advice-form {
          margin-bottom: 2rem;
        }

        .input-label {
          display: block;
          margin-bottom: 0.5rem;
          color: var(--color-text-muted);
          font-size: 0.95rem;
        }

        .input-group {
          display: flex;
          gap: 0.5rem;
        }

        .advice-input {
          flex: 1;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-md);
          padding: 1rem;
          color: var(--color-text-main);
          font-size: 1.1rem;
          transition: all 0.2s;
        }

        .advice-input:focus {
          outline: none;
          border-color: var(--color-primary);
          background: rgba(255, 255, 255, 0.08);
        }

        .btn-send {
          background: var(--color-primary);
          color: white;
          border: none;
          border-radius: var(--radius-md);
          width: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-send:hover:not(:disabled) {
          background: var(--color-primary-dark, #7c3aed);
          transform: translateY(-2px);
        }

        .btn-send:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          filter: grayscale(1);
        }

        .status-message {
          text-align: center;
          padding: 2rem;
          color: var(--color-text-muted);
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          border-top-color: var(--color-primary);
          margin: 0 auto 1rem;
          animation: spin 1s linear infinite;
        }

        .result-container {
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(167, 139, 250, 0.05));
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: var(--radius-lg);
          padding: 2rem;
          text-align: center;
        }

        .result-label {
          display: block;
          color: var(--color-primary);
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .result-text {
          font-size: 1.8rem;
          font-weight: 700;
          color: white;
          line-height: 1.4;
          word-break: keep-all;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
}
