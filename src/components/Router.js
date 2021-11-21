import { BrowserRouter, Routes, Route } from "react-router-dom";

import Agreements from './Agreements'
import Arbitrator from "./Arbitrator";
import CreateAgreement from "./CreateAgreement";

const Router = ({provider}) => {
  return (
    <Routes>
      <Route path="/" element={<Agreements provider={provider} />} />
      <Route path="/create" element={<CreateAgreement provider={provider} />} />
      <Route path="/arbitrator" element={<Arbitrator />} />
    </Routes>
  );
};

export default Router;
