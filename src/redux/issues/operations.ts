import { createAsyncThunk } from '@reduxjs/toolkit';
import { Issue } from '../../types/github';
import axiosInstance from '../../api';

export const fetchIssues = createAsyncThunk<Issue[], string>(
  'issues/fetchIssues',
  async (repoUrl: string) => {
    const response = await axiosInstance.get<Issue[]>(`/${repoUrl}/issues`);
    console.log(response.data);
    return response.data;
  }
);

export const updateIssues = createAsyncThunk<
  Issue[],
  {
    issueId: number;
    newColumn: 'ToDo' | 'InProgress' | 'Done';
    newIndex: number;
  },
  { state: { issues: { issues: Issue[] } } }
>('issues/updateIssues', async ({ issueId, newColumn }, { getState }) => {
  const state = getState() as { issues: { issues: Issue[] } };
  const updatedIssues = [...state.issues.issues];

  const issue = updatedIssues.find(i => i.id === issueId);
  if (!issue) return updatedIssues;

  const newIssue = { ...issue };
  if (newColumn === 'ToDo') {
    newIssue.state = 'open';
    newIssue.assignee = null;
  } else if (newColumn === 'InProgress') {
    newIssue.state = 'open';
    newIssue.assignee = {
      login: 'PlaceholderUser',
      avatar_url: '',
      html_url: '',
    };
  } else if (newColumn === 'Done') {
    newIssue.state = 'closed';
  }

  const updatedIssuesWithoutCurrent = updatedIssues.filter(
    i => i.id !== issueId
  );
  updatedIssuesWithoutCurrent.push(newIssue);

  return updatedIssuesWithoutCurrent;
});
