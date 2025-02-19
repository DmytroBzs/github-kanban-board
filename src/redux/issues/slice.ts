import { createSlice } from '@reduxjs/toolkit';
import { Issue } from '../../types/github';
import { fetchIssues } from './operations';

interface IssueState {
  id: number;
  column: 'ToDo' | 'InProgress' | 'Done';
  order: number;
}
interface RepoIssues {
  [repoUrl: string]: {
    issues: Issue[];
    issueStates: { [issueId: number]: IssueState };
  };
}
interface IssuesState {
  currentRepo: string | null;
  repositories: RepoIssues;
  loading: boolean;
  error: string | null;
}
const initialState: IssuesState = {
  currentRepo: null,
  repositories: {},
  loading: false,
  error: null,
};

const issueSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    updateIssueState: (state, action) => {
      const { repoUrl, issueId, column, order } = action.payload;
      if (state.repositories[repoUrl]) {
        state.repositories[repoUrl].issueStates[issueId] = {
          id: issueId,
          column,
          order,
        };
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchIssues.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIssues.fulfilled, (state, action) => {
        const { repoUrl, issues } = action.payload;
        state.loading = false;
        state.currentRepo = repoUrl;

        if (!state.repositories[repoUrl]) {
          state.repositories[repoUrl] = {
            issues,
            issueStates: {},
          };
          issues.forEach((issue, index) => {
            let column: 'ToDo' | 'InProgress' | 'Done';
            if (issue.state === 'closed') {
              column = 'Done';
            } else if (issue.assignee) {
              column = 'InProgress';
            } else {
              column = 'ToDo';
            }

            state.repositories[repoUrl].issueStates[issue.id] = {
              id: issue.id,
              column,
              order: index,
            };
          });
        }
      })
      .addCase(fetchIssues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { updateIssueState } = issueSlice.actions;
export default issueSlice.reducer;
