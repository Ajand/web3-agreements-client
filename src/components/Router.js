import { BrowserRouter, Routes, Route } from "react-router-dom";

import Arbitrator from "./Arbitrator";
import CreateAgreement from "./CreateAgreement";

const Router = ({provider}) => {
  return (
    <Routes>
      <Route path="/" element={<Arbitrator />} />
      <Route path="/create" element={<CreateAgreement provider={provider} />} />
    </Routes>
  );
};

export default Router;
