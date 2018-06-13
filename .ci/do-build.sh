#!/bin/bash
##
## Description:
##
## This script invoques the actual build script
## inside a docker container
##
## Author: Julio Arias <julio.arias@edify.cr>

source .ci/common.sh

QUIZZES_VERSION=$(docker run -v $PWD:/app \
  --workdir /app \
  --user node node:6 node -e "console.log(require('./package.json').dependencies['quizzes-addon']);")

if [ -z "$S3_BUCKET" ]; then
  error "No S3 bucket specified."
  exit 1
fi

if [[ -z "$AWS_ACCESS_KEY_ID" ]] || [[ -z "$AWS_SECRET_ACCESS_KEY" ]] || [[ -z "$AWS_DEFAULT_REGION" ]]; then
  error "No AWS credentials provided."
  exit 1
fi

info "Downloading welcome site..."
silent aws s3 cp s3://${S3_BUCKET}/frontend-30/welcome/welcome.tar.gz .

info "Downloading quizzes addon..."
silent aws s3 cp \
  s3://${S3_BUCKET}/quizzes-addon/${QUIZZES_VERSION}/quizzes-addon-${QUIZZES_VERSION}.tgz .

info "Running build inside a custom docker image..."

rm -rf /tmp/yarn-cache-bamboo
mkdir /tmp/yarn-cache-bamboo
chmod 0777 /tmp/yarn-cache-bamboo
rm -rf /tmp/yarn-cache-bamboo/v1/npm-quizzes-addon*
rm -rf /tmp/yarn-cache-bamboo/v1/.tmp

#docker login \
 # -u goorusheeban \
  #-p '$master1'


#docker run  -t --rm \
#	-v $PWD:/build \
#	-v /tmp/yarn-cache-bamboo:/tmp/yarn-cache \
#	-e bamboo_buildNumber=${bamboo_buildNumber} \
#	-e bamboo_repository_branch_name=${bamboo_repository_branch_name} \
#	-e QUIZZES_VERSION=${QUIZZES_VERSION} \
#	-w /build goorusheeban/gooru-fe ./.ci/build.sh


source .ci/build.sh
