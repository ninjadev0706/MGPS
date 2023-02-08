import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Home from "./pages/Home";
import BigNumber from "bignumber.js";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import "./App.css";
import "./styles/Hero.css";
import LoadingOverlay from "react-loading-overlay";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ICOContract_ABI from "./config/abi/ICOContract_ABI.json";

LoadingOverlay.propTypes = undefined;

const ICOContract_Addr = "0xE55452915d3785b38b0EFEECaF60Eb464bfb83AC";

let ICOContract;

function App() {
  const [loading, setLoading] = useState(false);
  const [buyLoading, setBuyLoading] = useState(false);
  const { account, library } = useWeb3React();
  const [promiseData, setPromiseData] = useState([]);

  const buyWithBNB = async (amount) => {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      ICOContract = new ethers.Contract(ICOContract_Addr, ICOContract_ABI, signer);
      let bought = await ICOContract.invest({
        value: ethers.utils.parseEther(String(amount)),
      });
      await bought.wait();
    }
  };

  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home
            account={account}
            promiseData={promiseData}
            buyWithBNB={buyWithBNB}
          />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
