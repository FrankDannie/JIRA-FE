// this babel.config is only used in Jest (see jest.config)
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    // required preset to import jsx/tsx
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript',
  ],
  plugins: [
    function () {
      return {
        visitor: {
          MetaProperty(path) {
            path.replaceWithSourceString('process')
          },
        },
      }
    },
  ],
}
