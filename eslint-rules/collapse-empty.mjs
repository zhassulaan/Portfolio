// Elements with fewer than 3 attributes and no content go on one line:
//
//   <option v-for='kind in kinds' :key="kind"></option>
//
// (v-text and v-html count as no content.) The built-in vue rules only split
// long lines and never merge short ones. Elements with 3+ attributes or real
// content are left to vue/max-attributes-per-line and the other built-in rules.

function isEmptyContent(children) {
  return children.every((child) => child.type === 'VText' && /^\s*$/.test(child.value));
}

function findViolations(source, node) {
  const startTag = node.startTag;
  const attrs = startTag.attributes;
  const fixes = [];

  for (let i = 1; i < attrs.length; i++) {
    const start = attrs[i - 1].range[1];
    const end = attrs[i].range[0];
    if (source.slice(start, end) !== ' ') {
      fixes.push([start, end, ' ']);
    }
  }

  if (attrs.length > 0) {
    const lastAttr = attrs[attrs.length - 1];
    const bracketStart = startTag.range[1] - (startTag.selfClosing ? 2 : 1);
    const expected = startTag.selfClosing ? ' ' : '';
    if (source.slice(lastAttr.range[1], bracketStart) !== expected) {
      fixes.push([lastAttr.range[1], bracketStart, expected]);
    }
  }

  if (!startTag.selfClosing && node.endTag) {
    const start = startTag.range[1];
    const end = node.endTag.range[0];
    if (source.slice(start, end) !== '') {
      fixes.push([start, end, '']);
    }
  }

  return fixes;
}

/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'suggestion',
    fixable: 'code',
    schema: [],
    docs: {
      description: 'collapse empty elements with fewer than 3 attributes onto one line',
    },
    messages: {
      collapse: 'Elements with fewer than 3 attributes and no inner content must be on one line, closing tag included.',
    },
  },
  create(context) {
    const sourceCode = context.sourceCode ?? context.getSourceCode();
    if (!sourceCode.parserServices || !sourceCode.parserServices.defineTemplateBodyVisitor) {
      return {};
    }
    const source = sourceCode.getText();
    return sourceCode.parserServices.defineTemplateBodyVisitor({
      VElement(node) {
        const attrs = node.startTag.attributes;
        if (attrs.length >= 3) {
          return;
        }
        if (!isEmptyContent(node.children)) {
          return;
        }

        const fixes = findViolations(source, node);
        if (fixes.length === 0) {
          return;
        }

        context.report({
          node: node.startTag,
          messageId: 'collapse',
          fix(fixer) {
            return fixes.map(([start, end, replacement]) => fixer.replaceTextRange([start, end], replacement));
          },
        });
      },
    });
  },
};
