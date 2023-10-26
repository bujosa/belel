import contractAbi from './artifacts/contracts/Lock.sol/Lock.json';
import dotenv from 'dotenv';
import { ethers } from 'ethers';
import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());
dotenv.config();

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const contractAddress = process.env.CONTRACT_ADDRESS as string;
const contract = new ethers.Contract(
  contractAddress,
  contractAbi.abi,
  provider
);

// Call the withdraw function
app.get('/withdraw', async (req: Request, res: Response) => {
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY as string, provider);
  const lockContract = new ethers.Contract(
    contractAddress,
    contractAbi.abi,
    signer
  );

  const result = await lockContract.withdraw();
  res.send(result);
});

// Deposit some funds
app.post('/deposit', async (req: Request, res: Response) => {
  const { amount, walletAddress } = req.body;

  const signer = await provider.getSigner(walletAddress);

  const tx = await signer.sendTransaction({
    to: contractAddress,
    value: ethers.parseEther(amount),
  });

  const result = await tx.wait();

  res.send(result);
});

// Listen for events
contract.on('Withdrawal', (amount, when, event) => {
  console.log('Withdrawal event received:', amount, when, event);
  event.removeListener();
});

contract.on('Deposit', (amount, when, event) => {
  console.log('Deposit event received:', amount, when, event);
});

// Init the server
app.listen(3000, () => {
  console.log('Listening on port 3000');
});
