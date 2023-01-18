import "./App.css";
import Board from "./components/Board";

function App() {
  return (
    <div>
      <Board boardSize={2} numberOfMines={1} />
    </div>
  );
}

export default App;
