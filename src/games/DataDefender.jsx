import React, { useState } from 'react';
import GameShell from '../components/GameShell';
import { Shield, FileWarning, Save, HardDrive, Skull } from 'lucide-react';
import { motion } from 'framer-motion';

const files = [
    { id: 1, name: "Quarterly_Report.docx", type: "safe" },
    { id: 2, name: "Free_Minecraft_Skin.exe", type: "malware", reason: ".exe files from unknown sources are often viruses." },
    { id: 3, name: "Urgent_Invoice.pdf", type: "safe" }, // PDFs can be dangerous but here treating as safe contextually
    { id: 4, name: "Love_Letter.vbs", type: "malware", reason: ".vbs scripts are classic vectors for worms." },
    { id: 5, name: "System_Update.js", type: "malware", reason: "JavaScript files running locally can change system settings." },
    { id: 6, name: "Family_Photo.jpg", type: "safe" }
];

const successGifs = [
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3eHRqajhxZTdjbXI5Z3p5Y28xMWIzdmN4eW4wcWd6ZmQ5ZzZldmZkayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Y3FJ0Ghc1sDiBpTmjg/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3azc0Z3kzeWFpN3duNXEydTVuOGR4MzUyaWJ4em1sOXdxcXVwdzlybyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/UUml3oobcOBSSZEZrc/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3azc0Z3kzeWFpN3duNXEydTVuOGR4MzUyaWJ4em1sOXdxcXVwdzlybyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/8TUYmF5V5kUaq7cjoo/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3d2IzMTZwOHF2ZW50bW16Y3RiazhtMWh3OGE5Y3pqOTY0b2l5ejJqZCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/VJY3zeoK87CLBKnqqm/giphy.gif",
];

const failGifs = [
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3YzI1M3E4bTcxZmQycHBqNGdjZXBuMXpkajJqcmtrYXhnNTh1MWJraiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/MaGayDGwklJCKLNCJH/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3emJuN3h5Mmg4NWhwN2V0eWNvOHB0cWVsaHY5OWhpajA5cDA4aWJoayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/XK8mxqg1vy6QxfIRQj/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3MjlmMzRzY3EybmxoNTJwcHN6cW5pM2ljN2lueWxsamFkMHR6c255NyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/w5odeoFcJoQ9fZZd5r/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3aTBxZjhlNjhwOTNuZm5wcmsycmV4NHN5N2g4eTdhNmp2N3AybmU5aSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/d61zJG8LNwK5NaynEG/giphy.gif",
];

let sIndex = 0;
let fIndex = 0;

const DataDefender = () => {
    const [scannedFiles, setScannedFiles] = useState([]);
    const [score, setScore] = useState(0);
    const [mistakes, setMistakes] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [feedback, setFeedback] = useState(null);

    const handleAction = (file, action) => {
        // action: 'scan' (safe) or 'delete' (malware)
        const isMalware = file.type === 'malware';
        let isCorrect = false;
        let message = "";

        if (action === 'save' && !isMalware) {
            isCorrect = true;
            message = "Safe file saved!";
        } else if (action === 'delete' && isMalware) {
            isCorrect = true;
            message = "Malware destroyed! " + file.reason;
        } else if (action === 'save' && isMalware) {
            isCorrect = false;
            message = "Oh no! You saved a virus! " + file.reason;
        } else {
            isCorrect = false;
            message = "Oops! You deleted a safe file.";
        }

        if (isCorrect) {
            const gif = successGifs[sIndex % successGifs.length];
            sIndex++;
            setScore(s => s + 1);
            setFeedback({ type: 'success', message, gif });
        } else {
            const gif = failGifs[fIndex % failGifs.length];
            fIndex++;
            setMistakes(m => m + 1);
            setFeedback({ type: 'error', message, gif });
        }

        setScannedFiles([...scannedFiles, file.id]);

        setTimeout(() => {
            setFeedback(null);
            if (scannedFiles.length + 1 === files.length) {
                setIsGameOver(true);
            }
        }, 8000);
    };

    const handleReset = () => {
        setScannedFiles([]);
        setScore(0);
        setMistakes(0);
        setIsGameOver(false);
        setFeedback(null);
    };

    // Filter out processed files
    const currentFile = files.find(f => !scannedFiles.includes(f.id));

    return (
        <GameShell
            title="DATA_DEFENDER"
            score={score}
            total={files.length}
            isGameOver={isGameOver}
            onReset={handleReset}
            feedback={feedback}
        >
            <div className="flex flex-col items-center justify-center h-full">

                {currentFile ? (
                    <motion.div
                        key={currentFile.id}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="bg-slate-800 p-8 rounded-2xl border-4 border-slate-600 flex flex-col items-center gap-6 shadow-2xl"
                    >
                        <div className="w-24 h-24 bg-slate-700 rounded-full flex items-center justify-center">
                            {currentFile.type === 'malware' && false ? <Skull size={48} className="text-red-500" /> : <HardDrive size={48} className="text-blue-400" />}
                            {/* Don't show skull immediately, that cheats! */}
                            <FileWarning size={48} className="text-yellow-400" />
                        </div>

                        <div className="text-center">
                            <h3 className="text-2xl font-mono font-bold text-white mb-2">{currentFile.name}</h3>
                            <p className="text-gray-400">Incoming transfer...</p>
                        </div>

                        <div className="flex gap-6 mt-4">
                            <button
                                onClick={() => handleAction(currentFile, 'save')}
                                className="flex flex-col items-center gap-2 p-4 bg-green-600 rounded-xl hover:bg-green-500 transition-all w-32"
                            >
                                <Save size={32} />
                                <span className="font-bold">SAVE</span>
                            </button>
                            <button
                                onClick={() => handleAction(currentFile, 'delete')}
                                className="flex flex-col items-center gap-2 p-4 bg-red-600 rounded-xl hover:bg-red-500 transition-all w-32"
                            >
                                <Skull size={32} />
                                <span className="font-bold">DELETE</span>
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <div className="text-center text-gray-400">All files processed. System Scan Complete.</div>
                )}

            </div>
        </GameShell>
    );
};

export default DataDefender;
