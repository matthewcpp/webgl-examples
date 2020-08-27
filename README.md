# @matthewcpp/webgl-examples
This repository contains sample scenes for the [@matthewcpp/webgl](https://github.com/matthewcpp/webgl) framework. 
It is also serves as a developent harness for adding new features.

### Configuration and development

The `build/config.example.toml` file contains user level build settings.
To get started, make a copy of the file named `config.toml` and place it in the build directory.
Refer to the file for a description of each setting.

Once your configuration is setup you can begin building samples. To build a sample, run the following command in the terminal:
```shell script
npm run build <SampleName>
```

To add additional samples, create a new folder and place all sample related files in it.
The build script will compile and rollup all typescript files, while copying all others into the `dist` directory.

#### Working with @matthewcpp/webgl

Most likey the webgl framework will needed to modified / extended as a part of adding additional samples. 
The easiest way to do this is with the use of `npm link`.  Clone the webgl framework next to this repository and run:

```shell script
npm link ../webgl
```

##### MacOS

This may fail on MacOS due to a permission error.  In that case you can add a global folder to NPM.
```shell script
mkdir ~/development/npm_global
npm config set prefix ~/development/npm_global
```

Add the path to your .zprofile:
```shell script
nano ~/.zprofile
export PATH=~/development/npm_global:$PATH
source ~/.zprofile 
```