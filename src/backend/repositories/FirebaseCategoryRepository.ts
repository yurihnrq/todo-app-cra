import { database } from '../firebase';
import { User } from 'firebase/auth';
import { collection, addDoc, getDocs, deleteDoc, query, where, orderBy } from 'firebase/firestore';
import ICategoryRepository from '../../core/ICategoryRepository';

class FirebaseCategoryRepository implements ICategoryRepository {
  async doesCategoryExist(category: string, user: User): Promise<boolean> {
    const categoryQuery = query(
      collection(database, 'categories', user.uid, 'data'),
      where('name', '==', category)
    );

    const categorySnapshot = await getDocs(categoryQuery);

    if (categorySnapshot.empty) return false;

    return true;
  }

  async save(category: string, user: User): Promise<void> {
    await addDoc(collection(database, 'categories', user.uid, 'data'), {
      name: category,
      date: new Date()
    });
  }

  async delete(category: string, user: User): Promise<void> {
    const categoryQuery = query(
      collection(database, 'categories', user.uid, 'data'),
      where('name', '==', category)
    );

    const categorySnapshot = await getDocs(categoryQuery);

    categorySnapshot.forEach(doc => {
      deleteDoc(doc.ref);
    });
  }

  async getAll(user: User): Promise<string[]> {
    const categories: string[] = [];

    const categoryQuery = query(
      collection(database, 'categories', user.uid, 'data'),
      orderBy('date', 'asc')
    );

    const categorySnapshot = await getDocs(categoryQuery);

    categorySnapshot.forEach(doc => {
      categories.push(doc.data().name);
    });

    return categories;
  }
}

export default FirebaseCategoryRepository;
