/// requirements
// nodejs
// jsforce
const fs = require("fs");
const jsforce = require("jsforce");

// instantiate a Connection object
// change loginUrl depending on your configured endpoint
const conn = new jsforce.Connection({
  loginUrl: "https://test.salesforce.com/",
});

// Salesforce User login and pw
// user needs to be an API user, and ideally a System Administrator or equivalent
const salesforceUsername = "___username";
const salesforcePassword = "___password";

// instantiate gloval variables
let datenow = Date.now(); // datenow is used to generate a unique folder name

// write describe global to file
function writeDescribeGlobal(iDateNow, iMeta) {
  fs.mkdirSync("./describe-" + iDateNow, { recursive: true });
  const data = fs.writeFileSync(
    "./describe-" + iDateNow + "/describeGlobal.json",
    JSON.stringify(iMeta),
    {
      flag: "a+",
    }
  );
}
// write a specific object's describe to file
function writeDescribeObject(iDateNow, iSObject, iMeta) {
  fs.mkdirSync("./describe-" + iDateNow + "/sObjectsDesc/", {
    recursive: true,
  });
  const data = fs.writeFileSync(
    "./describe-" + iDateNow + "/sObjectsDesc/" + iSObject + "-describe.json",
    JSON.stringify(iMeta),
    {
      flag: "a+",
    }
  );
}

// script
// start with login
// continue to get describe global
// iterate on objects in describe global to get each object's describe
conn.login(salesforceUsername, salesforcePassword, function (err, userInfo) {
  if (err) {
    return console.error(err);
  }
  // Log successful connection
  console.log(conn.accessToken);
  console.log(conn.instanceUrl);
  console.log("User ID: " + userInfo.id);
  console.log("Org ID: " + userInfo.organizationId);

  // get describeglobal
  conn.describeGlobal(function (err, res) {
    if (err) {
      return console.error(err);
    }
    console.log("Num of SObjects : " + res.sobjects.length);

    //write to file
    writeDescribeGlobal(datenow, res);

    // iterate on all sObjects
    for (let sobject of res.sobjects) {
      if (sobject) {
        console.log(sobject.name);
        // get object describe
        conn.sobject(sobject.name).describe(function (err, objectmeta) {
          if (err) {
            return console.error(err);
          }

          //write to file
          writeDescribeObject(datenow, sobject.name, objectmeta);
        });
      }
    }
  });
});
