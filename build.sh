#!/bin/bash

cd backend

mvn package

docker cp dist/state-management.war state-management-pilot_web_1:/usr/local/tomcat/webapps

cd ../

echo 'All done!'
