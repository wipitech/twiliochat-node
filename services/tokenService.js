const twilio = require('twilio');

const AccessToken = twilio.jwt.AccessToken;
const ChatGrant = AccessToken.ChatGrant;

function TokenGenerator(identity, origin) {
  const appName = 'TwilioChat';

  let pushCredentialSid;
  if (origin === "ios") {
    pushCredentialSid = process.env.TWILIO_APN_CREDENTIAL_SID;
  } else {
    pushCredentialSid = process.env.TWILIO_FCM_CREDENTIAL_SID;
  }
  // Create a "grant" which enables a client to use Chat as a given user
  const chatGrant = new ChatGrant({
    serviceSid: process.env.TWILIO_CHAT_SERVICE_SID,
    pushCredentialSid
  });

  // Create an access token which we will sign and return to the client,
  // containing the grant we just created
  const token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY,
    process.env.TWILIO_API_SECRET
  );

  token.addGrant(chatGrant);
  token.identity = identity;

  return token;
}

module.exports = { generate: TokenGenerator };
