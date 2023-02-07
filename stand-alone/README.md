#Notes on semi-automated deploying with a script

1. The semi-automated deploying script is called `deploy-stand-alone` and can be found in the main `package.json` file.
2. Run `yarn deploy-stand-alone --env [env]`
3. There is a set of env that are available in the `src/deploy/envs.ts` file.
4. Example: `yarn deploy-stand-alone --env test` will run the `build-stand-alone` command from the `package.json` file,
   and place all the files in the `standalone-dist` directory.
   - The script will find all files that end with a `.js` extension and try to upload them to the to GCS
   - Based on the `test`, the stand-alone video player files will be uploaded to the following URL: `https://static.wikia.nocookie.net/silversurfer/video/test/standalone-dist/standAlone_RV_VideoPlayer.js`
   - If the `prod` env was specified, then the file would've been deployed to `https://static.wikia.nocookie.net/silversurfer/video/prod/standalone-dist/standAlone_RV_VideoPlayer.js`
   - The general deployment URL pattern is `https://static.wikia.nocookie.net/silversurfer/video/[env]/standalone-dist/standAlone_RV_VideoPlayer.js`
   - The deployment envs can be expanded by adding additional environment to the `envs.ts` file

#Notes on how to do manual deployments:

1. Go to the root of the project.
2. Run `yarn build-stand-alone` on the command prompt
3. Check that the `standalone-dist` directory is created at the root of the project
4. Deploy to the silver-surfer GCP folder by running `gsutil cp -r standalone-dist gs://silversurfer/video/test/`
   from the project root directory
   - If you get an authentication error when using `gsutil`, follow the `Authenticate and setup gsutil & gcloud` section in this README
5. Check that the files were deployed with `gsutil ls gs://silversurfer/video/test/standalone-dist`
6. If you need to rebuild, you can remove the deployed files on GCS with `gsutil rm -r gs://silversurfer/video/test/standalone-dist`
7. Caching sometimes gives issues with the new changes showing up. There should be a command in gsutil to disable/bust the cache, but in
   case that can't be found, the next best hacky solution is to change the name of the stand-alone JS that gets built, by changing it in the
   `rollup-stand-alone.config.js` file.
   ```javascript
   input: {
   	standAlone_RV_VideoPlayer: 'src/stand-alone/standalone-loader.tsx';
   }
   ```
   The `standAlone_RV_VideoPlayer` can be renamed to `standAlone_RV_VideoPlayer1` for example.
8. Repeat steps 2-7 to redeploy new builds

#Purging a file deployed to GCS
In some instances, we may want to instantly purge a file that's hosted on GCS, and cached through Fandom's CDNs.
This is not a simple thing to do, as it requires purging multiple CDN nodes at once.
Fortunately, there is a script provided that can purge all the caches on which the stand-alone video player is cached on.

You can easily purge this file by running the the `purgeSingleFile` command, that's located in the main `package.json`.
You can run this command by using `yarn purgeSingleFile [fileUrl]`

Example:
`yarn purgeSingleFile https://static.wikia.nocookie.net/silversurfer/video/test/standalone-dist/standAlone_RV_VideoPlayer.js`

This will purge all the caches on which this file is stored. This is very useful in cases where the video package has to be applied instantly.
Currently during deployment, a 30 minute default cache time is applied on the files that are uploaded to GCS.

## Steps for installing google-cloud-sdk, and some other Fandom dependencies

### Install and Configure OpenVPN

1. Follow the below guide to setup and connect to the Fandom VPN. This is needed to access certain webpages or repositories such as artifactory. More on that below.
2. Confluence guide: <https://wikia-inc.atlassian.net/wiki/spaces/IHD/pages/422740002/How+to+Install+and+Configure+VPN>

### Install Git

1. Open a terminal window. Press and hold **_Command + Space_**, and type _terminal_ in there.
2. Open the terminal and type _git_. Press **Enter**. You should get a prompt stating to install git.

### Install nvm and nodejs/npm

