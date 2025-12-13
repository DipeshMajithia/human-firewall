import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { RefreshCcw, CheckCircle, XCircle } from 'lucide-react';

// Module-level counters for round-robin rotation
let winIndex = 0;
let lossIndex = 0;

const winGifs = [
    "https://media.giphy.com/media/YQitE4YNQNahy/giphy.gif", // Glitch Skull
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeTFlZjhqd3hkZnlmejh4OW45cWw3dzhmMjN0MmlqdWJ6OWN3cmpiNCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/11sBLVxNs7v6WA/giphy.gif",     // Hacker typing
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2ZrdG1kNHk2NWl6d3AwdGRtZWVoazlkbnN3bGl6ZThyMjZndDY1NiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/vIUTNTUtVKzer1FEY3/giphy.gif"      // You are hacked text
];

const lossGifs = [
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWV6YmlxOW9mbG10ZzY0Zm42dm05dWMwamlpNTZ6bGtrdW9mZnlhMSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3ov9jOe3tFw1WpopMI/giphy.gif", // Glitch Skull
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExampwcnBwcms2bnA5cml2MDYycmswd2Z0MnNtcG14eW9vNTFqbDliYyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/EoH4Wpu8suiNTLpI6j/giphy.gif",     // Hacker typing
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExampwcnBwcms2bnA5cml2MDYycmswd2Z0MnNtcG14eW9vNTFqbDliYyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/1QTTes7srbdzH5kblQ/giphy.gif"      // You are hacked text
];

const GameShell = ({ title, score, total, isGameOver, onReset, feedback, children }) => {

    // Increment indices only once per game-over event to prepare for NEXT time
    useEffect(() => {
        if (isGameOver) {
            // We can just rely on the read-time modulo, but to rotate we need to increment.
            // We'll increment AFTER rendering so the next mount/render gets a new one.
            if (score > total / 2) winIndex++;
            else lossIndex++;

            if (score > total / 2) {
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            }
        }
    }, [isGameOver, score, total]);

    const percentage = Math.round((score / total) * 100) || 0;
    const isWin = percentage >= 70;

    // Select GIF based on current module-level index
    const currentWinGif = winGifs[winIndex % winGifs.length];
    const currentLossGif = lossGifs[lossIndex % lossGifs.length];

    return (
        <div className="w-full max-w-4xl bg-gray-900 rounded-xl border-2 border-slate-700 overflow-hidden shadow-2xl relative min-h-[500px] flex flex-col">
            {/* Game Header */}
            <div className="bg-slate-800 p-4 border-b border-slate-700 flex justify-between items-center">
                <h3 className="font-bold text-xl text-green-400 font-mono tracking-wider">GAME_MODE: {title}</h3>
                <div className="bg-slate-900 px-4 py-1 rounded border border-slate-600 font-mono text-yellow-500">
                    SCORE: {score} / {total}
                </div>
            </div>

            {/* Game Area */}
            <div className="flex-1 p-6 relative">
                {children}
            </div>

            {/* Feedback Overlay (Immediate result after a move) */}
            {feedback && (
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`absolute inset-0 z-40 flex flex-col items-center justify-center p-8 text-center text-white font-bold text-lg ${feedback.type === 'success' ? 'bg-green-600/95' : 'bg-red-600/95'} backdrop-blur-sm`}
                >
                    {feedback.gif && (
                        <img src={feedback.gif} alt="Reaction" className="w-64 h-48 object-cover rounded-xl border-4 border-white shadow-2xl mb-6 animate-bounce-slow" />
                    )}
                    <div className="text-4xl mb-4 font-black uppercase tracking-widest drop-shadow-lg">{feedback.type === 'success' ? 'NAILED IT!' : 'OOPS!'}</div>
                    <div className="text-2xl max-w-lg leading-relaxed drop-shadow-md">{feedback.message}</div>
                </motion.div>
            )}

            {/* Game Over Screen */}
            {isGameOver && (
                <div className="absolute inset-0 bg-slate-900 bg-opacity-95 flex flex-col items-center justify-center z-50 p-8 text-center">
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-slate-800 p-8 rounded-2xl border-2 border-slate-600 max-w-md w-full shadow-[0_0_50px_rgba(0,0,0,0.8)]"
                    >
                        {isWin ? (
                            <>
                                <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
                                <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 mb-2">HACKER REPELLED!</h2>
                                <p className="text-gray-300 mb-6">You spotted the scams like a pro. Your firewall is strong.</p>
                                <img
                                    src={currentWinGif}
                                    alt="Success" className="w-full h-40 object-cover rounded mb-6 opacity-80" />
                            </>
                        ) : (
                            <>
                                <XCircle size={64} className="text-red-500 mx-auto mb-4" />
                                <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600 mb-2">YOU GOT HACKED!</h2>
                                <p className="text-gray-300 mb-6">You let the hackers in. Your data is now on the Dark Web.</p>
                                <img
                                    src={currentLossGif}
                                    alt="Hacker"
                                    className="w-full h-48 object-cover rounded mb-6 opacity-90 border-2 border-red-500"
                                />
                            </>
                        )}

                        <button onClick={onReset} className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold flex items-center justify-center gap-2 transition-all">
                            <RefreshCcw size={20} /> Try Again
                        </button>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default GameShell;
