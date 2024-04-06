import { create } from "zustand";

// Define the store
interface DateStore {
  currentDates: string[];
  previousDates: string[];
  setCurrentDates: (currentDates: string[]) => void;
  setPreviousDates: (previousDates: string[]) => void;
}

// Create the store
const useWeeklyDatesStore = create<DateStore>((set) => ({
  currentDates: [],
  previousDates: [],
  setCurrentDates: (currentDates: string[]) => set({ currentDates }),
  setPreviousDates: (previousDates: string[]) => set({ previousDates }),
}));

export default useWeeklyDatesStore;
