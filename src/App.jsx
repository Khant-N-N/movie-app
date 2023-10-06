import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import BottomNav from "./components/BottomNav";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
// import SignInPage from "./pages/SignInPage";
// import SignUpPage from "./pages/SignUpPage";
// import PasswordReset from "./pages/PasswordReset";
// import FavouritePage from "./pages/FavouritePage";
// import AllMovies from "./pages/Movies/AllMovies";
// import AllSeries from "./pages/Series/AllSeries";
// import AccountPage from "./pages/AccountPage";
// import Error from "./pages/ErrorPage";
// import DetailPage from "./pages/DetailPage";
// import SearchedShowPage from "./pages/SearchedShowPage";
import { lazy, Suspense } from "react";
import { FaC } from "react-icons/fa6";
const FavouritePage = lazy(() => import("./pages/FavouritePage"));
const SignInPage = lazy(() => import("./pages/SignInPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const AllMovies = lazy(() => import("./pages/Movies/AllMovies"));
const AllSeries = lazy(() => import("./pages/Series/AllSeries"));
const SearchedShowPage = lazy(() => import("./pages/SearchedShowPage"));
const Error = lazy(() => import("./pages/ErrorPage"));
const DetailPage = lazy(() => import("./pages/DetailPage"));
const AccountPage = lazy(() => import("./pages/AccountPage"));
const PasswordReset = lazy(() => import("./pages/PasswordReset"));

function App() {
  return (
    <div className="max-w-[2400px] relative mx-auto">
      <AuthContextProvider>
        <NavBar />
        <BottomNav />
        <Suspense
          fallback={
            <div className="w-full h-[70vh] flex justify-center items-center">
              <FaC className="animate-spin text-center text-[2rem]" />
            </div>
          }
        >
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/signIn" element={<SignInPage />} />
            <Route path="/signUp" element={<SignUpPage />} />
            <Route path="/allmovies" element={<AllMovies />} />
            <Route
              path="/allmovies/:id"
              element={<DetailPage type="movie" />}
            />
            <Route path="/allseries" element={<AllSeries />} />
            <Route
              path="/searchShows/:keyword/:num"
              element={<SearchedShowPage />}
            />
            <Route path="/allseries/:id" element={<DetailPage type="tv" />} />
            <Route path="/resetPassword" element={<PasswordReset />} />
            <Route path="/favourite" element={<FavouritePage />} />
            <Route path="*" element={<Error />} />
            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <AccountPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
        <Footer />
      </AuthContextProvider>
    </div>
  );
}

export default App;
