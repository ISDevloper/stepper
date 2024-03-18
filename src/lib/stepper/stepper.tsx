import {
  Children,
  Dispatch,
  ReactNode,
  SetStateAction,
  cloneElement,
  createContext,
  createElement,
  useContext,
  useEffect,
  useState,
} from "react";

export type StepperContextType = {
  activeStep: number;
  moveNext: () => void;
  movePrev: () => void;
  moveTo: (arg: number) => void;
  itemsCount: number;
  setItemsCount: Dispatch<SetStateAction<number>>;
};

const StepperContext = createContext<StepperContextType>({
  activeStep: 0,
  moveNext: () => {},
  movePrev: () => {},
  moveTo: () => {},
  itemsCount: 0,
  setItemsCount: () => {},
});

type StepperProviderType = {
  children: ReactNode;
  currentStep: number;
};

const StepperProvider = ({ currentStep, children }: StepperProviderType) => {
  const [activeStep, setActiveStep] = useState<number>(currentStep | 0);
  const [itemsCount, setItemsCount] = useState<number>(0);
  const moveNext = () => {
    setActiveStep((prev: number) => {
      return prev + 1;
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

type StepperType = {
  children: JSX.Element[];
  currentStep: number;
  setApi: Dispatch<SetStateAction<StepperContextType | undefined>>;
};

export const Stepper = ({
  children,
  currentStep,
  setApi,
  ...rest
}: StepperType) => {
  return (
    <StepperProvider currentStep={currentStep}>
      <StepperWrapper setApi={setApi} {...rest}>
        {children}
      </StepperWrapper>
    </StepperProvider>
  );
};

type StepperWrapperType = {
  children: JSX.Element[];
  setApi: Dispatch<SetStateAction<StepperContextType | undefined>>;
};

export const StepperWrapper = ({
  children,
  setApi,
  ...rest
}: StepperWrapperType) => {
  const context = useContext(StepperContext);
  const subComponentList = Object.keys(Stepper);
  const subComponents = subComponentList.map((key) => {
    return Children.map(children, (child: JSX.Element) =>
      child?.type?.name === key ? child : null
    );
  });

  useEffect(() => {
    setApi(context);
  }, []);

  return <div {...rest}>{subComponents.map((component) => component)}</div>;
};

type StepperIndicatorListType = {
  className?: string;
  children: JSX.Element[];
};

const Indicators = ({ children, ...rest }: StepperIndicatorListType) => {
  return (
    <div {...rest}>
      {Children.map(children, (child, index) => {
        return cloneElement(child, { index });
      })}
    </div>
  );
};

type StepperIndicatorType = {
  children: (({ activeStep }: { activeStep: number }) => ReactNode) | ReactNode;
  index?: number;
};

export const Indicator = ({
  children,
  index,
  ...rest
}: StepperIndicatorType) => {
  const { activeStep, moveTo } = useContext(StepperContext);
  const handleIndicatorClick = () => {
    if (index !== undefined) {
      moveTo(index);
    }
  };
  return (
    <div onClick={handleIndicatorClick} {...rest}>
      {typeof children === "function" ? children({ activeStep }) : children}
    </div>
  );
};

type StepListType = {
  children: JSX.Element[];
};
export const StepList = ({ children, ...rest }: StepListType) => {
  const { activeStep, setItemsCount } = useContext(StepperContext);

  useEffect(() => {
    setItemsCount(children.length);
  }, [children.length, setItemsCount]);

  return (
    <div {...rest}>
      {Children.map(children, (child, index) => {
        return cloneElement(child, { isActive: activeStep == index });
      })}
    </div>
  );
};

type StepType = {
  children: ReactNode;
  isActive?: boolean;
};

const Step = ({ children, isActive }: StepType) => {
  if (!isActive) {
    return null;
  }
  return children;
};

type ActionsType = {
  children: ReactNode;
};

const Actions = ({ children, ...rest }: ActionsType) => {
  return <div {...rest}>{children}</div>;
};

type PreviousType = {
  children: ReactNode;
  as?: "button" | "div";
};
const Previous = ({ children, as, ...rest }: PreviousType) => {
  const { activeStep, movePrev } = useContext(StepperContext);
  const handleClick = () => {
    movePrev();
  };
  if (activeStep === 0) {
    return null;
  }
  const element = as ? as : "button";
  return createElement(element, { onClick: handleClick, ...rest }, children);
};

type NextType = {
  children: ReactNode;
  as?: "button" | "div";
  onClick?: () => void;
};
const Next = ({ children, as, onClick, ...rest }: NextType) => {
  const { activeStep, itemsCount, moveNext } = useContext(StepperContext);
  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }
    moveNext();
  };
  if (activeStep >= itemsCount - 1) {
    return null;
  }
  const element = as ? as : "button";
  return createElement(element, { onClick: handleClick, ...rest }, children);
};

type LastType = {
  onClick: () => void;
  children: ReactNode;
  as?: "button" | "div";
};

const Last = ({ children, as, onClick, ...rest }: LastType) => {
  const { activeStep, itemsCount } = useContext(StepperContext);
  if (activeStep !== itemsCount - 1) {
    return null;
  }
  const element = as ? as : "button";
  return createElement(element, { onClick, ...rest }, children);
};

Stepper.Indicators = Indicators;
Stepper.Indicator = Indicator;
Stepper.StepList = StepList;
Stepper.Step = Step;
Stepper.Actions = Actions;
Stepper.Previous = Previous;
Stepper.Next = Next;
Stepper.Last = Last;
