# Build An Alexa Radio Skill
<img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/header._TTH_.png" />

### This is a simple tutorial to introduce a simple template for Alexa radio skill and code.

## Skill Architecture
Each skill consists of two basic parts, a front end and a back end.
The front end is the voice interface, or VUI.
The voice interface is configured through the voice interaction model.
The back end is where the logic of your skill resides.

## Three Options for Skill Setup
There are a number of different ways for you to setup your skill, depending on your experience and what tools you have available.

 * If this is your first skill, choose the [Alexa-Hosted backend instructions](./instructions/setup-vui-alexa-hosted.md) to get started quickly.
 * If you want to manage the backend resources in your own AWS account, you can follow the [AWS-Hosted instructions](./instructions/setup-vui-aws-hosted.md).
 * Developers with the ASK Command Line Interface configured may follow the [ASK CLI instructions](./instructions/cli.md).

 ## Setting up the radio template skill

 You can just change some config parameters to your own brand.

 * Just upddate the the background and logo variables in the splashscreen-datasource.js file with your own images. 
 * If you are using Alexa-hosted model, you just updated the background and logo images with the file names you uploaded to S3 bucket in your developer account. If you are using your own AWS account to host your lambda function, make sure the variable will contain a public https url.

---

## Additional Resources

### Community
* [Amazon Developer Forums](https://forums.developer.amazon.com/spaces/165/index.html) - Join the conversation!
* [Hackster.io](https://www.hackster.io/amazon-alexa) - See what others are building with Alexa.

### Tutorials & Guides
* [Voice Design Guide](https://developer.amazon.com/designing-for-voice/) - A great resource for learning conversational and voice user interface design.
* [Codecademy: Learn Alexa](https://www.codecademy.com/learn/learn-alexa) - Learn how to build an Alexa Skill from within your browser with this beginner friendly tutorial on Codecademy!

### Documentation
* [Official Alexa Skills Kit Node.js SDK](https://www.npmjs.com/package/ask-sdk) - The Official Node.js SDK Documentation
*  [Official Alexa Skills Kit Documentation](https://developer.amazon.com/docs/ask-overviews/build-skills-with-the-alexa-skills-kit.html) - Official Alexa Skills Kit Documentation
