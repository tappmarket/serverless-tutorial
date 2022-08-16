# deploy backend to to AWS based on tag
###
 # @Descripttion: []
 # @Copyright: Copyright by Iswoter
 # @Author: Iseven Monkey <iswoter@gmail.com>
 # @LastEditors: Iseven Monkey <iswoter@gmail.com>
 # @LastEditTime: 2022-08-15 15:13:59
 # @FilePath: /deploy.sh
### 

# ensure TAG has format {AWS ENV PROFILE}.{tag version}
TAG=$1
TAGVERSION=${TAG##*.}
ENVPROFILE=${TAG%%.*}
echo "##############################################"
echo "Deploy to Stage $ENVPROFILE"
echo "##############################################"

# deploy using serverless
AWS_PROFILE=$ENVPROFILE sls deploy --stage=$ENVPROFILE --force