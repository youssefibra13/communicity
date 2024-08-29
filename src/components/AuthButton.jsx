import React from "react";
import { signInWithGoogle, signOut, useAuthState } from "../utilities/firebase";
import { Outlet, NavLink } from "react-router-dom";

const SignInButton = () => (
  <button
    className="ms-auto btn btn-dark sign-in-button bg-slate-900/20 px-3 py-2 rounded-lg"
    onClick={signInWithGoogle}
  >
    Sign in
  </button>
);

const SignOutButton = () => (
  <button className="ms-auto btn btn-dark sign-in-button bg-slate-900/20 px-3 py-2 rounded-lg" onClick={signOut}>
    Sign out
  </button>
);

// const ProfileButton = () => {
//   return (
//     <NavLink to="profilepage" className="fl-button fs-1">
//       <i className="bi bi-person-circle"></i>
//     </NavLink>
//   );
// };

const AuthButton = () => {
  const [user, isNorthwesternStudent] = useAuthState();
  return user ? <SignOutButton /> : <SignInButton />;
};

export default AuthButton;
