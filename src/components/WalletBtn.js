const WalletBtn = ({ account, handleLogin, handleLogout, copyToClipBoard }) => {
  return (
    <>
      {!account ? (
        <div className="link" onClick={handleLogin}>
          <a href="#" className="wallet-btn">
            <span className="txt">Connect Wallet</span>
          </a>
        </div>
      ) : (
        <div
          className="link"
          onClick={() => {
            navigator.clipboard.writeText(account);
            copyToClipBoard();
          }}
        >
          <a href="#" className="wallet-btn">
            <div className="right-header-wallet-flex">
              <div
                className="cursorPointer"
                onClick={() => {
                  navigator.clipboard.writeText(account);
                  copyToClipBoard();
                }}
              >
                <p>{account.slice(0, 6) + "..." + account.slice(-4)}</p>
              </div>
              &nbsp;
              <img
                alt="logo"
                className="wallet-img"
                onClick={handleLogout}
                src="wallet-icon.png"
              />
              <span id="snackbar">Copied</span>
            </div>
          </a>
        </div>
      )}
    </>
  );
};

export default WalletBtn;
