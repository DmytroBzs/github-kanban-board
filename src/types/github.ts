export interface Owner {
  login: string; // Ім'я користувача власника репозиторію
  avatar_url: string; // URL аватарки власника
  html_url: string; // Посилання на профіль власника
}

export interface Repository {
  id: number;
  name: string; // Назва репозиторію
  full_name: string; // Повна назва (наприклад, facebook/react)
  owner: Owner; // Інформація про власника
  html_url: string; // Посилання на репозиторій
  description: string; // Опис репозиторію
}

export interface Issue {
  id: number;
  title: string; // Заголовок issue
  state: 'open' | 'closed'; // Статус issue (відкрите/закрите)
  assignee: Owner | null; // Користувач, якому призначено issue
  updated_at: string; // Дата оновлення issue
  html_url: string; // Посилання на issue на GitHub
  description: string;
  status: 'todo' | 'in_progress' | 'done'; // Ensure status is defined
  number: number; // Issue number
  created_at: string; // Date when the issue was created
  user: {
    avatar_url: string | undefined;
    html_url: string | undefined;
    login: string; // Username of the issue creator
  };
  comments: number; // Number of comments on the issue
  // Add other properties as needed
}

export interface GitHubState {
  repoUrl: string; // Поточний URL репозиторію
  repository: Repository | null; // Дані про репозиторій
  issues: Issue[]; // Список issues
  loading: boolean; // Стан завантаження
  error: string | null; // Помилка (якщо є)
}
