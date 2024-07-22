import { useState } from "react";
import { Container, Icon, StepperContainer, StepperHeader, StepperHeaderElement } from 'design-react-kit';
function About() {
  const [count, setCount] = useState(0);

  return (
    <Container>
      <StepperContainer>
        <StepperHeader>
          <StepperHeaderElement
            stepperNumber={<Icon icon="it-check" />}
            variant="confirmed"
          >
            Primo contenuto
          </StepperHeaderElement>
          <StepperHeaderElement
            noLine
            stepperNumber={<span>2</span>}
            variant="active"
          >
            Secondo contenuto
          </StepperHeaderElement>
          <StepperHeaderElement stepperNumber={<span>3</span>}>
            Terzo contenuto
          </StepperHeaderElement>
        </StepperHeader>
      </StepperContainer>
    </Container>
  );
}

export default About;
