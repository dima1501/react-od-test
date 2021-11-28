import { useState } from "react";
import "./App.scss";
import TaxForm from "./components/TaxForm/TaxForm";
import MyButton from "./components/UI/button/MyButton";
import MyModal from "./components/UI/modal/MyModal";

function App() {
  const [modal, setModal] = useState(false);

  return (
    <div className="App">
      <MyButton theme="white" onClick={() => setModal(true)}>
        Налоговый вычет
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <TaxForm setModal={setModal} />
      </MyModal>
    </div>
  );
}

export default App;
