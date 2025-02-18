import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const useIssues = () => {
  const issues = useSelector((state: RootState) => state.issues.issues);
  return issues;
};

export const useLoading = () => {
  const loading = useSelector((state: RootState) => state.issues.loading);
  return loading;
};

export const useError = () => {
  const error = useSelector((state: RootState) => state.issues.error);
  return error;
};
