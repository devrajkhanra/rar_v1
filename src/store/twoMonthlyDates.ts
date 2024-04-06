import { create } from "zustand";

// Define the store
interface DateStore {
  currentDates: string[];
  setCurrentDates: (currentDates: string[]) => void;
}

// Create the store
const useTwoMonthlyDatesStore = create<DateStore>((set) => ({
  currentDates: [],
  setCurrentDates: (currentDates: string[]) => set({ currentDates }),
}));

export default useTwoMonthlyDatesStore;
