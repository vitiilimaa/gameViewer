import { Home, Categories, Login, NotFound } from "./pages";
import { Header } from "./components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContextProvider } from "./contexts/UserContext";
import { LoadingContextProvider } from "./contexts/LoadingContext";
import { PreLoader } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <LoadingContextProvider>
        <PreLoader />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <UserContextProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categorias" element={<Categories />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </UserContextProvider>
      </LoadingContextProvider>
    </BrowserRouter>
  );
};

export default App;
