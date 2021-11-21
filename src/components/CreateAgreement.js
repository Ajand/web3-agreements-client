/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { TextField, Typography, Grid, Paper, Button } from "@mui/material";
import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";
import moment from "moment";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import agreementManagerAbi from "../abi/agreementManagerAbi";
import addresses from "./addresses";

import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterMoment";

import upload from "./upload";

/**
 * 
   address payable _employee,
        string memory _agreementURI,
        uint256 _prize,
        uint256 _dueDate
 */

const CreateAgreement = ({ provider }) => {
  const [doc, setDoc] = useState(
    "**This Document will be used in case of any dispute**"
  );
  const [employee, setEmployee] = useState("");
  const [prize, setPrize] = useState("");
  const [dueDate, setDueDate] = useState(moment());


  return (
    <div
      css={css`
        margin: 2em;
      `}
    >
      <div
        css={css`
          margin-bottom: 2em;
        `}
      >
        <Typography
          css={css`
            margin-bottom: 1em;
          `}
          variant="h6"
        >
          Agreement Document:
        </Typography>
        <MDEditor value={doc} onChange={setDoc} />
      </div>
      <Paper
        css={(theme) =>
          css`
            padding: 1em;
          `
        }
      >
        <Grid container spacing={2}>
          <Grid item md={4}>
            <TextField
              variant="filled"
              color="secondary"
              label="Employee"
              helperText="It must be an ethereum address"
              fullWidth
              value={employee}
              onChange={(e) => setEmployee(e.target.value)}
            />
          </Grid>
          <Grid item md={4}>
            <TextField
              variant="filled"
              color="secondary"
              label="Agreement Amount"
              helperText="It's the amount of wrapped ether for this agreement"
              fullWidth
              value={prize}
              onChange={(e) => setPrize(e.target.value)}
            />
          </Grid>
          <Grid item md={4}>
            <LocalizationProvider dateAdapter={DateAdapter}>
              <DatePicker
                label="Due Date"
                openTo="year"
                views={["year", "month", "day"]}
                value={dueDate}
                onChange={(newValue) => {
                  setDueDate(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="filled"
                    fullWidth
                    color="secondary"
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </Paper>
      <div
        css={css`
          margin-top: 1em;
        `}
      >
        <Button
          size="large"
          fullWidth
          color="secondary"
          variant="contained"
         // disabled={!doc || !employee || !prize || isNaN(prize)}
          onClick={async () => {
            const agreementManager = new ethers.Contract(
              addresses.local.agreementManagerAddress,
              agreementManagerAbi,
              provider.getSigner()
            );

            upload(doc)
              .then(async (cid) => {
                const agreementURI = `ipfs://${cid}`;
                console.log(agreementURI);
                if (
                  provider?.network.chainId == 1337 ||
                  provider?.network.chainId == 31337
                ) {
                  const agreementManager = new ethers.Contract(
                    addresses.local.agreementManagerAddress,
                    agreementManagerAbi,
                    provider.getSigner()
                  );
                  await agreementManager.createAgreement(
                    addresses.local.wEthAddress,
                    agreementURI,
                    Number(prize)
                  );
                  const agreementId = await agreementManager.agreementCounts()
                  console.log(agreementId)
                  // TODO routing need to be implemented
                } else if (provider?.network.chainId == 42) {
                  // TODO
                } else if (provider?.network.chainId == 4) {
                } else {
                  alert(
                    "Unsupported network. Please switch to rinkeby or kovan."
                  );
                }
              })
              .catch((err) => console.log(err));
          }}
        >
          Create The Agreement
        </Button>
      </div>
    </div>
  );
};

export default CreateAgreement;
