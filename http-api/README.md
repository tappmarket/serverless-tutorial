# Lambda Http API Example

Files:

- `package.json` - Points to the app's main file and lists its details and dependencies.
- `serverless.yml` - A service is configured via a `serverless.yml` file where you define your functions, the events that trigger them, and the AWS resources to deploy.
- `environments` - `serverless.yml` extension configuration file storage directory
- `index.js` - This example mainly runs javascript functions

## To Use

To clone and run this repository you'll need Node.js (which comes with npm) installed on your computer. From your command line:

```bash
# Install dependencies
npm install
# Run the local
npm run local
```

## `serverless.yml` Environment Variable Settings

- Storage and naming of environment variable files - Configuration files like `local.yml` are stored in `environments`, and these files are named and called according to the `stage` in which the project is running.
- Environment variable invocation rules - In `serverless.yml` you can use such a rule for environment variable invocation: ` ${file(./environments/${opt:stage, 'dev'}.yml):<parent>. <child>}`, for example: ` ${file(./environments/${opt:stage, 'dev'}.yml):provider.environment}`

