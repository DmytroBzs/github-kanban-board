import { PersistedIssuesState } from '../../types/github';
import { RootState } from '../store';

export const selectIssuesState = (state: RootState) => state.issues;

export const selectIssues = (state: RootState) => {
  const { currentRepo, repositories } = state.issues as PersistedIssuesState;
  return currentRepo && repositories[currentRepo]
    ? repositories[currentRepo].issues
    : [];
};

export const selectIssueStates = (state: RootState) => {
  const { currentRepo, repositories } = state.issues as PersistedIssuesState;
  return currentRepo && repositories[currentRepo]
    ? repositories[currentRepo].issueStates
    : {};
};
