/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { Grid, Paper, TextField, Typography, Button } from "@mui/material";
import { ethers } from "ethers";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import moment from "moment";
import Countdown from "react-countdown";

import addresses from "./addresses";

import agreementManagerAbi from "../abi/agreementManagerAbi";
import agreementAbi from "../abi/agreementAbi";

const Agreement = ({ provider }) => {
  const [agreementContract, setAgreementContract] = useState(null);
  const [agreementData, setAgreementData] = useState(null);
  const { id } = useParams();

  var cAddresses;

  if (provider?.network.chainId == 1337 || provider?.network.chainId == 31337) {
    cAddresses = addresses.local;
  } else if (provider?.network.chainId == 42) {
    // TODO
    cAddresses = addresses.local;
  } else if (provider?.network.chainId == 4) {
    cAddresses = addresses.local;
  } else {
    alert("Unsupported network. Please switch to rinkeby or kovan.");
  }

  console.log(id);

  useEffect(() => {
    const runner = async () => {
      const agreementManager = new ethers.Contract(
        cAddresses.agreementManagerAddress,
        agreementManagerAbi,
        provider.getSigner()
      );

      const agreementAddress = await agreementManager.agreements(id);

      setAgreementContract(
        new ethers.Contract(
          agreementAddress,
          agreementAbi,
          provider.getSigner()
        )
      );
    };

    runner();
  }, []);

  useEffect(() => {
    const runner = async () => {
      const uri = await agreementContract.agreementURI();

      const arbitrator = await agreementContract.arbitrator();
      const asset = await agreementContract.asset();
      const employer = await agreementContract.employer();
      const employee = await agreementContract.employee();
      const prize = await agreementContract.prize();

      const status = await agreementContract.status();
      const createdAt = await agreementContract.createdAt();
      const dueDate = await agreementContract.dueDate();
      const reclaimationPeriod = await agreementContract.reclaimationPeriod();
      const arbitrationFeeDepositPeriod =
        await agreementContract.arbitrationFeeDepositPeriod();

      const ipfsConvert = (tokenURL) => {
        let target = tokenURL?.includes("ipfs")
          ? tokenURL.replace("ipfs://", "https://ipfs.io/ipfs/")
          : tokenURL;
        return target;
      };

      var config = {
        method: "get",
        url: ipfsConvert(uri),
        headers: {},
      };

      const md = (await axios(config)).data;

      var remainingTimeToReclaim;
      try {
        remainingTimeToReclaim =
          await agreementContract.remainingTimeToReclaim();
      } catch (err) {
        console.log(err);
      }

      var remainingTimeToDepositArbitrationFee;
      try {
        remainingTimeToDepositArbitrationFee =
          await agreementContract.remainingTimeToDepositArbitrationFee();
      } catch (err) {
        console.log(err);
      }

      const data = {
        uri: ipfsConvert(uri),
        arbitrator,
        asset,
        employer,
        employee,
        prize,
        status,
        createdAt: Number(String(createdAt)) * 1000,
        dueDate: Number(String(dueDate)) * 1000,
        reclaimationPeriod: Number(String(reclaimationPeriod)) * 1000,
        arbitrationFeeDepositPeriod:
          Number(String(arbitrationFeeDepositPeriod)) * 1000,
        md,
        remainingTimeToReclaim: remainingTimeToReclaim
          ? remainingTimeToReclaim
          : null,
        remainingTimeToDepositArbitrationFee:
          remainingTimeToDepositArbitrationFee
            ? remainingTimeToDepositArbitrationFee
            : null,
      };

      setAgreementData(data);
    };

    if (agreementContract) {
      runner();
    }
  }, [agreementContract]);

  /**
   * 
   Initialized,
        Started,
        Dued,
        Finalized,
        Resolved,
        Reclaimed,
        Disputed
   */

  const renderStatus = (status) => {
    switch (status) {
      case 0:
        return "Initialized";
      case 1:
        return "Started";
      case 2:
        return "Dued";
      case 3:
        return "Finalized";
      case 4:
        return "Resolved";
      case 5:
        return "Reclaimed";
      case 6:
        return "Disputed";
    }
  };

  if (!agreementContract || !agreementData) return <div>Loading ...</div>;

  return (
    <div>
      <Grid spacing={2} container>
        <Grid item lg={6}>
          <Paper
            css={css`
              padding: 0.5em;
              padding-left: 1em;
            `}
          >
            <ReactMarkdown>{agreementData.md}</ReactMarkdown>
          </Paper>
        </Grid>
        <Grid item lg={6}>
          <Paper
            css={css`
              padding: 0.5em;
              padding-left: 1em;
            `}
          >
            <div
              css={css`
                margin: 0.5em;
              `}
            >
              <Typography varinat="body1">
                Employer: {agreementData.employer}
              </Typography>
            </div>
            <div
              css={css`
                margin: 0.5em;
              `}
            >
              <Typography varinat="body1">
                Employee: {agreementData.employee}
              </Typography>
            </div>{" "}
            <div
              css={css`
                margin: 0.5em;
              `}
            >
              <Typography varinat="body1">
                Arbitrator: {agreementData.arbitrator}
              </Typography>
            </div>{" "}
            <div
              css={css`
                margin: 0.5em;
              `}
            >
              <Typography varinat="body1">
                Created At:{" "}
                {moment(agreementData.createdAt).format("YYYY/MM/DD HH:mm")}
              </Typography>
            </div>{" "}
            <div
              css={css`
                margin: 0.5em;
              `}
            >
              <Typography varinat="body1">
                Due Date:{" "}
                {moment(agreementData.createdAt).format("YYYY/MM/DD HH:mm")}
              </Typography>
            </div>{" "}
            <div
              css={css`
                margin: 0.5em;
              `}
            >
              <Typography varinat="body1">
                Status: {renderStatus(agreementData.status)}
              </Typography>
            </div>{" "}
            {agreementData.remainingTimeToReclaim && (
              <div
                css={css`
                  margin: 0.5em;
                `}
              >
                <Typography varinat="body1">
                  Remaining Time To Reclaim:{" "}
                  <Countdown
                    date={
                      Date.now() + 10000 * agreementData.remainingTimeToReclaim
                    }
                  />
                </Typography>
              </div>
            )}
            {agreementData.remainingTimeToDepositArbitrationFee && (
              <div
                css={css`
                  margin: 0.5em;
                `}
              >
                <Typography varinat="body1">
                  Remaining Time To Deposit Arbitration Fee:{" "}
                  <Countdown
                    date={
                      Date.now() +
                      10000 * agreementData.remainingTimeToDepositArbitrationFee
                    }
                  />
                </Typography>
              </div>
            )}
          </Paper>
          <div
            css={css`
              margin-top: 1em;
            `}
          >
            <Button fullWidth color="primary" variant="contained">
              Start
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Agreement;
