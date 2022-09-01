# ensure TAG has format {AWS ENV PROFILE}
ENVPROFILE=$1
echo "##############################################"
echo "Deploy to Stage $ENVPROFILE"
echo "##############################################"

# deploy using serverless
AWS_PROFILE=$ENVPROFILE sls deploy --stage=$ENVPROFILE --force