import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { ethers } from "ethers";
import agreementManagerAbi from "../abi/agreementManagerAbi";
import addresses from "./addresses";

import { useNavigate } from 'react-router-dom'

export default function Agreements({ provider }) {
  const [agreementsCount, setAgreementsCount] = useState(0);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchInterval = setInterval(async () => {
      if (
        provider?.network.chainId == 1337 ||
        provider?.network.chainId == 31337
      ) {
        const agreementManager = new ethers.Contract(
          addresses.local.agreementManagerAddress,
          agreementManagerAbi,
          provider.getSigner()
        );
        const agreementId = await agreementManager.agreementCounts();
        setAgreementsCount(Number(String(agreementId)));
        // TODO routing need to be implemented
      } else if (provider?.network.chainId == 42) {
        // TODO
      } else if (provider?.network.chainId == 4) {
      } else {
        alert("Unsupported network. Please switch to rinkeby or kovan.");
      }
    }, 5000);
    return () => {
      clearInterval(fetchInterval);
    };
  }, [provider]);


  console.log(agreementsCount)

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Agreement ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array(agreementsCount)
            .fill(0)
            .map((row, i) => (
              <TableRow onClick={() => navigate(`/agreement/${i}`)} key={i}>
                <TableCell>{i}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
