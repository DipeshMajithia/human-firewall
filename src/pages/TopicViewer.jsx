import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Home, Shield, AlertTriangle, Users, ShieldCheck } from 'lucide-react';
import { topicsData } from '../data/topics';
import PhishOrReal from '../games/PhishOrReal';
import SpotRedFlag from '../games/SpotRedFlag';
import CrackIt from '../games/CrackIt';
import RealOrTrap from '../games/RealOrTrap';
import SafeOrUnsafe from '../games/SafeOrUnsafe';
import DataDefender from '../games/DataDefender';
import PrivacyPro from '../games/PrivacyPro';
import AccessGranted from '../games/AccessGranted'; // Access Control
import InsiderRisk from '../games/InsiderRisk';

// Game Registry
const GameComponents = {
    PhishOrReal: PhishOrReal,
    SpotRedFlag: SpotRedFlag,
    CrackIt: CrackIt,
    RealOrTrap: RealOrTrap,
    SafeOrUnsafe: SafeOrUnsafe,
    DataDefender: DataDefender,
    PrivacyPro: PrivacyPro,
    AccessGranted: AccessGranted,
    InsiderRisk: InsiderRisk
};

// Icon mapping helper
const getIcon = (iconName) => {
    const icons = { Users, AlertTriangle, ShieldCheck: ShieldCheck, Shield };
    const Icon = icons[iconName] || Users;
    return <Icon size={48} className="mb-4 text-green-400" />;
};

const TopicViewer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const topic = topicsData[id];
    const [currentSection, setCurrentSection] = useState(0);

    if (!topic) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Topic Not Found</h1>
                    <button onClick={() => navigate('/')} className="bg-blue-600 px-6 py-2 rounded-full hover:bg-blue-500">Go Home</button>
                </div>
            </div>
        );
    }

    const sections = topic.sections;
    const isFirst = currentSection === 0;
    const isLast = currentSection === sections.length - 1;

    const handleNext = () => {
        if (!isLast) setCurrentSection(curr => curr + 1);
        else navigate('/');
    };

    const handlePrev = () => {
        if (!isFirst) setCurrentSection(curr => curr - 1);
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col p-4 font-sans">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 p-4">
                <button onClick={() => navigate('/')} className="text-gray-400 hover:text-white flex items-center gap-2">
                    <Home size={20} /> Dashboard
                </button>
                <div className="flex flex-col items-center">
                    <div className="text-sm text-green-400 font-mono tracking-widest uppercase mb-1">Module {id}</div>
                    <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                        {topic.title}
                    </h2>
                </div>
                <div className="w-24 text-right text-sm text-gray-500 font-mono">
                    STEP {currentSection + 1} / {sections.length}
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex items-center justify-center relative p-4">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSection}
                        initial={{ opacity: 0, x: 50, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -50, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="w-full max-w-4xl bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden min-h-[500px] flex flex-col items-center justify-center"
                    >
                        {/* Decorative Background Elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-10 animate-pulse"></div>
                        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-green-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-10 animate-pulse animation-delay-2000"></div>

                        <div className="relative z-10 w-full flex flex-col items-center text-center">

                            {/* Render Logic Based on Type */}
                            {sections[currentSection].type === 'game' ? (
                                <div className="w-full h-full">
                                    {(() => {
                                        const GameComponent = GameComponents[sections[currentSection].gameComponent];
                                        return GameComponent ? (
                                            <div className="animate-in fade-in zoom-in duration-500">
                                                <GameComponent />
                                            </div>
                                        ) : (
                                            <div className="p-8 border-2 border-dashed border-red-500 text-red-500 rounded-xl">
                                                Game Component '{sections[currentSection].gameComponent}' Not Found
                                            </div>
                                        );
                                    })()}
                                </div>
                            ) : (
                                <>
                                    {/* Icon */}
                                    {sections[currentSection].icon && getIcon(sections[currentSection].icon)}

                                    {/* Stat Big Display */}
                                    {sections[currentSection].type === 'stat' && (
                                        <div className="text-8xl md:text-9xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-br from-red-500 to-pink-600 drop-shadow-lg">
                                            {sections[currentSection].value}
                                        </div>
                                    )}

                                    {/* Image/GIF */}
                                    {sections[currentSection].type === 'fact' && sections[currentSection].image && (
                                        <img
                                            src={sections[currentSection].image}
                                            alt="Visual"
                                            className="w-full max-w-md h-64 object-cover rounded-xl mb-8 border-2 border-gray-600 shadow-xl"
                                        />
                                    )}

                                    {/* Title */}
                                    <h3 className="text-3xl md:text-4xl font-bold mb-8 text-white">
                                        {sections[currentSection].title || sections[currentSection].label}
                                    </h3>

                                    {/* Content Text */}
                                    <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
                                        {sections[currentSection].content}
                                    </p>
                                </>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Footer */}
            <div className="h-24 flex items-center justify-center gap-8 z-20">
                <button
                    onClick={handlePrev}
                    disabled={isFirst}
                    className={`p-4 rounded-full border border-gray-600 transition-all ${isFirst ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-700 hover:border-blue-400 hover:scale-110'}`}
                >
                    <ChevronLeft size={32} />
                </button>

                <button
                    onClick={handleNext}
                    className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-green-500 rounded-full font-bold text-lg text-white shadow-lg transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] flex items-center gap-3 overflow-hidden"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        {isLast ? "Complete Module" : "Next Step"} <ChevronRight size={24} />
                    </span>
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </button>
            </div>
        </div>
    );
};

export default TopicViewer;
