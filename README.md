🏠 BlockEstate

BlockEstate is a decentralized real estate registry and property marketplace built on the Algorand blockchain, designed to ensure secure, transparent, and tamper-proof property registration and transactions.

Powered by AlgoKit, PyTEAL smart contracts, and a modern React + Node.js stack, BlockEstate empowers landowners, buyers, and government officials to register, verify, and transfer property ownership seamlessly and securely.

🚀 Usage

Landowners: Register and list properties on-chain with verifiable proof of ownership.

Government Officials: Approve, manage, and audit property records.

Buyers: Search, verify, and purchase property with smart contract-backed ownership transfer.

All Transactions: Are securely stored on the Algorand blockchain, ensuring immutability and public verifiability.

🛠️ Technologies Used
🔗 Blockchain

Algorand – High-performance Layer 1 blockchain

PyTEAL – Smart contract development

AlgoKit – Algorand development toolkit

AlgoPy – Blockchain logic handling

🌐 Frontend

React.js + TypeScript – Component-based web interface

Tailwind CSS + DaisyUI – Utility-first CSS with modern UI components

use-wallet – Wallet integration

🧠 Backend

Python (Poetry) – Smart contract tooling & integration

Node.js + Express – REST API server

MongoDB – Document-based property and user data storage

🧪 Dev & Testing

Jest, Playwright – Frontend testing

pytest – Smart contract and backend testing

ESLint, Prettier, Flake8, Ruff, Black – Code quality and linting

VS Code – Dev environment with workspace config

📦 Getting Started
✅ Prerequisites

Ensure the following tools are installed before running the project:

Tool	Version	Purpose
Python	3.12.x (only)	Backend logic & smart contract tooling
Node.js	18.x or newer	Frontend & backend runtime
Docker	Latest	Optional local blockchain sandbox
Git	Latest	Repository management
AlgoKit	Latest (algokit)	Algorand development CLI

⚠️ Python 3.13 or above is not supported.

📥 Installation & Setup
🔗 Clone the Repository
git clone https://github.com/your-org/blockestate.git
cd blockestate

🔧 Install Global Tools

Follow official guides for:

Install Python 3.12

Install Node.js

Install Docker

Install Git

Install AlgoKit CLI

⚙️ Project Bootstrapping
# Bootstrap the entire project
algokit project bootstrap all


Set up smart contract local environment:

cd reallestate-contracts
algokit generate env-file -a target_network localnet
cd ..


Build the contracts and frontend clients:

algokit project run build


🔁 Re-run the bootstrap step if dependencies or code change:
algokit project bootstrap all

🖥️ Running the Project
1️⃣ Start the Frontend
cd projects/reallestate-frontend
cp .env.template .env
npm install
npm run dev


Visit http://localhost:5173
 to view the app.

2️⃣ Start the Backend
cd ../../backend
npm install express dotenv multer jsonwebtoken body-parser mongodb algosdk axios express-session cors
node server.js


Backend will listen for API requests on http://localhost:3000 (default).

🧠 Smart Contract Integration

Smart contracts live in: reallestate-contracts/

Frontend contract clients are generated in:
projects/reallestate-frontend/src/contracts/

After building contracts, generate frontend clients:

npm run generate:app-clients


Use these clients directly in React components for blockchain interactions.
