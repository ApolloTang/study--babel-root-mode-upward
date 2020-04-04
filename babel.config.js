const isTest = String(process.env.NODE_ENV) === 'test';
const isProd = String(process.env.NODE_ENV) === 'production';

module.exports = api => {
  api.cache(true);

  console.log(
    '[Babel] using babel.config.js in root; NODE_ENV: ',
    process.env.NODE_ENV
  );

  const presets = [
    [
      '@babel/preset-env',
      {
        debug: false,
        targets: { ie: '11' },
        useBuiltIns: 'usage',
        modules: isTest ? 'commonjs' : false,
      },
    ]
  ];

  const plugins = [
  ].filter(Boolean);

  return {
    presets,
    plugins,
  };
};
