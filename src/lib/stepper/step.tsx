import { Children, cloneElement, useContext, useEffect } from "react";
import { StepperContext } from "./context";
import { TStep, TStepList } from "./types";

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

export const Step = ({ children, isActive }: TStep) => {
  if (!isActive) {
    return null;
  }
  return children;
};
