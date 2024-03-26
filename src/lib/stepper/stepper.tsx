import {
  Children,
} from "react";
import { StepperProvider } from "./context";
import { TStepper } from "./types";
import { Indicator, Indicators } from "./indicators";
import { Step, StepList } from "./step";
import { Actions, Last, Next, Previous } from "./actions";

export const Stepper = ({
  children,
  currentStep,
  setApi,
  ...rest
}: TStepper) => {
  const subComponentList = Object.keys(Stepper);
  const subComponents = subComponentList.map((key) => {
    return Children.map(children, (child: JSX.Element) =>
      child?.type?.name === key ? child : null
    );
  });

  return (
    <StepperProvider currentStep={currentStep} setApi={setApi}>
      <div {...rest}>{subComponents.map((component) => component)}</div>;
    </StepperProvider>
  );
};

Stepper.Indicators = Indicators;
Stepper.Indicator = Indicator;
Stepper.StepList = StepList;
Stepper.Step = Step;
Stepper.Actions = Actions;
Stepper.Previous = Previous;
Stepper.Next = Next;
Stepper.Last = Last;
