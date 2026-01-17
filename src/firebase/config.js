// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, collection, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

// Your web app's Firebase configuration
// TODO: Replace with your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyB33lilkD2Qk7NLazRc2v6ivy_Av6oAQVY",
  authDomain: "ecommerce-b8114.firebaseapp.com",
  projectId: "ecommerce-b8114",
  storageBucket: "ecommerce-b8114.firebasestorage.app",
  messagingSenderId: "253084613637",
  appId: "1:253084613637:web:43b7729edc908d0e96706c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);

// Set auth persistence to LOCAL for cross-session persistence
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error('Auth persistence error:', error);
});

export const db = getFirestore(app);

// Test Firebase connection
console.log('Firebase initialized:', app);
console.log('Auth initialized:', auth);

// Authentication functions
export const registerUser = async (email, password, userData) => {
  try {
    console.log('Firebase registerUser called with:', email);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    console.log('User created in Firebase:', user);
    
    // Create user document in Firestore
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      uid: user.uid,
      email: userData.email,
      name: userData.name,
      cart: [],
      wishlist: [],
      createdAt: new Date().toISOString()
    });
    
    console.log('User document created in Firestore');
    
    return { success: true, user: { uid: user.uid, email: userData.email, name: userData.name } };
  } catch (error) {
    console.error('Firebase registration error:', error);
    let errorMessage = "Registration failed";
    
    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage = "An account with this email already exists. Please sign in instead.";
        break;
      case 'auth/weak-password':
        errorMessage = "Password should be at least 6 characters long.";
        break;
      case 'auth/invalid-email':
        errorMessage = "Please enter a valid email address.";
        break;
      case 'auth/network-request-failed':
        errorMessage = "Network error. Please check your connection.";
        break;
      default:
        errorMessage = error.message || "Registration failed";
    }
    
    return { success: false, error: errorMessage };
  }
};

export const loginUser = async (email, password) => {
  try {
    console.log('Firebase loginUser called with:', email);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    console.log('User signed in to Firebase:', user);
    
    // Ensure user document exists in Firestore
    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);
    
    if (!snap.exists()) {
      console.log('User document does not exist, creating it...');
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        name: user.displayName || user.email.split('@')[0],
        cart: [],
        wishlist: [],
        createdAt: new Date().toISOString()
      });
      console.log('User document created in Firestore');
      
      return { 
        success: true, 
        user: { 
          uid: user.uid, 
          email: user.email, 
          name: user.displayName || user.email.split('@')[0]
        } 
      };
    }
    
    // Get user data from Firestore
    const userData = snap.data();
    console.log('User data from Firestore:', userData);
    
    return { 
      success: true, 
      user: { 
        uid: user.uid, 
        email: userData.email, 
        name: userData.name 
      } 
    };
  } catch (error) {
    console.error('Firebase login error:', error);
    let errorMessage = "Login failed";
    
    switch (error.code) {
      case 'auth/user-not-found':
        errorMessage = "No account found with this email. Please create an account first.";
        break;
      case 'auth/wrong-password':
        errorMessage = "Incorrect password. Please try again.";
        break;
      case 'auth/invalid-credential':
        errorMessage = "Invalid credentials. Please create an account first.";
        break;
      case 'auth/invalid-email':
        errorMessage = "Please enter a valid email address.";
        break;
      case 'auth/user-disabled':
        errorMessage = "This account has been disabled.";
        break;
      case 'auth/too-many-requests':
        errorMessage = "Too many failed attempts. Please try again later.";
        break;
      case 'auth/network-request-failed':
        errorMessage = "Network error. Please check your connection.";
        break;
      default:
        errorMessage = error.message || "Login failed";
    }
    
    return { success: false, error: errorMessage };
  }
};

export const logoutUser = async () => {
  try {
    console.log('Firebase logoutUser called');
    await signOut(auth);
    console.log('User signed out successfully');
    return { success: true };
  } catch (error) {
    console.error('Firebase logout error:', error);
    return { success: false, error: error.message };
  }
};

