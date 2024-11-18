# PRBP

You will have to open up 2 split terminals. One for the frontend and one for the backend.

Terminal 1: 'cd api'
            'npm install'
            'nodemon index.js'

Terminal 2: 'cd client'
            'npm install'
            'npm start'


This project uses local MongoDB (MongoDB Compass), not the cloud version.

STEP BELOW NOT NEEDED ANYMORE:
This project also uses Pinata IPFS as decentralised storage. You may need to set up an account at https://www.pinata.cloud/ and use your own key to get the storage started. The PINATA_API_KEY and PINATA_API_SECRET are to be replaced with your own in api/index.js.