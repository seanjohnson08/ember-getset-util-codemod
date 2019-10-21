function ensureImport(j, root, name, source, local) {
  const declaration = root.find(j.ImportDeclaration, {
    source: { value: source },
  });
  const specifer = j.importSpecifier(j.identifier(name), local ? j.identifier(local) : null);
  if (declaration.size()) {
    if (!declaration.find(j.ImportSpecifier, { imported: { name } }).size()) {
      declaration.get('specifiers').push(specifer);
    }
  } else {
    const newImport = j.importDeclaration([specifer], j.literal(source));
    root
      .get('program')
      .get('body')
      .insertAt(0, newImport);
  }
}

module.exports = { ensureImport };
