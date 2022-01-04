import { useState } from "react";
import './App.css';
import PopUp from './components/PopUp'
import styled from 'styled-components';
import { GlobalStyle } from './globalStyles';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Button = styled.button`
  min-width: 100px;
  padding: 16px 32px;
  border-radius: 4px;
  border: none;
  background: #141414;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
`;

function App() {
  const [showPopUp, setShowPopUp] = useState(false);

  const openModal = () => {
    setShowPopUp(prev => !prev);
  }

  return (
    <>
      <Container>
        <Button className="popup" onClick={openModal}>
          Cat Facts
      </Button>
        <PopUp showPopUp={showPopUp} setShowPopUp={setShowPopUp} />
        <GlobalStyle />
      </Container>


    </>
  );
}

export default App;
