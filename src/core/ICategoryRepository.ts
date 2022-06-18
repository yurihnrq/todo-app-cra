import { User } from 'firebase/auth';

interface ICategoryRepository {
  save(category: string, user: User): Promise<void>;
  delete(category: string, user: User): Promise<void>;
  getAll(user: User): Promise<string[]>;
  doesCategoryExist(category: string, user: User): Promise<boolean>;
}

export default ICategoryRepository;
