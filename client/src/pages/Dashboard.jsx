import { signoutSuccess } from "@/redux/user/userSlice";
import { useDispatch } from "react-redux";

export default function Dashboard() {
  const dispatch = useDispatch();

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://firebasestorage.googleapis.com/v0/b/quickbuy-assign.appspot.com/o/funny-monkey-playing-basketball.jpg?alt=media&token=2cd4fbcd-36a7-4cae-b244-95f7c9d4911c')",
      }}
    >
      <div
        className="p-8 rounded-2xl border-4 border-red-800 w-[30rem] h-[30rem] shadow-lg"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
      >
        <div className="flex flex-col justify-center items-center mt-15 gap-5">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/quickbuy-assign.appspot.com/o/banana.png?alt=media&token=036e489b-7fac-47de-89c6-85ebfb2bf3a7"
            alt="User Profile"
            className="w-24 h-24 rounded-full mb-4"
          />
          <button className="bg-yellow-300 text-black text-lg font-bold py-2 px-4 rounded mb-4 hover:bg-yellow-400 mt-4">
            Start Game
          </button>
          <button className="bg-yellow-300 text-black text-lg font-bold py-2 px-4 rounded mb-4 hover:bg-yellow-400">
            Leaderboard
          </button>
          <button
            onClick={handleSignout}
            className="bg-yellow-300 text-black text-lg font-bold py-2 px-4 rounded hover:bg-yellow-400"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
