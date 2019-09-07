export const override = webpackConfig => {
  webpackConfig.module.rules.push({
    include: /node_modules/,
    test: /\.mjs$/,
    type: 'javascript/auto',
  });

  return webpackConfig;
};
