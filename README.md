# PRBP

You will have to open up 3 split terminals. One will handle the blockchain, one for the frontend and one for the backend.

Terminal 1: 'cd client'
            'npx hardhat node'

Terminal 2: 'cd api'
            'node index.js'

Terminal 3: 'cd client'
            'npx hardhat ignition deploy ./ignition/modules/Computations.js --network localhost'
            'npm start'

INput the commands in this order and the react app with start working with the local blockchain.