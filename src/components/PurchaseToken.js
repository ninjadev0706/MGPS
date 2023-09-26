import BuyToken from "./BuyToken";

const PurchaseToken = ({ account, promiseData, depositEth, withdrawEth, fetchData, availableTokenBal }) => {

  return (
    <section className="main-banner" id="home">
      <div className="banner-inner">
        <div className="purchase-token">

          <div className="row">
            <div className="col-lg-12">
              <div className="lower-content">
                <div className="progress-col col-lg-6 col-md-12 col-sm-12">
                  <BuyToken
                    account={account}
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
        </div>
      </div>
    </section>
  );
};

export default PurchaseToken;
