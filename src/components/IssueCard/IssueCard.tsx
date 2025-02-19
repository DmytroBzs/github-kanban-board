import React from 'react';
import { Card } from 'react-bootstrap';
import { formatDistanceToNow } from 'date-fns';
import { Issue } from '../../types/github';
import { useDraggable } from '@dnd-kit/core';

interface IssueCardProps {
  issue: Issue;
  column: 'ToDo' | 'InProgress' | 'Done';
}

const IssueCard: React.FC<IssueCardProps> = ({ issue, column }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: issue.id,
    data: { issue, column },
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="p-3 shadow-sm"
    >
      <Card.Title className="fs-6 fw-bold">{issue.title}</Card.Title>
      <Card.Text className="text-muted">
        #{issue.number} Opened{' '}
        {formatDistanceToNow(new Date(issue.created_at), { addSuffix: true })}
      </Card.Text>
      <Card.Text>
        <a href={issue.user.html_url} target="_blank">
          <img
            src={issue.user.avatar_url}
            alt={issue.user.login}
            className="rounded-circle"
            style={{ width: '20px', height: '20px' }}
          />
          {issue.user.login}
        </a>{' '}
        |{' '}
        <a href={issue.html_url} target="_blank">
          Comments: {issue.comments}
        </a>
      </Card.Text>
    </Card>
  );
};

export default IssueCard;