// Cart and Wishlist functions
export const getUserCart = async (userId) => {
  try {
    console.log('Getting user cart for:', userId);
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      const cartData = userDoc.data().cart || [];
      console.log('User cart retrieved successfully:', cartData.length, 'items');
      return cartData;
    } else {
      console.log('User document does not exist, returning empty cart');
      return [];
    }
  } catch (error) {
    console.error('Error getting user cart:', error);
    return [];
  }
};

export const getUserWishlist = async (userId) => {
  try {
    console.log('Getting user wishlist for:', userId);
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      const wishlistData = userDoc.data().wishlist || [];
      console.log('User wishlist retrieved successfully:', wishlistData.length, 'items');
      return wishlistData;
    } else {
      console.log('User document does not exist, returning empty wishlist');
      return [];
    }
  } catch (error) {
    console.error('Error getting user wishlist:', error);
    return [];
  }
};

export const updateUserCart = async (userId, cart) => {
  try {
    await updateDoc(doc(db, "users", userId), { cart });
    return { success: true };
  } catch (error) {
    console.error('Error updating user cart:', error);
    return { success: false, error: error.message };
  }
};

export const updateUserWishlist = async (userId, wishlist) => {
  try {
    await updateDoc(doc(db, "users", userId), { wishlist });
    return { success: true };
  } catch (error) {
    console.error('Error updating user wishlist:', error);
    return { success: false, error: error.message };
  }
};

export const addToUserCart = async (userId, product) => {
  try {
    console.log('Adding to cart:', product.name, 'for user:', userId);
    
    // Get current cart
    const userCart = await getUserCart(userId);
    console.log('Current cart:', userCart);
    
    const existingItem = userCart.find(item => item.id === product.id);
    console.log('Existing item:', existingItem);
    
    if (existingItem) {
      // Update quantity if item already exists
      const updatedCart = userCart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      console.log('Updating cart with new quantity:', updatedCart);
      await updateUserCart(userId, updatedCart);
      console.log('Cart updated successfully');
    } else {
      // Add new item with quantity 1
      console.log('Adding new item to cart...');
      await updateDoc(doc(db, "users", userId), {
        cart: arrayUnion({ ...product, quantity: 1 })
      });
      console.log('New item added to cart successfully');
    }
    return { success: true };
  } catch (error) {
    console.error('Error adding to user cart:', error);
    console.error('Full error details:', error.code, error.message);
    return { success: false, error: error.message };
  }
};

export const removeFromUserCart = async (userId, productId) => {
  try {
    const userCart = await getUserCart(userId);
    const updatedCart = userCart.filter(item => item.id !== productId);
    await updateUserCart(userId, updatedCart);
    return { success: true };
  } catch (error) {
    console.error('Error removing from user cart:', error);
    return { success: false, error: error.message };
  }
};

export const addToUserWishlist = async (userId, product) => {
  try {
    console.log('Adding to wishlist:', product.name, 'for user:', userId);
    
    // Get current wishlist
    const userWishlist = await getUserWishlist(userId);
    console.log('Current wishlist:', userWishlist);
    
    const exists = userWishlist.some(item => item.id === product.id);
    console.log('Item already in wishlist:', exists);
    
    if (!exists) {
      await updateDoc(doc(db, "users", userId), {
        wishlist: arrayUnion(product)
      });
      console.log('Added new item to wishlist');
    } else {
      console.log('Item already exists in wishlist');
    }
    return { success: true };
  } catch (error) {
    console.error('Error adding to user wishlist:', error);
    console.error('Full error details:', error.code, error.message);
    return { success: false, error: error.message };
  }
};

export const removeFromUserWishlist = async (userId, productId) => {
  try {
    const userWishlist = await getUserWishlist(userId);
    const productToRemove = userWishlist.find(item => item.id === productId);
    
    if (productToRemove) {
      await updateDoc(doc(db, "users", userId), {
        wishlist: arrayRemove(productToRemove)
      });
    }
    return { success: true };
  } catch (error) {
    console.error('Error removing from user wishlist:', error);
    return { success: false, error: error.message };
  }
};

export default app;
