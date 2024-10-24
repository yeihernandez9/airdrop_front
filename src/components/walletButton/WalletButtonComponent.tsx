import React from 'react'
import Button from "react-bootstrap/Button";
import { useMetaMask } from "../../context/MetaMaskContext";


const WalletButtonComponent = () => {
    const { account, connectToMetamask, disconnectFromMetaMask } = useMetaMask();

    return (
        <div>
            {account ? (
                <div>
                    <Button onClick={disconnectFromMetaMask}>Disconnet MetaMask</Button>
                </div>
            ) : (
                <div>
                    <Button onClick={connectToMetamask}>Connect MetaMask</Button>
                </div>
            )}
        </div>
    );
};


export default WalletButtonComponent
