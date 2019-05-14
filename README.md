# utah-ward-sex-offender-extension

#Installation
1. clone the repo
2. On Chrome, navigate to chrome://extensions/
3. Click the Developer Mode toggle in the upper right hand corner
4. Drag the root folder onto the chrome://extensions page
5. Add your address information by clicking the extension icon in the extension bar
5. Go to directory.lds.org and click 'Show sex offenders' after waiting for the list to load.

(after publishing the extension, the install process will be much easier for the average user)

#Next Steps
1. Currently we're loading just one page of info from icrimewatch.net, we need to load all of it, but in a way that doesn't keep the user waiting for an eternity. I'm thinking, we send back a message for each page and render on each message send.
2. Right now, we're doing a simple first/last name match. We can get more information by calling the api's on lds.org and getting birthdates, etc, then comparing them to the data from icrimewatch.net. Getting additional data from icrimewatch.net is cumbersome, since we're reading html.
3. We need instructions and messaging. We should probably have some sort of popup when the user clicks 'Show sex offenders' that describes the limitations of the current system. We also need some kind of 'No offenders found' messaging.
4. I'm sure we'll find more stuff.

#Contributing guidelines.
1. As long as the code works and isn't just downright terrible, I don't care too much.
2. We should try and make this extension integrate as semalessly as possible with the existing lds.org site. Let's try to avoid forcing the users to have to refresh to get back to normal functionality. You can see this reflected in how we're just setting elements to 'display: none' when we filter out the non-offenders.
3. That's about it. 

# Help Out
Check out our [Discord](https://discord.gg/Aa5MPdz)
