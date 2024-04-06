import { create } from "zustand";

// Define the store
interface CounterStore {
  count: number;
  increment: () => void;
  decrement: () => void;
}

// Create the store
const useMonthlyCounterStore = create<CounterStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

export default useMonthlyCounterStore;
