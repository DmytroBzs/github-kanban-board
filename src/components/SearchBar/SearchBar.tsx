import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchIssues } from '../../redux/issues/operations';
import { FaSearch } from 'react-icons/fa';
import { Form, InputGroup, Button, Container } from 'react-bootstrap';
import { AppDispatch } from '../../redux/store';

const SearchBar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchQuery, setSearchQuery] = useState('');
  const [repoOwner, setRepoOwner] = useState('');
  const [repoName, setRepoName] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleButtonClick = () => {
    if (searchQuery) {
      const repoUrl = searchQuery
        .replace('https://github.com/', '')
        .replace('http://github.com/', '');
      const [owner, repo] = repoUrl.split('/');
      setRepoOwner(owner);
      setRepoName(repo);
      dispatch(fetchIssues(repoUrl));
    }
  };

  return (
    <Container className="d-flex justify-content-center">
      <div className="w-100" style={{ maxWidth: '600px' }}>
        <InputGroup className="w-100">
          <Form.Control
            type="text"
            placeholder="Enter GitHub repo URL..."
            value={searchQuery}
            onChange={handleSearch}
            className="shadow-sm"
          />
          <Button variant="primary" onClick={handleButtonClick}>
            <FaSearch />
          </Button>
        </InputGroup>

        <div
          className="d-flex "
          style={{
            minHeight: '60px',
          }}
        >
          {repoOwner && repoName && (
            <>
              <Button
                variant="link"
                href={`https://github.com/${repoOwner}`}
                target="_blank"
                className="d-flex"
              >
                {repoOwner}
              </Button>
              <Button
                variant="link"
                href={`https://github.com/${repoOwner}/${repoName}`}
                target="_blank"
                className="d-flex"
              >
                repository
              </Button>
            </>
          )}
        </div>
      </div>
    </Container>
  );
};

export default SearchBar;
