'use client'
import { createContext, useContext, ReactNode, useState, useEffect } from "react"
import { UserSignInInfo } from "../schemas/responses/auth.response"
import { getSession } from "../actions/auth/auth.action";

interface SessionContextType {
  user: UserSignInInfo | null;
  isLoading: boolean;
  refreshSession: () => Promise<void>;
}



const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserSignInInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const refreshSession = async () => {
    try {
      setIsLoading(true);
      const session = await getSession();
      setUser(session);
    } catch (error) {
      console.error('Error refreshing session:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    refreshSession();
  }, []);
  return (
    <SessionContext.Provider value={{user, isLoading, refreshSession}}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession(){
    const sessionContext = useContext(SessionContext);
    if(sessionContext === undefined){
        throw new Error("UseSession debe ser usado dentro de un sessionProvider");
    }
    return sessionContext;
}