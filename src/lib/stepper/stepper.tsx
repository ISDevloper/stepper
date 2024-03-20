import {
  Children,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  cloneElement,
  createContext,
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

type TStepper = {
  children: JSX.Element[];
  currentStep: number;
  setApi: Dispatch<SetStateAction<StepperContextType | undefined>>;
};

export const Stepper = ({
  children,
  currentStep,
  setApi,
  ...rest
}: TStepper) => {
  return (
    <StepperProvider currentStep={currentStep}>
      <StepperWrapper setApi={setApi} {...rest}>
        {children}
      </StepperWrapper>
    </StepperProvider>
  );
};

type TStepperWrapper = {
  children: JSX.Element[];
  setApi: Dispatch<SetStateAction<StepperContextType | undefined>>;
};

export const StepperWrapper = ({
  children,
  setApi,
  ...rest
}: TStepperWrapper) => {
  const context = useContext(StepperContext);
  const subComponentList = Object.keys(Stepper);
  const subComponents = subComponentList.map((key) => {
    return Children.map(children, (child: JSX.Element) =>
      child?.type?.name === key ? child : null
    );
  });

  useEffect(() => {
    setApi(context);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div {...rest}>{subComponents.map((component) => component)}</div>;
};

type TStepperIndicatorList = React.HTMLProps<HTMLDivElement> & {
  children: ReactElement[];
};

const Indicators = ({ children, ...rest }: TStepperIndicatorList) => {
  return (
    <div {...rest}>
      {Children.map(children, (child, index) => {
        return cloneElement(child, { index });
      })}
    </div>
  );
};

type TStepperIndicator = {
  children:
    | (({
        activeStep,
        onClick,
      }: {
        activeStep: number;
        onClick: () => void;
      }) => ReactNode)
    | ReactNode;
  index?: number;
};

export const Indicator = ({ children, index }: TStepperIndicator) => {
  const { activeStep, moveTo } = useContext(StepperContext);
  const onClick = () => {
    if (index !== undefined) {
      moveTo(index);
    }
  };
  return (
    <>
      {typeof children === "function"
        ? children({ activeStep, onClick })
        : children}
    </>
    // <div onClick={handleIndicatorClick} {...rest}>

    // </div>
  );
};

type TStepList = React.HTMLProps<HTMLDivElement> & {
  children: JSX.Element[];
};

export const StepList = ({ children, ...rest }: TStepList) => {
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

type TStep = {
  children: ReactNode;
  isActive?: boolean;
};

const Step = ({ children, isActive }: TStep) => {
  if (!isActive) {
    return null;
  }
  return children;
};

type TActions = {
  children: ReactNode;
} & React.HTMLProps<HTMLDivElement>;

const Actions = ({ children, ...rest }: TActions) => {
  return <div {...rest}>{children}</div>;
};

type TAction = {
  children: ReactElement;
  onClick?: () => void;
} & React.HTMLProps<HTMLButtonElement>;

const Previous = ({ children, onClick, ...rest }: TAction) => {
  const { activeStep, movePrev } = useContext(StepperContext);
  const handleClick = () => {
    movePrev();
  };
  if (activeStep === 0) {
    return null;
  }

  return cloneElement(children, {
    onClick: onClick ? onClick : handleClick,
    ...rest,
  });
};

const Next = ({ children, onClick, ...rest }: TAction) => {
  const { activeStep, itemsCount, moveNext } = useContext(StepperContext);
  const handleClick = () => {
    moveNext();
  };
  if (activeStep >= itemsCount - 1) {
    return null;
  }
  return cloneElement(children, {
    onClick: onClick ? onClick : handleClick,
    ...rest,
  });
};
const Last = ({ children, onClick, ...rest }: TAction) => {
  const { activeStep, itemsCount } = useContext(StepperContext);
  if (activeStep !== itemsCount - 1) {
    return null;
  }
  return cloneElement(children, {
    onClick: onClick,
    ...rest,
  });
};

Stepper.Indicators = Indicators;
Stepper.Indicator = Indicator;
Stepper.StepList = StepList;
Stepper.Step = Step;
Stepper.Actions = Actions;
Stepper.Previous = Previous;
Stepper.Next = Next;
Stepper.Last = Last;
