import React, { useMemo } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import DroppableColumn from '../DropableColumn/DropableColumn';
import { RootState } from '../../redux/store';
import { updateIssueState } from '../../redux/issues/slice';
import Loader from '../Loader/Loader';

const Board: React.FC = () => {
  const dispatch = useDispatch();
  const currentRepo = useSelector(
    (state: RootState) => state.issues.currentRepo
  );
  const loading = useSelector((state: RootState) => state.issues.loading);
  const error = useSelector((state: RootState) => state.issues.error);

  const { issues, issueStates } = useSelector((state: RootState) =>
    currentRepo
      ? state.issues.repositories[currentRepo] || {
          issues: [],
          issueStates: {},
        }
      : { issues: [], issueStates: {} }
  );

  const groupedIssues = useMemo(() => {
    const grouped = {
      ToDo: [] as typeof issues,
      InProgress: [] as typeof issues,
      Done: [] as typeof issues,
    };

    issues.forEach(issue => {
      const state = issueStates[issue.id];
      if (state) {
        grouped[state.column].push(issue);
      }
    });

    Object.keys(grouped).forEach(column => {
      grouped[column as keyof typeof grouped].sort((a, b) => {
        return (
          (issueStates[a.id]?.order || 0) - (issueStates[b.id]?.order || 0)
        );
      });
    });

    return grouped;
  }, [issues, issueStates]);

  const handleDragEnd = (event: DragEndEvent) => {
    if (!currentRepo) return;

    const { active, over } = event;
    if (!over) return;

    const sourceColumn = active.data.current?.column as
      | 'ToDo'
      | 'InProgress'
      | 'Done';
    const targetColumn = over.id as 'ToDo' | 'InProgress' | 'Done';
    const issueId = Number(active.id);

    if (sourceColumn !== targetColumn) {
      dispatch(
        updateIssueState({
          repoUrl: currentRepo,
          issueId,
          column: targetColumn,
          order: groupedIssues[targetColumn].length,
        })
      );
    }
  };

  if (!currentRepo) {
    return (
      <p className="text-center mt-4">
        Please enter a repository URL to load issues
      </p>
    );
  }

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
