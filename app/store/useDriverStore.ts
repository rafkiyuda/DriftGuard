import { create } from 'zustand';
import { DriverState, DriverStatus } from '@/app/types';

export const useDriverStore = create<DriverState>((set) => ({
    status: 'NO_FACE', // Default state
    isMonitoring: false,
    ear: 0,
    lastAlertTimestamp: 0,

    setStatus: (status: DriverStatus) => set({ status }),
    setEAR: (ear: number) => set({ ear }),
    setIsMonitoring: (isMonitoring: boolean) => set({ isMonitoring }),

    triggerAlert: () => set({ lastAlertTimestamp: Date.now() }),
}));
