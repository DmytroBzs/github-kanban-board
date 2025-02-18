import { createSlice } from '@reduxjs/toolkit';
import { fetchIssues } from './operations';
import { Issue } from '../../types/github';

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
      });
  },
});
export default issueSlice.reducer;
