import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { ProgressBar } from "react-bootstrap";
import BigNumber from "bignumber.js";
import { ethers } from "ethers";
import { toast } from "react-toastify";

import Calendar from "./Calendar";

const Purchase = ({ promiseData, depositEth, withdrawEth, fetchData, availableTokenBal }) => {
  const { account, library } = useWeb3React();
  const [fromAmount, setFromAmount] = useState(0);
  const [toAmount, setToAmount] = useState(0);
  const [isloading, setLoading] = useState(false);
  const [isWloading, setWLoading] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [availableDETH, setAvailableDETH] = useState(0);
  const [availableWETH, setAvailableWETH] = useState(0);

  const Deposit = async () => {
    setLoading(true);

    try {
      await depositEth(Number(fromAmount));
    } catch (err) {
      console.log(err);
    }
    toast.success("Deposit successful", {
      position: "top-center",
      autoClose: 4000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    setLoading(false);
    setFromAmount(0);
    setToAmount(0);
  };

  const Withdraw = async () => {
    setWLoading(true);

    console.log(toAmount)

    try {
      await withdrawEth(ethers.utils.parseUnits(toAmount, 18));
    } catch (err) {
      console.log(err);
    }
    toast.success("Withdraw successful", {
      position: "top-center",
      autoClose: 4000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    setWLoading(false);
    setFromAmount(0);
    setToAmount(0);
  };

  useEffect(() => {
    if (availableTokenBal && ((Math.floor(Number(availableTokenBal).toFixed(4) * 10000) - 30) > 0)) {
      setAvailableDETH((Math.floor(Number(availableTokenBal).toFixed(4) * 10000) - 30) / 10000);
    }
    
    if (promiseData?.userAmt && ((Math.floor(Number(promiseData.userAmt).toFixed(4) * 10000) - 30) > 0)) {
      setAvailableWETH((Math.floor(Number(promiseData.userAmt).toFixed(4) * 10000) - 30) / 10000);
    }
  }, [availableTokenBal, promiseData.userAmt])

  useEffect(() => {
    fetchData();
  }, [account])

  useEffect(() => {
  }, [availableDETH, availableWETH])

  return (
    <>
      <div className="right-contentarea">
        <div className="d-flex justify-content-between">
          <div className="live-button  fs-14">Total Amount: {promiseData.totalAmt !== undefined ? promiseData.totalAmt.toFixed(2) : 0} ETH</div>
          {/* 
          {promiseData.icoState !== 1 ? (
            promiseData.icoState === 0 ?
              (
                <div className="calendar-section">
                  <img alt="calendar" src="calendar.png" />
                  <p className="font-non-nulshock fs-20 ml-10">&nbsp;Presale not start</p>
                </div>
              ) : (
                <div className="calendar-section">
                  <img alt="calendar" src="calendar.png" />
                  <p className="font-non-nulshock fs-20 ml-10">&nbsp;Presale ended</p>
                </div>
              )
          ) : (
            <Calendar />
          )} */}
        </div>
        <br />
        <div className="position-relative">
          <div className="from-container">
            <div className="balance-title font-non-nulshock t-grey2 fs-20">
              <p>Deposit</p>
              <p>Available: {account ? availableDETH : 0} ETH</p>
            </div>
            <div className="avax-container">
              <input
                className="input-value-section t-grey2 fs-30"
                type="number"
                placeholder="0.0"
                value={fromAmount}
                readOnly={account ? false : true}
                onChange={(e) => {
                  setFromAmount(e.target.value);
                }}
              />
              <div className="max-button-section">
                <button
                  className="max-button"
                  onClick={() => {
                    setFromAmount(availableDETH);
                  }}
                >
                  MAX
                </button>
                <div className="selectedtoken font-non-nulshock t-grey3 fs-25 justify-content-start"
                  onClick={() => setOpen(!isOpen)}
                >
                  <img alt="" className="avax-img ml-20" src="./tokens/ETH.png" />
                  <p className="avax-letter m-20">ETH</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <>
            {fromAmount > availableTokenBal ? (
              <button className="insufficient-button font-non-nulshock fs-30">
                Insufficient Balance
              </button>
            ) : fromAmount <= 0 ? (
              <button className="amount-button font-non-nulshock fs-30">
                Enter an Amount
              </button>
            ) :
              <>
                {
                  !isloading ?
                    <button
                      className="big-order-button font-non-nulshock fs-30"
                      onClick={Deposit}
                    >
                      Deposit
                    </button>
                    :
                    <button
                      className="big-order-button font-non-nulshock fs-30"
                    >
                      Depositing ...
                    </button>
                }
              </>
            }
          </>
        </div>
        <br />
        <br />
        <div className="to-container">
          <div className="available-title font-non-nulshock t-grey2 fs-20">
            <p>Withdraw</p>
            <p>Available: {availableWETH ? availableWETH.toFixed(4) : 0} ETH</p>
          </div>
          <div className="ccoin-container">
            <input
              className="input-value-section t-grey2 fs-30"
              type="number"
              placeholder="0.0"
              value={toAmount}
              onChange={(e) => {
                setToAmount(e.target.value);
              }}
            />
            <div className="max-button-section">
              <button
                className="max-button"
                onClick={() => {
                  setToAmount(availableWETH.toString());
                }}
              >
                MAX
              </button>
              <div className="selectedtoken font-non-nulshock t-grey3 fs-25 justify-content-start"
                onClick={() => setOpen(!isOpen)}
              >
                <img alt="coin" className="ccoin-img" src="./tokens/ETH.png" />
                <p className="ccoin-letter ml-20">ETH</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <>
            {toAmount > availableWETH ? (
              <button className="insufficient-button font-non-nulshock fs-30">
                Insufficient Balance
              </button>
            ) : toAmount <= 0 ? (
              <button className="amount-button font-non-nulshock fs-30">
                Enter an Amount
              </button>
            ) :
              <>
                {
                  !isWloading ?
                    <button
                      className="big-order-button font-non-nulshock fs-30"
                      onClick={Withdraw}
                    >
                      Withdraw
                    </button>
                    :
                    <button
                      className="big-order-button font-non-nulshock fs-30"
                    >
                      Withdrawing ...
                    </button>
                }
              </>
            }
          </>
        </div>
      </div>
    </>
  );
};

export default Purchase;
