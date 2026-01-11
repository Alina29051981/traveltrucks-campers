import { create } from "zustand";

interface BookingFormState {
  name: string;
  email: string;
  comment: string;
  startDate: Date | null;
  endDate: Date | null;
  setField: (field: keyof BookingFormState, value: any) => void;
  reset: () => void;
  hydrate: () => void;
}

export const useBookingFormStore = create<BookingFormState>((set) => ({
  name: '',
  email: '',
  comment: '',
  startDate: null,
  endDate: null,

  setField: (field, value) =>
    set((state) => {
      const newState = { ...state, [field]: value };
     
      localStorage.setItem("bookingForm", JSON.stringify({
        ...newState,
        startDate: newState.startDate?.toISOString() ?? null,
        endDate: newState.endDate?.toISOString() ?? null
      }));
      return newState;
    }),

  reset: () =>
    set({
      name: '',
      email: '',
      comment: '',
      startDate: null,
      endDate: null,
    }, false), 

  hydrate: () => {
    if (typeof window === "undefined") return;

    const saved = localStorage.getItem("bookingForm");
    if (saved) {
      const data = JSON.parse(saved);
      set({
        ...data,
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null,
      });
    }
  },
}));
