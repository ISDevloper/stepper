import { useState } from "react";
import "./App.css";
import { Stepper, StepperContextType } from "./lib/stepper";
import { vclsx } from "./utils";

type StepperIndicatorType = {
  label: string;
};

function App() {
  const [api, setApi] = useState<StepperContextType>();

  const stepperIndicators: StepperIndicatorType[] = [
    { label: "Todo" },
    { label: "In Progress" },
    { label: "Review" },
  ];

  const handleClick = () => {
    console.log("Last step");
  };

  const handleNext = () => {
    api?.moveNext();
  };

  return (
    <Stepper setApi={setApi} currentStep={0}>
      <Stepper.Indicators className="flex items-center gap-2">
        {stepperIndicators.map(
          (stepperIndicators: StepperIndicatorType, index: number) => {
            return (
              <Stepper.Indicator>
                {({ activeStep }) => {
                  return (
                    <div
                      className={vclsx(
                        activeStep === index
                          ? "border-blue-600"
                          : "border-blue-200",
                        "px-6 py-3 border rounded"
                      )}
                    >
                      {stepperIndicators.label}
                    </div>
                  );
                }}
              </Stepper.Indicator>
            );
          }
        )}
      </Stepper.Indicators>
      <Stepper.StepList>
        <Stepper.Step>
          <div>1</div>
        </Stepper.Step>
        <Stepper.Step>
          <div>2</div>
        </Stepper.Step>
        <Stepper.Step>
          <div>3</div>
        </Stepper.Step>
      </Stepper.StepList>
      <Stepper.Actions>
        <Stepper.Previous as="button">Previous</Stepper.Previous>
        <Stepper.Next onClick={handleNext} as="button">
          Next
        </Stepper.Next>
        <Stepper.Last as="button" onClick={handleClick}>
          Last
        </Stepper.Last>
      </Stepper.Actions>
    </Stepper>
  );
}

export default App;
