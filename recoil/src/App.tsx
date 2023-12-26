import React from "react";
import "./App.css";
import { atom, useRecoilState, useRecoilValue } from "./recoil";
const textState = atom({
  key: "textState",
  default: "默认测试",
});

function App() {
  const count = useRecoilValue(textState);

  const [text, setText] = useRecoilState(textState);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event?.target.value);
  };
  return (
    <div className="App">
      <header className="App-header">
        <p>{count}</p>
        <p>
          <input type="text" value={text} onChange={onChange} />
        </p>
      </header>
    </div>
  );
}

export default App;
