import { Link } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <Header />
      <button>
        <Link to={`/write`}>쓰기</Link>
      </button>
    </div>
  );
}

export default App;
