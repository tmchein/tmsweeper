import "./App.css";
import Board from "./components/Board";

function App() {
  return (
    <div>
      <Board boardSize={4} numberOfMines={4} />
    </div>
  );
}

export default App;
