import React, { useState, useEffect } from "react";
import Purchase from "./Purchase";

const RightSideBar = ({
  account,
  promiseData,
  approve_AVAX,
  buyWithBNB,
  buyWithTokens,
  fetchData,
  availableSYRF,
  availableTokenBal
}) => {

  return (
    <div className="right-area">
      <div className={account ? "rightsidebar rightside-effect" : "rightsidebar dropfilter"}>
        <div className="flex-column alignCenter rightsidebar-content">
          <div>
            <Purchase promiseData={promiseData}
              buyWithBNB={buyWithBNB}
              buyWithTokens={buyWithTokens}
              fetchData={fetchData}
              availableTokenBal={availableTokenBal}
              availableSYRF={availableSYRF}
            />
          </div>
        </div>
      </div>
      {!account ? (
        <span className="warning-msg">Please Connect Wallet</span>
      ) : ''}
    </div>
  );
};

export default RightSideBar;
