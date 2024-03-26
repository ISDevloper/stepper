import { Children, cloneElement, useContext } from "react";
import { TStepperIndicator, TStepperIndicatorList } from "./types";
import { StepperContext } from "./context";

export const Indicators = ({ children, ...rest }: TStepperIndicatorList) => {
  return (
    <div {...rest}>
      {Children.map(children, (child, index) => {
        return cloneElement(child, { index });
      })}
    </div>
  );
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
  );
};
