import { create } from '@storybook/theming';

export default create({
    base: 'dark',

    colorPrimary: '#7E50EC',
    colorSecondary: '#0076FF',

    // UI
    appBg: '#081421',
    appContentBg: '#0B1C30',
    // appBorderColor: 'grey',
    appBorderRadius: 4,
    //
    // Typography
    fontBase: '"Open Sans", sans-serif',
    fontCode: 'monospace',
    //
    // Text colors
    // textColor: 'black',
    // textInverseColor: 'rgba(255,255,255,0.9)',
    //
    // Toolbar default and active colors
    // barTextColor: 'silver',
    // barSelectedColor: 'black',
    barBg: '#133153',
    //
    // Form colors
    // inputBg: 'white',
    // inputBorder: 'silver',
    // inputTextColor: 'black',
    // inputBorderRadius: 4,
    //
    brandTitle: 'Tenderly',
    brandUrl: 'https://tenderly.dev',
    brandImage: 'https://storage.googleapis.com/tenderly-public-assets/tenderly-logo-white.png',
});
