# PRBP

You will have to open up 3 split terminals. One will handle the blockchain, one for the frontend and one for the backend.

Terminal 1: 'cd client'
            'npm install'
            'npm start'

Terminal 2: 'cd api'
            'npm install'
            'node index.js'

Input the commands in this order and the react app with start working with the local blockchain.

This project uses local MongoDB, not the cloud version.

STEP NOT NEEDED FOR PEOPLE ALREADY WORKING ON THIS PROJECT:
This project also uses Pinata IPFS as decentralised storage. You may need to set up an account at https://www.pinata.cloud/ and use your own key to get the storage started. The PINATA_API_KEY and PINATA_API_SECRET are to be replaced with your own in api/index.js.