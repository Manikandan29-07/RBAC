import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import UserList from "./components/Users/UserList";
import RoleList from "./components/Roles/RoleList";

function App() {
  return (
    <Router>
      <div className="flex">
        <Navigation />
        <main className="p-4 w-full">
          <Routes>
            <Route path="/users" element={<UserList />} />
            <Route path="/roles" element={<RoleList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
