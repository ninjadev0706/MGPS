import RightSideBar from "../components/RightSideBar";
import "../styles/Home.css";



const BuyToken = ({ account, promiseData, buyWithBNB, buyWithTokens, fetchData, availableSYRF, availableTokenBal }) => {

    return (
        <RightSideBar account={account}
            promiseData={promiseData}
            buyWithBNB={buyWithBNB}
            buyWithTokens={buyWithTokens}
            fetchData={fetchData}
            availableTokenBal={availableTokenBal}
            availableSYRF={availableSYRF}
        />
    );
};

export default BuyToken;
