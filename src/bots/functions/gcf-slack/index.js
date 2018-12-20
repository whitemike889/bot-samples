const {
  SLACK_WEBHOOK_URL
} = require('./config.json');
const {
  IncomingWebhook
} = require('@slack/client');

const webhook = new IncomingWebhook(SLACK_WEBHOOK_URL)

// subscribe is the main function called by Cloud Functions.
exports.sendToSlack = (req, res) => {
  if (req.method !== 'POST') {
    const error = new Error('Only POST requests are accepted');
    error.code = 405;
    throw error;
  }
  // Send message to Slack.
  const message = createSlackMessage(req.body);
  return webhook.send(message, (result) => {
    console.warn('Sent', result);
    return res.status(200).send('SUCCESS!');
  });
}

// createSlackMessage create a message from a build object.
const createSlackMessage = (params) => {
  var message = {
    unfurl_links: false,
    unfurl_media: false
  };
  message.text = `Success: ${params.entity} was ${params.status}! ${params.candidate} starts work as ${params.job} on ${params.startDate}`;
  return message;
}
