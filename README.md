# videoverse_restapis

# Project Setup
node version used 16.04
npm install
node server.js

# Authentication for APIs
using x-api-key as authorisation header for api calls 
stored the x-api-key in config.js

Note: One can change the x-api-key based on their interests in config.js

# APIs of the project
upload api where one can upload video file other uploads will throw error
trim video we have to pass start time, end time and video id which one you want to trim
merge videos you can pass array of videoids you want to merge
generate link for any video id you have to pass video id for the same
in the response of generate link we will get link to access the video where links have expiry 

# Limits of the projects
min duration for the videos kept it as 10s
max duration for the videos kept it as 20s
max file size for the videos kept it as 25mb
expiry time for the link generates is 1hr

Note: One can change the limits through config.js


