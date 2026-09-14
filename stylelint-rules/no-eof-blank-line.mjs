// Custom rule: a CSS file must end with exactly one newline, no trailing
// blank line — `...}\n` not `...}\n\n`.
//
// @stylistic/stylelint-plugin's max-empty-lines can't express this on its
// own: its `max` option governs blank-line runs everywhere in the file
// (including the deliberate single blank line this codebase keeps between
// rule blocks), and setting it to 0 to catch a trailing blank line would
// also strip every one of those in-between blank lines. This rule only
// ever looks at root.raws.after — the raw whitespace after the LAST node
// in the file — so it can enforce "no blank line at end of file" without
// touching spacing anywhere else.
import stylelint from 'stylelint';

const { createPlugin, utils: { report, ruleMessages, validateOptions } } = stylelint;

const ruleName = 'local/no-eof-blank-line';
const messages = ruleMessages(ruleName, {
  rejected: 'Unexpected blank line at end of file',
});
const meta = { fixable: true };

function rule(primary, _secondaryOptions, context) {
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, { actual: primary });
    if (!validOptions) return;
    if (!primary) return;

    const after = root.raws.after || '';
    const newlineCount = (after.match(/\n/g) || []).length;
    if (newlineCount <= 1) return;

    if (context.fix) {
      root.raws.after = '\n';
      return;
    }

    report({
      message: messages.rejected,
      node: root,
      result,
      ruleName,
    });
  };
}

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;

export default createPlugin(ruleName, rule);
