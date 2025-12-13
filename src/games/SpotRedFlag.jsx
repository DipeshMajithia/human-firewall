import React, { useState } from 'react';
import GameShell from '../components/GameShell';
import { MessageSquare, User, Phone, ShieldAlert } from 'lucide-react';

const scenarios = [
    {
        id: 1,
        type: "chat",
        attacker: "IT Support (Fake)",
        avatar: <User className="text-gray-400" />,
        messages: [
            { sender: "them", text: "Hey, we noticed a virus on your PC. We need to remote in to fix it." },
            { sender: "them", text: "Please install TeamViewer and give me the code." }
        ],
        options: [
            { text: "Okay, installing now. Better safe than sorry!", isCorrect: false, feedback: "Never install remote access tools for unsolicited calls!" },
            { text: "What is your ticket number? I'll call the helpdesk to verify.", isCorrect: true, feedback: "Perfect! Always verify identity through official channels." }
        ]
    },
    {
        id: 2,
        type: "voice",
        attacker: " 'CEO' Voice Deepfake",
        avatar: <Phone className="text-red-400" />,
        messages: [
            { sender: "them", text: "(Voice Call) *Urgent tone* 'Hi, this is [CEO Name]. I'm stuck at the airport and lost my wallet." },
            { sender: "them", text: "I need you to buy 5 Apple Gift cards and read me the numbers so I can get a flight. Expense it later.'" }
        ],
        options: [
            { text: "Gift Experience? Seems weird for a CEO... I'll verify.", isCorrect: true, feedback: "Spot on! CEOs don't ask for Gift Cards. That's a classic scam." },
            { text: "Yes sir! On my way to the store right now.", isCorrect: false, feedback: "Stop! Gift cards = Scam. 100% of the time." }
        ]
    },
    {
        id: 3,
        type: "chat",
        attacker: "Recruiter_Sarah",
        avatar: <User className="text-pink-400" />,
        messages: [
            { sender: "them", text: "Hi! I found your profile. We have a job opening paying $80/hr." },
            { sender: "them", text: "To apply, please fill out this form with your SSN and Bank Info for direct deposit setup." }
        ],
        options: [
            { text: "Wow, $80/hr! Here is my info.", isCorrect: false, feedback: "Too good to be true? It is. Never give SSN/Bank info before an interview." },
            { text: "Can you send the official job description link?", isCorrect: true, feedback: "Smart. Valid jobs have official postings. Scammers want your data fast." }
        ]
    }
];

const successGifs = [
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWF2aHp4MDZqcnUxdG01YXJ5djd6eGMzNWxua3A2eGdjaGw3ZWVhbCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/JvtrhAX8aXo4w/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3c21keTI5dmR6eTFzMnBlbDhtc3RvMHN5cWkyazRrMm42bWc2c3c0MCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/z5BOu8NJ3PAI7Jk3Yz/giphy.gif"
];

const failGifs = [
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3c21keTI5dmR6eTFzMnBlbDhtc3RvMHN5cWkyazRrMm42bWc2c3c0MCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/iMaF9Vh7oJYqvjEeMt/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3YjR6YXM5OWV6MGlxdDMwZzV5aDl6OXJ4OW1yZzhxbDJlaTh6a3pkNyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3ogwGbV5A1ikOyR8Uo/giphy.gif"
];

// Module-level counters for round-robin
let successIndex = 0;
let failIndex = 0;

const SpotRedFlag = () => {
    const [index, setIndex] = useState(0);
    const [result, setResult] = useState(null); // 'correct' | 'wrong'
    const [score, setScore] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [feedback, setFeedback] = useState(null);

    const scenario = scenarios[index];

    const handleChoice = (option) => {
        // Select GIF round-robin
        let gif;
        if (option.isCorrect) {
            gif = successGifs[successIndex % successGifs.length];
            successIndex++;
        } else {
            gif = failGifs[failIndex % failGifs.length];
            failIndex++;
        }

        if (option.isCorrect) {
            setScore(s => s + 1);
            setResult('correct');
            setFeedback({ type: 'success', message: option.feedback, gif: gif });
        } else {
            setResult('wrong');
            setFeedback({ type: 'error', message: option.feedback, gif: gif });
        }

        setTimeout(() => {
            setResult(null);
            setFeedback(null);
            if (index < scenarios.length - 1) {
                setIndex(i => i + 1);
            } else {
                setIsGameOver(true);
            }
        }, 5000);
    };

    const handleReset = () => {
        setIndex(0);
        setScore(0);
        setIsGameOver(false);
        setFeedback(null);
    };

    return (
        <GameShell
            title="SPOT_THE_RED_FLAG"
            score={score}
            total={scenarios.length}
            isGameOver={isGameOver}
            onReset={handleReset}
            feedback={feedback}
        >
            <div className="flex flex-col h-full items-center justify-center space-y-6">
                {/* Attacker Profile */}
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center mb-2 border-2 border-slate-500">
                        {scenario.avatar}
                    </div>
                    <div className="font-bold text-gray-300">{scenario.attacker}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-widest">{scenario.type} INCOMING</div>
                </div>

                {/* Chat / Message Area */}
                <div className="w-full max-w-lg bg-slate-800 rounded-xl p-4 border border-slate-600 space-y-3 min-h-[200px]">
                    {scenario.messages.map((msg, i) => (
                        <div key={i} className="bg-slate-700 p-3 rounded-tr-xl rounded-br-xl rounded-bl-xl text-gray-200 w-fit max-w-[90%] animate-pulse-once">
                            {msg.text}
                        </div>
                    ))}
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl px-4">
                    {scenario.options.map((opt, i) => (
                        <button
                            key={i}
                            onClick={() => handleChoice(opt)}
                            disabled={!!result}
                            className={`p-4 rounded-xl border-2 transition-all text-left group
                ${result
                                    ? 'opacity-50 cursor-not-allowed border-gray-700 bg-gray-800'
                                    : 'border-blue-500 bg-slate-800 hover:bg-slate-750 hover:border-green-400'
                                }
              `}
                        >
                            <div className="flex items-start gap-3">
                                <div className={`mt-1 w-6 h-6 rounded-full border flex items-center justify-center text-sm font-bold
                    ${result ? 'border-gray-500 text-gray-500' : 'border-blue-400 text-blue-400 group-hover:bg-blue-400 group-hover:text-black'}
                 `}>
                                    {String.fromCharCode(65 + i)}
                                </div>
                                <span className="text-gray-300 group-hover:text-white">{opt.text}</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </GameShell>
    );
};

export default SpotRedFlag;
