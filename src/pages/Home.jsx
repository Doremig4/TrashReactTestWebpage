import React from 'react';
import { Gamepad2, FlaskConical, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function Home({ onNavigate }) {
  return (
    <div className="home">
      <div className="hero">
        <motion.h1
          className="title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          코딩으로 <br />
          <span className="gradient-text">쓸데없는거 만들기</span>
        </motion.h1>
        <motion.p
          className="subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          사실 React실력을 뽑내고싶었습니다 팀원들이 모두 정상이 아니에요 
        </motion.p>
      </div>

      <div className="cards-grid">
        <motion.div
          className="card game-card"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigate('vocab')}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="card-icon icon-vocab">
            <Gamepad2 size={32} />
          </div>
          <h3>영단어 배우기</h3>
          <p>한글 뜻을 보고 알맞은 단어를 맞추세요.</p>
          <div className="card-link">
            게임 시작 <ArrowRight size={16} />
          </div>
        </motion.div>

        <motion.div
          className="card game-card"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigate('science')}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="card-icon icon-science">
            <FlaskConical size={32} />
          </div>
          <h3>과학 O/X 퀴즈</h3>
          <p>사람이라면 맞을수밖에 없는 과학 상식 퀴즈를 풀어보세요.</p>
          <div className="card-link">
            퀴즈 시작 <ArrowRight size={16} />
          </div>
        </motion.div>
      </div>

      <style>{`
        .home {
          padding: 2rem 0;
        }

        .hero {
          text-align: center;
          margin-bottom: 4rem;
        }

        .title {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 1.5rem;
        }

        .gradient-text {
          background: linear-gradient(to right, var(--color-primary), var(--color-secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .subtitle {
          font-size: 1.25rem;
          color: var(--color-text-muted);
          max-width: 600px;
          margin: 0 auto;
        }

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .game-card {
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          background: linear-gradient(145deg, var(--color-bg-card), rgba(255, 255, 255, 0.05));
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .game-card h3 {
          font-size: 1.5rem;
          font-weight: 700;
        }

        .game-card p {
          color: var(--color-text-muted);
          flex: 1;
        }

        .card-icon {
          width: 64px;
          height: 64px;
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.5rem;
        }

        .icon-vocab {
          background-color: rgba(139, 92, 246, 0.1);
          color: var(--color-primary);
        }

        .icon-science {
          background-color: rgba(6, 182, 212, 0.1);
          color: var(--color-secondary);
        }

        .card-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--color-primary);
          font-weight: 600;
        }

        @media (max-width: 640px) {
          .title {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </div>
  );
}
