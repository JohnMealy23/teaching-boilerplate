# Boilerplate

This is a very simple repository with which to start a new project.

## Working with This Repo

### Installing the Dependencies
You'll note there's a file in this repository called "package.json".  This file contains (among other things) two lists - `dependencies` and `devDependencies`.  These are lists of all of the `npm` packages this repo is built upon and requires to run.

In your command line, type `npm install` and hit enter.  This reaches out into the Web, and pulls in all of the code for those `npm` packages, and places it in a directory called `node_modules`, where your own code can access it.

The code already written in this repo is set up to access the code you just pulled down, so if you `npm install`ed, you're good to go.

### Install the Builder
For the code to run, it needs to be built into a "bundle".

This means the code we write needs to be converted (transpiled) into JavaScript a browser can understand, and brought into a single file (the bundle) from the disparate files we create.

We'll use Parcel as our bundler.  It's an open-source NPM pacakge that will build our code, as well as run the local server where we can see our code functioning.

To install Parcel, run this command in you command line:
```base
npm install -g parcel-bundler --save-dev
```

Note the `-g` in the above command.  Usually when we use the `npm install {package-name} --save` command, the package we're installing is added to the project's package.json file.  However, when using the `-g` flag, this indicates to NPM that you'd like the package installed "globally".  This means global to your entire system - not just in the project we're in.

In general, global dependencies are to be avoided.  The main reason: When sharing a project, a new user should be able to simply run `npm install`, and all of the necessary code should come rushing down to the user's local environment.

But how does NPM know what the necessary code is?  Why, because it's in the package.json!

But when we install something globally, it doesn't go into the project's package.json.  Thus, new users will `npm install`, then be confused by still not being able to run the project.

In the case of Parcel, it's doing some crazy system-wide stuff that just can't be contained by the project.  For this reason, the global installation is still necessary, as is the note in this README, telling you to install it before things will work.

### Start the App
To start testing as we build, we'll need to both build the code, then start our local test server.  This will make it possible to go into a browser and see the code we write, as we make changes.

Fortunately, Parcel makes this mega-easy.  To start the app, run the following command in your command line:
```bash
npm run start
```

You'll note that the command line printed out a bunch of stuff.  If all went well, the last line should tell you where the server is running (something with the word "localhost" in it).  You should be able to paste this into your browser and see the result of your running application!
