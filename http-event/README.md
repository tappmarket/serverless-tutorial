# Lambda Http API Example

## Files

- `package.json` - Points to the app's main file and lists its details and dependencies.
- `serverless.yml` - A service is configured via a `serverless.yml` file where you define your functions, the events that trigger them, and the AWS resources to deploy.
- `environments` - `serverless.yml` extension configuration file storage directory
- `index.js` - This example mainly runs javascript functions
- `deploy.sh` - Serverless deploy bash script

## To Use

To clone and run this repository you'll need Node.js (which comes with npm) installed on your computer. From your command line:

```bash
# Install dependencies
npm install
# Run the local test
npm run local
# Or you can run this
serverless offline start --stage local
```

`serverless offline start --stage local`, which means to call the `local.yml` environment variable configuration file in the `environments` directory. For example `serverless offline start --stage dev`, then call `dev.yml`

## Environment Variable Settings

`serverless.yml` will load yml configuration in `environments` directory according to `stage`

- Storage and naming of environment variable files - Configuration files like `local.yml` are stored in `environments`, and these files are named and called according to the `stage` in which the project is running.
- Environment variable invocation rules - In `serverless.yml` you can use such a rule for environment variable invocation: ` ${file(./environments/${opt:stage, 'dev'}.yml):<parent>.<child>}`, for example: ` ${file(./environments/${opt:stage, 'dev'}.yml):provider.environment}`

## Deploy

```bash
./deploy.sh dev
```

`./deploy.sh dev`, meaning: `AWS_PROFILE=dev sls deploy --stage=dev --force`

- `AWS_PROFILE=dev` - `AWS PROFILE` refers to the AWS account information you have added locally. The name of the PROFILE information is `dev`
- `--stage=dev` - refers to the name of the `stage` to be deployed to, `serverless.yml` will call the variable file in the `environments` directory according to the value in `--stage=dev`.

