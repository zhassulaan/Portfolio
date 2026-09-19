// Conventional Commits, enforced on every commit via .husky/commit-msg.
// Keeps the public commit log ("upd", "f", ".", "debug") from being part
// of what a reviewer judges the project by.
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Blocks one-word/no-context messages like "upd" or "fix" alone.
    'subject-min-length': [2, 'always', 10],
    'body-max-line-length': [0, 'always'],
  },
};
