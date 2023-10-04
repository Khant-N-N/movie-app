import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ProtectedRoute from "./components/ProtectedRoute";
import PasswordReset from "./pages/PasswordReset";
import FavouritePage from "./pages/FavouritePage";
import AllMovies from "./pages/Movies/AllMovies";
import AllSeries from "./pages/Series/AllSeries";
import BottomNav from "./components/BottomNav";
import Footer from "./components/Footer";
import AccountPage from "./pages/AccountPage";
import Error from "./pages/ErrorPage";
import DetailPage from "./pages/DetailPage";
import SearchedShowPage from "./pages/SearchedShowPage";

function App() {
  return (
    <div className="max-w-[2400px] relative mx-auto">
      <AuthContextProvider>
        <NavBar />
        <BottomNav />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/signIn" element={<SignInPage />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/allmovies" element={<AllMovies />} />
          <Route path="/allmovies/:id" element={<DetailPage type="movie" />} />
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
        <Footer />
      </AuthContextProvider>
    </div>
  );
}

export default App;
