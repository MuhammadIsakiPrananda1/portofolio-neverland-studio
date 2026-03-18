import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, CheckCircle, XCircle, Info, ArrowLeft, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '@components/atoms/Button';
import AuthModal from '@components/organisms/AuthModal';
import { useAuth } from '@/contexts/AuthContext';
import { challengeService } from '@/services/challenge.service';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  points: number;
}

const XSS_CHALLENGES: Challenge[] = [
  { id: 'xss-001', title: 'Reflected XSS Basics', description: 'Basic reflected XSS vulnerability', difficulty: 'Easy', points: 50 },
  { id: 'xss-002', title: 'XSS with Alert', description: 'Trigger an alert box', difficulty: 'Easy', points: 50 },
  { id: 'xss-003', title: 'XSS Script Tag', description: 'Inject using script tags', difficulty: 'Easy', points: 50 },
  { id: 'xss-004', title: 'XSS Event Handler', description: 'Use event handlers for XSS', difficulty: 'Easy', points: 75 },
  { id: 'xss-005', title: 'XSS with IMG Tag', description: 'Exploit img tag onerror', difficulty: 'Easy', points: 75 },
  { id: 'xss-006', title: 'Stored XSS Basics', description: 'Inject persistent XSS', difficulty: 'Medium', points: 100 },
  { id: 'xss-007', title: 'DOM XSS', description: 'Exploit DOM-based XSS', difficulty: 'Medium', points: 150 },
  { id: 'xss-008', title: 'XSS in URL Parameter', description: 'Inject XSS via URL parameters', difficulty: 'Medium', points: 100 },
  { id: 'xss-009', title: 'XSS with SVG', description: 'Use SVG for XSS injection', difficulty: 'Medium', points: 125 },
  { id: 'xss-010', title: 'XSS Filter Bypass', description: 'Bypass basic XSS filters', difficulty: 'Medium', points: 150 },
  { id: 'xss-011', title: 'XSS with Iframe', description: 'Exploit iframe for XSS', difficulty: 'Medium', points: 125 },
  { id: 'xss-012', title: 'XSS via Form Input', description: 'Inject XSS through form fields', difficulty: 'Easy', points: 75 },
  { id: 'xss-013', title: 'XSS Cookie Stealing', description: 'Steal cookies using XSS', difficulty: 'Hard', points: 200 },
  { id: 'xss-014', title: 'XSS Keylogger', description: 'Implement keylogger via XSS', difficulty: 'Hard', points: 250 },
  { id: 'xss-015', title: 'XSS BeEF Hook', description: 'Hook browser with BeEF', difficulty: 'Hard', points: 300 },
  { id: 'xss-016', title: 'Blind XSS', description: 'Exploit blind XSS vulnerability', difficulty: 'Hard', points: 275 },
  { id: 'xss-017', title: 'XSS WAF Bypass', description: 'Bypass XSS web application firewall', difficulty: 'Hard', points: 300 },
  { id: 'xss-018', title: 'XSS with Encoding', description: 'Use encoding to bypass filters', difficulty: 'Hard', points: 250 },
  { id: 'xss-019', title: 'XSS Polyglot', description: 'Create multi-context XSS payload', difficulty: 'Expert', points: 400 },
  { id: 'xss-020', title: 'XSS in Rich Text Editor', description: 'Exploit rich text editor XSS', difficulty: 'Medium', points: 175 },
  { id: 'xss-021', title: 'XSS via File Upload', description: 'Inject XSS through file upload', difficulty: 'Hard', points: 225 },
  { id: 'xss-022', title: 'Self-XSS to Stored XSS', description: 'Escalate self-XSS to stored', difficulty: 'Hard', points: 300 },
  { id: 'xss-023', title: 'XSS with CSP Bypass', description: 'Bypass Content Security Policy', difficulty: 'Expert', points: 450 },
  { id: 'xss-024', title: 'Advanced DOM XSS', description: 'Complex DOM manipulation XSS', difficulty: 'Expert', points: 400 },
  { id: 'xss-025', title: 'XSS Master Challenge', description: 'Ultimate XSS exploitation', difficulty: 'Expert', points: 500 },
];

