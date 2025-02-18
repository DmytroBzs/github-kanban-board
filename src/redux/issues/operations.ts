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
