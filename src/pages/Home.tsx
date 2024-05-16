import { Button, Container } from "design-react-kit";
import { useState } from "react";

function Home() {
  const [count, setCount] = useState(0);

  return (
    <Container>
      <h1>Home</h1>
      <p>Count: {count}</p>
      <Button color="primary" onClick={() => setCount(count + 1)}>
        Increment
      </Button>
      <div></div>
    </Container>
  );
}

export default Home;
