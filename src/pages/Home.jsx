import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Users, Wifi, Eye, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const topics = [
    { id: 1, title: "The Human Factor", icon: <Users />, path: "/topic/1", color: "bg-red-500" },
    { id: 2, title: "Phishing & Vishing", icon: <AlertTriangle />, path: "/topic/2", color: "bg-orange-500" },
    { id: 3, title: "Social Engineering", icon: <Eye />, path: "/topic/3", color: "bg-yellow-500" },
    { id: 4, title: "Passwords & Auth", icon: <Lock />, path: "/topic/4", color: "bg-green-500" },
    { id: 5, title: "Fake Sites & QR", icon: <Shield />, path: "/topic/5", color: "bg-teal-500" },
    { id: 6, title: "Public Wi-Fi Risks", icon: <Wifi />, path: "/topic/6", color: "bg-blue-500" },
    { id: 7, title: "Privacy & Oversharing", icon: <Users />, path: "/topic/7", color: "bg-indigo-500" },
    { id: 8, title: "Scams & Frauds", icon: <AlertTriangle />, path: "/topic/8", color: "bg-purple-500" },
    { id: 9, title: "AI & Deepfakes", icon: <Eye />, path: "/topic/9", color: "bg-pink-500" },
    { id: 10, title: "Human Firewall Pledge", icon: <Shield />, path: "/topic/10", color: "bg-rose-500" },
];

const Home = () => {
    return (
        <div className="min-h-screen bg-slate-900 text-white p-8 font-sans">
            <header className="text-center mb-12">
                <motion.h1
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-4"
                >
                    FROM FIREWALLS TO HUMANWALLS
                </motion.h1>
                <p className="text-xl text-gray-300">Upgrade Your Brain's Security Protocol</p>
            </header>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {topics.map((topic, index) => (
                    <motion.div
                        key={topic.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Link to={topic.path} className="block group">
                            <div className={`h-full p-6 rounded-xl border border-gray-700 bg-gray-800 hover:bg-gray-750 transition-all transform group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(0,0,0,0.5)] cursor-pointer relative overflow-hidden`}>
                                <div className={`absolute top-0 left-0 w-2 h-full ${topic.color}`}></div>
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-lg ${topic.color} bg-opacity-20 text-white`}>
                                        {React.cloneElement(topic.icon, { size: 32 })}
                                    </div>
                                    <div>
                                        <span className="text-gray-400 text-sm font-bold tracking-wider">MODULE {topic.id}</span>
                                        <h3 className="text-xl font-bold group-hover:text-green-400 transition-colors">{topic.title}</h3>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Home;
