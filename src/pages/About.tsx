import { useState } from 'react';
import {
  Container,
  Icon,
  StepperContainer,
  StepperHeader,
  StepperHeaderElement,
  Button,
  Card,
  CardBody,
  CardCategory,
  CardText,
  CardTitle,
  Col,
  Row,
} from 'design-react-kit';
function About() {
  const [count, setCount] = useState(0);

  return (
    <Container>
      <div>
        <h1>About</h1>
        <p>Count : {count}</p>
        <Button color="primary" onClick={() => setCount(count + 1)}>
          Increment
        </Button>
      </div>
      <div className="my-5">
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
      </div>
      <Row>
        {['a', 'b', 'c', 'd'].map((i) => (
          <Col lg="6" xs="12" key={i}>
            <Card>
              <CardBody>
                <CardCategory iconName="it-file">
                  <span className="text">
                    Category
                    <br />
                    Name
                  </span>
                </CardCategory>
                <a href="#">
                  <CardTitle tag="h5">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor…
                  </CardTitle>
                </a>
                <CardText>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </CardText>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default About;
