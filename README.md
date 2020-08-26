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