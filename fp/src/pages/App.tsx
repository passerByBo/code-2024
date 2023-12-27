// import MetaMaskCard from '@components/connectorCards/MetaMaskCard';
// import InfoAbi from '@abis/InfoContract.json';
// // import { Contract } from 'ethers';
// import { hooks } from '../connector/metaMask';
// import { InfoContract__factory } from '@abis/contracts';
// import { useEffect } from 'react';

// const App = () => {
//   const { useProvider } = hooks;
//   const provider = useProvider();
//   const address = InfoAbi.networks[5777].address;
//   const signer = provider?.getSigner();
//   // const contract = new Contract(address, InfoAbi.abi, signer!) as InfoContract;
//   const contract = InfoContract__factory.connect(address, signer!);
//   useEffect(() => {
//     console.log('contract: ', contract);
//   }, [contract]);

//   return (
//     <div>
//       <MetaMaskCard />
//       <hr />
//       <input
//         type="button"
//         value="获取合约"
//         onClick={async () => {
//           const [data, num] = await contract.getInfo();
//           console.log('data: ', data);
//           console.log('num: ', num);
//         }}
//       />
//       &nbsp;&nbsp;&nbsp;&nbsp;
//       <input
//         type="button"
//         value="调用合约"
//         onClick={async () => {
//           const result = await contract.setInfo(
//             'laoyuan',
//             parseInt((Math.random() * 20).toString(), 10),
//           );
//           //loading的话 loading要能点
//           //带着 esult.hash去区块链浏览器
//           const transactionReceipt = await provider?.waitForTransaction(result.hash);
//           console.log(
//             '监听当前hash挖掘的收据交易状态【为1代表交易成功、为0代表交易失败】transactionReceipt.status：',
//             transactionReceipt?.status,
//           );
//           console.log(
//             '监听当前hash挖掘的收据交易event事件日志transactionReceipt.logs：',
//             transactionReceipt?.logs,
//           );
//           if (transactionReceipt?.status == 1 && transactionReceipt.logs.length !== 0) {
//             console.log('写入成功');
//           }
//         }}
//       />
//     </div>
//   );
// };

// export default App;

import { useRoutes } from 'react-router-dom';
import routes from '../routes/index';

const App = (): JSX.Element => {
  const routing = useRoutes(routes);
  return <>{routing}</>;
};
App.whyDidYouRender = true;
export default App;
