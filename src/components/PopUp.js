import React, { useEffect, useState, useCallback, useRef } from 'react'
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';


const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: 800px;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

const ModalImg = styled.img`
  max-width: 100%;
  height: 100%;
  border-radius: 10px 0 0 10px;
  background: #000;
  object-fit: cover;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  line-height: 1.3;
  color: #141414;
  padding: 2rem;
  p {
    margin: 2rem;
    font-size: .9rem;
  }
  button {
    padding: .5rem 4rem;
    background: #141414;
    color: #fff;
    border: none;
  }
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

export default function PopUp({ showPopUp, setShowPopUp }) {
    const modalRef = useRef();
    const [data, setData] = useState([]);


    const animation = useSpring({
        delay: 3000,
        opacity: showPopUp ? 1 : 0,
        transform: showPopUp ? `translateY(-0%)` : `translateY(100%)`,

    });


    const closeModal = e => {
        if (modalRef.current === e.target) {
            setShowPopUp(false);
        }

    };

    //close on esc press
    const keyPress = useCallback(
        e => {
            if (e.key === 'Escape' && showPopUp) {
                setShowPopUp(false);
                console.log('I pressed');
            }
        },
        [setShowPopUp, showPopUp]
    );

    useEffect(
        () => {
            document.addEventListener('keydown', keyPress);
            return () => document.removeEventListener('keydown', keyPress);
        },
        [keyPress]
    );

    async function getCats() {
        const response = await fetch(
            'https://cat-fact.herokuapp.com/facts',
            {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                }
            }
        );
        const data = await response.json();
        setData(data)
        console.log(data)
    }


    function handleClick() {
        getCats();
    }

    return (

        <>
            {showPopUp ? (
                <Background onClick={closeModal} ref={modalRef}>
                    <animated.div style={animation}>
                        <ModalWrapper showPopUp={showPopUp}>
                            <ModalImg src={require('./cat-img.jpeg')} alt='cat' />
                            <ModalContent>
                                <h1>Cat Facts</h1>
                                <p>{data.map(fact => <li key={fact._id}>{fact.text}</li>)}</p>
                                <button onClick={handleClick}>Get Facts</button>
                            </ModalContent>
                            <CloseModalButton
                                aria-label='Close modal'
                                onClick={() => setShowPopUp(prev => !prev)}
                            />
                        </ModalWrapper>
                    </animated.div>
                </Background>
            ) : null}
        </>

    )

}
