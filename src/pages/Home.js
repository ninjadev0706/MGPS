import Menu from "../components/Menu";
import PurchaseToken from "../components/PurchaseToken";

const Home = ({ account, promiseData, buyWithBNB, buyWithTokens, fetchData, availableSYRF, availableTokenBal }) => {

  return (
    <div className="">
      <Menu />
      <PurchaseToken
        account={account}
        promiseData={promiseData}
        buyWithBNB={buyWithBNB}
        buyWithTokens={buyWithTokens}
        fetchData={fetchData}
        availableTokenBal={availableTokenBal}
        availableSYRF={availableSYRF}
      />
    </div>
  );
};

export default Home;
