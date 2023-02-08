import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { ProgressBar } from "react-bootstrap";
import BigNumber from "bignumber.js";
import { ethers } from "ethers";
import { toast } from "react-toastify";

import Calendar from "./Calendar";

const Purchase = ({ promiseData, buyWithBNB, isEnded, buyWithTokens, fetchData, availableSYRF, availableTokenBal }) => {
  const { account, library } = useWeb3React();
  const [fromAmount, setFromAmount] = useState(0);
  const [toAmount, setToAmount] = useState(0);
  const [isloading, setLoading] = useState(false);
  const [isOpen, setOpen] = useState(false);

  promiseData["total_token"] = 20000000;
  promiseData.icoState = 1;

  const progress = (sold, total) => {
    if (sold < total) {
      return ((sold * 100) / total).toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 5,
      });
    } else {
      return 100;
    }
  };

  const clickBuy = async () => {
    setLoading(true);

    try {
      await buyWithBNB(Number(fromAmount));
    } catch (err) {
      console.log(err);
    }
    toast.success("Purchase successful", {
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

  

  useEffect(() => {
    fetchData();
  }, [account])

  return (
    <>
      <div className="right-contentarea">
        <div className="d-flex justify-content-between">
          {promiseData.icoState !== 1 ? (
            <div className="private-button  fs-14">PRIVATE</div>
          ) : (
            <div className="live-button  fs-14">LIVE</div>
          )}

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
          )}
        </div>
        <br />
        {/* <div className="progress-section font-non-nulshock t-white fs-20">
          <div className="progress-title">
            <div>
              <div className="desc">SOLD</div>
              <div>{promiseData && promiseData.soldAmount ? promiseData.soldAmount.toFixed(0).toLocaleString() : '0'}</div>
            </div>
            <div>
              <div className="desc right">AVAILABLE</div>
              <div>{(promiseData["total_token"]?.toFixed(0) - promiseData?.soldAmount?.toFixed(0))?.toLocaleString()}</div>
            </div>
          </div>
          <div className="mt-10">
            <ProgressBar
              now={
                promiseData["soldAmount"] === undefined &&
                  promiseData["total_token"] === undefined
                  ? 0
                  : progress(
                    Number(promiseData["soldAmount"]),
                    Number(promiseData["total_token"]) +
                    Number(promiseData["soldAmount"])
                  ) < 100
                    ? progress(
                      Number(promiseData["soldAmount"]),
                      Number(promiseData["total_token"])
                    )
                    : 100
              }
              className={
                progress(
                  Number(promiseData["soldAmount"]),
                  Number(promiseData["total_token"])
                ) < 100
                  ? "progress1"
                  : "progress2"
              }
            />
          </div>
        </div> */}
        <div className="position-relative">
          <div className="from-container">
            <div className="balance-title font-non-nulshock t-grey2 fs-20">
              <p>From</p>
              <p>Balance: {account ? availableTokenBal : 0} MATIC</p>
            </div>
            <div className="avax-container">
              <input
                className="input-value-section t-grey2 fs-30"
                type="number"
                placeholder="0.0"
                value={fromAmount}
                disabled={(account && promiseData.icoState === 1) ? false : true}
                readOnly={account ? false : true}
                onChange={(e) => {
                  setToAmount((e.target.value * promiseData["exchangeRate"]).toFixed(4));
                  setFromAmount(e.target.value);
                }}
              />
              <div className="max-button-section">
                <button
                  className="max-button"
                  onClick={() => {
                    setFromAmount(availableTokenBal);
                    setToAmount((availableTokenBal * promiseData["exchangeRate"]).toFixed(4));
                  }}
                >
                  MAX
                </button>
                <div className="selectedtoken font-non-nulshock t-grey3 fs-25 justify-content-start"
                  onClick={() => setOpen(!isOpen)}
                >
                  <img alt="" className="avax-img ml-20" src="./tokens/MATIC.png" />
                  <p className="avax-letter m-20">MATIC</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="swap-icon">
          <img alt="arrow" src="yellow-arrow.png" />
        </div>
        <div className="to-container">
          <div className="available-title font-non-nulshock t-grey2 fs-20">
            <p>To</p>
            <p>Balance: {availableSYRF} MGPS</p>
          </div>
          <div className="ccoin-container">
            <input
              className="input-value-section t-grey2 fs-30"
              type="number"
              placeholder="0.0"
              value={toAmount}
              readOnly={(account && !isEnded) ? false : true}
              onChange={(e) => {
                setFromAmount((e.target.value / promiseData["exchangeRate"]).toFixed(4));
                setToAmount(e.target.value);
              }}
            />
            <div className="ccoin-section font-non-nulshock t-grey3 fs-25">
              <img alt="coin" className="ccoin-img" src="./tokens/MGPS.png" />
              <p className="ccoin-letter ml-20">MGPS</p>
            </div>
          </div>
        </div>
        <div>
          <>
            {
              promiseData.icoState === 0 ?
                <button
                  className="amount-button font-non-nulshock fs-30"
                  disabled
                >
                  Presale isn't started yet
                </button>
                :
                <>
                  {
                    promiseData.icoState !== 1 ?
                      <button
                        className="amount-button font-non-nulshock fs-30"
                        disabled
                      >
                        Presale Ended
                      </button>
                      :
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
                              fromAmount < promiseData["minAmt"] ?
                                <>
                                  <button className="insufficient-button font-non-nulshock fs-30">
                                    Minium Amount is 1 MATIC
                                  </button>
                                </>
                                :
                                <>
                                  {
                                    !isloading ?
                                      <button
                                        className="big-order-button font-non-nulshock fs-30"
                                        onClick={clickBuy}
                                      >
                                        Complete Order
                                      </button>
                                      :
                                      <button
                                        className="big-order-button font-non-nulshock fs-30"
                                      >
                                        Ordering ...
                                      </button>
                                  }
                                </>
                            }
                          </>
                        }
                      </>
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
