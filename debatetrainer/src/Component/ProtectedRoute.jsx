import { useEffect, useState } from "react";
import supabase from "../lib/supabase";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const authCheck = async () => {
      try{
        const { data} = await supabase.auth.getUser();

        if (data.user) {
          setAuthenticated(true);
        }
        
      }catch(error){
        console.log(error)
      }finally{
        setLoading(false);
      }
    }
    authCheck();
  }, [])

  if (loading) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
  Loading...
</div>
  }

  if (authenticated) {
    return children;
  }

  return <Navigate to='/login' />
}

export default ProtectedRoute;