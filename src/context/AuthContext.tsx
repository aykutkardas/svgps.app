import React, { useState, useEffect, useContext } from "react";
import altogic from "../configs/altogic";

const Context = React.createContext(null);

const useFetchAuth = () => {
  const [fetchedAuth, setFetchedAuth] = useState(undefined);
  const [fetchedSession, setFetchedSession] = useState(undefined);

  useEffect(() => {
    // Check if user information is exist in storage
    const userFromStorage = altogic.auth.getUser();
    setFetchedAuth(userFromStorage);

    // Check if session information is exist in storage
    const sessionFromStorage = altogic.auth.getSession();
    setFetchedSession(sessionFromStorage);
  }, []);

  return { fetchedAuth, fetchedSession };
};

export const AuthProvider = ({ children }) => {
  const { fetchedAuth, fetchedSession } = useFetchAuth();

  const [auth, setAuth] = useState(fetchedAuth);
  const [session, setSession] = useState(fetchedSession);

  useEffect(() => {
    // Set user information to auth state if it's exist in storage
    setAuth(fetchedAuth);
  }, [fetchedAuth]);
  useEffect(() => {
    // Set user information to storage when auth state's changed
    altogic.auth.setUser(auth);
  }, [auth]);

  useEffect(() => {
    // Set session information to auth state if it's exist in storage
    setSession(fetchedSession);
  }, [fetchedSession]);
  useEffect(() => {
    // Set session information to storage when auth state's changed
    altogic.auth.setSession(session);
  }, [session]);

  return (
    <Context.Provider
      value={{
        auth,
        setAuth,
        session,
        setSession,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(Context);
  return context;
};
