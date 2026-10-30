// A CSS file must end with exactly one newline, no trailing blank line.
//
// max-empty-lines can't do this: setting it to 0 would also remove the blank
// lines between rules. This rule only checks root.raws.after, the whitespace
// after the last node.
import stylelint from 'stylelint';

const { createPlugin, utils: { report, ruleMessages, validateOptions } } = stylelint;

const ruleName = 'local/no-eof-blank-line';
const messages = ruleMessages(ruleName, {
  rejected: 'Unexpected blank line at end of file',
});
const meta = { fixable: true };

function rule(primary) {
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, { actual: primary });
    if (!validOptions) {
      return;
    }
    if (!primary) {
      return;
    }

    const after = root.raws.after || '';
    const newlineCount = (after.match(/\n/g) || []).length;
    if (newlineCount <= 1) {
      return;
    }

    report({
      message: messages.rejected,
      node: root,
      result,
      ruleName,
      fix: () => {
        root.raws.after = '\n';
      },
    });
  };
}

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;

export default createPlugin(ruleName, rule);
