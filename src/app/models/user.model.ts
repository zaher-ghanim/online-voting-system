export interface User {
  id: string;
  username: string;
  password: string;
  isAdmin: boolean;
  hasVoted?: boolean;
}
