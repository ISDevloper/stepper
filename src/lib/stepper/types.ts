import { Dispatch, ReactElement, ReactNode, SetStateAction } from "react";

export type StepperContextType = {
  activeStep: number;
  moveNext: () => void;
  movePrev: () => void;
  moveTo: (arg: number) => void;
  itemsCount: number;
  setItemsCount: Dispatch<SetStateAction<number>>;
};

export type TlistnerType = Record<string, Array<TCallbackHandler>>;

export type TApi = {
  on: (event: string, callBack: TCallbackHandler) => void;
  moveNext: () => void;
  movePrev: () => void;
  moveTo: (index: number) => void;
};

export type StepperProviderType = {
  children: ReactNode;
  currentStep?: number;
  setApi?: Dispatch<TApi>;
};

export type TCallbackHandler = (args: any) => void;

export type TStepper = {
  children: JSX.Element[];
  currentStep: number;
  setApi: Dispatch<TApi>;
};

export type TStepperIndicatorList = React.HTMLProps<HTMLDivElement> & {
  children: ReactElement[];
};

export type TStepperIndicatorChildren = {
  activeStep: number;
  onClick: () => void;
};

export type TStepperIndicator = {
  children:
    | (({ activeStep, onClick }: TStepperIndicatorChildren) => ReactNode)
    | ReactNode;
  index?: number;
};

export type TStep = {
  children: ReactNode;
  isActive?: boolean;
};

export type TStepList = React.HTMLProps<HTMLDivElement> & {
  children: JSX.Element[];
};

export type TActions = {
  children: ReactNode;
} & React.HTMLProps<HTMLDivElement>;

export type TAction = {
  children: ReactElement;
  onClick?: () => void;
} & React.HTMLProps<HTMLButtonElement>;
