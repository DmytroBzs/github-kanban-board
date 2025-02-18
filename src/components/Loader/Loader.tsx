import React from 'react';
import { RingLoader } from 'react-spinners';
import { Container } from 'react-bootstrap';

const Loader: React.FC = () => {
  return (
    <Container
      fluid
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-white"
      style={{
        zIndex: 9999,
        opacity: 0,
        animation: 'fadeIn 0.5s forwards',
      }}
    >
      <RingLoader color="#1f618d" size={50} />
    </Container>
  );
};

export default Loader;
