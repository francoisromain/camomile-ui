module.exports = {
  processors: ['stylelint-processor-html'],
  extends: 'stylelint-config-standard',
  rules: {
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['typescale', 'gf', '/button-/']
      }
    ]
  },
  ignoreFiles: ['./dist/**/*']
}
