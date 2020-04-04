module.exports = api => {
  api.cache(true);

  console.log(
    '[Babel] using babel.config.js in apps/server-node; NODE_ENV: ',
    process.env.NODE_ENV
  );

  const presets = [
    [
      '@babel/preset-env',
      {
        debug: false,
        targets: { node: 'current' },
        modules: 'commonjs',
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
