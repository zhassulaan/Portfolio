// Conventional Commits, enforced by .husky/commit-msg.
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Blocks one-word/no-context messages like "upd" or "fix" alone.
    'subject-min-length': [2, 'always', 10],
    'body-max-line-length': [0, 'always'],
  },
};
