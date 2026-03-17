import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, CheckCircle, XCircle, Info, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '@components/atoms/Button';
import AuthModal from '@components/organisms/AuthModal';
import { useAuth } from '@/contexts/AuthContext';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  points: number;
}

const SQL_CHALLENGES: Challenge[] = [
  { id: 'sql-001', title: 'SQL Injection Basics', description: 'Learn how SQL injection works by exploiting a vulnerable login form', difficulty: 'Easy', points: 50 },
  { id: 'sql-002', title: 'SQL Auth Bypass', description: 'Bypass authentication using SQL injection', difficulty: 'Easy', points: 50 },
  { id: 'sql-003', title: 'SQL Comment Injection', description: 'Use SQL comments to bypass login', difficulty: 'Easy', points: 50 },
  { id: 'sql-004', title: 'SQL OR Logic', description: 'Exploit OR logic in SQL queries', difficulty: 'Easy', points: 75 },
  { id: 'sql-005', title: 'SQL String Concatenation', description: 'Break out of string context', difficulty: 'Easy', points: 75 },
  { id: 'sql-006', title: 'UNION SELECT Basic', description: 'Learn UNION-based SQL injection', difficulty: 'Medium', points: 100 },
  { id: 'sql-007', title: 'UNION Column Discovery', description: 'Find the number of columns using UNION', difficulty: 'Medium', points: 100 },
  { id: 'sql-008', title: 'Database Enumeration', description: 'Extract database names using injection', difficulty: 'Medium', points: 150 },
  { id: 'sql-009', title: 'Table Enumeration', description: 'List all tables in the database', difficulty: 'Medium', points: 150 },
  { id: 'sql-010', title: 'Column Enumeration', description: 'Extract column names from tables', difficulty: 'Medium', points: 150 },
  { id: 'sql-011', title: 'Blind SQL Injection', description: 'Extract data using boolean-based blind SQLi', difficulty: 'Hard', points: 200 },
  { id: 'sql-012', title: 'Time-Based Blind SQLi', description: 'Use time delays to extract data', difficulty: 'Hard', points: 200 },
  { id: 'sql-013', title: 'Error-Based SQLi', description: 'Exploit database errors for data extraction', difficulty: 'Hard', points: 250 },
  { id: 'sql-014', title: 'Second-Order SQLi', description: 'Exploit stored SQL injection', difficulty: 'Hard', points: 250 },
  { id: 'sql-015', title: 'SQL Injection in WHERE', description: 'Inject in WHERE clause', difficulty: 'Medium', points: 125 },
  { id: 'sql-016', title: 'SQL Injection in ORDER BY', description: 'Exploit ORDER BY clause', difficulty: 'Medium', points: 125 },
  { id: 'sql-017', title: 'SQL Injection with LIMIT', description: 'Bypass LIMIT restrictions', difficulty: 'Hard', points: 200 },
  { id: 'sql-018', title: 'WAF Bypass - Whitespace', description: 'Bypass WAF using whitespace alternatives', difficulty: 'Hard', points: 300 },
  { id: 'sql-019', title: 'WAF Bypass - Case Variation', description: 'Use case variations to bypass filters', difficulty: 'Hard', points: 300 },
  { id: 'sql-020', title: 'WAF Bypass - Encoding', description: 'Use encoding to bypass WAF', difficulty: 'Expert', points: 400 },
  { id: 'sql-021', title: 'NoSQL Injection Basics', description: 'Exploit NoSQL databases', difficulty: 'Medium', points: 175 },
  { id: 'sql-022', title: 'MongoDB Injection', description: 'Inject into MongoDB queries', difficulty: 'Hard', points: 250 },
  { id: 'sql-023', title: 'SQLi with JSON', description: 'Exploit SQL injection in JSON parameters', difficulty: 'Hard', points: 275 },
  { id: 'sql-024', title: 'Advanced UNION Exploitation', description: 'Master complex UNION-based attacks', difficulty: 'Expert', points: 450 },
  { id: 'sql-025', title: 'SQL Master Challenge', description: 'Ultimate SQL injection challenge', difficulty: 'Expert', points: 500 },
];

