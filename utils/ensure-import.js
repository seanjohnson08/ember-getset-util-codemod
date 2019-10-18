/**
 * Ensures that an import is listed in a file if it is needed.
 *
 * @example
 * ensureImport(ast, j, ['get', 'set', 'getProperties', 'setProperties'], '@ember/object')
 *
 * @param  {Object} ast         The root of the AST
 * @param  {Object} j           A reference to jscodeshift
 * @param  {Array} importNames  All imports that should come from the module.
 * @param  {String} module      The name of the module the imports should come from.
 * @return {Void}
 */
module.exports = function ensureImport(ast, j, importNames, module) {
  let emberObjectImport = ast.find(j.ImportDeclaration, { source: { value: module } });

    // Did not find ember object imported, so add it
    if (!emberObjectImport.length) {
      emberObjectImport = j.importDeclaration(
        importNames.map(method => j.importSpecifier(j.identifier(method))),
        j.literal(module)
      );
      j(ast.find(j.ImportDeclaration).get()).insertBefore(emberObjectImport);
    } else {
      importNames.forEach(method => {
        if (!emberObjectImport.find(j.ImportSpecifier, { local: { name: method } }).length) {
          emberObjectImport.get(0).node.specifiers.push(j.importSpecifier(j.identifier(method)));
        }
      });
    }
}
