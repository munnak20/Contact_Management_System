import { Routes as Switch, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import { ToastContextProvider } from "./context/ToastContext";


import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreateContact from "./pages/CreateContact";
import AllContact from "./pages/AllContact";
import EditContact from "./pages/EditContact";

const App = () => {
  return (
    <ToastContextProvider>
      <AuthContextProvider>
        <Layout>
          <Switch>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create" element={<CreateContact />} />
            <Route path="/mycontacts" element={<AllContact />} />
            <Route path="/edit/:id" element={<EditContact />} />
          </Switch>
        </Layout>
      </AuthContextProvider>
    </ToastContextProvider>
  );
};

export default App;
