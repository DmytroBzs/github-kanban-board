import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Card } from 'react-bootstrap';
import { Issue } from '../../types/github';
import IssueCard from '../IssueCard/IssueCard';

interface DroppableColumnProps {
  id: string;
  title: string;
  issues: Issue[];
}

const DroppableColumn: React.FC<DroppableColumnProps> = ({
  id,
  title,
  issues,
}) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <Card
      className="p-3 shadow-sm"
      ref={setNodeRef}
      style={{
        minHeight: '500px',
        backgroundColor: isOver ? '#f8f9fa' : 'white',
      }}
    >
      <Card.Title className="text-center">{title}</Card.Title>
      <div className="d-flex flex-column gap-2">
        {issues.map(issue => (
          <IssueCard
            key={issue.id}
            issue={issue}
            column={id as 'ToDo' | 'InProgress' | 'Done'}
          />
        ))}
      </div>
    </Card>
  );
};

export default DroppableColumn;
