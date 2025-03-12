/** @type { import('@storybook/nextjs').StorybookConfig } */

const config = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@chromatic-com/storybook',
    '@storybook/experimental-addon-test'
  ],
  framework: {
    name: '@storybook/experimental-nextjs-vite',
    options: {}
  },
  staticDirs: ['../public'],
  docs: {
    autodocs: 'tag'
  },
  async viteFinal(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@easeful/components': '../../packages/components'
    };
    return config;
  }
}


export default config;
