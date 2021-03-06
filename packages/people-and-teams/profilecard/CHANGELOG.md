# @findable/profilecard

## 8.0.2
- Updated dependencies [9d5cc39394](https://github.com/fnamazing/uiKit/commits/9d5cc39394):
  - @findable/docs@7.0.1
  - @findable/avatar@15.0.1
  - @findable/dynamic-table@11.0.1
  - @findable/icon@16.0.5
  - @findable/spinner@10.0.1
  - @findable/theme@8.0.1
  - @findable/i18n-tools@0.5.0
  - @findable/button@11.0.0
  - @findable/util-data-test@11.0.0

## 8.0.1
- [patch] [9a0c34d490](https://github.com/fnamazing/uiKit/commits/9a0c34d490):

  - Fixes package.json to not exclude built files

## 8.0.0
- [major] [dbff4fdcf9](https://github.com/fnamazing/uiKit/commits/dbff4fdcf9):

  - Remove presence from profilecard now that users cannot use Stride to control it

## 7.0.0
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

## 6.2.0
- [minor] [e0e5dd69a7](https://github.com/fnamazing/uiKit/commits/e0e5dd69a7):

  - Support 2 new props "hasStatusLozengeForDisabledAccount" and "customMessageForDisabledAccount"

## 6.1.5
- Updated dependencies [d7ef59d432](https://github.com/fnamazing/uiKit/commits/d7ef59d432):
  - @findable/docs@6.0.1
  - @findable/avatar@14.1.8
  - @findable/button@10.1.2
  - @findable/icon@16.0.0

## 6.1.4
- [patch] [ba95c0e](https://github.com/fnamazing/uiKit/commits/ba95c0e):

  - Remove typescript type InjectedIntlProps from flow js code

## 6.1.3
- [patch] [3ef5292](https://github.com/fnamazing/uiKit/commits/3ef5292):

  - Include type definitions in npm package

## 6.1.2
- Updated dependencies [58b84fa](https://github.com/fnamazing/uiKit/commits/58b84fa):
  - @findable/avatar@14.1.7
  - @findable/button@10.1.1
  - @findable/dynamic-table@10.0.22
  - @findable/icon@15.0.2
  - @findable/layer@5.0.10
  - @findable/lozenge@6.2.4
  - @findable/spinner@9.0.13
  - @findable/theme@7.0.1
  - @findable/util-data-test@10.0.25
  - @findable/docs@6.0.0

## 6.1.1
- Updated dependencies [d13242d](https://github.com/fnamazing/uiKit/commits/d13242d):
  - @findable/docs@5.2.3
  - @findable/button@10.0.4
  - @findable/dynamic-table@10.0.20
  - @findable/icon@15.0.1
  - @findable/spinner@9.0.12
  - @findable/theme@7.0.0
  - @findable/avatar@14.1.6
  - @findable/lozenge@6.2.3

## 6.1.0
- [minor] [a2da489](https://github.com/fnamazing/uiKit/commits/a2da489):

  - - wrap profile card in IntlProvider and support i18n

## 6.0.3
- Updated dependencies [ab9b69c](https://github.com/fnamazing/uiKit/commits/ab9b69c):
  - @findable/docs@5.2.2
  - @findable/avatar@14.1.5
  - @findable/button@10.0.1
  - @findable/icon@15.0.0

## 6.0.2
- Updated dependencies [6998f11](https://github.com/fnamazing/uiKit/commits/6998f11):
  - @findable/docs@5.2.1
  - @findable/avatar@14.1.4
  - @findable/dynamic-table@10.0.18
  - @findable/icon@14.6.1
  - @findable/spinner@9.0.11
  - @findable/theme@6.2.1
  - @findable/button@10.0.0

## 6.0.1
- [patch] [9d63842](https://github.com/fnamazing/uiKit/commits/9d63842):

  - Fixed a bug where content is not rendered for cards of users whose accounts are closed

## 6.0.0
- [major] [9c0844d](https://github.com/fnamazing/uiKit/commits/9c0844d):

  - Replace "isActive" prop with new "status" prop and adding react-intl messages

## 5.0.0
- [major] [a6dd6e3](https://github.com/fnamazing/uiKit/commits/a6dd6e3):

  - Removed isCensored prop as this state no longer exists

## 4.0.10
- [patch] Updated dependencies [65c6514](https://github.com/fnamazing/uiKit/commits/65c6514)
  - @findable/docs@5.0.8
  - @findable/avatar@14.0.11
  - @findable/button@9.0.13
  - @findable/icon@14.0.0

## 4.0.9
- [patch] Remove promise polyfill to fix Jira SSR [e793f6e](https://github.com/fnamazing/uiKit/commits/e793f6e)

## 4.0.8
- [patch] Updated dependencies [b12f7e6](https://github.com/fnamazing/uiKit/commits/b12f7e6)
  - @findable/util-data-test@10.0.7

## 4.0.7
- [patch] Updated dependencies [df22ad8](https://github.com/fnamazing/uiKit/commits/df22ad8)
  - @findable/theme@6.0.0
  - @findable/spinner@9.0.6
  - @findable/icon@13.2.5
  - @findable/dynamic-table@10.0.9
  - @findable/button@9.0.6
  - @findable/avatar@14.0.8
  - @findable/docs@5.0.6

## 4.0.6
- [patch] Updated dependencies [8242529](https://github.com/fnamazing/uiKit/commits/8242529)
  - @findable/layer@5.0.5

## 4.0.5
- [patch] use size prop small when using icon component [27e074e](https://github.com/fnamazing/uiKit/commits/27e074e)
- [none] Updated dependencies [27e074e](https://github.com/fnamazing/uiKit/commits/27e074e)

## 4.0.4
- [patch] update the dependency of react-dom to 16.4.2 due to vulnerability in previous versions read https://reactjs.org/blog/2018/08/01/react-v-16-4-2.html for details [a4bd557](https://github.com/fnamazing/uiKit/commits/a4bd557)
- [none] Updated dependencies [a4bd557](https://github.com/fnamazing/uiKit/commits/a4bd557)
  - @findable/util-data-test@10.0.4
  - @findable/dynamic-table@10.0.7
  - @findable/button@9.0.5
  - @findable/theme@5.1.3
  - @findable/spinner@9.0.5
  - @findable/layer@5.0.4
  - @findable/icon@13.2.4
  - @findable/avatar@14.0.6

## 4.0.3
- [patch] Bumping dependency on util-data-test [597e0bd](https://github.com/fnamazing/uiKit/commits/597e0bd)




- [none] Updated dependencies [597e0bd](https://github.com/fnamazing/uiKit/commits/597e0bd)
  - @findable/util-data-test@10.0.3
- [none] Updated dependencies [61df453](https://github.com/fnamazing/uiKit/commits/61df453)
  - @findable/util-data-test@10.0.3
- [none] Updated dependencies [812a39c](https://github.com/fnamazing/uiKit/commits/812a39c)
  - @findable/dynamic-table@10.0.6
  - @findable/util-data-test@10.0.3
- [none] Updated dependencies [c8eb097](https://github.com/fnamazing/uiKit/commits/c8eb097)
  - @findable/util-data-test@10.0.3
- [none] Updated dependencies [d02746f](https://github.com/fnamazing/uiKit/commits/d02746f)
  - @findable/util-data-test@10.0.3

## 4.0.2
- [patch] Updated dependencies [acd86a1](https://github.com/fnamazing/uiKit/commits/acd86a1)
  - @findable/util-data-test@10.0.2
  - @findable/icon@13.2.2
  - @findable/dynamic-table@10.0.5
  - @findable/button@9.0.4
  - @findable/theme@5.1.2
  - @findable/spinner@9.0.4
  - @findable/docs@5.0.2
  - @findable/layer@5.0.3
  - @findable/avatar@14.0.5

## 4.0.1
- [patch] Remove $FlowFixMe, move styled-components to peerDependencies and move tests under src and a unit folder [36b595c](https://github.com/fnamazing/uiKit/commits/36b595c)
- [none] Updated dependencies [36b595c](https://github.com/fnamazing/uiKit/commits/36b595c)

## 4.0.0

- [major] Updates to React ^16.4.0 [7edb866](https://github.com/fnamazing/uiKit/commits/7edb866)
- [major] Updated dependencies [563a7eb](https://github.com/fnamazing/uiKit/commits/563a7eb)
  - @findable/util-data-test@10.0.0
  - @findable/dynamic-table@10.0.0
  - @findable/button@9.0.0
  - @findable/theme@5.0.0
  - @findable/spinner@9.0.0
  - @findable/docs@5.0.0
  - @findable/layer@5.0.0
  - @findable/icon@13.0.0
  - @findable/avatar@14.0.0
- [major] Updated dependencies [7edb866](https://github.com/fnamazing/uiKit/commits/7edb866)
  - @findable/util-data-test@10.0.0
  - @findable/dynamic-table@10.0.0
  - @findable/button@9.0.0
  - @findable/theme@5.0.0
  - @findable/spinner@9.0.0
  - @findable/docs@5.0.0
  - @findable/layer@5.0.0
  - @findable/icon@13.0.0
  - @findable/avatar@14.0.0

## 3.13.4


- [none] Updated dependencies [da63331](https://github.com/fnamazing/uiKit/commits/da63331)
  - @findable/button@8.2.5
  - @findable/dynamic-table@9.2.6
  - @findable/avatar@13.0.0
- [patch] Updated dependencies [7724115](https://github.com/fnamazing/uiKit/commits/7724115)
  - @findable/avatar@13.0.0
  - @findable/button@8.2.5
  - @findable/dynamic-table@9.2.6

## 3.13.3
- [patch] Fix flow config and add back flow fix me [107da09](https://github.com/fnamazing/uiKit/commits/107da09)
- [none] Updated dependencies [107da09](https://github.com/fnamazing/uiKit/commits/107da09)

## 3.13.2
- [patch] Update package.json to point to correct build directories [2362f0b](https://github.com/fnamazing/uiKit/commits/2362f0b)
- [none] Updated dependencies [2362f0b](https://github.com/fnamazing/uiKit/commits/2362f0b)

## 3.13.1

- [patch] Migrate Profilecard to AKM2 DIR-553 [9bac948](https://github.com/fnamazing/uiKit/commits/9bac948)
- [none] Updated dependencies [99446e3](https://github.com/fnamazing/uiKit/commits/99446e3)
  - @findable/docs@4.2.2
- [none] Updated dependencies [9bac948](https://github.com/fnamazing/uiKit/commits/9bac948)
  - @findable/docs@4.2.2

## 3.12.3 (2017-12-13)

* bug fix; cap profilecard cache age at 30 days ([6e112c0](https://bitbucket.org/atlassian/atlaskit/commits/6e112c0))
## 3.12.2 (2017-12-06)

* bug fix; add max-width to profilecard trigger to allow CSS truncation of children (issues closed: ak-3989) ([ad721a1](https://bitbucket.org/atlassian/atlaskit/commits/ad721a1))
## 3.12.1 (2017-11-27)

* bug fix; fix profilecard error when user has null presenceMessage ([b250e2b](https://bitbucket.org/atlassian/atlaskit/commits/b250e2b))

## 3.12.0 (2017-11-20)

* feature; add presence message to profilecard (issues closed: dir-459) ([a927c12](https://bitbucket.org/atlassian/atlaskit/commits/a927c12))
## 3.11.0 (2017-11-17)

* feature; add support for focus state to profilecard (issues closed: dir-453) ([51185f4](https://bitbucket.org/atlassian/atlaskit/commits/51185f4))
## 3.10.0 (2017-11-01)

* bug fix; fix profilecard graphql api client (issues closed: dir-444) ([8adce3a](https://bitbucket.org/atlassian/atlaskit/commits/8adce3a))
* feature; add card states for deactivated and app users (issues closed: dir-436) ([0343cb6](https://bitbucket.org/atlassian/atlaskit/commits/0343cb6))
## 3.9.0 (2017-10-27)


* feature; add new profile data keys to graphql query ([44d81d4](https://bitbucket.org/atlassian/atlaskit/commits/44d81d4))

* feature; add predicate method to profile card actions (issues closed: dir-423) ([2737016](https://bitbucket.org/atlassian/atlaskit/commits/2737016))
## 3.8.1 (2017-10-22)

* bug fix; update styled-components dep and react peerDep ([6a67bf8](https://bitbucket.org/atlassian/atlaskit/commits/6a67bf8))
## 3.8.0 (2017-10-16)

* feature; add new detail label for a users email to the profilecard (issues closed: dir-324) ([84f12aa](https://bitbucket.org/atlassian/atlaskit/commits/84f12aa))
## 3.7.4 (2017-10-12)

* bug fix; fix dark mode colors for profilecard (issues closed: dir-413) ([27a6981](https://bitbucket.org/atlassian/atlaskit/commits/27a6981))

* bug fix; fix unit tests for profilecard (issues closed: dir-407) ([9a488fe](https://bitbucket.org/atlassian/atlaskit/commits/9a488fe))
* bug fix; refactor profilecard to styled components (issues closed: dir-407) ([2a0a834](https://bitbucket.org/atlassian/atlaskit/commits/2a0a834))
## 3.7.3 (2017-10-10)


* bug fix; align default status messages of profilecard with Stride (issues closed: dir-414) ([4d65674](https://bitbucket.org/atlassian/atlaskit/commits/4d65674))
* bug fix; bump dependeny versions for profilecard to latest (issues closed: dir-408) ([839922d](https://bitbucket.org/atlassian/atlaskit/commits/839922d))
## 3.7.2 (2017-09-20)

* bug fix; fix non array value of \`oneOf\` proptype in profilecard.jsx ([39131f7](https://bitbucket.org/atlassian/atlaskit/commits/39131f7))
## 3.7.1 (2017-09-08)

* bug fix; limit profilecards error types to the two available from the api (issues closed: dir-376) ([b9b8532](https://bitbucket.org/atlassian/atlaskit/commits/b9b8532))

## 3.7.0 (2017-08-14)


* feature; add not-found error state to profilecard (issues closed: dir-340) ([8021368](https://bitbucket.org/atlassian/atlaskit/commits/8021368))


## 3.6.4 (2017-08-09)

* bug fix; make profilecard type def also available through lerna link (issues closed: ed-2435) ([fb15d63](https://bitbucket.org/atlassian/atlaskit/commits/fb15d63))


* bug fix; Merged in fix/ED-2266-profile-card (pull request #3650) (issues closed: ed-2266) ([2a5b88e](https://bitbucket.org/atlassian/atlaskit/commits/2a5b88e))




## 3.6.3 (2017-07-27)


* fix; rename jsnext:main to jsnext:experimental:main temporarily ([c7508e0](https://bitbucket.org/atlassian/atlaskit/commits/c7508e0))

## 3.6.2 (2017-07-25)


* fix; use class transform in loose mode in babel to improve load performance in apps ([fde719a](https://bitbucket.org/atlassian/atlaskit/commits/fde719a))

## 3.6.1 (2017-07-20)


* fix; use \`title\` instead of \`position\` from directory data for job title ([3d0864b](https://bitbucket.org/atlassian/atlaskit/commits/3d0864b))

## 3.6.0 (2017-07-18)

## 3.2.0 (2017-07-17)

## 3.2.0 (2017-07-17)


* feature; fix analytics event names for profilecard ([2225d04](https://bitbucket.org/atlassian/atlaskit/commits/2225d04))

## 3.2.0 (2017-07-17)


* fix; rerelease, failed prepublish scripts ([5fd82f8](https://bitbucket.org/atlassian/atlaskit/commits/5fd82f8))

## 3.2.0 (2017-07-17)


* feature; added ES module builds to dist and add jsnext:main to most ADG packages ([ea76507](https://bitbucket.org/atlassian/atlaskit/commits/ea76507))

## 3.1.0 (2017-07-17)


* feature; add trigger property to AkProfilecardTrigger (possible values: click, hover (defaul ([6f7b508](https://bitbucket.org/atlassian/atlaskit/commits/6f7b508))

## 3.0.2 (2017-07-12)


* fix; export modifyResponse for util-data-test ([67d5784](https://bitbucket.org/atlassian/atlaskit/commits/67d5784))
* fix; add prop-types as a dependency to avoid React 15.x warnings ([92598eb](https://bitbucket.org/atlassian/atlaskit/commits/92598eb))

## 3.0.1 (2017-05-12)


* fix; fix profilecard caching issue ([53223a1](https://bitbucket.org/atlassian/atlaskit/commits/53223a1))
* fix; add required cloudId props to stories ([5aa1e8a](https://bitbucket.org/atlassian/atlaskit/commits/5aa1e8a))

## 3.0.0 (2017-05-10)

## 2.4.0 (2017-05-09)


* fix; fix profilecards retry button to only show up when retry method is passed ([4c67a6d](https://bitbucket.org/atlassian/atlaskit/commits/4c67a6d))


* feature; stop render empty layer while profilecard is not visible anyway ([8d56ab3](https://bitbucket.org/atlassian/atlaskit/commits/8d56ab3))
* feature; use new GraphQL query in profilecard-client ([66b846d](https://bitbucket.org/atlassian/atlaskit/commits/66b846d))


* breaking; cloudId is now required for resourced component

ISSUES CLOSED: DIR-248, DIR-249, DIR-250

## 2.3.2 (2017-04-27)


* fix; update legal copy to be more clear. Not all modules include ADG license. ([f3a945e](https://bitbucket.org/atlassian/atlaskit/commits/f3a945e))

## 2.3.1 (2017-04-26)


* fix; update legal copy and fix broken links for component README on npm. New contribution and ([0b3e454](https://bitbucket.org/atlassian/atlaskit/commits/0b3e454))

## 2.3.0 (2017-04-20)


* feature; add analytics to profilecard component ([77fa03e](https://bitbucket.org/atlassian/atlaskit/commits/77fa03e))

## 2.2.0 (2017-04-20)


* feature; removed explicit style! imports, set style-loader in webpack config ([891fc3c](https://bitbucket.org/atlassian/atlaskit/commits/891fc3c))

## 2.1.1 (2017-04-18)


* fix; minor profilecard fixes for integration with Home ([7140657](https://bitbucket.org/atlassian/atlaskit/commits/7140657))

## 2.1.0 (2017-04-12)


* feature; add trigger wrapper component for profile cards ([cff0f87](https://bitbucket.org/atlassian/atlaskit/commits/cff0f87))

## 2.0.0 (2017-03-31)

## 1.3.0 (2017-03-31)


* feature; add LRU cache to AkProfileClient ([cb34168](https://bitbucket.org/atlassian/atlaskit/commits/cb34168))
* feature; add wrapper for height transition animation around profilecard ([23cea8c](https://bitbucket.org/atlassian/atlaskit/commits/23cea8c))


* breaking; made resourceClient a required prop, resourceClients method names changed

ISSUES CLOSED: FAB-2671

## 1.2.3 (2017-03-21)

## 1.2.3 (2017-03-21)


* fix; maintainers for all the packages were added ([261d00a](https://bitbucket.org/atlassian/atlaskit/commits/261d00a))

## 1.2.2 (2017-03-20)


* fix; make sure profilecard has a minimum height even without any labels ([88b07a5](https://bitbucket.org/atlassian/atlaskit/commits/88b07a5))

## 1.2.1 (2017-03-07)

## 1.2.0 (2017-03-02)


* feature; fixing error component in profilecard ([66f533c](https://bitbucket.org/atlassian/atlaskit/commits/66f533c))

## 1.1.2 (2017-02-28)


* fix; adds warning to usage.md about editing readme ([4496574](https://bitbucket.org/atlassian/atlaskit/commits/4496574))
* fix; removes jsdoc annoations and moves content to usage.md ([dc12a0d](https://bitbucket.org/atlassian/atlaskit/commits/dc12a0d))
* fix; dummy commit to release stories ([3df5d9f](https://bitbucket.org/atlassian/atlaskit/commits/3df5d9f))

## 1.1.1 (2017-02-27)


* fix; change action button appearance ([e13175f](https://bitbucket.org/atlassian/atlaskit/commits/e13175f))
* empty commit to make components release themselves ([5511fbe](https://bitbucket.org/atlassian/atlaskit/commits/5511fbe))

## 1.1.0 (2017-02-17)


* feature; Adding isLoading and hasError props to the stateless AkProfilecard component ([b988ff8](https://bitbucket.org/atlassian/atlaskit/commits/b988ff8))
* fixing lint error ([da369d3](https://bitbucket.org/atlassian/atlaskit/commits/da369d3))

## 1.0.2 (2017-02-07)


* fix; Updates docs to mention using yarn ([8259add](https://bitbucket.org/atlassian/atlaskit/commits/8259add))

## 1.0.1 (2017-02-06)


* fix; Updates package to use scoped ak packges ([26b9140](https://bitbucket.org/atlassian/atlaskit/commits/26b9140))
