import { useState } from "react";
import useUpdateEffect from "@/hooks/useUpdateEffect";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  useUpdateEffect(() => {
    console.log("count 被修改", count);
  }, [count]);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count+1)}>add+</button>
    </div>
  );
}

export default App;
