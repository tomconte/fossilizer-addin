# Ethereum Fossilizer add-in for Outlook 365

This is a sample add-in project for Outlook 365 that demonstrates interaction with an Ethereum smart contract to "fossilize" e-mails in a blockchain. It is used together with the main [ethereum-fossilizer](https://github.com/tomconte/ethereum-fossilizer) project. 

## Building the add-in

Here are a couple articles that should give you an overview of building and testing an Outlook 365 add-in:

- Overview for Outlook 365 add-ins: https://dev.outlook.com/MailAppsGettingStarted/GetStarted
- Yeoman generator for Office: https://github.com/OfficeDev/generator-office

Basically, you will run the add-in locally using `gulp serve-static` and configure your Outlook 365 using the included Manifest file.

## Communicating with the `geth` client

Outlook 365 is served over HTTPS, however the `geth` client only supports listening on HTTP for RPC requests. This will be blocked by the web browsers, which do not allow mixed content. I have included a small Node.JS proxy script that you can run to forward HTTPS requests to `geth`.

```
node proxy.js
```
