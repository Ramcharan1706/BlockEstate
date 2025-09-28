BlockEstate

BlockEstate is a decentralized property marketplace that enables secure house buying and selling using the Algorand blockchain. It leverages AlgoKit and PyTeal for smart contracts, ensuring transparent ownership transfer and tamper-proof transactions. The platform uses Node.js and TypeScript for a real-time web interface, with AlgoPy handling backend logic for a seamless user experience.

🚀 Usage

Register as a landowner or government official via the platform.

Government officials can approve and register properties on-chain securely.

Landowners can list their properties for sale in the decentralized marketplace.

Buyers can browse listings and purchase properties with blockchain-backed ownership transfer.

All transactions and ownership details are immutably recorded on Algorand, ensuring transparency and security.

🛠️ Tools & Technologies Used

Algorand blockchain with AlgoKit, PyTeal, and AlgoPy

Python with Poetry, Black, Ruff/Flake8, mypy, pytest, pip-audit

React + TypeScript frontend with Tailwind CSS, DaisyUI, use-wallet

Node.js backend API with Express and middleware

Testing & linting: Jest, Playwright, ESLint, Prettier

VS Code configured for developer productivity (.vscode folders included)

🧰 Prerequisites & Initial Setup

Before you begin working with BlockEstate, please ensure the following tools are installed on your machine. These are required to build, run, and interact with the decentralized property marketplace locally.

Tool	Version	Purpose
Python	3.12.x (exactly)	Backend logic & smart contract tooling
Docker	Latest stable	Local blockchain environment
Git	Latest stable	Clone the repository
Node.js	18.x or newer	Frontend build tools & CLI scripts
AlgoKit	Latest stable (algokit)	Algorand development CLI

⚠️ Python 3.13 or higher is not supported at this time. Please ensure you're using Python 3.12.

🔧 Install Dependencies

Follow these guides to install the required tools:

Python 3.12
Download Python 3.12

(Make sure to add Python to your system PATH)

Docker Desktop
Install Docker

Git
Install Git

Node.js
Download Node.js
 (LTS version recommended)

AlgoKit CLI
Follow official guide:
AlgoKit Installation

📦 Get the Project Code

You can either clone the repository or download it as a ZIP file.

Option A: Clone via Git
git clone https://github.com/your-org/blockestate.git
cd blockestate

Option B: Download ZIP

Go to the GitHub repo

Click Code → Download ZIP

Extract the ZIP and open the folder

⚙️ Initial Project Setup

Bootstrap the full project environment (this installs dependencies, sets up Python virtualenv, and prepares environment files):

algokit project bootstrap all


Generate the environment file for localnet (for smart contracts):

cd reallestate-contracts
algokit generate env-file -a target_network localnet


Build the entire project (contracts + frontend clients):

cd ..
algokit project run build


💡 If you update the source code or add new dependencies, re-run algokit project bootstrap all to keep your environment up to date.

🖥️ Running the Project Locally

1. Open the project in your editor

Open VS Code (or your preferred code editor) and open the root project folder (blockestate).

2. Running the Frontend
cd projects/reallestate-frontend

# Copy the environment template to create your local .env file
cp .env.template .env

# Install dependencies
npm install

# Start the development server
npm run dev


After running npm run dev, you will see a localhost URL (e.g., http://localhost:5173).

Ctrl + Click (or Cmd + Click on Mac) the URL in the terminal to open the frontend in your browser.

3. Running the Backend
cd ../../backend

# Install required Node.js modules
npm install express dotenv multer jsonwebtoken body-parser mongodb algosdk axios express-session cors

# Start the backend server
node server.js


The backend server will start and listen for API requests.

🔗 Smart Contract Integration

Smart contracts reside in the reallestate-contracts directory.

Frontend smart contract clients are generated automatically into projects/reallestate-frontend/src/contracts.

After compiling contracts, run:

npm run generate:app-clients


Use the generated clients in your React components to interact with the blockchain.
