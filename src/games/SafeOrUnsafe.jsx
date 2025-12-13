import React, { useState } from 'react';
import GameShell from '../components/GameShell';
import { Wifi, Usb, BatteryCharging, Smartphone, Check, X } from 'lucide-react';

const scenarios = [
    {
        id: 1,
        icon: <Wifi size={64} className="text-blue-400" />,
        title: "Free Airport Wi-Fi",
        desc: "You see 'Airport_Free_WiFi'. No password required directly connects.",
        isUnsafe: true,
        reason: "Public Wi-Fi without passwords is unencrypted. Hackers can see everything you do."
    },
    {
        id: 2,
        icon: <Usb size={64} className="text-red-400" />,
        title: "Found USB Drive",
        desc: "You found a 64GB USB drive in the office parking lot. Label says 'Payroll 2024'.",
        isUnsafe: true,
        reason: "Never plug in unknown USBs! It's a 'USB Drop' attack to install malware."
    },
    {
        id: 3,
        icon: <BatteryCharging size={64} className="text-green-400" />,
        title: "Public Charging Station",
        desc: "Your battery is 2%. You use your own adapter and cable into a wall socket.",
        isUnsafe: false,
        reason: "Safe! Using your own charger/plug is fine. Avoid 'USB ports' built into stations (Juice Jacking)."
    },
    {
        id: 4,
        icon: <Smartphone size={64} className="text-purple-400" />,
        title: "App Permissions",
        desc: "A Flashlight app asks for 'Contact List' and 'Location' access.",
        isUnsafe: true,
        reason: "Why does a flashlight need your contacts? It's data mining. Deny!"
    }
];

const successGifs = [
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3cmU0dWs2MTd0bmY1YW9ydDVicnBrajFlZWEzbGswYnN0M2k0NndrayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/GNtqAzjawSIgP58VBM/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3c2U4dzZrdDVtZGljcjBxMzV4bnE4c2NyenZkNnV1YzN3Y3A3N2xnNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/D9ykX6fvk6wEjol470/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3N3ZwNnc3eDlxeXd1Y3B2dGpuMDlvYmFpMXBmd2tiZmcwcnlnbmp5biZlcD12MV9naWZzX3NlYXJjaCZjdD1n/VbK78FHOC0kXsYOzg6/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3bXJrZ2owa3N3anBveGQ4ZXc3OXc4ZmhtZm9jdXVmdjJ5YnNhOXBiYyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/FbsKBcFdArtynQcyni/giphy.gif"

];

const failGifs = [
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3aGVzaGJjY3NteGx5dzNpMGV2bWYyeHI4Mzc5ZnNmZnQ1cDFsOWZqbyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/KZB7UoWfQpO5tqRtTO/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3aGVzaGJjY3NteGx5dzNpMGV2bWYyeHI4Mzc5ZnNmZnQ1cDFsOWZqbyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Lq5r9cAvTXf1co17X2/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3aDE1dGQ1NmFtMWswcGJpOGE4OHBuN2p2cW14NWN2aTFtOWI1MmlhNCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/1d5I0OuQ4vyDMnkY3Q/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3aDE1dGQ1NmFtMWswcGJpOGE4OHBuN2p2cW14NWN2aTFtOWI1MmlhNCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/a7NVHVyIaXAdOPBaxy/giphy.gif"
];

let sIndex = 0;
let fIndex = 0;

const SafeOrUnsafe = () => {
    const [index, setIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [feedback, setFeedback] = useState(null);

    const scenario = scenarios[index];

    const handleGuess = (guessUnsafe) => {
        const isCorrect = guessUnsafe === scenario.isUnsafe;

        let gif;
        if (isCorrect) {
            gif = successGifs[sIndex % successGifs.length];
            sIndex++;
            setScore(s => s + 1);
            setFeedback({ type: 'success', message: "Correct! " + scenario.reason, gif });
        } else {
            gif = failGifs[fIndex % failGifs.length];
            fIndex++;
            setFeedback({ type: 'error', message: "Wrong! " + scenario.reason, gif });
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
            title="SAFE_OR_UNSAFE"
            score={score}
            total={scenarios.length}
            isGameOver={isGameOver}
            onReset={handleReset}
            feedback={feedback}
        >
            <div className="flex flex-col items-center justify-center h-full space-y-8 text-center p-4">

                <div className="bg-gray-800 p-8 rounded-full border-4 border-gray-600 shadow-2xl mb-4 animate-float">
                    {scenario.icon}
                </div>

                <div>
                    <h2 className="text-3xl font-bold text-white mb-4">{scenario.title}</h2>
                    <p className="text-xl text-gray-300 max-w-lg mx-auto">{scenario.desc}</p>
                </div>

                <div className="grid grid-cols-2 gap-8 w-full max-w-md mt-8">
                    <button
                        onClick={() => handleGuess(false)}
                        className="py-4 bg-blue-600 hover:bg-blue-500 rounded-lg font-bold text-xl flex items-center justify-center gap-2 transition-transform active:scale-95"
                    >
                        <Check /> SAFE
                    </button>
                    <button
                        onClick={() => handleGuess(true)}
                        className="py-4 bg-orange-600 hover:bg-orange-500 rounded-lg font-bold text-xl flex items-center justify-center gap-2 transition-transform active:scale-95"
                    >
                        <X /> UNSAFE
                    </button>
                </div>

            </div>
        </GameShell>
    );
};

export default SafeOrUnsafe;
