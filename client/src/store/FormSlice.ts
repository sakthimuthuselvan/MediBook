import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
  pageSteps: string[];
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  doa: string;
  reason: string;
  currentStep: number;
  selectedTime: string;
  selectDoctor: any;
  bookedData: any;
}

const initialState: FormState = {
  pageSteps: ['Patient Info', 'Appointment Details', 'Confirmation'],
  currentStep: 1,
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  doa: '',
  reason: '',
  selectedTime: '',
  selectDoctor: {},
  bookedData: {}
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateForm(state, action: PayloadAction<Partial<FormState>>) {
      Object.assign(state, action.payload); // Merge updates directly
    },
    nextStepChange(state, action: PayloadAction<void>) {
      state.currentStep += 1;
    },
    previousStepChange(state, action: PayloadAction<void>) {
      state.currentStep -= 1;
    },
    selectTimeSlot(state, action: PayloadAction<string>) {
      state.selectedTime = action.payload;
    },
    selectDoctor(state, action: PayloadAction<any>) {
      state.selectDoctor = action.payload
    },
    bookedData(state, action: PayloadAction<any>) {
      // You can store booked data if needed
      state.bookedData = action.payload

    }
  },
});

export const { updateForm, nextStepChange, previousStepChange, selectTimeSlot, selectDoctor, bookedData } = formSlice.actions;
export default formSlice.reducer;
