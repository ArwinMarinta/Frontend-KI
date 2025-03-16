import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./applications/users/home/home";
import Submission from "./applications/users/submission/submission";
import Files from "./applications/users/files/files";
import Faq from "./applications/users/faq/faq";
import Contact from "./applications/users/contact_us/contact";
import Notification from "./applications/users/notifications/notification";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Routes>
        <Route path="/pengajuan" element={<Submission />} />
      </Routes>
      <Routes>
        <Route path="/unduhan" element={<Files />} />
      </Routes>
      <Routes>
        <Route path="/frequently-asked-question" element={<Faq />} />
      </Routes>
      <Routes>
        <Route path="/hubungi-kami" element={<Contact />} />
      </Routes>
      <Routes>
        <Route path="/notifikasi" element={<Notification />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
