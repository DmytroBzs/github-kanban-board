import Board from './components/Board/Board';
import SearchBar from './components/SearchBar/SearchBar';
import { Container, Row } from 'react-bootstrap';

function App() {
  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{
        background:
          'linear-gradient(to bottom right,rgb(122, 20, 77),rgb(45, 119, 189))',
        color: '#fff',
      }}
    >
      <Container className="py-5">
        <Row className="justify-content-center">
          <h1 className="text-center mb-4">GitHub Issues Board</h1>
          <SearchBar />
          <Board />
        </Row>
      </Container>
    </div>
  );
}

export default App;
