import { PersistPartial } from 'redux-persist/es/persistReducer';

export interface Owner {
  login: string;
  avatar_url: string;
  html_url: string;
}

export interface Repository {
  id: number;
  name: string;
  full_name: string;
  owner: Owner;
  html_url: string;
  description: string;
}

export interface Issue {
  id: number;
  title: string;
  state: 'open' | 'closed';
  assignee: Owner | null;
  updated_at: string;
  html_url: string;
  description: string;
  status: 'todo' | 'in_progress' | 'done';
  number: number;
  created_at: string;
  user: {
    avatar_url: string | undefined;
    html_url: string | undefined;
    login: string;
  };
  comments: number;
}

export interface GitHubState {
  repoUrl: string;
  repository: Repository | null;
  issues: Issue[];
  loading: boolean;
  error: string | null;
}

export interface IssueState {
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

export interface IssuesState {
  loading: boolean;
  error: string | null;
  currentRepo: string | null;
  repositories: RepoIssues;
}

export type PersistedIssuesState = IssuesState & PersistPartial;
