import { create } from "zustand";

type LastUpdatedState = {
  lastUpdatedDate: string | null;
  loading: boolean;
  error: string | null;
  fetchLastUpdatedDate: () => Promise<void>;
};

export const useLastUpdatedStore = create<LastUpdatedState>((set) => ({
  lastUpdatedDate: null,
  loading: false,
  error: null,
  fetchLastUpdatedDate: async () => {
    set({ loading: true });
    try {
      const response = await fetch("/api/lastUpdatedDate");
      if (!response.ok) {
        throw new Error("Failed to fetch last updated date");
      }
      const data = await response.json();
      set({ lastUpdatedDate: data.date, loading: false, error: null });
    } catch (error: any) {
      set({ loading: false, error: error.message });
    }
  },
}));
