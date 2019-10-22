# ember-getset-util-codemod


A collection of codemod's for ember-getset-util-codemod.

## Usage

To run a specific codemod from this project, you would run the following:

```

npx ember-getset-util-codemod getset-util "lib/video/**/*.js"
npx ember-getset-util-codemod getset-util path/of/files/ or/some**/*glob.js

# or

yarn global add ember-getset-util-codemod
ember-getset-util-codemod <TRANSFORM NAME> path/of/files/ or/some**/*glob.js
```

## Transforms

<!--TRANSFORMS_START-->
* [get-set-replace-all](transforms/get-set-replace-all/README.md)
* [getset-util](transforms/getset-util/README.md)
<!--TRANSFORMS_END-->

## Contributing

### Installation

* clone the repo
* change into the repo directory
* `yarn`

### Running tests

* `yarn test`

### Update Documentation

* `yarn update-docs`
