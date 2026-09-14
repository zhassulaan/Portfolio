// Custom attribute-name ordering, replacing vue/attributes-order.
//
// eslint-plugin-vue's built-in vue/attributes-order rule can only sort by
// structural category (directive type / static vs bound) — it has no way
// to say "placeholder before value" or "href before target", since both
// pairs are literally the same category to it. This rule enforces the
// exact house priority list instead, matching by attribute/directive NAME.
//
// Tiers, in order (lower = earlier):
//   0  class / :class
//   1  id
//   2  name
//   3  v-if / v-else-if / v-else
//   4  is / :is
//   5  title / :title
//   6  ref
//   7  v-for
//   8  key / :key
//   9  type
//   10 href / :href
//   11 to / :to
//   12 target
//   13 rel
//   14 src / :src / alt
//   15 data-*
//   16 role / aria-* / tabindex
//   17 value / :value, AND the catch-all for anything unmatched below —
//      custom component props like :surface, :case_study, :doc, :project,
//      :slug, :items, :open, :close_label, kind (none of which are native
//      HTML attributes the house list covers) land here: "value" is the
//      closest fit for "the data this element/component renders".
//   18 v-text
//   19 v-html
//   20 placeholder / :placeholder
//   21 required
//   22 disabled
//   23 width / height / controls
//   24 draggable / contenteditable / loading, AND v-reveal (this
//      codebase's one custom directive — not in the house list; placed
//      here as the closest semantic fit, a scroll-triggered behavior)
//   25 style
//   26 v-model
//   27 events (v-on / @anything) — always last
//
// Ties (same tier) keep their original relative order — Array#sort is
// stable, so this never reshuffles attributes the house list didn't
// mention a relation between.

/** @param {import('vue-eslint-parser').AST.VAttribute | import('vue-eslint-parser').AST.VDirective} attr */
function effectiveName(attr) {
  if (!attr.directive) {
    return attr.key.name;
  }
  const directiveName = attr.key.name.name;
  if (directiveName === 'bind') {
    if (!attr.key.argument) {
      return null; // v-bind="obj" spread — no single name
    }
    return attr.key.argument.rawName || attr.key.argument.name || null;
  }
  if (directiveName === 'on') {
    return '@EVENT@';
  }
  return '@' + directiveName; // '@if' / '@else-if' / '@else' / '@for' / '@model' / '@text' / '@html' / '@reveal' / ...
}

function tierIndex(name) {
  if (name === 'class') {
    return 0;
  }
  if (name === 'id') {
    return 1;
  }
  if (name === 'name') {
    return 2;
  }
  if (name === '@if' || name === '@else-if' || name === '@else') {
    return 3;
  }
  if (name === 'is') {
    return 4;
  }
  if (name === 'title') {
    return 5;
  }
  if (name === 'ref') {
    return 6;
  }
  if (name === '@for') {
    return 7;
  }
  if (name === 'key') {
    return 8;
  }
  if (name === 'type') {
    return 9;
  }
  if (name === 'href') {
    return 10;
  }
  if (name === 'to') {
    return 11;
  }
  if (name === 'target') {
    return 12;
  }
  if (name === 'rel') {
    return 13;
  }
  if (name === 'src' || name === 'alt') {
    return 14;
  }
  if (name && name.startsWith('data-')) {
    return 15;
  }
  if (name === 'role' || name === 'tabindex' || (name && name.startsWith('aria-'))) {
    return 16;
  }
  if (name === '@text') {
    return 18;
  }
  if (name === '@html') {
    return 19;
  }
  if (name === 'placeholder') {
    return 20;
  }
  if (name === 'required') {
    return 21;
  }
  if (name === 'disabled') {
    return 22;
  }
  if (name === 'width' || name === 'height' || name === 'controls') {
    return 23;
  }
  if (name === 'draggable' || name === 'contenteditable' || name === 'loading' || name === '@reveal') {
    return 24;
  }
  if (name === 'style') {
    return 25;
  }
  if (name === '@model') {
    return 26;
  }
  if (name === '@EVENT@') {
    return 27;
  }
  return 17; // 'value' and every unmatched custom prop
}

/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'suggestion',
    fixable: 'code',
    schema: [],
    docs: {
      description: 'enforce the house attribute-name priority order',
    },
    messages: {
      order: 'Attributes should follow the house priority order (see eslint-rules/attr-order.mjs).',
    },
  },
  create(context) {
    const sourceCode = context.sourceCode ?? context.getSourceCode();
    // VStartTag/VAttribute etc. live in the <template> AST, which is a
    // separate tree vue-eslint-parser attaches to the Program node —
    // ESLint's normal ESTree traversal never reaches it.
    // defineTemplateBodyVisitor is the parser service vue-eslint-parser
    // provides specifically to visit that tree; a plain
    // `return { VStartTag(node) {...} }` here would silently never fire
    // (no error, but no effect either).
    if (!sourceCode.parserServices || !sourceCode.parserServices.defineTemplateBodyVisitor) {
      return {};
    }
    return sourceCode.parserServices.defineTemplateBodyVisitor({
      VStartTag(node) {
        const attrs = node.attributes;
        if (attrs.length < 2) {
          return;
        }

        const keyed = attrs.map((attr) => ({ attr, tier: tierIndex(effectiveName(attr)) }));
        let sorted = true;
        for (let i = 1; i < keyed.length; i++) {
          if (keyed[i].tier < keyed[i - 1].tier) {
            sorted = false;
            break;
          }
        }
        if (sorted) {
          return;
        }

        context.report({
          node: attrs[0],
          messageId: 'order',
          fix(fixer) {
            const ordered = keyed
              .map((k, i) => ({ ...k, i }))
              .sort((a, b) => (a.tier - b.tier) || (a.i - b.i))
              .map((k) => sourceCode.getText(k.attr));
            const start = attrs[0].range[0];
            const end = attrs[attrs.length - 1].range[1];
            return fixer.replaceTextRange([start, end], ordered.join(' '));
          },
        });
      },
    });
  },
};
