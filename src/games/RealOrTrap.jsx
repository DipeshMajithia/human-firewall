import React, { useState } from 'react';
import GameShell from '../components/GameShell';
import { Globe, Lock, ShieldAlert, CheckCircle } from 'lucide-react';

const sites = [
    {
        id: 1,
        url: "https://www.google.security-check-login.com",
        displayUrl: "google.security-check-login.com",
        looksLike: "Google Login",
        isTrap: true,
        reason: "Subdomain trick! The real domain is 'security-check-login.com', not 'google.com'."
    },
    {
        id: 2,
        url: "https://www.amazon.com/ap/signin",
        displayUrl: "amazon.com/ap/signin",
        looksLike: "Amazon Login",
        isTrap: false,
        reason: "Safe. The domain is exactly 'amazon.com' before the first slash."
    },
    {
        id: 3,
        url: "http://www.hdfcbank.com.payment-verify.net",
        displayUrl: "hdfcbank.com.payment-verify.net",
        looksLike: "HDFC Bank",
        isTrap: true,
        reason: "Classic subdomain attack. It ends in '.net', not '.com'. The real domain is 'payment-verify.net'."
    },
    {
        id: 4,
        url: "https://support.microsoft.com/en-us",
        displayUrl: "support.microsoft.com/en-us",
        looksLike: "Microsoft Support",
        isTrap: false,
        reason: "Safe. 'support' is a valid subdomain of 'microsoft.com'."
    }
];

const successGifs = [
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3aXk3cXFnOWFhajdleXU4anhtaTlrMzhucW8zcDZ1cDVueTF3ZXF2aSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Ljtx4Lvkkh2iMgHQ6D/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3aXk3cXFnOWFhajdleXU4anhtaTlrMzhucW8zcDZ1cDVueTF3ZXF2aSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/vOaA4ZjqIVm29DLYr1/giphy.gif", "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3aXk3cXFnOWFhajdleXU4anhtaTlrMzhucW8zcDZ1cDVueTF3ZXF2aSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/m8crpzTJFRDPhqqhXJ/giphy.gif", "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3N2IxbDNuN29pbGN1dDZreWwxeHkzMzc3djBjOXRtYzQxMXBiMXlidyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/rCknyN636Sfb4bN2Zm/giphy.gif"
];

const failGifs = [
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3eGRzaTZ1c2dpbG90OGFsa2FxYXI0amJ1Ym5wYWI1a285cG1udHZzbCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/xUPGcpfvIsVNeOAZgI/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3bTIwMGx3ODdla2YwYjA1eWY1M2Ntbnhpazd3amRsODB6eG9mZmQyOCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/yn7PQ4Ctb3QjRlynbe/giphy.gif", "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3cXRsZzI4bmJraTlxMGtpZ2hyZDdjYTlwdHJ4bTZ5c244d3Voa291eiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/KcKXlqNZChKQTDQoFR/giphy.gif", "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3M3ZxM3hmdnViNDIzZWU2ajRhZTZsMzdycHMwd2h0bms2YjMzaWl6MCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/0H9f6UfRoHHpUjgp2Q/giphy.gif"
];

let sIndex = 0;
let fIndex = 0;

const RealOrTrap = () => {
    const [index, setIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [feedback, setFeedback] = useState(null);

    const site = sites[index];

    const handleGuess = (guessTrap) => {
        const isCorrect = guessTrap === site.isTrap;

        let gif;
        if (isCorrect) {
            gif = successGifs[sIndex % successGifs.length];
            sIndex++;
            setScore(s => s + 1);
            setFeedback({ type: 'success', message: "Correct! " + site.reason, gif });
        } else {
            gif = failGifs[fIndex % failGifs.length];
            fIndex++;
            setFeedback({ type: 'error', message: "Wrong! " + site.reason, gif });
        }

        setTimeout(() => {
            setFeedback(null);
            if (index < sites.length - 1) {
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
            title="REAL_OR_TRAP"
            score={score}
            total={sites.length}
            isGameOver={isGameOver}
            onReset={handleReset}
            feedback={feedback}
        >
            <div className="flex flex-col items-center justify-center h-full space-y-8">

                {/* Browser Bar Simulation */}
                <div className="w-full max-w-2xl bg-gray-200 rounded-lg overflow-hidden shadow-2xl border-4 border-gray-400">
                    <div className="bg-gray-300 p-2 flex items-center gap-2 border-b border-gray-400">
                        <div className="flex gap-1">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="flex-1 bg-white rounded-full px-4 py-1 text-sm font-mono flex items-center text-gray-700">
                            <Lock size={12} className="mr-2 text-green-600" />
                            {site.displayUrl}
                        </div>
                    </div>
                    <div className="bg-white h-48 flex items-center justify-center flex-col p-8">
                        <div className="text-4xl font-bold text-gray-800 mb-2">{site.looksLike}</div>
                        <div className="text-gray-500">Welcome to our secure portal. Please login.</div>
                        <div className="mt-4 px-6 py-2 bg-blue-600 text-white rounded">Login</div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6 w-full max-w-lg">
                    <button
                        onClick={() => handleGuess(false)}
                        className="p-6 bg-green-500 hover:bg-green-600 rounded-xl text-white font-bold text-2xl shadow-lg transition-transform active:scale-95 flex flex-col items-center gap-2"
                    >
                        <CheckCircle size={40} />
                        REAL SITE
                    </button>
                    <button
                        onClick={() => handleGuess(true)}
                        className="p-6 bg-red-500 hover:bg-red-600 rounded-xl text-white font-bold text-2xl shadow-lg transition-transform active:scale-95 flex flex-col items-center gap-2"
                    >
                        <ShieldAlert size={40} />
                        IT'S A TRAP!
                    </button>
                </div>

            </div>
        </GameShell>
    );
};

export default RealOrTrap;
