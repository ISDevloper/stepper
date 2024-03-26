import { createContext, useEffect, useRef, useState } from "react";
import { StepperContextType, StepperProviderType, TCallbackHandler, TlistnerType } from "./types";
import { registerListner } from "./utils";

const StepperContextInitialState = {
  activeStep: 0,
  moveNext: () => {},
  movePrev: () => {},
  moveTo: () => {},
  itemsCount: 0,
  setItemsCount: () => {},
};

export const StepperContext = createContext<StepperContextType>(
  StepperContextInitialState
);

export const StepperProvider = ({
  currentStep,
  children,
  setApi,
}: StepperProviderType) => {
  const [activeStep, setActiveStep] = useState<number>(currentStep || 0);
  const [itemsCount, setItemsCount] = useState<number>(0);
  const listners = useRef<TlistnerType>({});

  const moveNext = () => {
    setActiveStep((prev: number) => {
      const newValue = prev + 1;
      notify("next", newValue);
      return newValue;
    });
  };

  const movePrev = () => {
    setActiveStep((prev: number) => {
      return prev - 1;
    });
  };

  const moveTo = (index: number) => {
    setActiveStep(index);
  };

  const on = (event: string, callBack: TCallbackHandler) => {
    registerListner(event, callBack, listners.current);
  };

  const notify = (event: string, value: number) => {
    listners.current[event].forEach((l: TCallbackHandler) => {
      l(value);
    });
  };

  useEffect(() => {
    if (setApi) {
      setApi({
        on: on,
        moveNext: moveNext,
        movePrev: movePrev,
        moveTo: moveTo,
      });
    }
  }, []);

  return (
    <StepperContext.Provider
      value={{
        activeStep,
        moveNext,
        movePrev,
        moveTo,
        itemsCount,
        setItemsCount,
      }}
    >
      {children}
    </StepperContext.Provider>
  );
};