1. Follow this guide to install **nvm** and a corresponding **node** version: <https://www.codementor.io/@mercurial/how-to-install-node-js-on-macos-sierra-mphz41ekk>
2. When installing a node version with **nvm**, refer to the **_.nvmrc_** file location in the root project directory
3. If using multiple version of npm (installed through nvm), then you can easily switch your current **npm** version with the **nvm** command. To switch to
   the latest version that this project uses, open a **terminal** window in the root of the project directory (where this **_README.md_** file is located), and type the command **_nvm use_**.This will automatically switch to the version defined the **_.nvmrc_** file.
4. When running the **_nvm use_** command, if you don't have the version of node installed that's specified in the **_.nvmrc_** file, then you may get an error similar to this one: "_N/A: version "N/A" is not yet installed._". You'll need to install that version specified in the **_.nvmrc_** file, so that it can work.
   Also, take a look at this stackoverflow post. It explains what this misleading error is about, and how it can be prevented in the future as well:
   <https://stackoverflow.com/questions/49449719/nvm-n-a-version-n-a-n-a-is-not-yet-installed>
5. Verify your current node version by typing in the **terminal** the following command: **_node -v_**. If something looks off with the version even after you've ran the **_nvm use_** command, then open a new **terminal** window and retype the **_node -v_**. If that still doesn't work, you may need to do some debugging to see what the issue is with **nvm**.

### Install yarn

1. Run the following command from your terminal after installing nvm and node: **_npm install -g yarn_**

### Connect to Fandom's Artifactory instance

All directions and steps regarding connecting to Artifactory can be found here: <https://github.com/Wikia/fandom-frontend#getting-started>.

Below are a couple of things to keep in mind when connecting to Artifactory:

1. Make sure you are connected to OpenVPN, otherwise you may not be able to connect to Artifactory
2. Find out where the _.npmrc_ file is located. Run the below command in your terminal:
   **_npm config ls -l | grep config_**
3. You can open the _.npmrc_ by going to the path specific in the output of the above command. If your **_.npmrc_** file is located in **_~/.npmrc_** (_which is your user directory_), then you can run **_open ~/.npmrc_**.
4. Note that you may not be able to find the **_.npmrc_** file in the **Finder** because it's prefixed with a '_._'. You can run the **ls -la** command to find hidden files and directories through your **_terminal_** application

### Install HomeBrew

1. Install the Mac HomeBrew shell to easily install packages such as **_k6_**. Reference this website on how to install it: <https://brew.sh/>

### Request your own DevBox Instance

1. Request your own DevBox instance for development purposes, and other uses here: <https://wikia-inc.atlassian.net/wiki/spaces/EN/pages/35723854/Setting+up+your+DevBox>
2. Once the operate team creates a DevBox instance for you, log into the devbox, not with the **hashed password**, but **_with the one that was used to create the hash_**.
3. You'll need a DevBox instance later on, in order to get an authentication token to get connected to Google Cloud Service (GCS)

### Install Python - Prerequisite to google-cloud-sdk

1. Install Python - Prerequisite to Google Cloud (version 3.5 to 3.8 is preferred as per google cloud docs - this may change) :: <https://cloud.google.com/sdk/docs/quickstart>
2. Install **Python Version Manager**, to easily switch between Python versions, similar with node version manager (nvm). Follow the below steps in the link below:
   <https://opensource.com/article/19/5/python-3-default-mac>

#### Troubleshooting for Macs with M1 chip

On above websites recommended Python version is 3.7 and you may facing issues installing it cause by 'arch' (error message: `configure: error: Unexpected output of 'arch' on OSX`), then you should try with version `3.8.10`.

### Download and install the google-cloud-sdk

1. After python installation, download google-cloud-sdk. Follow the directions here:
   <https://cloud.google.com/sdk/docs/quickstart>
   **_Make sure you run the install.sh script that is mentioned in the above quickstart guide. This will allow you to use google-cloud-sdk commands straight from your terminal, since those commands will be added to your PATH, and easily accessible._**

### Creating a shell alias to launch your DevBox from the terminal with one command

