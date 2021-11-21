import { BrowserRouter, Routes, Route } from "react-router-dom";

import Agreements from './Agreements'
import Arbitrator from "./Arbitrator";
import CreateAgreement from "./CreateAgreement";
import Agreement from './Agreement'

const Router = ({provider}) => {
  return (
    <Routes>
      <Route path="/" element={<Agreements provider={provider} />} />
      <Route path="/create" element={<CreateAgreement provider={provider} />} />
      <Route path="/arbitrator" element={<Arbitrator />} />
      <Route path="/agreement/:id" element={<Agreement provider={provider} />} />
    </Routes>
  );
};

export default Router;
