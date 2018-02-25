module.exports = {
  moduleNameMapper: {
    '^vue$': 'vue/dist/vue.runtime.min.js',
    '^.+\\.(css)$': '<rootDir>/src/__mocks__/css.js'
  },
  moduleFileExtensions: ['js', 'json', 'vue'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'jest-vue-preprocessor'
  },
  snapshotSerializers: ['jest-serializer-vue'],
  roots: ['<rootDir>/src/'],
  coverageDirectory: '<rootDir>/coverage/',
  collectCoverage: true
}
