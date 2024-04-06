import { create } from "zustand";

// Define types for item and store state
export type Item =
  | "BroadDashboard"
  | "Nifty 50"
  | "Next 50"
  | "Midcap 50"
  | "SectorialDashboard"
  | "Auto"
  | "Bank";

interface SidebarStore {
  selectedItems: Item[];
  setSelectedItems: (items: Item[]) => void;
}

// Create a Zustand store with types
const useSidebarStore = create<SidebarStore>((set) => ({
  selectedItems: [],
  setSelectedItems: (items) => set({ selectedItems: items }),
}));

export default useSidebarStore;
