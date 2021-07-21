#!/bin/sh

#Navigate to website
cd client

#Stop whatever is currently running
docker stop $(docker ps -a -q)

#Rebuild
docker build . -t vangoule   

#Run
docker run -dit -p 80:80 vangoule:latest
