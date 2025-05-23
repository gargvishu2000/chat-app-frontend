import Navbar from "./components/Navbar.jsx";

import ChatHomePage from "./pages/ChatHomePage.jsx";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { useEffect } from "react";

import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage.jsx";
import QuestionList from "./components/Questions/QuestionList.jsx";
import QuestionDetail from "./components/Questions/QuestionDetail.jsx";
import AskQuestion from "./components/Questions/AskQuestion.jsx";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();

  console.log({ onlineUsers });

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div data-theme={theme}>
      <Navbar />

      <Routes>
        <Route path="/" element={authUser?<HomePage />: <Navigate to="/login"/>} />
        <Route path="/chats" element={authUser ? <ChatHomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={ <SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/questions" element={authUser? <QuestionList />: <Navigate to="/login"/>} />
        <Route path="/questions/:id" element={authUser? <QuestionDetail />: <Navigate to="/login"/>} />
        <Route path="/ask-question" element={authUser? <AskQuestion />: <Navigate to="/login"/>}/>
      </Routes>

      <Toaster />
    </div>
  );
};
export default App;
