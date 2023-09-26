import React, { useState, useEffect } from "react";
import Purchase from "./Purchase";

const RightSideBar = ({
  account,
  promiseData,
  depositEth,
  withdrawEth,
  fetchData,
  availableTokenBal
}) => {

  return (
    <div className="right-area">
      <div className={account ? "rightsidebar rightside-effect" : "rightsidebar dropfilter"}>
        <div className="flex-column alignCenter rightsidebar-content">
          <div>
            <Purchase
              promiseData={promiseData}
              depositEth={depositEth}
              withdrawEth={withdrawEth}
              fetchData={fetchData}
              availableTokenBal={availableTokenBal}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSideBar;
