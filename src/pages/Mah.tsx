import { useState } from "react";
import {
  Card,
  CardBody,
  CardCategory,
  CardText,
  CardTitle,
  Col,
  Container,
  Input,
  Row,
  Button,
  Select,
  Toggle,
} from "design-react-kit";
function About() {
  const [count, setCount] = useState(0);

  return (
    <Container>
      <div>
        <Row>
          <div>
            <h1>About</h1>
            <p>Count 2: {count}</p>
            <Button color="primary" onClick={() => setCount(count + 1)}>
              Increment
            </Button>
          </div>
        </Row>
      </div>
      <p>-</p>
      <div>
        <Row>
          <Input
            id="inputEmail4"
            label="Nome"
            placeholder="inserisci il tuo indirizzo email"
            type="email"
            wrapperClassName="col col-md-6"
          />
          <Input
            id="exampleInputPassword"
            label="Password"
            placeholder="Inserisci la tua password"
            type="password"
            wrapperClassName="col col-md-6"
          />
        </Row>
        <Row>
          <Input
            id="inputAddress"
            label="Indirizzo"
            placeholder="Via Roma, 1"
            type="text"
            wrapperClassName="col"
          />
        </Row>
        <Row>
          <Input
            id="inputCity"
            label="Comune"
            type="text"
            wrapperClassName="col col-md-6"
          />
          <Input
            id="inputCAP"
            label="CAP"
            type="text"
            wrapperClassName="col col-md-2"
          />
          <Col md="4">
            <Select
              id="selectExampleClassic"
              label="Provincia"
              onChange={() => {}}
            >
              <option label="Opzione 1">Value 1</option>
              <option label="Opzione 2">Value 2</option>
              <option label="Opzione 3">Value 3</option>
              <option label="Opzione 4">Value 4</option>
              <option label="Opzione 5">Value 5</option>
            </Select>
          </Col>
        </Row>
        <p>-</p>
        <Row>
          <Col className="form-group" md="6">
            <Toggle id="toggleEsempio1a" label="Label dell'interruttore 1" />
          </Col>
        </Row>
        <Row>
          <Col sm="auto">
            <Button color="primary" outline>
              Annulla
            </Button>
          </Col>
          <Col sm="auto">
            <Button color="primary" type="submit">
              Conferma
            </Button>
          </Col>
        </Row>
      </div>
      <Row>
        <Col lg="6" xs="12">
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default About;
