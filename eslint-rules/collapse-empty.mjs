// Custom rule: elements with fewer than 3 attributes and no inner content
// (no real children — v-text/v-html count as content-free since they add
// no template child node) must sit entirely on one line: attributes joined
// by a single space, no space before the closing bracket, and the closing
// tag glued directly onto it with nothing in between.
//
//   <option v-for='kind in kinds'
//     :key="kind">
//   </option>
//
// is wrong; the house rule is:
//
//   <option v-for='kind in kinds' :key="kind"></option>
//
// vue/max-attributes-per-line and vue/multiline-html-element-content-newline
// only ever SPLIT a line that has too many attributes or too much content —
// neither has a way to merge lines that are already "valid" under a looser
// per-line cap back down to one line. So formatting like the first example
// above can happen (a stray manual edit, a half-applied autofix, a rebase)
// and no existing rule will ever flag or fix it. This rule closes that gap
// for the specific case established as house style: short (<3 attribute)
// empty elements always collapse fully.
//
// Elements with 3+ attributes, or with real inner content, are left alone —
// those are governed by vue/max-attributes-per-line,
// vue/first-attribute-linebreak, and vue/multiline-html-element-content-newline
// instead.

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
