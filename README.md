# Salesforce Describe Extractor

## What is it for?

This script is used to extract the DescribeGlobal and all specific object's Describe for a given org. The result is assembled in JSON files that are placed in a folder that is automatically created.

## How to use

### Requirements

This script requires NodeJS to run.

This script uses the amazing [jsforce library](https://jsforce.github.io/).

### Setup

[Install NodeJs from the official website](https://nodejs.org/)

Run this command to install jsforce:

```
npm install jsforce
```

Update these variables in `objectDescExtractor.js` with your Salesforce login url, username and password:

```
loginUrl: "https://test.salesforce.com/"

const salesforceUsername = "___username";
const salesforcePassword = "___password";
```

### Run

Run the script in your terminal with this command:

```
node objectDescExtractor.js
```

### Results

Navigate to the newly created folder `./describe-*date*` to find your JSON files.
