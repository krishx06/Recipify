import React, { createContext, useState, useEffect, useContext } from "react";
import * as WebBrowser from "expo-web-browser";
import { supabase } from "../config/supabase";

WebBrowser.maybeCompleteAuthSession(); 

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const initialize = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session ?? null);
      setLoading(false);
    };

    initialize();


    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession ?? null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);


  const signInWithGoogle = async () => {
    try {
      const redirectTo = "recipify://auth-callback";

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo,

          queryParams: { prompt: "select_account" },
        },
      });

      if (error) throw error;
      if (!data?.url) return;

      const result = await WebBrowser.openAuthSessionAsync(
        data.url,
        redirectTo
      );

      if (result.type === "success" && result.url) {
        const hash = result.url.split("#")[1];
        if (!hash) return;

        const params = new URLSearchParams(hash);
        const access_token = params.get("access_token");
        const refresh_token = params.get("refresh_token");

        if (!access_token || !refresh_token) return;

        await supabase.auth.setSession({
          access_token,
          refresh_token,
        });
      }
    } catch (err) {
      console.log("Google OAuth Error:", err);
    }
  };


  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        loading,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
