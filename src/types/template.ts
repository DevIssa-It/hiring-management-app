import { ApplicationData } from './index';

export interface ApplicationTemplate {
  id: string;
  name: string;
  data: Partial<ApplicationData>;
  userId: string;
  createdAt: Date;
}
