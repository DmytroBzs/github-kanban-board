import React, { useState } from 'react';
import IssueCard from '../IssueCard/IssueCard';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Issue } from '../../types/github';
import { useIssues, useLoading, useError } from '../../redux/issues/selectors';
import Loader from '../Loader/Loader';

const Board: React.FC = () => {
  const issues: Issue[] = useIssues();
  const loading = useLoading();
  const error = useError();

  const groupedIssues = {
    todo: issues.filter(issue => issue.state === 'open' && !issue.assignee),
    in_progress: issues.filter(
      issue => issue.state === 'open' && issue.assignee
    ),
    done: issues.filter(issue => issue.state === 'closed'),
  };

  const [visibleCounts, setVisibleCounts] = useState<{ [key: string]: number }>(
    {
      todo: 10,
      in_progress: 10,
      done: 10,
    }
  );

  const handleShowMore = (columnKey: keyof typeof groupedIssues) => {
    setVisibleCounts(prev => ({
      ...prev,
      [columnKey]: prev[columnKey] + 10,
    }));
  };

  return (
    <Container>
      {error && <p className="text-danger">Error: {error}</p>}
      {loading && <Loader />}
      {issues.length > 0 && (
        <Row className="justify-content-center">
          {Object.entries(groupedIssues).map(([key, issues]) => (
            <Col key={key} md={4}>
              <Card className="p-3 shadow-sm" style={{ minHeight: '300px' }}>
                <Card.Title className="text-center">
                  {key === 'todo'
                    ? 'ToDo'
                    : key === 'in_progress'
                    ? 'In Progress'
                    : 'Done'}
                </Card.Title>
                <div className="d-flex flex-column gap-2">
                  {issues.slice(0, visibleCounts[key]).map(issue => (
                    <IssueCard key={issue.id} issue={issue} />
                  ))}
                </div>
                {issues.length > visibleCounts[key] && (
                  <Button
                    variant="link"
                    onClick={() =>
                      handleShowMore(key as keyof typeof groupedIssues)
                    }
                  >
                    Show more
                  </Button>
                )}
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Board;
