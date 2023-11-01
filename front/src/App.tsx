import { Link } from "react-router-dom";

function App() {
  return (
    <div>
      <button>
        <Link to={`/write`}>쓰기</Link>
      </button>
    </div>
  );
}

export default App;
