# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

Feb 18

- MUI
- Adding font with MUI and get know about font source https://fontsource.org/fonts/rubik/install
  - https://blog.logrocket.com/add-custom-fonts-mui/
  - https://surajsharma.net/blog/react-material-ui-custom-font
  - search for allVairants: https://stackoverflow.com/questions/48319372/changing-font-family-of-all-material-ui-components
  - adding custom Palette https://stackoverflow.com/questions/50069724/how-to-add-custom-material-ui-palette-colors
- COOL override example https://mui.com/material-ui/react-grid/

Feb 20

- Learned how to add custom SVF to MUI using SvgIconm
- Figuring how to use SVGR on vite
  - https://stackoverflow.com/questions/38510443/how-to-use-an-svg-file-in-a-svgicon-in-material-ui
  - https://www.npmjs.com/package/vite-plugin-svgr
  - https://stackoverflow.com/questions/74720726/type-definition-for-vite-plugin-svgr
- IconSVG not centered
  - https://stackoverflow.com/questions/64327446/how-to-center-align-a-custom-svg-icon-in-a-material-ui-iconbutton
- SVG viewbox
  - https://www.youtube.com/watch?v=6LCUStriM_o
- Went a ahead and use button and icon combo

Feb 22

- Make MUI bold https://surajsharma.net/blog/react-material-ui-typography-bold

- Methods (https://www.youtube.com/watch?v=HsdjivqQ7BA)

  - #1 component props
  - #2 using `sx` prop
  - #3 using styled function (if you fin using sx to messy)
  - #4 CSS function of EmotionUI css={css`background-color: red`}
    - you need to add extra rule sto remove linting errors
  - #5 Normal CSS
  - #6 CSS modules (to co locate CSS e.g., page.module.css)
  - #7 Theme (suggested way!)

  Feb 23

  - MUI grid template name
    - https://mui.com/system/grid/

  # Feb 24

  - learned some about vite program
    - https://vitejs.dev/guide/assets

Mar 4

- Added replies and refactored code for rendering comments or replies

mar 6

- Comment Reply function
- Used toolkit's nanoid to generate random id

Mar 16

- learned about using defaultValue prop when using uncontrolled form
