import { useState } from 'react';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { VocabGame } from './pages/VocabGame';
import { ScienceQuiz } from './pages/ScienceQuiz';
import { AdviceGenerator } from './pages/AdviceGenerator';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'vocab':
        return <VocabGame onNavigate={setCurrentPage} />;
      case 'science':
        return <ScienceQuiz onNavigate={setCurrentPage} />;
      case 'advice':
        return <AdviceGenerator onNavigate={setCurrentPage} />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
}

export default App;
