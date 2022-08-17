# ensure TAG has format {AWS ENV PROFILE}.{tag version}
TAG=$1
TAGVERSION=${TAG##*.}
ENVPROFILE=${TAG%%.*}
echo "##############################################"
echo "Deploy to Stage $ENVPROFILE"
echo "##############################################"

# deploy using serverless
AWS_PROFILE=$ENVPROFILE sls deploy --stage=$ENVPROFILE --force