import React from "react";
import Form from "./components/Form/Form";
import Spaces from "./components/Spaces/Spaces";
import styles from "./styles.module.css";
import Header from "./components/Header/Header";

function App() {
  return (
    <div>
      <Header />
      <div className={styles.container}>
        <Form />
        <Spaces />
      </div>
    </div>
  );
}

export default App;
