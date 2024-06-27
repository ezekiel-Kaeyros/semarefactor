// actions.ts
export const setCurrentStep = (stepId: number) => ({
  type: 'SET_CURRENT_STEP',
  payload: stepId,
});

// reducers.ts
const initialState = {
  currentStep: 1,
};

export const stepReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_CURRENT_STEP':
      return { ...state, currentStep: action.payload };
    default:
      return state;
  }
};