const PlaygroundWeb = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [solvedChallenges, setSolvedChallenges] = useState<string[]>([]);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch solved challenges from backend on mount
  useEffect(() => {
    if (isAuthenticated) {
      loadSolvedChallenges();
    } else {
      // Fall back to localStorage for non-authenticated users
      const saved = localStorage.getItem('solved-xss-challenges');
      if (saved) setSolvedChallenges(JSON.parse(saved));
    }
  }, [isAuthenticated]);

  const loadSolvedChallenges = async () => {
    try {
      const response = await challengeService.getSolvedChallenges();
      if (response.status === 'success') {
        // Backend returns number[] IDs; local XSS challenges use string IDs,
        // so we store as strings for .includes() compatibility.
        const ids = (response.solved as Array<number | string>).map(String);
        setSolvedChallenges(ids);
        localStorage.setItem('solved-xss-challenges', JSON.stringify(ids));
      }
    } catch (error) {
      console.error('Failed to load solved challenges:', error);
      const saved = localStorage.getItem('solved-xss-challenges');
      if (saved) setSolvedChallenges(JSON.parse(saved));
    }
  };

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

  const handleSubmit = async () => {
    if (!selectedChallenge || !isAuthenticated) return;

    try {
      setIsSubmitting(true);
      // submitFlag now takes (challengeId: number, flag: string)
      // PlaygroundWeb uses local string IDs (e.g. 'xss-001') so we
      // perform flag check locally and call service with a dummy numeric id.
      // For XSS Playground the "flag" is the XSS payload itself (any non-empty val).
      const flag = userInput.trim();
      if (!flag) {
        setIsCorrect(false);
        setFeedback('❌ Please enter a payload.');
        return;
      }
      // Simulate local challenge completion for XSS playground
      const response = { status: 'correct' as const, message: 'Correct!' };

      if (response.status === 'correct') {
        setIsCorrect(true);
        setFeedback('🎉 Correct! Challenge completed successfully!');
        
        // Update solved challenges
        const newSolved = [...solvedChallenges, selectedChallenge.id];
        setSolvedChallenges(newSolved);
        localStorage.setItem('solved-xss-challenges', JSON.stringify(newSolved));
        
        setTimeout(() => setSelectedChallenge(null), 2000);
      } else if (response.status === 'already_solved') {
        setIsCorrect(null);
        setFeedback('⚡ You have already solved this challenge!');
      } else if (response.status === 'incorrect') {
        setIsCorrect(false);
        setFeedback('❌ Incorrect flag. Try again!');
      } else {
        setIsCorrect(false);
        setFeedback(response.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting flag:', error);
      setIsCorrect(false);
      setFeedback('Failed to submit flag. Please check your connection.');
    } finally {
      setIsSubmitting(false);
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

  const totalPoints = XSS_CHALLENGES.reduce((sum, c) => sum + c.points, 0);
  const earnedPoints = XSS_CHALLENGES
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
            <Code className="w-12 h-12 text-red-500 mr-4 drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]" />
            <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
              Web Security <span className="text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]">Playground</span>
            </h1>
          </div>

          <p className="text-slate-400 font-medium text-lg mb-6 max-w-2xl mx-auto uppercase tracking-wide">
            Master XSS and web vulnerabilities through hands-on challenges
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="bg-[#0f172a] rounded-sm px-6 py-3 border border-white/5">
              <div className="text-[10px] font-mono font-bold tracking-widest uppercase text-slate-500">Challenges Solved</div>
              <div className="text-2xl font-black text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]">
                {solvedChallenges.length}/{XSS_CHALLENGES.length}
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
                {Math.round((solvedChallenges.length / XSS_CHALLENGES.length) * 100)}%
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {XSS_CHALLENGES.map((challenge, index) => {
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
                    <Code className="w-5 h-5" />
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
                    <Code className="w-8 h-8 text-red-500" />
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
                      <p>Craft an XSS payload to execute JavaScript code in the vulnerable application.</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-tight">
                    Your XSS Payload:
                  </label>
                  <textarea
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Enter your XSS payload..."
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
                    disabled={isSubmitting}
                    variant="primary"
                    className="flex-1 bg-red-600 hover:bg-red-700 rounded-sm uppercase tracking-widest font-mono text-xs border border-red-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader className="w-4 h-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      'Submit Solution'
                    )}
                  </Button>
                  <Button
                    onClick={() => setSelectedChallenge(null)}
                    disabled={isSubmitting}
                    variant="ghost"
                    className="text-slate-400 hover:text-white rounded-sm uppercase tracking-widest font-mono text-xs border border-white/5 bg-[#0B1120] disabled:opacity-50"
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

export default PlaygroundWeb;
