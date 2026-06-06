import { useState } from "react";
import supabase from "../lib/supabase";
import { useNavigate } from "react-router-dom";

function CreateDebate() {
  const [debateTopic, setDebateTopic] = useState("");
  const [debateMode, setDebateMode] = useState("professional");
  const [debateDuration, setDebateDuration] = useState(5);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const createDebate = async () => {
    if (!debateTopic.trim()) {
      alert("Please enter a debate topic");
      return;
    }
    const {data:{user}, error:userError}= await supabase.auth.getUser();
    
    if (userError|| !user) {
      alert('You must be logged in to create a debate');
      navigate('/login');
      console.error('Auth error : ', userError);
      return;
    }

    const {data,error} = await supabase
      .from("debates")
      .insert({
        topic: debateTopic,
        mode: debateMode,
        duration: debateDuration,
        user_id: user.id
      })
      .select("*")
      .single();

    console.log(data);
    if (error) {
      alert("Error create debate");
      console.log("db error: ", error)
      return;
    } else {
      const debateId = data.id;
      setLoading(true);
      navigate(`/debate/${debateId}`);
    }
  }


  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold">Creating Debate...</p>
      </div>
    );
  } else {

    return (
      <>
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">

          <div className="w-full max-w-2xl">

            ```
            <div className="mb-10 text-center">

              <p className="text-slate-500 uppercase tracking-widest mb-4">
                AI Debate Arena
              </p>

              <h1 className="text-5xl font-bold mb-4">
                Create A New Debate
              </h1>

              <p className="text-slate-400 text-lg">
                Choose a topic, select an opponent,
                and put your arguments to the test.
              </p>

            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">

              <div className="mb-6">

                <label className="block text-sm font-medium text-slate-300 mb-3">
                  Debate Topic
                </label>

                <input
                  placeholder="e.g. College is overrated"
                  className="
        w-full
        bg-slate-950
        border border-slate-800
        rounded-xl
        px-4
        py-4
        text-white
        placeholder:text-slate-500
        focus:outline-none
        focus:border-blue-500
        transition
      "
                  value={debateTopic}
                  onChange={(e) => setDebateTopic(e.target.value)}
                />

              </div>

              <div className="mb-6">

                <label className="block text-sm font-medium text-slate-300 mb-3">
                  Opponent Style
                </label>

                <select
                  className="
        w-full
        bg-slate-950
        border border-slate-800
        rounded-xl
        px-4
        py-4
        text-white
        focus:outline-none
        focus:border-blue-500
        transition
      "
                  value={debateMode}
                  onChange={(e) => setDebateMode(e.target.value)}
                >
                  <option value="" disabled>
                    Select Debate Mode
                  </option>

                  <option value="professional">
                    Professional Debater
                  </option>

                  <option value="aggressive">
                    Aggressive Responder
                  </option>

                  <option value="job-interview">
                    Job Interviewer
                  </option>

                  <option value="lawyer">
                    Lawyer
                  </option>

                  <option value="philosopher">
                    Philosopher
                  </option>

                  <option value="twitter-troll">
                    Twitter Troll
                  </option>

                  <option value="devils-advocate">
                    Devil's Advocate
                  </option>
                </select>

              </div>

              <div className="mb-8">

                <label className="block text-sm font-medium text-slate-300 mb-3">
                  Debate Duration
                </label>

                <select
                  className="
        w-full
        bg-slate-950
        border border-slate-800
        rounded-xl
        px-4
        py-4
        text-white
        focus:outline-none
        focus:border-blue-500
        transition
      "
                  value={debateDuration}
                  onChange={(e) => setDebateDuration(Number(e.target.value))}
                >
                  <option value="5">5 Minutes</option>
                  <option value="10">10 Minutes</option>
                  <option value="15">15 Minutes</option>
                </select>

              </div>

              <div className="flex gap-4">

                <button
                  onClick={createDebate}
                  className="
        flex-1
        bg-white
        text-black
        py-4
        rounded-xl
        font-semibold
        hover:bg-slate-200
        hover:scale-[1.01]
        active:scale-[0.99]
        transition-all
        duration-300
      "
                >
                  Start Debate
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default CreateDebate;