const PlaygroundSQL = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [solvedChallenges, setSolvedChallenges] = useState<string[]>([]);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('solved-sql-challenges');
    if (saved) {
      setSolvedChallenges(JSON.parse(saved));
    }
  }, []);

  const handleChallengeClick = (challenge: Challenge) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    setSelectedChallenge(challenge);
    setUserInput('');
    setFeedback('');
    setIsCorrect(null);
  };

  const handleSubmit = () => {
    if (!selectedChallenge) return;

    // Simple validation - in production, this would be server-side
    const correctAnswers: Record<string, string[]> = {
      'sql-001': ["' OR '1'='1", "' OR 1=1--", "admin'--"],
      'sql-002': ["' OR '1'='1'--", "admin' OR '1'='1"],
      'sql-003': ["admin'--", "' OR 1=1--"],
    };

    const correct = correctAnswers[selectedChallenge.id];
    if (correct && correct.some(ans => userInput.toLowerCase().includes(ans.toLowerCase()))) {
      setIsCorrect(true);
      setFeedback('Correct! Challenge completed.');
      const newSolved = [...solvedChallenges, selectedChallenge.id];
      setSolvedChallenges(newSolved);
      localStorage.setItem('solved-sql-challenges', JSON.stringify(newSolved));
      setTimeout(() => setSelectedChallenge(null), 2000);
    } else {
      setIsCorrect(false);
      setFeedback('Incorrect. Try again!');
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400';
      case 'Medium': return 'text-yellow-400';
      case 'Hard': return 'text-orange-400';
      case 'Expert': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const totalPoints = SQL_CHALLENGES.reduce((sum, c) => sum + c.points, 0);
  const earnedPoints = SQL_CHALLENGES
    .filter(c => solvedChallenges.includes(c.id))
    .reduce((sum, c) => sum + c.points, 0);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-[#0B1120] relative">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] bg-red-500/5 rounded-full blur-[100px] sm:blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-56 h-56 sm:w-72 sm:h-72 md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] bg-red-800/5 rounded-full blur-[80px] sm:blur-[100px]" />
        <div
            className="absolute inset-0 opacity-10"
            style={{
                backgroundImage: 'linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)',
                backgroundSize: '40px 40px',
            }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Button
            variant="ghost"
            onClick={() => navigate('/playground')}
            className="mb-6 text-red-500 hover:text-red-400 font-mono text-[10px] uppercase tracking-widest"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Playground
          </Button>

          <div className="flex items-center justify-center mb-4">
            <Database className="w-12 h-12 text-red-500 mr-4 drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]" />
            <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
              SQL Injection <span className="text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]">Playground</span>
            </h1>
          </div>

          <p className="text-slate-400 font-medium text-lg mb-6 max-w-2xl mx-auto uppercase tracking-wide">
            Master SQL injection techniques through hands-on challenges
          </p>

          {/* Progress Stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="bg-[#0f172a] rounded-sm px-6 py-3 border border-white/5">
              <div className="text-[10px] font-mono font-bold tracking-widest uppercase text-slate-500">Challenges Solved</div>
              <div className="text-2xl font-black text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]">
                {solvedChallenges.length}/{SQL_CHALLENGES.length}
              </div>
            </div>
            <div className="bg-[#0f172a] rounded-sm px-6 py-3 border border-white/5">
              <div className="text-[10px] font-mono font-bold tracking-widest uppercase text-slate-500">Points Earned</div>
              <div className="text-2xl font-black text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]">
                {earnedPoints}/{totalPoints}
              </div>
            </div>
            <div className="bg-[#0f172a] rounded-sm px-6 py-3 border border-white/5">
              <div className="text-[10px] font-mono font-bold tracking-widest uppercase text-slate-500">Progress</div>
              <div className="text-2xl font-black text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]">
                {Math.round((solvedChallenges.length / SQL_CHALLENGES.length) * 100)}%
              </div>
            </div>
          </div>
        </motion.div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SQL_CHALLENGES.map((challenge, index) => {
            const isSolved = solvedChallenges.includes(challenge.id);
            return (
              <div
                key={challenge.id}
                onClick={() => handleChallengeClick(challenge)}
                className={`
                  relative group cursor-pointer
                  bg-[#0f172a]
                  rounded-sm p-6
                  border ${isSolved ? 'border-red-500' : 'border-white/5'}
                  hover:border-red-500/50 transition-all duration-300
                  hover:shadow-sm hover:-translate-y-1
                `}
              >
                {isSolved && (
                  <div className="absolute top-3 right-3">
                    <CheckCircle className="w-6 h-6 text-red-500" />
                  </div>
                )}

                <div className="flex items-start mb-3">
                  <div className="p-2.5 rounded-sm bg-[#0B1120] border border-white/5 text-slate-300 group-hover:text-red-400 group-hover:border-red-500/30 transition-all mr-3 flex-shrink-0">
                    <Database className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1 uppercase tracking-tight group-hover:text-red-400 transition-colors">
                      {challenge.title}
                    </h3>
                    <span className={`text-[10px] font-mono font-bold tracking-widest uppercase px-2 py-0.5 rounded-sm bg-[#0B1120] border border-white/5 ${getDifficultyColor(challenge.difficulty)}`}>
                      {challenge.difficulty} • {challenge.points} pts
                    </span>
                  </div>
                </div>

                <p className="text-slate-400 text-sm mb-4 leading-relaxed font-medium">
                  {challenge.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500">
                    Challenge #{(index + 1).toString().padStart(2, '0')}
                  </span>
                  {isSolved && (
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-red-500 bg-red-500/10 px-2 py-1 rounded-sm border border-red-500/20">
                      Completed ✓
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Challenge Modal */}
        <AnimatePresence>
          {selectedChallenge && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 relative"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#0f172a] border border-red-500/30 rounded-sm p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
              >
                <div className="flex items-start mb-6">
                  <div className="p-3 rounded-sm bg-[#0B1120] border border-white/5 mr-4 flex-shrink-0">
                    <Database className="w-8 h-8 text-red-500" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">
                      {selectedChallenge.title}
                    </h2>
                    <p className={`text-[10px] font-mono font-bold tracking-widest uppercase px-2 py-1 bg-[#0B1120] border border-white/5 rounded-sm inline-block ${getDifficultyColor(selectedChallenge.difficulty)}`}>
                      {selectedChallenge.difficulty} • {selectedChallenge.points} points
                    </p>
                  </div>
                </div>

                <p className="text-slate-400 mb-6 font-medium leading-relaxed">
                  {selectedChallenge.description}
                </p>

                <div className="bg-red-500/5 border border-red-500/20 rounded-sm p-4 mb-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-red-600" />
                  <div className="flex items-start">
                    <Info className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-slate-300">
                      <p className="font-bold text-white mb-1 uppercase tracking-tight">Challenge Objective:</p>
                      <p>Craft a SQL injection payload to bypass the authentication system.</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-tight">
                    Your SQL Injection Payload:
                  </label>
                  <textarea
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Enter your SQL injection payload..."
                    className="w-full bg-[#0B1120] border border-white/10 rounded-sm px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-red-500/50 font-mono text-sm transition-colors"
                    rows={4}
                  />
                </div>

                {feedback && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-center p-4 rounded-sm mb-6 border ${isCorrect
                        ? 'bg-red-500/10 border-red-500/30'
                        : 'bg-white/5 border-white/10'
                      }`}
                  >
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-red-500 mr-3" />
                    ) : (
                      <XCircle className="w-5 h-5 text-slate-500 mr-3" />
                    )}
                    <span className={isCorrect ? 'text-red-400' : 'text-slate-400'}>
                      {feedback}
                    </span>
                  </motion.div>
                )}

                <div className="flex gap-4">
                  <Button
                    onClick={handleSubmit}
                    variant="primary"
                    className="flex-1 bg-red-600 hover:bg-red-700 rounded-sm uppercase tracking-widest font-mono text-xs border border-red-500"
                  >
                    Submit Solution
                  </Button>
                  <Button
                    onClick={() => setSelectedChallenge(null)}
                    variant="ghost"
                    className="text-slate-400 hover:text-white rounded-sm uppercase tracking-widest font-mono text-xs border border-white/5 bg-[#0B1120]"
                  >
                    Close
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Auth Modal */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      </div>
    </div>
  );
};

export default PlaygroundSQL;
