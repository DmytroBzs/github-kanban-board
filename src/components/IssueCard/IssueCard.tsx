import React from 'react';
import { Card } from 'react-bootstrap';
import { formatDistanceToNow } from 'date-fns';
import { Issue } from '../../types/github';

interface IssueCardProps {
  issue: Issue;
}

const IssueCard: React.FC<IssueCardProps> = ({ issue }) => {
  return (
    <Card className="p-3 shadow-sm">
      <Card.Title className="fs-6 fw-bold">{issue.title}</Card.Title>
      <Card.Text className="text-muted">
        #{issue.number} Opened{' '}
        {formatDistanceToNow(new Date(issue.created_at), { addSuffix: true })}
      </Card.Text>
      <Card.Text>
        <strong>{issue.user.login}</strong> | Comments: {issue.comments}
      </Card.Text>
    </Card>
  );
};

export default IssueCard;
