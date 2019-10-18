const { getParser } = require('codemod-cli').jscodeshift;
const ensureImport = require('../../utils/ensure-import');

function invertCallExpression(j, root, name) {
  const calls = root.find(j.CallExpression, {
    callee: {
      property: {
        name,
      },
    },
  });

  if (calls.size() > 0) {
    calls.forEach(path => {
      const { object } = path.node.callee;
      path.replace(j.callExpression(j.identifier(name), [object, ...path.node.arguments]));
    });
    return true;
  }

  return false;
}

module.exports = function transformer(file, api) {
  const j = getParser(api);
  const root = j(file.source);
  const callPropertyNames = ['get', 'set', 'setProperties', 'getProperties', 'getWithDefault'];
  const needsEnsuredImports = callPropertyNames.filter(name => invertCallExpression(j, root, name));
  ensureImport(root, j, needsEnsuredImports, '@ember/object');
  return root.toSource({ quote: 'single' });
};
