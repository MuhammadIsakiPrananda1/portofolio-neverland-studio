import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, CheckCircle, XCircle, Info, ArrowLeft } from 'lucide-react';
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

const CMD_CHALLENGES: Challenge[] = [
  { id: 'cmd-001', title: 'Command Injection Basics', description: 'Execute basic system commands', difficulty: 'Easy', points: 50 },
  { id: 'cmd-002', title: 'Command Chaining', description: 'Chain multiple commands', difficulty: 'Easy', points: 75 },
  { id: 'cmd-003', title: 'Command with Semicolon', description: 'Use semicolon to chain commands', difficulty: 'Easy', points: 50 },
  { id: 'cmd-004', title: 'Command with Pipe', description: 'Use pipe operator for injection', difficulty: 'Easy', points: 75 },
  { id: 'cmd-005', title: 'Command with AND', description: 'Use && operator', difficulty: 'Easy', points: 75 },
  { id: 'cmd-006', title: 'Command with OR', description: 'Use || operator', difficulty: 'Easy', points: 75 },
  { id: 'cmd-007', title: 'Command Substitution', description: 'Use backticks or $()', difficulty: 'Medium', points: 100 },
  { id: 'cmd-008', title: 'File Reading', description: 'Read sensitive files', difficulty: 'Medium', points: 125 },
  { id: 'cmd-009', title: 'Directory Traversal', description: 'Navigate file system', difficulty: 'Medium', points: 150 },
  { id: 'cmd-010', title: 'Environment Variables', description: 'Extract environment variables', difficulty: 'Medium', points: 150 },
  { id: 'cmd-011', title: 'Blind Command Injection', description: 'Execute commands without output', difficulty: 'Hard', points: 200 },
  { id: 'cmd-012', title: 'Time-Based Detection', description: 'Use time delays for verification', difficulty: 'Hard', points: 225 },
  { id: 'cmd-013', title: 'Out-of-Band Data Exfil', description: 'Exfiltrate data via DNS/HTTP', difficulty: 'Hard', points: 275 },
  { id: 'cmd-014', title: 'Filter Bypass - Spaces', description: 'Bypass space restrictions', difficulty: 'Medium', points: 175 },
  { id: 'cmd-015', title: 'Filter Bypass - Keywords', description: 'Bypass keyword blacklists', difficulty: 'Hard', points: 250 },
  { id: 'cmd-016', title: 'Command Encoding', description: 'Use encoding to bypass filters', difficulty: 'Hard', points: 250 },
  { id: 'cmd-017', title: 'Reverse Shell Basic', description: 'Establish reverse shell connection', difficulty: 'Hard', points: 300 },
  { id: 'cmd-018', title: 'Reverse Shell Advanced', description: 'Advanced reverse shell techniques', difficulty: 'Expert', points: 400 },
  { id: 'cmd-019', title: 'PHP Code Injection', description: 'Inject PHP code execution', difficulty: 'Hard', points: 275 },
  { id: 'cmd-020', title: 'Python Code Injection', description: 'Execute Python code', difficulty: 'Hard', points: 275 },
  { id: 'cmd-021', title: 'Node.js Injection', description: 'Exploit Node.js command execution', difficulty: 'Hard', points: 300 },
  { id: 'cmd-022', title: 'XXE to RCE', description: 'Escalate XXE to command execution', difficulty: 'Expert', points: 450 },
  { id: 'cmd-023', title: 'Deserialization to RCE', description: 'Exploit insecure deserialization', difficulty: 'Expert', points: 450 },
  { id: 'cmd-024', title: 'Template Injection to RCE', description: 'Server-Side Template Injection', difficulty: 'Expert', points: 400 },
  { id: 'cmd-025', title: 'Command Injection Master', description: 'Ultimate command injection challenge', difficulty: 'Expert', points: 500 },
];

const PlaygroundSystem = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [solvedChallenges, setSolvedChallenges] = useState<string[]>([]);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('solved-cmd-challenges');
    if (saved) setSolvedChallenges(JSON.parse(saved));
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

    const correctAnswers: Record<string, string[]> = {
      'cmd-001': ['; ls', '| ls', '&& ls', '|| ls'],
      'cmd-002': ['; cat /etc/passwd', '&& cat /etc/passwd'],
      'cmd-003': ['$(cat /etc/passwd)', '`cat /etc/passwd`'],
    };

    const correct = correctAnswers[selectedChallenge.id];
    if (correct && correct.some(ans => userInput.toLowerCase().includes(ans.toLowerCase()))) {
      setIsCorrect(true);
      setFeedback('Correct! Challenge completed.');
      const newSolved = [...solvedChallenges, selectedChallenge.id];
      setSolvedChallenges(newSolved);
      localStorage.setItem('solved-cmd-challenges', JSON.stringify(newSolved));
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

  const totalPoints = CMD_CHALLENGES.reduce((sum, c) => sum + c.points, 0);
  const earnedPoints = CMD_CHALLENGES
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
            <Terminal className="w-12 h-12 text-red-500 mr-4 drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]" />
            <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
              System <span className="text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]">Security</span>
            </h1>
          </div>

          <p className="text-slate-400 font-medium text-lg mb-6 max-w-2xl mx-auto uppercase tracking-wide">
            Master command injection and system exploitation through hands-on challenges
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="bg-[#0f172a] rounded-sm px-6 py-3 border border-white/5">
              <div className="text-[10px] font-mono font-bold tracking-widest uppercase text-slate-500">Challenges Solved</div>
              <div className="text-2xl font-black text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]">
                {solvedChallenges.length}/{CMD_CHALLENGES.length}
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
                {Math.round((solvedChallenges.length / CMD_CHALLENGES.length) * 100)}%
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CMD_CHALLENGES.map((challenge, index) => {
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
                    <Terminal className="w-5 h-5" />
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
                    <Terminal className="w-8 h-8 text-red-500" />
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
                      <p>Craft a command injection payload to execute system commands on the server.</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-tight">
                    Your Command Injection Payload:
                  </label>
                  <textarea
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Enter your command injection payload..."
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

        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      </div>
    </div>
  );
};

export default PlaygroundSystem;
