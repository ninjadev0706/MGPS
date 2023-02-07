import RightSideBar from "../components/RightSideBar";
import "../styles/Home.css";



const BuyToken = ({ account, promiseData, buyWithBNB, buyWithTokens }) => {

    return (
        <RightSideBar account={account} promiseData={promiseData} buyWithBNB={buyWithBNB} buyWithTokens={buyWithTokens} />
    );
};

export default BuyToken;
