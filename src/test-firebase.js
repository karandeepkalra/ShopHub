// Test file to verify Firebase setup
import { auth, db } from './firebase/config.js';
import { doc, getDoc } from 'firebase/firestore';

console.log('Testing Firebase setup...');
console.log('Auth:', auth);
console.log('DB:', db);

// Test a simple read operation
const testConnection = async () => {
  try {
    const testDoc = await getDoc(doc(db, 'test', 'connection'));
    console.log('Firebase connection test successful');
  } catch (error) {
    console.log('Firebase connection test error:', error);
  }
};

testConnection();
