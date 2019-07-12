<div align="center">
  <img src="./src/assets/img/logo-meetingreaction.png" alt="Meeting Reaction logo" width="370" height="57" />

  ---
  An application for viewing instant feedback during a meeting.

  This feedback can be based on people’s speech or live reactions captured through facial recongition.
</div>

<br>

## How Meeting Reaction works
In the home screen, enter a meeting code (this code is alphanumeric and it has a length of exactly 6 characters). Every meeting has its own unique code.

Once the meeting code has been entered, you'll be able to visualize instant feedback data. You can either choose to view a word cloud or facial analysis.

<div align="center">
  <img src="https://media.giphy.com/media/MZKh6n4CKGa50YZCSW/giphy.gif" alt="Meeting Reaction animated gif"/>
</div>

## Solution components

- [x] Front-end app built with [webpack](https://webpack.js.org/) and [React](https://reactjs.org/) (this)
- [x] Back-end Azure Functions 2 ([repo](https://github.com/BeyondLabsEY/meeting-reaction-functions))
- [x] Desktop Raspberry Pi Python 3 app ([repo](https://github.com/BeyondLabsEY/meeting-reaction-rasp))

### Infrastructure requirements

- [x] Azure account
- [x] Region availability to use Azure Functions 2.0
- [x] Azure Blob storage
- [x] Azure Table
- [x] Azure Queue
- [x] Azure Face Recognition
- [x] Azure Text to Speech (aka _Bing Search_)

## First use
After cloning this repository, enter its root folder and type ```npm install``` in a terminal window. This will download and install all the required packages to make this application functional.

### Development environment
Open a terminal window and type ```npm run dev```. This will launch the application in a new browser's tab.

For every change you make in this project, the opened browser window will automatically update.

#### Environment config
In order to make this app fully operational, you must create an ```.env``` file containing your ```API_URL``` and ```API_VERSION``` variables.

### Production build
To bundle the application, type ```npm run build``` in a terminal window. This will generate a ```dist``` folder containing all the compiled code and production-ready files.

#### Optionally
In the same terminal window, enter the newly generated ```dist``` folder by typing ```cd dist```.

Then type ```zip -r build.zip .``` to generate a compressed file called ```build.zip```. You can upload this file directly to the web service of your choice.