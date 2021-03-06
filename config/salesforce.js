const jsforce = require('jsforce');
const session = require('express-session');

// Organisation in Salesforce
const org = new jsforce.Connection()

module.exports = {
  // Connect to Salesforce
  login: () => {
    org.login(process.env.SF_USERNAME, process.env.SF_PASSWORD + process.env.SF_SECURITY_TOKEN, function(err, userInfo) {
      try {
        session.org = org;
        session.token = org.accessToken;
        return console.log('Access Token: ' + org.accessToken);
      } catch (e) {
        console.log(e);
      }
    })
  },

  updateSF: (id) => {
    const org = session.org
    org.sobject("Contact").update({
      Id: id,
      Signed_Contract_Date__c: Date.now(),
      Signed_Contract__c: true
    }, function (err, ret) {
      try {
        console.log( ret )
      } catch (e) {
        console.log( err );
      }
    })
  }
}
