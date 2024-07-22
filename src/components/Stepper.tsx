import {
  Button,
  Icon,
  StepperContainer,
  StepperContent,
  StepperHeader,
  StepperHeaderElement,
  StepperNav,
} from 'design-react-kit';
import type { Step } from '../types';

type StepsProps = {
  steps: Step[];
  currentStep?: Step;
  children: React.ReactNode;
  handleChangeStep: (step: Step) => void;
};

function Stepper(props: StepsProps) {
  let steps = props.steps || [
    {
      name: 'Step 1',
      id: 'step1',
      index: 0,
    },
    { name: 'Step 2', id: 'step2', index: 1 },
    { name: 'Step 3', id: 'step3', index: 2 },
  ];
  const { currentStep, children, handleChangeStep } = props;

  return (
    <StepperContainer>
      <StepperHeader>
        {steps.map((step, index) => {
          return (
            <StepperHeaderElement
              key={step.id}
              stepperNumber={
                step.id === currentStep.id ? (
                  <Icon icon="it-check" />
                ) : (
                  <span>{index + 1}</span>
                )
              }
              variant={step.id === currentStep.id ? 'active' : null}
            >
              {step.name}
            </StepperHeaderElement>
          );
        })}
      </StepperHeader>
      {/* <StepperContent>
        <div>{children}</div>
      </StepperContent> */}
      {steps && (
        <StepperNav>
          {currentStep?.index > -1 && (
            <Button
              className="steppers-btn-prev"
              color="primary"
              outline
              size="sm"
              onClick={() =>
                handleChangeStep(steps[currentStep.index - 1] as Step)
              }
            >
              <Icon color="primary" icon="it-chevron-left" />
              Indietro
            </Button>
          )}
          {currentStep?.index + 1 < steps.length && (
            <Button
              className="steppers-btn-next"
              color="primary"
              outline
              size="sm"
              onClick={() =>
                handleChangeStep(steps[currentStep.index + 1] as Step)
              }
            >
              Avanti
              <Icon color="primary" icon="it-chevron-right" />
            </Button>
          )}
        </StepperNav>
      )}
    </StepperContainer>
  );
}

export default Stepper;
