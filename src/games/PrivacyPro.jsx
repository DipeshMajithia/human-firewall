import React, { useState } from 'react';
import GameShell from '../components/GameShell';
import { Eye, EyeOff, FileText, Share2, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

const dataItems = [
    { id: 1, text: "Customer Credit Card Numbers", action: "encrypt", reason: "PCI-DSS requires encryption for financials." },
    { id: 2, text: "Public Marketing Brochure", action: "share", reason: "Public info is meant to be shared!" },
    { id: 3, text: "Employee Health Records", action: "encrypt", reason: "HIPAA/GDPR protects sensitive health data." },
    { id: 4, text: "Old Temp Files (7+ years)", action: "shred", reason: "Data minimization: reduce liability by deleting old junk." }
];

const successGifs = [
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3b2llNTdrZTFsdjh6dXVxb2U3c3U5dHR3b2ltZHZzZGY1NWh2aW9oZyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/BYlRdbXG1uPSjd687J/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3b2llNTdrZTFsdjh6dXVxb2U3c3U5dHR3b2ltZHZzZGY1NWh2aW9oZyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/vjzVovqnYaYBN4G2el/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3b2llNTdrZTFsdjh6dXVxb2U3c3U5dHR3b2ltZHZzZGY1NWh2aW9oZyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/HAY0kcCs1itOfI5Zll/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3d3U2cmFnNmlpaGN2amduZDlpc2l3Z3d0a3BlZW5rMWVxM3BlY3R4aSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3oKIPACMkdigxZ20Xm/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3eHRqajhxZTdjbXI5Z3p5Y28xMWIzdmN4eW4wcWd6ZmQ5ZzZldmZkayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/0E5zvkDsBo2kyfx9DT/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3eHRqajhxZTdjbXI5Z3p5Y28xMWIzdmN4eW4wcWd6ZmQ5ZzZldmZkayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/iHDeZhicytN1fiWBj9/giphy.gif"
];

const failGifs = [
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3amQyMmpkMHdjdmo1NGo0emhyY2hucWNvcjlodnFxaTVhMXZ1OGFzbCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/INDGwVx9YqYslSGU5a/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3amQyMmpkMHdjdmo1NGo0emhyY2hucWNvcjlodnFxaTVhMXZ1OGFzbCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/HCkbgKLdLWq3OCV8YM/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3cHFna3JoYmtoZ2RpeW5tMjJ5YWFicnowdW9yem9ydjJjNmY1MXNicSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/xT5LMA60GdFzn0MiR2/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3cHFna3JoYmtoZ2RpeW5tMjJ5YWFicnowdW9yem9ydjJjNmY1MXNicSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/s6eBNFXI1PWts5Jz3c/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3Z25sYnZzMmQ2MmsybHFkZ2I0MTducjZ0ODNxZWxtYWtvcmEwcGlnayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/QROk9uddr78MhjvubD/giphy.gif"
];

let sIndex = 0;
let fIndex = 0;

const PrivacyPro = () => {
    const [index, setIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [feedback, setFeedback] = useState(null);

    const item = dataItems[index];

    const handleAction = (selectedAction) => {
        const isCorrect = selectedAction === item.action;
        let message = "";

        if (isCorrect) {
            message = "Correct! " + item.reason;
            const gif = successGifs[sIndex % successGifs.length];
            sIndex++;
            setScore(s => s + 1);
            setFeedback({ type: 'success', message, gif });
        } else {
            message = `Wrong! You should have used ${item.action.toUpperCase()}. ` + item.reason;
            const gif = failGifs[fIndex % failGifs.length];
            fIndex++;
            setFeedback({ type: 'error', message, gif });
        }

        setTimeout(() => {
            setFeedback(null);
            if (index < dataItems.length - 1) {
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
            title="PRIVACY_PRO_V2"
            score={score}
            total={dataItems.length}
            isGameOver={isGameOver}
            onReset={handleReset}
            feedback={feedback}
        >
            <div className="flex flex-col items-center justify-center h-full space-y-10">
                <motion.div
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-white text-gray-900 p-8 rounded-xl shadow-xl max-w-lg text-center border-l-8 border-purple-500"
                >
                    <div className="uppercase tracking-widest text-xs font-bold text-gray-500 mb-2">Data Classification</div>
                    <div className="text-2xl font-bold mb-4">{item.text}</div>
                    <FileText className="mx-auto text-purple-500" size={48} />
                </motion.div>

                <div className="flex gap-4">
                    <button onClick={() => handleAction('encrypt')} className="flex flex-col items-center gap-2 p-4 bg-gray-700 hover:bg-gray-600 rounded-xl w-24">
                        <EyeOff className="text-blue-400" />
                        <span className="text-xs font-bold">ENCRYPT</span>
                    </button>
                    <button onClick={() => handleAction('share')} className="flex flex-col items-center gap-2 p-4 bg-gray-700 hover:bg-gray-600 rounded-xl w-24">
                        <Share2 className="text-green-400" />
                        <span className="text-xs font-bold">PUBLIC</span>
                    </button>
                    <button onClick={() => handleAction('shred')} className="flex flex-col items-center gap-2 p-4 bg-gray-700 hover:bg-gray-600 rounded-xl w-24">
                        <Trash2 className="text-red-400" />
                        <span className="text-xs font-bold">SHRED</span>
                    </button>
                </div>
            </div>
        </GameShell>
    );
};

export default PrivacyPro;
