const { getParser } = require('codemod-cli').jscodeshift;
const ensureImport = require('../../utils/ensure-import');
const objectMethods = ['get', 'set', 'getProperties', 'setProperties', 'getWithDefault' ];

module.exports = function transformer(file, api) {
  const j = getParser(api);

  // During replacement, we populate this array with any util methods we use from `objectMethods`
  const utilMethodsUsed = [];

  const ast = j(file.source);

  // Do replacements
  ast.find(j.CallExpression, {
    callee: {
      type: 'MemberExpression',
      object: {
        type: 'ThisExpression'
      }
    }
  }).replaceWith(({ node }) => {
    const { callee } = node;
    if (
      objectMethods.includes(callee.property.name)
    ) {
      if (!utilMethodsUsed.includes(callee.property.name)) {
        utilMethodsUsed.push(callee.property.name);
      }

      // Do the code replacement
      node.callee = j.identifier(callee.property.name);
      node.arguments.unshift(j.thisExpression());
    }
    return node;
  });

  // Update imports if necessary
  if (utilMethodsUsed.length) {
    utilMethodsUsed.sort();

    ensureImport(ast, j, utilMethodsUsed, '@ember/object');
  }

  return ast.toSource();
};
