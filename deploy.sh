#/bin/bash

#upload files

aws s3 cp ./dist s3://www.afrotcfit.me --recursive --acl public-read
