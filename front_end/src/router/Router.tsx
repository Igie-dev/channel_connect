import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Persist from "@/pages/authPage/login/Persist";
import RouteGuard from "./RouteGuard";
import LoaderSpinner from "@/components/loader/LoaderSpinner";
import Redirect from "./Redirect";
import ChatBoxGuard from "./ChatBoxGuard";
export default function Router() {
  const LandingPage = lazy(() => import("@/pages/landingPage/LandingPage"));

  const LoginPage = lazy(() => import("@/pages/authPage/login/LoginPage"));

  const RegisterPage = lazy(
    () => import("@/pages/authPage/register/RegisterPage")
  );

  const RegisterForm = lazy(
    () => import("@/pages/authPage/register/RegisterForm")
  );

  const RegisterVerifyOtp = lazy(
    () => import("@/pages/authPage/register/RegisterVeryOtp")
  );

  const AvatarPage = lazy(() => import("@/pages/avatarPage/AvatarPage"));

  const UploadAvatar = lazy(
    () => import("@/pages/avatarPage/screen/UploadAvatar")
  );

  const RemovedAvatar = lazy(
    () => import("@/pages/avatarPage/screen/RemoveAvatar")
  );

  const ChatBoxContainer = lazy(
    () => import("@/pages/chatPage/screens/chatBox/ChatBoxContainer")
  );

  const ChatPage = lazy(() => import("@/pages/chatPage/ChatPage"));

  const ProfilePage = lazy(() => import("@/pages/profilePage/ProfilePage"));

  return (
    <Suspense fallback={<LoaderSpinner />}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<p>Error</p>} />
          {/* <Route element={<Redirect />}> */}
          <Route element={<Redirect />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>

          <Route path="/register" element={<RegisterPage />}>
            <Route path="/register/form" element={<RegisterForm />} />
            <Route path="/register/otp" element={<RegisterVerifyOtp />} />
          </Route>
          {/* </Route> */}
          <Route element={<Persist />}>
            <Route element={<RouteGuard />}>
              {/* Channel */}
              <Route path="/c" element={<ChatPage />}>
                <Route element={<ChatBoxGuard />}>
                  <Route path="/c/:channelId" element={<ChatBoxContainer />} />
                </Route>
              </Route>
              <Route path="/avatar" element={<AvatarPage />}>
                <Route path="/avatar/upload/:id" element={<UploadAvatar />} />
                <Route path="/avatar/remove/:id" element={<RemovedAvatar />} />
              </Route>

              <Route path="/profile/:id" element={<ProfilePage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}
