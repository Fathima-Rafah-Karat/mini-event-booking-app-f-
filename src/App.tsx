import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./components/login";
import Register from "./components/register";
import EventList from "./components/eventlist";
import EventDetail from "./components/eventdetail";
import MyBookings from "./components/mybookings";
import CreateEvent from "./components/createevent";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/event" element={<EventList />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/mybookings" element={<MyBookings />} />
        <Route path="/create-event" element={<CreateEvent />} />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
