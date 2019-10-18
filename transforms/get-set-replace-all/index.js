const { getParser } = require('codemod-cli').jscodeshift;
const { ensureImport } = require('../../utils/imports');

function invertCallExpression(j, root, name) {
  const calls = root.find(j.CallExpression, {
    callee: {
      property: {
        name,
      },
    },
  });

  if (calls.size() > 0) {
    ensureImport(j, root, name, '@ember/object');
    calls.forEach(path => {
      const { object } = path.node.callee;
      path.replace(j.callExpression(j.identifier(name), [object, ...path.node.arguments]));
    });
  }
}

module.exports = function transformer(file, api) {
  const j = getParser(api);
  const root = j(file.source);
  invertCallExpression(j, root, 'get');
  invertCallExpression(j, root, 'set');
  invertCallExpression(j, root, 'setProperties');
  invertCallExpression(j, root, 'getProperties');
  invertCallExpression(j, root, 'getWithDefault');
  return root.toSource({ quote: 'single' });
};
