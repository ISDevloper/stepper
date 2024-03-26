import { cloneElement, useContext } from "react";
import { StepperContext } from "./context";
import { TAction, TActions } from "./types";

export const Actions = ({ children, ...rest }: TActions) => {
  return <div {...rest}>{children}</div>;
};

export const Previous = ({ children, onClick, ...rest }: TAction) => {
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

export const Next = ({ children, onClick, ...rest }: TAction) => {
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

export const Last = ({ children, onClick, ...rest }: TAction) => {
  const { activeStep, itemsCount } = useContext(StepperContext);
  if (activeStep !== itemsCount - 1) {
    return null;
  }
  return cloneElement(children, {
    onClick: onClick ? onClick : undefined,
    ...rest,
  });
};
