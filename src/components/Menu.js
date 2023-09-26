import React, { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../pages/connector";
import { toast } from "react-toastify";
import { useMediaQuery } from "react-responsive";
import WalletBtn from "./WalletBtn";

let IsConnected = false;

const Menu = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 768px)",
  });

  const { account, activate, deactivate, error } =
    useWeb3React();

  const handleLogin = async () => {
    IsConnected = true;
    localStorage.setItem("accountStatus", "1");
    toast.success("Successfully Connected to Metamask", {
      position: "bottom-right",
      autoClose: 2000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    activate(injected);
  };

  const handleLogout = () => {
    localStorage.removeItem("accountStatus");
    toast.success("Disconnected", {
      position: "bottom-right",
      autoClose: 2000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    deactivate();
  };

  function copyToClipBoard() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
  }

  useEffect(() => {
    if(localStorage.getItem("accountStatus")) {
      activate(injected);
    }
  }, [activate])

  useEffect(() => {
    if (IsConnected && error) {
      if (error && (error.name === "UnsupportedChainIdError" || error.name === "t")) {
        const { ethereum } = window;
        (async () => {
          try {
            await ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: "0x5" }],
            });
          } catch (switchError) {
            if (switchError.code === 4902) {
              try {
                await ethereum.request({
                  method: "wallet_addEthereumChain",
                  params: [
                    {
                      chainId: "0x5",
                      chainName: "Polygon Mainnet",
                      nativeCurrency: {
                        name: "GoerliETH",
                        symbol: "GoerliETH",
                        decimals: 18,
                      },
                      rpcUrls: ["https://goerli.infura.io/v3/e92c433ba7214537873fe0025ee0763c"],
                      blockExplorerUrls: ["https://goerli.etherscan.io"],
                    },
                  ],
                });
              } catch (addError) {
                console.error(addError);
              }
            }
          }
          activate(injected)
        })();
      }
      IsConnected = false;
    }
  }, [account, error, activate]);

  return (
    <section className="main-header">
      <header className="home-header">
        <div className="container">
          <div className="row ">
            <div className="col-lg-12">
              <nav className="navbar navbar-expand-lg align-items-center">
                {/* <a className="navbar-brand" href="/">
                  <img src="/tokens/MGPS.png" className="mr-10" alt="" width="40px" />
                  METAGPS
                </a> */}
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarTogglerDemo02"
                  aria-controls="navbarTogglerDemo02"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon">
                    <i className="fa fa-bars"></i>
                  </span>
                </button>

                <div
                  className="collapse navbar-collapse"
                  id="navbarTogglerDemo02"
                >
                  <ul className="navbar-nav mt-2 mt-lg-0 ml-auto mx-auto">
                    {/* <li className="nav-item">
                      <a className="nav-link" href="#home">
                        Home
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#about">
                        About ICO
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#benefit">
                        Benefits
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#token">
                        About Token
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#roadmap">
                        Roadmap
                      </a>
                    </li>

                    <li className="nav-item">
                      <a className="nav-link" href="#team">
                        Team
                      </a>
                    </li> */}
                    {!isDesktopOrLaptop && (
                      <WalletBtn
                        account={account}
                        handleLogin={handleLogin}
                        handleLogout={handleLogout}
                        copyToClipBoard={copyToClipBoard}
                      />
                    )}
                  </ul>
                </div>
                {isDesktopOrLaptop && (
                  <WalletBtn
                    account={account}
                    handleLogin={handleLogin}
                    handleLogout={handleLogout}
                    copyToClipBoard={copyToClipBoard}
                  />
                )}
              </nav>
            </div>
          </div>
        </div>
      </header>
    </section>
  );
};

export default Menu;
