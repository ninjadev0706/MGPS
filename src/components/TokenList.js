import { tokenlist } from "../config/tokens";

const TokenList = ({ setSelectToken, setOpen, ref }) => {
    return (
        <div ref={ref} className="tokenlist position-absolute">
            {
                tokenlist.map((token, index) => (
                    <div className="avax-section font-non-nulshock justify-content-start t-grey3 fs-25"
                        onClick={() => {setSelectToken(token.id); setOpen(false);}}
                        key={index}
                    >
                        <img alt="" className="avax-img ml-20" src={`${token.image}`} />
                        <p className="avax-letter ml-20">{token.name}</p>
                    </div>
                ))
            }
        </div>
    );
};

export default TokenList;
