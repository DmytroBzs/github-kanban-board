import { createSlice } from '@reduxjs/toolkit';
import { Issue } from '../../types/github';
import { fetchIssues, updateIssues } from './operations';

interface IssuesState {
  issues: Issue[];
  loading: boolean;
  error: string | null;
}

const initialState: IssuesState = {
  issues: [],
  loading: false,
  error: null,
};
const issueSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchIssues.pending, state => {
        state.loading = true;
      })
      .addCase(fetchIssues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchIssues.fulfilled, (state, action) => {
        state.loading = false;
        state.issues = action.payload;
      })
      .addCase(updateIssues.pending, state => {
        state.loading = true;
      })
      .addCase(updateIssues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateIssues.fulfilled, (state, action) => {
        state.loading = false;
        state.issues = action.payload;
      });
  },
});
export default issueSlice.reducer;
