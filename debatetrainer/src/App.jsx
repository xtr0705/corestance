import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import CreateDebate from "./Pages/CreateDebate";
import ChatDebate from "./Pages/ChatDebate";
import DebateReport from "./Pages/DebateReport";
import Home from "./Pages/Home";
import ProtectedRoute from "./Component/ProtectedRoute";
import DebateHistory from "./Pages/History";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/create-debate/"
          element={
            <ProtectedRoute>
              <CreateDebate />
            </ProtectedRoute>
          }
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/debate/:debateId"
          element={
            <ProtectedRoute>

              <ChatDebate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/History/:user_id"
          element={
            <ProtectedRoute>

              <DebateHistory />
            </ProtectedRoute>
          }
        />


        <Route
          path="/DebateReport/:debateId"
          element={
            <ProtectedRoute>

              <DebateReport />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;