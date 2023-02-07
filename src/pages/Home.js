import Menu from "../components/Menu";
import PurchaseToken from "../components/PurchaseToken";

const Home = ({ account, promiseData, buyWithBNB, buyWithTokens }) => {

  return (
    <div className="">
      <Menu />
      <PurchaseToken
        account={account}
        promiseData={promiseData}
        buyWithBNB={buyWithBNB}
        buyWithTokens={buyWithTokens}
      />
    </div>
  );
};

export default Home;
