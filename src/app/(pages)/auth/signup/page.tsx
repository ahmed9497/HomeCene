'use client'
import { useState } from 'react';
import {useCreateUserWithEmailAndPassword} from 'react-firebase-hooks/auth'
import {db, auth} from '@/app/firebase/config'
import { useRouter } from 'next/navigation';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
const router = useRouter();
  const handleSignUp = async () => {
    try {
        const userCredential:any = await createUserWithEmailAndPassword(email, password)
     
        const user = userCredential.user;

      // Store additional user details in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        // name,
        email: user.email,
        phone:'',
        createdAt: new Date(),
      });
      toast.success("Registered")
        sessionStorage.setItem('user', 'true')
        setEmail('');
        setPassword('');
        // router.push('/account/profile');

    } catch(e){
        console.log(e)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-white text-2xl mb-5">Sign Up</h1>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        <button 
          onClick={handleSignUp}
          className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignUp;