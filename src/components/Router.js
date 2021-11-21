import { BrowserRouter, Routes, Route } from "react-router-dom";

import Arbitrator from "./Arbitrator";
import CreateAgreement from "./CreateAgreement";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Arbitrator />} />
      <Route path="/create" element={<CreateAgreement />} />
    </Routes>
  );
};

export default Router;