1. Create an alias to open your devbox. You should’ve received a message from the operate team (You can reach them at the `#ops` slack channel) after requesting a devbox instance. They should’ve provided you with login information.
2. Creating an alias for the shell of your choice (for MAC it can be zsh for example), will make it much easier for you to log into your devbox, instead of typing in the ssh [name]@[dev-name] command each time.
3. Run following command to open your .zshrc file, where you can create an alias: **_open ~/.zshrc_**
4. This should open your default text editing application. On the next available line, type in the following command (replace _[name]@[dev-name]_ with your actual login info received from the operate team, for example **jdoe@dev-jdoe**) :
   alias devbox=“ssh [name]@[dev-name]”
5. Save the file, and exit out of the text editor. Next, if you have a terminal window open, then close it. Open a new terminal window, and type in “devbox” (omit the “”). Make SURE YOU ARE CONNECTED TO THE FANDOM VPN. If you are not connected, then it will more than likely not allow you to connect. From now on, running “devbox”, will be equivalent to running “ssh [name]@[dev-name]”.

### Setting up “Vault for Engineers”

1. Visit: <https://wikia-inc.atlassian.net/wiki/spaces/OPS/pages/132317429/Vault+For+Engineers>
2. Login with your devbox username and password (you can use the **devbox** shell alias created in the previous steps)
3. If everything went well you should see the following message:
   “Success! You are now authenticated. The token information displayed below
   is already stored in the token helper. You do NOT need to run "vault login” again. Future Vault requests will automatically use this token.”
   1. This message will be followed by some Key/Value pairs for all the information that is stored in your devbox after authentication.

### Authenticate and setup gsutil & gcloud

1. After installing google-cloud-sdk, running the install.sh script, and walking through the “Vault for Engineers” guide mentioned above, you can now go ahead with setting up gsutil and gcloud. Both commands are part of the google-cloud-sdk and are used for interacting with Cloud Storage and all other Google Cloud products respectively. The below setup will allow you to do a one-time authentication setup for your laptop, which will allow you to interact with Google Cloud services that Fandom uses. These services will mainly be used for deployments.
2. In your **DevBox** instance (you can run “devbox” alias command as mentioned previously to get into your devbox), run the below command:
   1. vault read -format=json secret/chef/gcs/ceph-migration | jq .data > vault-gcs.json
3. After running that command in your **DevBox**, you should now see a new file called vault-gcs.json. All the contents of the previous command were written into this file.
4. Run the following command to look at the contents of this file: **_cat vault-gcs.json_**. This will print the contents of this file. **COPY ALL THE CONTENTS** inside vault-gcs.json.
5. Now you need to leave your **DevBox** instance, and paste the contents of what you copied into your local machine. You can type the command **_exit_**, to leave your **DevBox** instance.
6. Find a folder in your local machine where you can create a file called vault-gcs.json (same as the one in your **DevBox**, although how you name it does not really matter).
   1. Create the file with the following command: **_touch vault-gcs.json_**.
   2. Open the file with the following command: **_open vault-gcs.json_**.
   3. Paste the contents you copied from the vault-gcs.json file that was open in your **DevBox**, into the newly created vault-gcs.json file on your local machine.
   4. Save the file, and exit your text editor.
7. Now run the following command (\*make sure you are in the same directory as the newly created **vault-gcs.json** file): **_gcloud auth activate-service-account --key-file vault-gcs.json_**
8. Now you can test if you're properly authenticated against Google Cloud Services. Run the following command: **_gsutil ls gs://silversurfer_**
   1. You should see a response. If you see a 400 error, or some other error code then that means you might've missed a step somewhere above.

#How to embed this player on any page

1. Open the chrome dev console
2. Paste the following 4 lines into the console:

```javascript
const script = document.createElement('script');
script.src = 'https://static.wikia.nocookie.net/silversurfer/video/test/standalone-dist/standAlone_RV_VideoPlayer.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);
```

3. This loads React and exposes a `loadPlayer` function on the `window` object.
4. Paste the following command into the console:

```javascript
window.loadPlayer({ contextName: 'giantbomb', mediaId: 'r46kS55a', embedSelector: '.av-player-container' });
```

5. Change the `embedSelector` value. The above code and embed was tested on the giant bomb video pages, such as the following link:
   https://www.giantbomb.com/shows/game-mess-mornings-12-09-22/2970-22041/free-video
6. The `embedSelector` uses `document.querySelector` under the hood, so an id or className can be passed.
