import { useState } from "react";
import Button from "@mui/material/Button";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Button variant="contained" color="primary">
        hi
      </Button>
    </>
  );
}

export default App;
