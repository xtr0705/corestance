import { useState } from "react";
import supabase from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import { Listbox } from "@headlessui/react";

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
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      alert('You must be logged in to create a debate');
      navigate('/login');
      console.error('Auth error : ', userError);
      return;
    }

    const { data, error } = await supabase
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

 const debateModes = [
  {
    value: "professional",
    label: "Professional Debater",
  },
  {
    value: "aggressive",
    label: "Aggressive Responder",
  },
  {
    value: "job-interview",
    label: "Job Interviewer",
  },
  {
    value: "lawyer",
    label: "Lawyer",
  },
  {
    value: "philosopher",
    label: "Philosopher",
  },
  {
    value: "twitter-troll",
    label: "Twitter Troll",
  },
  {
    value: "devils-advocate",
    label: "Devil's Advocate",
  },
];
const durations = [
  {
    value: 5,
    label: "5 Minutes",
  },
  {
    value: 10,
    label: "10 Minutes",
  },
  {
    value: 15,
    label: "15 Minutes",
  },
];


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

            <div className="bg-slate-900 border border-slate-800 p-8 shadow-2xl">

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

                <Listbox value={debateMode} onChange={setDebateMode}>
  <div className="relative">

    <Listbox.Button
      className="
        w-full
        bg-slate-950
        focus:outline-none
        focus:border-blue-500
        
        border
        border-slate-800
        px-4
        py-4
        text-left
        hover:border-slate-700
        transition-all
        duration-300
      "
    >
      {debateMode
        ? debateModes.find(
            (mode) => mode.value === debateMode
          )?.label
        : "Select Debate Mode"}
    </Listbox.Button>

    <Listbox.Options
  className="
    absolute
    z-50
    mt-2
    w-full
    max-h-48
    overflow-y-auto
    border
    border-slate-800
    bg-slate-900
    shadow-2xl
  "
>
      {debateModes.map((mode) => (
        <Listbox.Option
          key={mode.value}
          value={mode.value}
        >
          {({ active, selected }) => (
            <div
              className={`
                px-4
                py-4
                cursor-pointer
                transition-all
                duration-200

                ${
                  active
                    ? "bg-slate-800"
                    : ""
                }

                ${
                  selected
                    ? "text-blue-400"
                    : "text-white"
                }
              `}
            >
              {mode.label}
            </div>
          )}
        </Listbox.Option>
      ))}
    </Listbox.Options>

  </div>
</Listbox>

              </div>

              

  

 <div className="mb-8">

  <label className="block text-sm font-medium text-slate-300 mb-3">
    Debate Duration
  </label>

  <div className="relative">

    <Listbox
      value={debateDuration}
      onChange={setDebateDuration}
    >

      <Listbox.Button
        className="
          w-full
          bg-slate-950
          border
          border-slate-800
          px-4
          py-4
          text-left
        focus:border-blue-500
          text-white
          hover:border-slate-700
          focus:outline-none
          transition-all
          duration-300
        "
      >
        {
          durations.find(
            (duration) =>
              duration.value === debateDuration
          )?.label
        }
      </Listbox.Button>

      <Listbox.Options
        className="
          absolute
          left-0
          top-full
          mt-2
          z-[999]
          w-full
          
          border
          border-slate-800
          bg-slate-900
          shadow-2xl
          overflow-hidden
        "
      >

        {durations.map((duration) => (

          <Listbox.Option
            key={duration.value}
            value={duration.value}
          >
            {({ active, selected }) => (

              <div
                className={`
                  px-4
                  py-4
                  cursor-pointer
                  transition-all
                  duration-200

                  ${
                    active
                      ? "bg-slate-800"
                      : ""
                  }

                  ${
                    selected
                      ? "text-blue-400"
                      : "text-white"
                  }
                `}
              >
                {duration.label}
              </div>

            )}
          </Listbox.Option>

        ))}

      </Listbox.Options>

    </Listbox>

  </div>

</div>

</div>

              <div className="flex gap-4">

                <button
                  onClick={createDebate}
                  className="
        flex-1
        bg-white
        text-black
        mt-8
        py-4
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
        
      </>
    );
  }
}

export default CreateDebate;