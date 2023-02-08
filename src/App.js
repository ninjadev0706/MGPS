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
import erc20_ABI from "./config/abi/erc20.json";
import LoadingOverlay from "react-loading-overlay";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ICOContract_ABI from "./config/abi/ICOContract_ABI.json";

LoadingOverlay.propTypes = undefined;

const ICOContract_Addr = "0xE55452915d3785b38b0EFEECaF60Eb464bfb83AC";
const syrfAddr = "0xEA22d7E2010ed681e91D405992Ac69B168cb8028";

let ICOContract;

function App() {
  const [loading, setLoading] = useState(false);
  const [buyLoading, setBuyLoading] = useState(false);
  const [availableTokenBal, setAvailableTokenBal] = useState(0);
  const [availableSYRF, setAvailableSYRF] = useState(0);
  const { account, library } = useWeb3React();
  const [promiseData, setPromiseData] = useState([]);

  const buyWithBNB = async (amount) => {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      ICOContract = new ethers.Contract(ICOContract_Addr, ICOContract_ABI, signer);
      console.log("contact => ", ICOContract, amount);
      let bought = await ICOContract.exchange1To2({
        value: ethers.utils.parseEther(String(amount)),
      });
      await bought.wait();
      fetchData();
    }
  };

  useEffect(() => {
    async function contractdata() {
      const { ethereum } = window;
      if (ethereum) {
        await getContractData();
      }
    }
    contractdata();
  }, [account]);

  const fetchData = async () => {
    const selectedTokenAddr = 0x0000000000000000000000000000000000000000;
    const { ethereum } = window;

    if (ethereum && account) {
      let signer;
      let _provider;
      if (library) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        _provider = provider;
        signer = provider.getSigner();
      } else {
        const provider = new ethers.providers.JsonRpcProvider(
          "https://polygon-rpc.com/"
        );
        _provider = provider;
        signer = provider.getSigner(selectedTokenAddr);
      }

      const balance = await _provider.getBalance(account);
      const balanceInEth = ethers.utils.formatEther(balance);
      console.log("balanceInEth => ", Number(balanceInEth).toFixed(4))
      setAvailableTokenBal((((Math.floor(Number(balanceInEth).toFixed(4) * 10000) - 30) > 0) && Math.floor(Number(balanceInEth).toFixed(4) * 10000) - 30) / 10000);

      const SYRFContract = new ethers.Contract(syrfAddr, erc20_ABI, signer);
      const availableToken = await SYRFContract.balanceOf(account);
      setAvailableSYRF((Math.floor(new BigNumber(availableToken._hex).dividedBy(10 ** 18).toNumber().toFixed(2) * 100)) / 100);
    }
  }

  const getContractData = async () => {
    setLoading(true);
    const { ethereum } = window;
    if (ethereum) {
      let signer;
      if (library) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        signer = provider.getSigner();
      } else {
        const provider = new ethers.providers.JsonRpcProvider(
          "https://polygon-rpc.com/"
        );
        signer = provider.getSigner(ICOContract_Addr);
      }

      ICOContract = new ethers.Contract(ICOContract_Addr, ICOContract_ABI, signer);

      let readData = [];
      const exchangeRate = await ICOContract.exchange1To2rate();
      const minAmt = await ICOContract.minExchange1To2amt();

      readData['exchangeRate'] = new BigNumber(exchangeRate._hex).dividedBy(10 ** 18).toNumber();
      readData['minAmt'] = new BigNumber(minAmt._hex).dividedBy(10 ** 18).toNumber();
      setPromiseData(readData);
    }
    setLoading(false);
  };

  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home
            fetchData={fetchData}
            availableTokenBal={availableTokenBal}
            availableSYRF={availableSYRF}
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
