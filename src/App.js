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

import ValidatorContract_ABI from "./config/abi/ETHValidator.json";

LoadingOverlay.propTypes = undefined;

const ValidatorContract_Addr = "0xd65f222AeB1afa1BDA62c1C993F8116CbCe3c1c6";

let ValidatorContract;

function App() {
  const [loading, setLoading] = useState(false);
  const [buyLoading, setBuyLoading] = useState(false);
  const [availableTokenBal, setAvailableTokenBal] = useState(0);
  const [availableSYRF, setAvailableSYRF] = useState(0);
  const { account, library } = useWeb3React();
  const [promiseData, setPromiseData] = useState([]);

  const depositEth = async (amount) => {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      ValidatorContract = new ethers.Contract(ValidatorContract_Addr, ValidatorContract_ABI, signer);
      let bought = await ValidatorContract.deposit({
        value: ethers.utils.parseEther(String(amount)),
      });
      await bought.wait();
      fetchData();
      getContractData();
    }
  };

  const withdrawEth = async (amount) => {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      ValidatorContract = new ethers.Contract(ValidatorContract_Addr, ValidatorContract_ABI, signer);
      let bought = await ValidatorContract.withdraw(amount);
      await bought.wait();
      fetchData();
      getContractData();
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
          "https://goerli.infura.io/v3/e92c433ba7214537873fe0025ee0763c"
        );
        _provider = provider;
        signer = provider.getSigner(selectedTokenAddr);
      }

      const balance = await _provider.getBalance(account);
      const balanceInEth = ethers.utils.formatEther(balance);
      setAvailableTokenBal((((Math.floor(Number(balanceInEth).toFixed(4) * 10000) - 30) > 0) && Math.floor(Number(balanceInEth).toFixed(4) * 10000) - 30) / 10000);

      // const SYRFContract = new ethers.Contract(syrfAddr, erc20_ABI, signer);
      // const availableToken = await SYRFContract.balanceOf(account);
      // setAvailableSYRF((Math.floor(new BigNumber(availableToken._hex).dividedBy(10 ** 18).toNumber().toFixed(2) * 100)) / 100);
    }
  }

  const getContractData = async () => {
    setLoading(true);
    const { ethereum } = window;
    if (ethereum && account) {
      let signer;
      if (library) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        signer = provider.getSigner();
      } else {
        const provider = new ethers.providers.JsonRpcProvider(
          "https://goerli.infura.io/v3/e92c433ba7214537873fe0025ee0763c"
        );
        signer = provider.getSigner(ValidatorContract_Addr);
      }

      ValidatorContract = new ethers.Contract(ValidatorContract_Addr, ValidatorContract_ABI, signer);

      let readData = [];
      const totalDepsitAmt = await ValidatorContract.getTotalDeposits();
      const userDepositAmt = await ValidatorContract.getUserDeposits(account);

      readData['totalAmt'] = new BigNumber(totalDepsitAmt._hex).dividedBy(10 ** 18).toNumber();
      readData['userAmt'] =  new BigNumber(userDepositAmt._hex).dividedBy(10 ** 18).toNumber();
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
            account={account}
            promiseData={promiseData}
            depositEth={depositEth}
            withdrawEth={withdrawEth}
          />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
