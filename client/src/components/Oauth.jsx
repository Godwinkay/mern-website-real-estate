import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../app/userSlice';
import { useNavigate } from 'react-router-dom';

export default function Oauth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleSign = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const response = await fetch('http://localhost:3001/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(signInSuccess(data));
        navigate('/');
      } else {
        const errorData = await response.text();
        console.log('Error connecting to Google account:', errorData);
      }
    } catch (error) {
      console.log('Not able to connect to your Google account', error);
    }
  };

  return (
    <div>
      <button
        onClick={handleGoogleSign}
        type="button"
        className="mt-4 py-2 border border-primary w-full rounded-md hover:scale-105 transition duration-300 flex items-center justify-center gap-3 text-sm font-semibold"
      >
        <img className="size-4" src="google.svg" alt="googlelogo"></img>
        Sign In With Google
      </button>
    </div>
  );
}