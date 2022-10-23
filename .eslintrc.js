module.exports = {
  extends: ['next', 'prettier'],
  rules: {
    '@next/next/no-img-element': 0,
    // error when using
    //Cannot read property 'expression' of undefined
    'jsx-a11y/alt-text': 0,
    'jsx-a11y/role-supports-aria-props': 0,
  },
}
