const { getParser } = require('codemod-cli').jscodeshift;

const objectMethods = ['get', 'set', 'getProperties', 'setProperties', 'getWithDefault' ];

module.exports = function transformer(file, api) {
  const j = getParser(api);

  // During replacement, we populate this array with any util methods we use from `objectMethods`
  const utilMethodsUsed = [];

  const ast = j(file.source);

  // Do replacements
  ast.find(j.CallExpression).replaceWith(({ node }) => {
    const callee = node.callee;
    if (
      callee &&
      callee.type === 'MemberExpression' &&
      callee.object &&
      callee.object.type === 'ThisExpression' &&
      callee.property &&
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
    let emberObjectImport = ast.find(j.ImportDeclaration, { source: { value: '@ember/object' } });

    utilMethodsUsed.sort();

    // Did not find ember object imported, so add it
    if (!emberObjectImport.length) {
      emberObjectImport = j.importDeclaration(
        utilMethodsUsed.map(method => j.importSpecifier(j.identifier(method))),
        j.literal('@ember/object')
      );
      j(ast.find(j.ImportDeclaration).get()).insertBefore(emberObjectImport);
    } else {
      utilMethodsUsed.forEach(method => {
        if (!emberObjectImport.find(j.ImportSpecifier, { local: { name: method } }).length) {
          emberObjectImport.get(0).node.specifiers.push(j.importSpecifier(j.identifier(method)));
        }
      });
    }
  }

  return ast.toSource();
};
