import React, { useState } from 'react';
import GameShell from '../components/GameShell';
import { UserCheck, UserX, IdCard, DoorOpen } from 'lucide-react';
import { motion } from 'framer-motion';

// Physics Security Game
const scenarios = [
    {
        id: 1,
        person: "Delivery Driver",
        detail: "Carrying 5 pizza boxes. 'Hands full, can you get the door?' No badge visible.",
        action: "deny",
        reason: "No Badge = No Entry. Escort them to reception instead."
    },
    {
        id: 2,
        person: "Known Colleague (Sarah)",
        detail: "You know her, but she forgot her badge at home today.",
        action: "deny",
        reason: "Even employees need a temporary badge from security. Never piggyback!"
    },
    {
        id: 3,
        person: "Maintenance Crew",
        detail: "Wearing a uniform and carrying a ladder. Has a visitor badge clearly displayed.",
        action: "allow",
        reason: "Visitor badge is present and visible. They are authorized."
    },
    {
        id: 4,
        person: "The CEO",
        detail: "Rushing to a meeting. 'Don't you know who I am?' No badge.",
        action: "deny",
        reason: "Security applies to everyone, even the CEO. Attackers often impersonate VIPs."
    }
];

const successGifs = [
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3bjExeHU1NG92YTN3M2htNGQ2a3oybHY3azM0NHpzN3o1NjRzMTduaSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ZSAwrhk2cTZ1KLlr8q/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3NHl4emhobG5iNjhjeWgyazNzMnp4aXozdzkwd2h3NHIwZTA0YnJ2YiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/YUUk6U47bkPFZ9j38L/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3Mnp3NmN6NHJ4aGlqZGRhZWQ2aTk5eXBsOHh2MzhzOW01OWQwODM3ciZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Su0X1nLrXHEqh4gfrc/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3Mnp3NmN6NHJ4aGlqZGRhZWQ2aTk5eXBsOHh2MzhzOW01OWQwODM3ciZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3o6gE4DTEEHarE5VBK/giphy.gif"
];

const failGifs = [
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3NHZ2dm1jaXN0bTRxZ2VneHZnOHVhbmUyb25rMTdnazZxaXB1bGo4bSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ZIeozf6aaO2mgHBEUb/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3NHZ2dm1jaXN0bTRxZ2VneHZnOHVhbmUyb25rMTdnazZxaXB1bGo4bSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/KwN5mGuEZBwKLVhEcd/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3emxqZGtveXhzanp1c2Nlc3ZlZnhlNzB6Zzl4c3VybGlsa3ZldnFkayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/auHlo7CZHSpASnGKDC/giphy.gif"
    , "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3MjRudTR2dTEyODF6dHgyMHl1dHl3Z2NuYTA5NnR2eTYzamRsejJqMCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/tNThZxyc81fz5JLlm3/giphy.gif"
];

let sIndex = 0;
let fIndex = 0;

const AccessGranted = () => {
    const [index, setIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [feedback, setFeedback] = useState(null);

    const scenario = scenarios[index];

    const handleAction = (selectedAction) => {
        const isCorrect = selectedAction === scenario.action;
        let message = "";

        if (isCorrect) {
            message = "Good call! " + scenario.reason;
            const gif = successGifs[sIndex % successGifs.length];
            sIndex++;
            setScore(s => s + 1);
            setFeedback({ type: 'success', message, gif });
        } else {
            message = "Security Breach! " + scenario.reason;
            const gif = failGifs[fIndex % failGifs.length];
            fIndex++;
            setFeedback({ type: 'error', message, gif });
        }

        setTimeout(() => {
            setFeedback(null);
            if (index < scenarios.length - 1) {
                setIndex(i => i + 1);
            } else {
                setIsGameOver(true);
            }
        }, 8000);
    };

    const handleReset = () => {
        setIndex(0);
        setScore(0);
        setIsGameOver(false);
        setFeedback(null);
    };

    return (
        <GameShell
            title="ACCESS_CONTROL"
            score={score}
            total={scenarios.length}
            isGameOver={isGameOver}
            onReset={handleReset}
            feedback={feedback}
        >
            <div className="flex flex-col items-center justify-center h-full space-y-8 text-center">

                <motion.div
                    key={index}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="bg-slate-800 p-8 rounded-2xl border border-slate-600 shadow-2xl max-w-md w-full"
                >
                    <div className="w-20 h-20 bg-blue-900 rounded-full mx-auto mb-4 flex items-center justify-center border-2 border-blue-500">
                        <IdCard size={40} className="text-blue-200" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">{scenario.person}</h2>
                    <p className="text-lg text-gray-300 italic mb-6">"{scenario.detail}"</p>

                    <div className="text-xs text-gray-500 uppercase tracking-widest">Decision Required</div>
                </motion.div>

                <div className="flex gap-6 w-full max-w-md px-4">
                    <button
                        onClick={() => handleAction('allow')}
                        className="flex-1 py-4 bg-green-600 hover:bg-green-500 rounded-xl font-bold text-xl transition-all shadow-lg flex flex-col items-center justify-center gap-2 group"
                    >
                        <DoorOpen size={32} className="group-hover:scale-110 transition-transform" />
                        ALLOW ENTRY
                    </button>
                    <button
                        onClick={() => handleAction('deny')}
                        className="flex-1 py-4 bg-red-600 hover:bg-red-500 rounded-xl font-bold text-xl transition-all shadow-lg flex flex-col items-center justify-center gap-2 group"
                    >
                        <UserX size={32} className="group-hover:scale-110 transition-transform" />
                        DENY / REPORT
                    </button>
                </div>

            </div>
        </GameShell>
    );
};

export default AccessGranted;
