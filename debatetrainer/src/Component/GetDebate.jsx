import { supabase } from "../lib/supabase";
function GetDebate() {
  const getDebate = async ()=>{
    const repsonse = await supabase
      .from("debates")
      .select("*");
    console.log(repsonse)
  }


  return (
    <div>
      <button onClick={getDebate} >Get debate</button>
    </div>
  );
}

export default GetDebate;