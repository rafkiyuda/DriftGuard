'use client';

import React, { useState, useEffect } from 'react';
import { useDriverStore } from '@/app/store/useDriverStore';
import { VisionGuard } from '@/app/components/vision/VisionGuard';
import { StatusBadge } from '@/app/components/alerts/StatusBadge';
import { EmergencyButton } from '@/app/components/emergency/EmergencyButton';
import { useAlertSound } from '@/app/hooks/useAlertSound';
import { Car, Play, Settings } from 'lucide-react';

export const Dashboard: React.FC = () => {
    const [hasStarted, setHasStarted] = useState(false);
    const { status, setIsMonitoring, isMonitoring } = useDriverStore();
    const { initAudio } = useAlertSound();
    const [debugMode, setDebugMode] = useState(false);

    const handleStart = () => {
        initAudio();
        setHasStarted(true);
        setIsMonitoring(true);
    };

    useEffect(() => {
        // Report status to API when it becomes severe
        if (status === 'DROWSY' || status === 'CRITICAL') {
            // Debounce or logic to prevent flood is simplified here
            // In production, use a more robust event queue
            const report = async () => {
                try {
                    await fetch('/api/events/drowsiness', {
                        method: 'POST',
                        body: JSON.stringify({ status, timestamp: Date.now() })
                    });
                } catch (e) { console.error(e); }
            };
            report();
        }
    }, [status]);

    if (!hasStarted) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-black text-white text-center">
                <div className="bg-blue-600/20 p-6 rounded-full mb-8 animate-pulse">
                    <Car className="w-16 h-16 text-blue-500" />
                </div>
                <h1 className="text-4xl font-bold mb-4 tracking-tighter bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                    DriftGuard
                </h1>
                <p className="text-gray-400 mb-10 max-w-xs mx-auto">
                    Your AI Copilot for Safe Driving.
                    <br /><span className="text-xs text-gray-600">Camera access required.</span>
                </p>
                <button
                    onClick={handleStart}
                    className="w-full max-w-xs bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-full shadow-lg shadow-blue-900/50 transition-all active:scale-95 flex items-center justify-center gap-3"
                >
                    <Play className="fill-current" /> START DRIVE
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-black text-white p-4 pb-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 px-2">
                <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
                    <Car className="text-blue-500" /> DriftGuard
                </h1>
                <button
                    onClick={() => setDebugMode(!debugMode)}
                    className="p-2 text-gray-600 hover:text-white transition"
                >
                    <Settings className="w-5 h-5" />
                </button>
            </div>

            {/* Vision Feed (Toggleable in Debug, Hidden or Small otherwise? 
                For PoC, let's keep it visible but styled if Debug, otherwise hidden or minimized?
                Actually, the requirement says "Shows real-time alerts", and VisionGuard has "Status Overlay".
                Let's show VisionGuard always but styled nicely.
            */}

            {/* Vision Feed (Always mounted to keep state, toggled visibility) */}
            <div className={`transition-all duration-300 overflow-hidden ${debugMode ? 'mb-6 opacity-100 h-64' : 'h-32 opacity-80 mb-6 mx-auto w-32 rounded-lg'}`}>
                <VisionGuard />
            </div>

            {/* Main Alert Area */}
            <div className="flex-1 flex flex-col items-center justify-start pt-8 mb-8 gap-6">
                <StatusBadge status={status} />

                {status === 'CRITICAL' && (
                    <div className="animate-pulse text-red-500 font-bold text-lg text-center bg-red-900/20 p-4 rounded-xl border border-red-900/50">
                        PLEASE PULL OVER IMMEDIATELY!
                    </div>
                )}
            </div>

            {/* Emergency Controls */}
            <div className="mt-auto w-full max-w-md mx-auto">
                <EmergencyButton />
            </div>

            {/* Hidden VisionGuard if not in debug mode to keep logic running? 
                Wait, if I hide it with h-0 overflow-hidden it is still mounted. 
                But I actually want the user to see their face maybe? 
                Let's allow it to be collapsed.
            */}

        </div>
    );
};
