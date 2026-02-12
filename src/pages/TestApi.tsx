import { useEffect, useState } from 'react';
import { fakeApi, createFakeApi } from '@/lib/fake-api';
import type { WishlistItem, Transaction } from '@/types';
import type { Course } from '@/types/course';

const TestApiPage = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  // Test 1: Normal API call
  const testNormalApi = async () => {
    setLoading(true);
    setError('');
    try {
      const [wishlistRes, coursesRes, transactionsRes] = await Promise.all([
        fakeApi.getWishlist(),
        fakeApi.getCourses(),
        fakeApi.getTransactions(),
      ]);

      if (wishlistRes.status === 'error') throw new Error(wishlistRes.error);
      if (coursesRes.status === 'error') throw new Error(coursesRes.error);
      if (transactionsRes.status === 'error') throw new Error(transactionsRes.error);

      setWishlist(wishlistRes.data);
      setCourses(coursesRes.data);
      setTransactions(transactionsRes.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  // Test 2: Empty data scenario
  const testEmptyData = async () => {
    setLoading(true);
    setError('');
    try {
      const emptyApi = createFakeApi({ emptyData: true });
      const wishlistRes = await emptyApi.getWishlist();
      const coursesRes = await emptyApi.getCourses();
      const transactionsRes = await emptyApi.getTransactions();

      if (wishlistRes.status === 'error') throw new Error(wishlistRes.error);
      if (coursesRes.status === 'error') throw new Error(coursesRes.error);
      if (transactionsRes.status === 'error') throw new Error(transactionsRes.error);

      setWishlist(wishlistRes.data);
      setCourses(coursesRes.data);
      setTransactions(transactionsRes.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  // Test 3: Error scenario
  const testErrorHandling = async () => {
    setLoading(true);
    setError('');
    try {
      const errorApi = createFakeApi({ shouldFail: true });
      const wishlistRes = await errorApi.getWishlist();
      const coursesRes = await errorApi.getCourses();
      const transactionsRes = await errorApi.getTransactions();

      if (wishlistRes.status === 'error') throw new Error(wishlistRes.error || 'Wishlist API failed');
      if (coursesRes.status === 'error') throw new Error(coursesRes.error || 'Courses API failed');
      if (transactionsRes.status === 'error') throw new Error(transactionsRes.error || 'Transactions API failed');

      setWishlist(wishlistRes.data);
      setCourses(coursesRes.data);
      setTransactions(transactionsRes.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  // Test 4: Not found scenario
  const testNotFound = async () => {
    setLoading(true);
    setError('');
    try {
      const courseRes = await fakeApi.getCourseById('non-existent-id');
      if (courseRes.status === 'error') {
        setError(`Not found test: ${courseRes.error}`);
      } else {
        setError('Expected error but got success');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    testNormalApi();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">API Testing Page</h1>

      <div className="flex gap-2 mb-6">
        <button
          onClick={testNormalApi}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Test Normal API
        </button>
        <button
          onClick={testEmptyData}
          disabled={loading}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-50"
        >
          Test Empty Data
        </button>
        <button
          onClick={testErrorHandling}
          disabled={loading}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
        >
          Test Error Handling
        </button>
        <button
          onClick={testNotFound}
          disabled={loading}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
        >
          Test Not Found
        </button>
      </div>

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Wishlist ({wishlist.length})</h2>
          <ul className="space-y-2">
            {wishlist.map(item => (
              <li key={item.id} className="p-2 border rounded">
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-gray-500">{item.courseId}</p>
                <p className="text-xs text-gray-400">{item.addedAt}</p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Courses ({courses.length})</h2>
          <ul className="space-y-2">
            {courses.map(course => (
              <li key={course.id} className="p-2 border rounded">
                <p className="font-medium">{course.title}</p>
                <p className="text-sm text-gray-500">{course.category} · {course.level}</p>
                <p className="text-xs text-gray-400">{course.instructor}</p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Transactions ({transactions.length})</h2>
          <ul className="space-y-2">
            {transactions.map(tx => (
              <li key={tx.id} className="p-2 border rounded">
                <p className="font-medium">{tx.course}</p>
                <p className="text-sm text-gray-500">{tx.amount} · {tx.status}</p>
                <p className="text-xs text-gray-400">{tx.method}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TestApiPage;