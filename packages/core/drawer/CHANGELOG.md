# @findable/drawer

## 3.0.1
- Updated dependencies [9d5cc39394](https://github.com/fnamazing/uiKit/commits/9d5cc39394):
  - @findable/docs@7.0.1
  - @findable/analytics-next@4.0.1
  - @findable/blanket@8.0.1
  - @findable/dropdown-menu@7.0.1
  - @findable/icon@16.0.5
  - @findable/section-message@2.0.1
  - @findable/theme@8.0.1
  - @findable/button@11.0.0
  - @findable/quick-search@6.0.0

## 3.0.0
- [major] [76299208e6](https://github.com/fnamazing/uiKit/commits/76299208e6):

  - Drop ES5 from all the flow modules

  ### Dropping CJS support in all @atlaskit packages

  As a breaking change, all @atlaskit packages will be dropping cjs distributions and will only distribute esm. This means all distributed code will be transpiled, but will still contain `import` and
  `export` declarations.

  The major reason for doing this is to allow us to support multiple entry points in packages, e.g:

  ```js
  import colors from `@findable/theme/colors`;
  ```

  Previously this was sort of possible for consumers by doing something like:

  ```js
  import colors from `@findable/theme/dist/esm/colors`;
  ```

  This has a couple of issues. 1, it treats the file system as API making internal refactors harder, we have to worry about how consumers might be using things that aren't *actually* supposed to be used. 2. We are unable to do this *internally* in @atlaskit packages. This leads to lots of packages bundling all of theme, just to use a single color, especially in situations where tree shaking fails.

  To support being able to use multiple entrypoints internally, we unfortunately cannot have multiple distributions as they would need to have very different imports from of their own internal dependencies.

  ES Modules are widely supported by all modern bundlers and can be worked around in node environments.

  We may choose to revisit this solution in the future if we find any unintended condequences, but we see this as a pretty sane path forward which should lead to some major bundle size decreases, saner API's and simpler package architecture.

  Please reach out to #fabric-build (if in Atlassian) or create an issue in [Design System Support](https://ecosystem.atlassian.net/secure/CreateIssue.jspa?pid=24670) (for external) if you have any questions or queries about this.

## 2.7.1
- Updated dependencies [d7ef59d432](https://github.com/fnamazing/uiKit/commits/d7ef59d432):
  - @findable/docs@6.0.1
  - @findable/button@10.1.2
  - @findable/dropdown-menu@6.1.26
  - @findable/item@8.0.15
  - @findable/section-message@1.0.16
  - @findable/quick-search@5.2.5
  - @findable/icon@16.0.0

## 2.7.0
- [minor] [9cfee26](https://github.com/fnamazing/uiKit/commits/9cfee26):

  - Add data-test-selector to various components to help open and close the Notification Drawer programmatically. This would support test automation

## 2.6.1
- Updated dependencies [58b84fa](https://github.com/fnamazing/uiKit/commits/58b84fa):
  - @findable/analytics-next@3.1.2
  - @findable/blanket@7.0.12
  - @findable/button@10.1.1
  - @findable/dropdown-menu@6.1.25
  - @findable/icon@15.0.2
  - @findable/item@8.0.14
  - @findable/section-message@1.0.14
  - @findable/theme@7.0.1
  - @findable/quick-search@5.2.4
  - @findable/docs@6.0.0

## 2.6.0
- [minor] [53bf8be](https://github.com/fnamazing/uiKit/commits/53bf8be):

  - Support onCloseComplete

## 2.5.4
- Updated dependencies [d13242d](https://github.com/fnamazing/uiKit/commits/d13242d):
  - @findable/docs@5.2.3
  - @findable/blanket@7.0.11
  - @findable/button@10.0.4
  - @findable/dropdown-menu@6.1.24
  - @findable/icon@15.0.1
  - @findable/item@8.0.13
  - @findable/section-message@1.0.13
  - @findable/quick-search@5.2.1
  - @findable/theme@7.0.0

## 2.5.3
- Updated dependencies [ab9b69c](https://github.com/fnamazing/uiKit/commits/ab9b69c):
  - @findable/docs@5.2.2
  - @findable/button@10.0.1
  - @findable/dropdown-menu@6.1.23
  - @findable/section-message@1.0.12
  - @findable/icon@15.0.0

## 2.5.2
- Updated dependencies [6998f11](https://github.com/fnamazing/uiKit/commits/6998f11):
  - @findable/docs@5.2.1
  - @findable/analytics-next@3.1.1
  - @findable/blanket@7.0.10
  - @findable/dropdown-menu@6.1.22
  - @findable/icon@14.6.1
  - @findable/section-message@1.0.11
  - @findable/theme@6.2.1
  - @findable/button@10.0.0

## 2.5.1
- [patch] [f480bab](https://github.com/fnamazing/uiKit/commits/f480bab):

  - Convert padding to margin to fix a scrolling issue in global-search

## 2.5.0
- [minor] [aacb208](https://github.com/fnamazing/uiKit/commits/aacb208):

  - Export a new component, DrawerItemTheme, for theming the Drawer with the navigation item theme.

## 2.4.0
- [minor] [6746a42](https://github.com/fnamazing/uiKit/commits/6746a42):

  - Add extended width option and width transitions

## 2.3.1
- [patch] [a6e5197](https://github.com/fnamazing/uiKit/commits/a6e5197):

  - 1) Add canUseDOM to fix SSR issue in Drawer. 2) Update SSR tests in navigation-next to exclude the examples with Hash, Router or Dom

## 2.3.0
- [patch] [a637f5e](https://github.com/fnamazing/uiKit/commits/a637f5e):

  - Refine and fix some flow type errors found by fixing @findable/analytics-next HOCs to allow flow to type check properly

- [minor] [670597d](https://github.com/fnamazing/uiKit/commits/670597d):

  - Make `width` prop optional and default it to 'narrow'

## 2.2.0
- [minor] [90f4995](https://github.com/fnamazing/uiKit/commits/90f4995):

  Update drawer width with 'medium' width

## 2.1.3
- [patch] Adds missing implicit @babel/runtime dependency [b71751b](https://github.com/fnamazing/uiKit/commits/b71751b)

## 2.1.2
- [patch] Fix fixed-positioned drawer contents from being positioned incorrectly caused by the drawer creating a new stacking context with the transform css property. This was most notable when rendering dropdown-menus inside the drawer. [c80813c](https://github.com/fnamazing/uiKit/commits/c80813c)

## 2.1.1
- [patch] Updated dependencies [65c6514](https://github.com/fnamazing/uiKit/commits/65c6514)
  - @findable/docs@5.0.8
  - @findable/button@9.0.13
  - @findable/section-message@1.0.8
  - @findable/icon@14.0.0

## 2.1.0
- [minor] Exposes a new prop shouldUnmountOnExit in @findable/drawer which let's the consumer decide if the contents of the drawer should be retained on unmount. Exposes 4 new props, one for each drawer to let the product decide if the contents of the drawer should be retained on drawerClose [2988998](https://github.com/fnamazing/uiKit/commits/2988998)

## 2.0.1
- [patch] Adds sideEffects: false to allow proper tree shaking [b5d6d04](https://github.com/fnamazing/uiKit/commits/b5d6d04)

## 2.0.0
- [major] Provides analytics for common component interactions. See the [Instrumented Components](https://atlaskit.atlassian.com/packages/core/analytics-next) section for more details. If you are using enzyme for testing you will have to use [our forked version of the library](https://atlaskit.atlassian.com/docs/guides/testing#we-use-a-forked-version-of-enzyme). [501378a](https://github.com/fnamazing/uiKit/commits/501378a)
- [patch] Fix onClose/onKeyDown being called when pressing the esc key while the drawer is closed [a675f7b](https://github.com/fnamazing/uiKit/commits/a675f7b)

## 1.0.6
- [patch] Updated dependencies [df22ad8](https://github.com/fnamazing/uiKit/commits/df22ad8)
  - @findable/theme@6.0.0
  - @findable/section-message@1.0.5
  - @findable/icon@13.2.5
  - @findable/button@9.0.6
  - @findable/blanket@7.0.5
  - @findable/docs@5.0.6

## 1.0.5
- [patch] Add variable name displayNames for anonymous function SFC components to improve debugging experience [50d469f](https://github.com/fnamazing/uiKit/commits/50d469f)

## 1.0.4
- [patch] Fix: fade issue with z-index elements [626244b](https://github.com/fnamazing/uiKit/commits/626244b)

## 1.0.3
- [patch] update the dependency of react-dom to 16.4.2 due to vulnerability in previous versions read https://reactjs.org/blog/2018/08/01/react-v-16-4-2.html for details [a4bd557](https://github.com/fnamazing/uiKit/commits/a4bd557)
- [none] Updated dependencies [a4bd557](https://github.com/fnamazing/uiKit/commits/a4bd557)
  - @findable/button@9.0.5
  - @findable/theme@5.1.3
  - @findable/section-message@1.0.4
  - @findable/blanket@7.0.4
  - @findable/icon@13.2.4

## 1.0.2
- [patch] Fixes overflow issue in drawers with long and wide contents [6438477](https://github.com/fnamazing/uiKit/commits/6438477)

## 1.0.1
- [patch] Updated dependencies [acd86a1](https://github.com/fnamazing/uiKit/commits/acd86a1)
  - @findable/icon@13.2.2
  - @findable/button@9.0.4
  - @findable/theme@5.1.2
  - @findable/blanket@7.0.3
  - @findable/docs@5.0.2

## 1.0.0

- [major] Updates to React ^16.4.0 [7edb866](https://github.com/fnamazing/uiKit/commits/7edb866)
- [major] Updated dependencies [563a7eb](https://github.com/fnamazing/uiKit/commits/563a7eb)
  - @findable/button@9.0.0
  - @findable/theme@5.0.0
  - @findable/docs@5.0.0
  - @findable/blanket@7.0.0
  - @findable/icon@13.0.0
- [major] Updated dependencies [7edb866](https://github.com/fnamazing/uiKit/commits/7edb866)
  - @findable/button@9.0.0
  - @findable/theme@5.0.0
  - @findable/docs@5.0.0
  - @findable/blanket@7.0.0
  - @findable/icon@13.0.0

## 0.1.1
- [patch] Button should be a dev dependency [50ca31b](https://github.com/fnamazing/uiKit/commits/50ca31b)
- [none] Updated dependencies [50ca31b](https://github.com/fnamazing/uiKit/commits/50ca31b)

## 0.1.0
- [minor] Extract standalone Drawer component. Remove drawer state from navigation state manager navigation-next. Stop exporting Drawer component in global-navigation [d11307b](https://github.com/fnamazing/uiKit/commits/d11307b)
