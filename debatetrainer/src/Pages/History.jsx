import { useNavigate } from "react-router-dom";
import supabase from "../lib/supabase";
import { useEffect, useState } from "react";
function DebateHistory() {

  const [history, setHistory] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchHistory = async () => {
      const { data: {user} } = await supabase.auth.getUser();
      if(!user) return;

      const { data, error } = await supabase
        .from('debate_reports')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', {
          ascending: false
        });

      if (error) {
        console.log(error);
      } else {
        setHistory(data)
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">

      <div className="max-w-5xl mx-auto">

        <div className="mb-10">
          <h1 className="text-4xl font-bold">
            Debate History
          </h1>

          <p className="text-slate-400 mt-2">
            Review your previous debates and performance.
          </p>
        </div>

        <div className="space-y-4">

          {history.map((report) => (

            <div
              key={report.id}
              className="
            bg-slate-900
            border
            border-slate-800
            rounded-2xl
            p-6
            hover:border-slate-700
            transition
            cursor-pointer
          "
            >

              <div className="flex justify-between items-start">

                <div>

                  <h2 className="text-xl font-semibold">
                    {report.topic}
                  </h2>

                  <p className="text-slate-500 text-sm mt-1">
                    {new Date(report.created_at).toLocaleDateString()}
                  </p>

                </div>

                <div
                  className={`
                px-3
                py-1
                rounded-full
                text-sm
                font-medium

                ${report.winner === "user"
                      ? "bg-green-500/10 text-green-400"
                      : report.winner === "ai"
                        ? "bg-red-500/10 text-red-400"
                        : "bg-yellow-500/10 text-yellow-400"
                    }
              `}
                >
                  {report.winner}
                </div>

              </div>

              <div className="mt-6 flex items-center justify-between">

                <div>

                  <p className="text-slate-500 text-sm">
                    Overall Score
                  </p>

                  <p className="text-3xl font-bold">
                    {report.overall_score}
                  </p>

                </div>

                <button
                  onClick={() =>
                    navigate(
                      `/DebateReport/${report.debate_id}`
                    )
                  }
                  className="
                bg-white
                text-black
                px-5
                py-2
                rounded-xl
                font-medium
                hover:bg-slate-200
                transition
              "
                >
                  View Report
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default DebateHistory;