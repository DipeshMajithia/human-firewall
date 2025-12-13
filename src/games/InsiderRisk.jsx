import React, { useState } from 'react';
import GameShell from '../components/GameShell';
import { UserMinus, AlertOctagon, FileText, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const behaviors = [
    {
        id: 1,
        desc: "A colleague connects their personal laptop to the corporate network to 'work faster'.",
        risk: "High",
        action: "report",
        reason: "Unauthorized devices bypass security controls and introduce malware."
    },
    {
        id: 2,
        desc: "You see someone printing sensitive financial documents and leaving them on the printer.",
        risk: "Medium",
        action: "report",
        reason: "Clean Desk Policy violation! Sensitive data left unattended is a leak waiting to happen."
    },
    {
        id: 3,
        desc: "An employee is venting about being passed over for a promotion on social media.",
        risk: "Low",
        action: "ignore",
        reason: "Venting is normal, unless they threaten the company or share secrets. Monitor, but maybe not an immediate incident."
    },
    {
        id: 4,
        desc: "A developer is downloading the entire customer database at 3 AM on a Saturday.",
        risk: "Critical",
        action: "report",
        reason: "Classic Insider Threat indicator! excessive data access at unusual times."
    }
];

const successGifs = [
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3ZzJ5cGh1ZnlxNnFzcTAwZ2JiNTU2dnR1am1hMmdxaGo0cTB4dXozYyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/a0jfCqXn1493QRbp4m/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3ZzJ5cGh1ZnlxNnFzcTAwZ2JiNTU2dnR1am1hMmdxaGo0cTB4dXozYyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/A0Odzo5iyiEmcXyYq2/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3Mnp3NmN6NHJ4aGlqZGRhZWQ2aTk5eXBsOHh2MzhzOW01OWQwODM3ciZlcD12MV9naWZzX3NlYXJjaCZjdD1n/lyC32KHa9I3usvyXp6/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3d2tqN21yam1xZWhlN3hqdzd0MGFoeGM2ZjE1b2h3M251M2Fpb3VoYiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/IGMHT68OA9fVFVZTRs/giphy.gif"
];

const failGifs = [
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3NG13ZTkwb250OWo1YWUxYnluaWI5bnE2dGpsdDBvd2hseXB1MHp0aCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/SDNChfHEQrM5z7qsCb/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3amEyMWhtdDUwNWw3aGZnNzNsY2hycjBpeGVsNDVzbGFxNzZsNHE0eiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/GK8SJGCrFhBZfO3I8V/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3MjRhcmZ1cnNlYzV5ZmJydGoxNzh4aG1sNGdwa2R6c2pwcjl1cjB3ZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/UtKHK0xMvRX0ZQTH9J/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3bjEyYXZsNWI1dWtteGVldGFuMHNmdXR1dHY4dnpkeDA4bzl4bnp4eCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/UEw0LlYgEcUnrHs2Ss/giphy.gif"
];

let sIndex = 0;
let fIndex = 0;

const InsiderRisk = () => {
    const [index, setIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [feedback, setFeedback] = useState(null);

    const behavior = behaviors[index];

    const handleAction = (selectedAction) => {
        const isCorrect = selectedAction === behavior.action;
        let message = "";

        if (isCorrect) {
            message = "Sharp eye! " + behavior.reason;
            const gif = successGifs[sIndex % successGifs.length];
            sIndex++;
            setScore(s => s + 1);
            setFeedback({ type: 'success', message, gif });
        } else {
            message = "Missed report! " + behavior.reason;
            const gif = failGifs[fIndex % failGifs.length];
            fIndex++;
            setFeedback({ type: 'error', message, gif });
        }

        setTimeout(() => {
            setFeedback(null);
            if (index < behaviors.length - 1) {
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
            title="INSIDER_THREAT_DETECTOR"
            score={score}
            total={behaviors.length}
            isGameOver={isGameOver}
            onReset={handleReset}
            feedback={feedback}
        >
            <div className="flex flex-col items-center justify-center h-full space-y-8 text-center px-4">

                <motion.div
                    key={index}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-gray-800 p-8 rounded-xl border-l-8 border-orange-500 shadow-xl w-full max-w-2xl"
                >
                    <div className="flex justify-between items-start mb-4">
                        <span className="bg-gray-900 text-gray-400 px-3 py-1 rounded text-xs font-mono uppercase">Log Entry #{behavior.id}29-X</span>
                        <span className={`px-3 py-1 rounded text-xs font-bold uppercase ${behavior.risk === 'Critical' ? 'bg-red-600 text-white' : 'bg-yellow-600 text-black'}`}>Risk Level: {behavior.risk}</span>
                    </div>

                    <p className="text-2xl font-medium text-white mb-8 leading-relaxed">
                        "{behavior.desc}"
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => handleAction('report')}
                            className="p-4 bg-red-600 hover:bg-red-500 text-white rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-transform active:scale-95"
                        >
                            <AlertOctagon /> REPORT INCIDENT
                        </button>
                        <button
                            onClick={() => handleAction('ignore')}
                            className="p-4 bg-gray-600 hover:bg-gray-500 text-white rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-transform active:scale-95"
                        >
                            <CheckCircle /> SEEMS FINE
                        </button>
                    </div>
                </motion.div>

            </div>
        </GameShell>
    );
};

export default InsiderRisk;
