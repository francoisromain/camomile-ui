module.exports = {
  // processors: ['@mapbox/stylelint-processor-arbitrary-tags'],
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
