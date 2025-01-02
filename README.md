# videoverse_restapis

# Project Setup
node version used 16.04  
install ffmpeg in your system  
install sqlite3 in your system  
cd project_path  
mkdir upload/videos  
mkdir upload/trimmed_videos  
mkdir upload/merged_videos  
mkdir upload/reencoded_videos  
npm install  
node server.js  

# To run the test suite
change the videos path in test files  
npm run test:coverage  

# Authentication for APIs
using x-api-key as authorisation header for api calls  
stored the x-api-key in config.js  

Note: One can change the x-api-key based on their interests in config.js  

# APIs of the project
upload api where one can upload video file other uploads will throw error  -- For each upload one entry will be created in video table of sqlite db  
trim video we have to pass start time, end time and video id which one you want to trim  
merge videos you can pass array of videoids you want to merge  
generate link for any video id you have to pass video id for the same -- For each generate link one entry will be created in link table of sqlite db  
in the response of generate link we will get link to access the video where links have expiry  

# Limits of the projects
min duration for the videos kept it as 10s  
max duration for the videos kept it as 20s  
max file size for the videos kept it as 25mb  
expiry time for the link generates is 1hr  

Note: One can change the limits through config.js  


