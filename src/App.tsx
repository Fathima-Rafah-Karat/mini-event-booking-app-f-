import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./components/login";
import Register from "./components/register";
import EventList from "./components/eventlist";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/event" element={<EventList />} />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
