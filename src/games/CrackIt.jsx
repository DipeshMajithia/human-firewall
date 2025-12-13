import React, { useState } from 'react';
import GameShell from '../components/GameShell';
import { Lock, Key, ShieldCheck, ShieldAlert, Timer } from 'lucide-react';

const challenges = [
    { target: "Make a password that takes > 100 YEARS to crack.", minScore: 4 },
    { target: "Fix this weak password: 'password123'", minScore: 3, startingValue: "password123" },
    { target: "Create a memorable passphrase (4+ words).", minScore: 5 }
];

const successGifs = [
    "https://media.giphy.com/media/3o7qDEq2bMbcbPRQ2c/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3aWQ1dHphbTRneWJzN2d0Z205YTRxNDM1M2MzYmpvNml1M3hhZTkwOSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/o75ajIFH0QnQC3nCeD/giphy.gif"
];

const failGifs = [
    "https://media.giphy.com/media/3otPoT9Ttg50nncs7K/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3dnVneTJ5Y2I3OXlhcGt6bG1xdWw4c2R4YmYzankyeTZrODY1ZzhxNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/JXOl4rFwoJJks7xLAr/giphy.gif"
];

let sIndex = 0;
let fIndex = 0;

const CrackIt = () => {
    // Simple "levels" based on challenges
    const [level, setLevel] = useState(0);
    const [password, setPassword] = useState("");
    const [feedback, setFeedback] = useState(null); // Immediate feedback is shown in layout, not overlay
    const [score, setScore] = useState(0); // Completed levels
    const [isGameOver, setIsGameOver] = useState(false);
    const [gameShellFeedback, setGameShellFeedback] = useState(null); // For the overlay

    // Clear feedback when typing
    React.useEffect(() => {
        if (gameShellFeedback) setGameShellFeedback(null);
    }, [password]);

    const currentChallenge = challenges[level];

    const calculateStrength = (pwd) => {
        if (!pwd) return { score: 0, time: "0 seconds", comments: [] };

        let s = 0;
        let comments = [];

        if (pwd.length > 8) s += 1;
        if (pwd.length > 12) s += 2;
        if (/[A-Z]/.test(pwd)) s += 1;
        if (/[0-9]/.test(pwd)) s += 1;
        if (/[^A-Za-z0-9]/.test(pwd)) s += 1;

        // Penalties
        if (/(password|1234|qwerty|admin)/i.test(pwd)) {
            s = Math.max(0, s - 3);
            comments.push("contains common words/patterns");
        }

        let time = "Instant";
        if (s === 1) time = "10 seconds";
        if (s === 2) time = "2 hours";
        if (s === 3) time = "4 weeks";
        if (s === 4) time = "200 years";
        if (s >= 5) time = "5 million years";
        if (s >= 6) time = "The Heat Death of the Universe";

        return { score: Math.min(6, s), time, comments };
    };

    const strength = calculateStrength(password);

    const handleSubmit = () => {
        if (strength.score >= currentChallenge.minScore) {
            // Success
            const gif = successGifs[sIndex % successGifs.length];
            sIndex++;
            setGameShellFeedback({ type: 'success', message: "Strong enough! Level cleared.", gif });

            setScore(s => s + 1);
            setTimeout(() => {
                setGameShellFeedback(null);
                setPassword("");
                if (level < challenges.length - 1) {
                    setLevel(l => l + 1);
                } else {
                    setIsGameOver(true);
                }
            }, 5000);
        } else {
            const gif = failGifs[fIndex % failGifs.length];
            fIndex++;
            setGameShellFeedback({ type: 'error', message: "Too Weak! Try adding numbers, symbols, or length.", gif });
            setTimeout(() => setGameShellFeedback(null), 5000);
        }
    };

    const handleReset = () => {
        setLevel(0);
        setScore(0);
        setPassword("");
        setIsGameOver(false);
    };

    return (
        <GameShell
            title="CRACK_IT"
            score={score}
            total={challenges.length}
            isGameOver={isGameOver}
            onReset={handleReset}
            feedback={gameShellFeedback}
        >
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-600 max-w-2xl mx-auto flex flex-col items-center">
                <h3 className="text-xl font-bold mb-4 text-blue-400">Mission: {currentChallenge.target}</h3>

                <div className="w-full relative mb-6">
                    <input
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Type password here..."
                        className="w-full p-4 rounded-lg bg-gray-900 text-white border-2 border-gray-600 focus:border-blue-500 outline-none text-2xl font-mono tracking-wider text-center"
                    />
                    <div className="absolute right-4 top-4 text-gray-400">
                        {strength.score >= 4 ? <ShieldCheck className="text-green-500" /> : <ShieldAlert className="text-red-500" />}
                    </div>
                </div>

                {/* Strength Meter */}
                <div className="w-full bg-gray-700 h-4 rounded-full mb-6 overflow-hidden">
                    <div
                        className={`h-full transition-all duration-500 ${strength.score < 2 ? 'bg-red-500' : strength.score < 4 ? 'bg-yellow-500' : 'bg-green-500'}`}
                        style={{ width: `${(strength.score / 6) * 100}%` }}
                    ></div>
                </div>

                <div className="grid grid-cols-2 gap-8 w-full mb-8">
                    <div className="bg-gray-900 p-4 rounded-lg text-center border border-gray-700">
                        <div className="text-gray-400 text-sm mb-1 uppercase tracking-wider">Time to Crack</div>
                        <div className={`text-2xl font-bold ${strength.score < 3 ? 'text-red-400' : 'text-green-400'}`}>
                            {strength.time}
                        </div>
                    </div>
                    <div className="bg-gray-900 p-4 rounded-lg text-center border border-gray-700">
                        <div className="text-gray-400 text-sm mb-1 uppercase tracking-wider">Verdict</div>
                        <div className="text-2xl font-bold text-white">
                            {strength.score < 2 ? "Instantly Hacked" : strength.score < 4 ? "Weak" : "Human Firewall"}
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleSubmit}
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-full font-bold text-lg shadow-lg transition-transform active:scale-95"
                >
                    {level === 1 ? "Fix It!" : "Check Strength"}
                </button>
            </div>
        </GameShell>
    );
};

export default CrackIt;
