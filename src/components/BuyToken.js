import RightSideBar from "../components/RightSideBar";
import "../styles/Home.css";



const BuyToken = ({ account, promiseData, depositEth, withdrawEth, fetchData, availableTokenBal }) => {

    return (
        <RightSideBar
            account={account}
            promiseData={promiseData}
            depositEth={depositEth}
            withdrawEth={withdrawEth}
            fetchData={fetchData}
            availableTokenBal={availableTokenBal}
        />
    );
};

export default BuyToken;
