import React, { useState } from 'react';
import GameShell from '../components/GameShell';
import { Mail, ThumbsUp, ThumbsDown, User, AlertCircle } from 'lucide-react';

const emails = [
    {
        id: 1,
        sender: "IT Support <support@paramgr0ups.com>",
        subject: "Urgent: Password Expiry Notification",
        body: "Dear User, your password for ParamGroups portal will expire in 2 hours. Click here to reset it now to avoid lockout.",
        isPhish: true,
        reason: "Look at the domain: 'paramgr0ups.com' (Zero instead of 'o'). Also uses fear of lockout."
    },
    {
        id: 2,
        sender: "HR Team <hr@paramgroups.com>",
        subject: "Diwali Bonus & Holiday Schedule",
        body: "Hi Team, attached is the holiday list for the upcoming festival season and details about this year's bonus payout structure.",
        isPhish: false,
        reason: "Legit! detailed sender 'hr@paramgroups.com' matches our official domain. Content is expected and professional."
    },
    {
        id: 3,
        sender: "Accounts Dept <invoice@paramgroup-payments.in>",
        subject: "Unpaid Invoice #9982",
        body: "We have not received payment for the attached invoice. Please remit funds to the new bank account account details immediately.",
        isPhish: true,
        reason: "Fishy domain! 'paramgroup-payments.in' is not our official site. And never trust 'new bank account' requests via email."
    },
    {
        id: 4,
        sender: "Rakesh (CEO) <ceo.paramgroups.private@gmail.com>",
        subject: "Do the needful immediately",
        body: "I am in a client meeting. I need you to purchase 10 Amazon Gift cards for the clients as a gesture. Will reimburse you. Do the needful ASAP.",
        isPhish: true,
        reason: "CEO Fraud! The CEO won't email from a random Gmail account asking for Gift Cards. 'Do the needful' implies urgency to bypass logic."
    }
];

const successGifs = [
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3Z3ZwMTY0Z291ZmFoZWw2OG1yNHJsZjV0ZHh3ZHFpeHRsZDNxNHVmNyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/JEVRfQblU1XbjaYf7g/giphy.gif",
    "https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3NGYweGtieTB4ZDRiNXkxaThwNndydnNqdnpsbm9mZWc3NWRsaDVzNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/oFkHDVqOuXo8SMdutF/giphy.gif"
];

const failGifs = [
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGw2bmxhYm1kYmdhcjlsNGswYnVjczB3dWtzeGxzYXM1MWVmcjNxZCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/EXHHMS9caoxAA/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGw2bmxhYm1kYmdhcjlsNGswYnVjczB3dWtzeGxzYXM1MWVmcjNxZCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/vVZypcXdxD508UOjfY/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3ZmR0NDVwaHFmYnJteGRrYjV3ams0bmRtN204NjVkeThkazBhaGFidCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/jmqAW9CiEVS7TkIZdb/giphy.gif"
];

// Module-level counters for round-robin
let successIndex = 0;
let failIndex = 0;

const PhishOrReal = () => {
    const [index, setIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [feedback, setFeedback] = useState(null);

    const currentEmail = emails[index];

    const handleGuess = (guessPhish) => {
        const isCorrect = guessPhish === currentEmail.isPhish;

        // Select GIF round-robin
        let gif;
        if (isCorrect) {
            gif = successGifs[successIndex % successGifs.length];
            successIndex++;
        } else {
            gif = failGifs[failIndex % failGifs.length];
            failIndex++;
        }

        if (isCorrect) {
            setScore(s => s + 1);
            setFeedback({ type: 'success', message: "Correct! " + currentEmail.reason, gif: gif });
        } else {
            setFeedback({ type: 'error', message: "Wrong! " + currentEmail.reason, gif: gif });
        }

        // Wait 7 seconds (7000ms) for user to read feedback
        setTimeout(() => {
            setFeedback(null);
            if (index < emails.length - 1) {
                setIndex(i => i + 1);
            } else {
                setIsGameOver(true);
            }
        }, 7000);
    };

    const handleReset = () => {
        setIndex(0);
        setScore(0);
        setIsGameOver(false);
        setFeedback(null);
    };

    return (
        <GameShell
            title="PHISH_OR_REAL_V1.0"
            score={score}
            total={emails.length}
            isGameOver={isGameOver}
            onReset={handleReset}
            feedback={feedback}
        >
            <div className="bg-white text-black rounded-lg shadow-lg overflow-hidden max-w-2xl mx-auto h-full flex flex-col">
                {/* Fake Email Header */}
                <div className="bg-gray-100 p-4 border-b border-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                            <User />
                        </div>
                        <div>
                            <div className="font-bold text-sm text-gray-800">{currentEmail.sender}</div>
                            <div className="text-xs text-gray-500">To: You &lt;you@company.com&gt;</div>
                        </div>
                    </div>
                    <div className="font-bold text-lg text-gray-900">{currentEmail.subject}</div>
                </div>

                {/* Fake Email Body */}
                <div className="p-6 flex-1 font-serif text-lg leading-relaxed text-gray-800">
                    {currentEmail.body}
                    <div className="mt-8 pt-4 border-t border-gray-100 text-sm text-gray-500 italic">
                        This message was sent from an unmonitored address.
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="p-4 bg-gray-50 flex gap-4 justify-center">
                    <button
                        onClick={() => handleGuess(false)}
                        className="flex-1 py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold text-xl transition-transform transform active:scale-95 flex items-center justify-center gap-2 shadow-lg"
                    >
                        <ThumbsUp /> REAL
                    </button>
                    <button
                        onClick={() => handleGuess(true)}
                        className="flex-1 py-4 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold text-xl transition-transform transform active:scale-95 flex items-center justify-center gap-2 shadow-lg"
                    >
                        <ThumbsDown /> PHISH
                    </button>
                </div>
            </div>
        </GameShell>
    );
};

export default PhishOrReal;
