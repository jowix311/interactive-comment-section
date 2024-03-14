import { Button } from "@mui/material";
import "./App.css"; // TODO maybe remove this

import Comment from "./comment/comment";

function App() {
  return (
    <>
      <Comment />

      <h1>Test Test</h1>
      <Button variant="contained">Send</Button>
    </>
  );
}

export default App;
