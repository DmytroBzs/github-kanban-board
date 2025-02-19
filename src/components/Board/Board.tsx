import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Issue } from '../../types/github';
import { useIssues, useLoading, useError } from '../../redux/issues/selectors';
import Loader from '../Loader/Loader';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import DroppableColumn from '../DropableColumn/DropableColumn';

const Board: React.FC = () => {
  const issues: Issue[] = useIssues();
  const loading = useLoading();
  const error = useError();

  const [groupedIssues, setGroupedIssues] = useState({
    ToDo: issues.filter(issue => issue.state === 'open' && !issue.assignee),
    InProgress: issues.filter(
      issue => issue.state === 'open' && issue.assignee
    ),
    Done: issues.filter(issue => issue.state === 'closed'),
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const sourceColumn = active.data.current?.column as
      | 'ToDo'
      | 'InProgress'
      | 'Done';
    const targetColumn = over.id as 'ToDo' | 'InProgress' | 'Done';
    const issueId = active.id;

    if (sourceColumn !== targetColumn) {
      const issueToMove = groupedIssues[sourceColumn].find(
        issue => issue.id === issueId
      );
      if (!issueToMove) return;

      setGroupedIssues(prev => {
        return {
          ...prev,
          [sourceColumn]: prev[sourceColumn].filter(
            issue => issue.id !== issueId
          ),
          [targetColumn]: [
            ...prev[targetColumn],
            {
              ...issueToMove,
              state: targetColumn === 'Done' ? 'closed' : 'open',
            },
          ],
        };
      });
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <Container>
        {error && <p className="text-danger">Error: {error}</p>}
        {loading && <Loader />}
        <Row className="justify-content-center">
          {Object.entries(groupedIssues).map(([key, issues]) => (
            <Col key={key} md={4}>
              <DroppableColumn id={key} title={key} issues={issues} />
            </Col>
          ))}
        </Row>
      </Container>
    </DndContext>
  );
};

export default Board;
