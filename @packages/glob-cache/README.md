<p align="center">
  <img
    align="center"
    src="https://rawcdn.githack.com/tunnckoCore/opensource/820e49e8692e845205e50d5c5f5869d8313f4206/packages/glob-cache/logo.png"
  />
</p>

# glob-cache [![npm version][npmv-img]][npmv-url] [![License][license-img]][license-url] [![Libera Manifesto][libera-manifesto-img]][libera-manifesto-url]

> Best and fastest file globbing solution for Node.js - can use **any** glob
> library like `glob`, `globby` or `fast-glob`! Streaming, Promise and Hook
> APIs, with built in caching layer using `cacache`. Makes you Instant Fast™.

Please consider following this project's author,
[Charlike Mike Reagent](https://github.com/tunnckoCore), and :star: the project
to show your :heart: and support.

<div id="readme"></div>

[![Code style][codestyle-img]][codestyle-url]
[![CircleCI linux build][linuxbuild-img]][linuxbuild-url]
[![CodeCov coverage status][codecoverage-img]][codecoverage-url]
[![Renovate App Status][renovateapp-img]][renovateapp-url]
[![Make A Pull Request][prs-welcome-img]][prs-welcome-url]
[![Time Since Last Commit][last-commit-img]][last-commit-url]

<!-- [![Semantically Released][standard-release-img]][standard-release-url] -->

If you have any _how-to_ kind of questions, please read the [Contributing
Guide][contributing-url] and [Code of Conduct][code_of_conduct-url] documents.
For bugs reports and feature requests, [please create an issue][open-issue-url]
or ping [@tunnckoCore](https://twitter.com/tunnckoCore) at Twitter.

[![Conventional Commits][ccommits-img]][ccommits-url]
[![Minimum Required Nodejs][nodejs-img]][npmv-url]
[![NPM Downloads Monthly][downloads-monthly-img]][npmv-url]
[![NPM Downloads Total][downloads-total-img]][npmv-url]
[![Share Love Tweet][twitter-share-img]][twitter-share-url]
[![Twitter][twitter-img]][twitter-url]

Project is [semantically](https://semver.org) versioned & automatically released
from [GitHub Actions](https://github.com/features/actions) with
[Lerna](https://github.com/lerna/lerna).

[![Become a Patron][patreon-img]][patreon-url]
[![Buy me a Kofi][kofi-img]][kofi-url]
[![PayPal Donation][paypal-img]][paypal-url]
[![Bitcoin Coinbase][bitcoin-img]][bitcoin-url]
[![Keybase PGP][keybase-img]][keybase-url]

| Topic                                                            |                                           Contact |
| :--------------------------------------------------------------- | ------------------------------------------------: |
| Any legal or licensing questions, like private or commerical use |           ![tunnckocore_legal][tunnckocore_legal] |
| For any critical problems and security reports                   |     ![tunnckocore_security][tunnckocore_security] |
| Consulting, professional support, personal or team training      | ![tunnckocore_consulting][tunnckocore_consulting] |
| For any questions about Open Source, partnerships and sponsoring | ![tunnckocore_opensource][tunnckocore_opensource] |

<!-- Logo when needed:

<p align="center">
  <a href="https://github.com/tunnckoCore/opensource">
    <img src="./media/logo.png" width="85%">
  </a>
</p>

-->

## Table of Contents

- [Install](#install)
- [API](#api)
  - [globCache](#globcache)
    - [Signature](#signature)
    - [Params](#params)
    - [Examples](#examples)
  - [globCache.stream](#globcachestream)
    - [Signature](#signature-1)
    - [Params](#params-1)
    - [Examples](#examples-1)
  - [globCache.promise](#globcachepromise)
    - [Signature](#signature-2)
    - [Params](#params-2)
    - [Examples](#examples-2)
- [Context and how it works](#context-and-how-it-works)
- [Contributing](#contributing)
  - [Guides and Community](#guides-and-community)
  - [Support the project](#support-the-project)
- [Contributors](#contributors)
- [License](#license)

_(TOC generated by [verb](https://github.com/verbose/verb) using
[markdown-toc](https://github.com/jonschlinkert/markdown-toc))_

## Install

This project requires [**Node.js**](https://nodejs.org) **>=10.18** _(see
[Support & Release Policy](https://github.com/tunnckoCoreLabs/support-release-policy))_.
Install it using [**yarn**](https://yarnpkg.com) or
[**npm**](https://npmjs.com).<br> _We highly recommend to use Yarn when you
think to contribute to this project._

```bash
$ yarn add glob-cache
```

## API

<!-- docks-start -->

_Generated using [jest-runner-docs](https://ghub.now.sh/jest-runner-docs)._

### [globCache](./src/index.js#L40)

A mirror of `globCache.stream` and so an "async generator" function, returning
an AsyncIterable. This mirror exists because it's a common practice to have a
`(globPatterns, options)` signature.

<span id="globcache-signature"></span>

#### Signature

```ts
function(patterns, options)
```

<span id="globcache-params"></span>

#### Params

- `patterns` **{string|Array}** - string or array of glob patterns
- `options` **{object}** - see `globCache.stream` options

<span id="globcache-examples"></span>

#### Examples

```js
const globCache = require('glob-cache');

const iterable = globCache(['src/*.js', 'test/*.{js,ts}'], {
  cwd: './foo/bar',
});

// equivalent to

const iter = globCache.stream({
  include: ['src/*.js', 'test/*.{js,ts}'],
  cwd: './foo/bar',
});
```

### [globCache.stream](./src/index.js#L84)

Match files and folders with glob patterns, by default using
[fast-glob's `.stream()`](https://ghub.now.sh/fast-glob). This function is
[async generator](https://javascript.info/async-iterators-generators) and
returns "async iterable", so you can use the `for await ... of` loop. Note that
this loop should be used inside an `async function`. Each item is a
[Context](#context-and-how-it-works) object, which is also passed to each hook.

<span id="globcache.stream-signature"></span>

#### Signature

```ts
function(options)
```

<span id="globcache.stream-params"></span>

#### Params

- `options.cwd` **{string}** - working directory, defaults to `process.cwd()`
- `options.include` **{string|Array}** - string or array of string glob patterns
- `options.patterns` **{string|Array}** - alias of `options.include`
- `options.exclude` **{string|Array}** - ignore glob patterns, passed to
  `options.globOptions.ignore`
- `options.ignore` **{string|Array}** - alias of `options.exclude`
- `options.hooks` **{object}** - an object with hooks functions, each hook
  passed with [Context](#context-and-how-it-works)
- `options.hooks.found` **{Function}** - called when a cache for a file is found
- `options.hooks.notFound` **{Function}** - called when file is not found in
  cache (usually the first hit)
- `options.hooks.changed` **{Function}** - called always when source file
  differs the cache file
- `options.hooks.notChanged` **{Function}** - called when both source file and
  cache file are "the same"
- `options.hooks.always` **{Function}** - called always, no matter of the state
- `options.glob` **{Function}** - a function `(patterns, options) => {}` or
  globbing library like [glob][], [globby][], [fast-glob][]
- `options.globOptions` **{object}** - options passed to the `options.glob`
  library
- `options.cacheLocation` **{string}** - a filepath location of the cache,
  defaults to `.cache/glob-cache` in `options.cwd`
- `returns` **{AsyncIterable}**

<span id="globcache.stream-examples"></span>

#### Examples

```js
const globCache = require('glob-cache');

(async () => {
  // Using the Stream API
  const iterable = globCache.stream({
    include: 'src/*.js',
    cacheLocation: './foo-cache',
  });

  for await (const ctx of iterable) {
    console.log(ctx);
  }
})();
```

### [globCache.promise](./src/index.js#L243)

Using the Promise API allows you to use the Hooks API, and it's actually the
recommended way of using the hooks api. By default, if the returned promise
resolves, it will be an empty array. That's intentional, because if you are
using the hooks api it's unnecessary to pollute the memory putting huge objects
to a "result array". So if you want results array to contain the Context objects
you can pass `buffered: true` option.

<span id="globcache.promise-signature"></span>

#### Signature

```ts
function(options)
```

<span id="globcache.promise-params"></span>

#### Params

- `options` **{object}** - see `globCache.stream` options, in addition here we
  have `options.buffered` too
- `options.buffered` **{boolean}** - if `true` returned array will contain
  [Context](<(#context-and-how-it-works)>) objects, default `false`
- `returns` **{Promise}** - if `options.buffered: true` resolves to
  `Array<Context>`, otherwise empty array

<span id="globcache.promise-examples"></span>

#### Examples

```js
const globCache = require('glob-cache');
const globby = require('globby');

(async () => {
  // Using the Hooks API and `globby.stream`
  const res = await globCache.promise({
    include: 'src/*.js',
    cacheLocation: './.cache/awesome-cache',
    glob: globby.stream,
    hooks: {
      changed(ctx) {},
      always(ctx) {},
    },
  });
  console.log(res); // => []

  // Using the Promise API
  const results = await globCache.promise({
    include: 'src/*.js',
    exclude: 'src/bar.js',
    buffered: true,
  });

  console.log(results); // => [Context, Context, ...]
})();
```

<!-- docks-end -->

## Context and how it works

Each context contains a `{ file, cacheFile, cacheLocation, cacache }` and more
properties. The `file` one represents the fresh file loaded from the system, the
`cacheFile` represents the file from the cache. Both has `path`, `size` and
`integrity` properties, plus more.

The `cacheFile` can be `null` if it's the first hit (not found in cache), in
such case the `ctx.notFound` will be `true` and on next runs this will be
`false`. When using the Hooks API, the `options.hooks.notFound()` or
`options.hooks.found()` will be called.

Important to note is that `cacheFile` don't have a `contents` property, but has
`path` which points to the place of the cache file on the disk.

The interesting one is the `ctx.changed`. This one is the reason for the whole
existance of this module. If both the "source" file and cache file are the same
(based on [cacache][]), e.g. same size and integrity (which means the
contents/shasum are equal), then `ctx.changed === false`, otherwise this will be
`true`. Simply said, when you change your file(s) matched by a the given glob
pattern(s), then it will be `ctx.changed === true` and the
`options.hooks.changed()` will be called. Depending on whether it's the first
call or not, either `options.hooks.found` or `options.hooks.notFound` will also
be called.

If you are using the Hooks API (e.g. `globCache.promise` plus `options.hooks`),
there is also one more key point and that's that we have `options.hooks.always`
hook function, which might be useful if you want more control, and so you can
decide what to do or make more additional checks - for example, listen the
`mtime` - or track the dependencies of the file. Tracking dependencies is
something that some test runner may benefit.

Because all that, we also expose [cacache][] to the Context, so you can update
or clean the cache - it's up to you.

Example Context (the `options.hooks.changed`, `options.hooks.notFound` and
`options.hooks.always` hooks are called)

```
{
  file: {
    path: '/home/charlike/github/tunnckoCore/opensource/packages/glob-cache/test/index.js',
    contents: <Buffer 27 75 73 65 20 73 74 72 69 63 74 27 3b 0a 0a 63 6f 6e 73 74 20 70 61 74 68 20 3d 20 72 65 71 75 69 72 65 28 27 70 61 74 68 27 29 3b 0a 63 6f 6e 73 74 ... 350 more bytes>,
    size: 427,
    integrity: 'sha512-p5daDYwu9vhNNjT9vfRrWHXIwwlPxeqeub4gs3qMZ88J//ONUH7Je2Muu9o+MxjA1Fv3xwbgkBdjcHgdj7ar4A=='
  },
  cacheFile: null,
  cacheLocation: '/home/charlike/github/tunnckoCore/opensource/packages/glob-cache/test/fixture-cache',
  cacache: { /* cacache instance */ },
  changed: true,
  notFound: true
}
```

And when you run it more times (with no changes), the `cacheFile` will not be
`null` anymore, like so

```
{
  file: {
    path: '/home/charlike/github/tunnckoCore/opensource/packages/glob-cache/test/index.js',
    contents: <Buffer 27 75 73 65 20 73 74 72 69 63 74 27 3b 0a 0a 63 6f 6e 73 74 20 70 61 74 68 20 3d 20 72 65 71 75 69 72 65 28 27 70 61 74 68 27 29 3b 0a 63 6f 6e 73 74 ... 350 more bytes>,
    size: 427,
    integrity: 'sha512-p5daDYwu9vhNNjT9vfRrWHXIwwlPxeqeub4gs3qMZ88J//ONUH7Je2Muu9o+MxjA1Fv3xwbgkBdjcHgdj7ar4A=='
  },
  cacheFile: {
    key: '/home/charlike/github/tunnckoCore/opensource/packages/glob-cache/test/index.js',
    integrity: 'sha512-p5daDYwu9vhNNjT9vfRrWHXIwwlPxeqeub4gs3qMZ88J//ONUH7Je2Muu9o+MxjA1Fv3xwbgkBdjcHgdj7ar4A=='
    path: '/home/charlike/github/tunnckoCore/opensource/packages/glob-cache/fixture-cache/content-v2/sha512/78/84/a154130fdefee002a708cee1ae570db54b1a278fed9b7a3847c73b2545bd48947c2cd192d365f9d87653f098f80d98b4ee37923ba467dbc314acf0f42e39',
    size: 427,
    stat: Stat {}
    time: 1579561781331,
    metadata: undefined
  },
  cacheLocation: '/home/charlike/github/tunnckoCore/opensource/packages/glob-cache/fixture-cache',
  cacache: { /* cacache instance */ },
  changed: false,
  notFound: false
}
```

As you can see above, both the `file.integrity` and `cacheFile.integrity` are
the same, also the `size`, so the both files are equal (and so
`ctx.changed: false`) - the `options.hooks.notChanged` will be called.

Below example shows usage of `changed` hook and Workers.

```js
const globCache = require('glob-cache')
const JestWorker = require('jest-worker');

let worker = null;

(async () => {
  await globCache.promise({
    include: 'packages/*/src/**/*.js'
    hooks: {
      async changed(ctx) {
        // If we are here, it's either the first run, or
        // only when there's a difference between the actual file and the cache file.
        // So we can, for example, call our worker/runner or whatever here.
        worker =
          worker ||
          new JestWorker(require.resolve('./my-awesome-worker-or-runner.js'), {
            numWorkers: 7,
            forkOptions: { stdio: 'inherit' },
          });

        await worker.default(ctx);
        await worker.end();
      },
    }
  });
})();
```

Above you're looking on a basic solution similar to what's done in Jest with the
difference that Jest can detect changes only if it's a Git project. At least the
`--onlyChanged` works that way (with Git requirement) - which isn't a big
problem of course since mostly every project is using Git, but anyway.

The point is, that you can do whatever you want in custom conditions based on
your preferences and needs.

In above example you may wonder why we are instatiating JestWorker inside the
`if` statement. That's because if you instantiate it before the call of
`globCache` (where is the `let worker` assignment) then you have no way to end
the worker in any meaningful and easy way.

Similar implementation you can see in the
[`hela-eslint-workers`](https://github.com/tunnckoCore/opensource/tree/hela-eslint-workers/%40hela/eslint/src)
branch where using `glob-cache` we are trying to speed up ESLint a bit, by
putting `eslint.executeOnFiles` or `eslint.executeOnText` inside a worker. The
thing is that it doesn't help much, because ESLint is just slow - for the same
reason even the `jest-runner-eslint` doesn't help much with performance. The
complexity in ESLint is O(n) - the more configs and plugins you have in your
config, the more slow it will run even on a single file - it's inevitable and a
huge problem. I'm not saying all that just to hate. It's just because of the
synchornous design of ESLint and the way it works. A big pain point is not only
that it exposes & uses only sync methods, but also the architecture of resolving
huge amount of configs and plugins. That may change if
[RFC#9](https://github.com/eslint/rfcs/pull/9) is accepted, for which I have big
hopes. Even if it's accepted it will take few major releases.

**[back to top](#readme)**

## Contributing

### Guides and Community

Please read the [Contributing Guide][contributing-url] and [Code of
Conduct][code_of_conduct-url] documents for advices.

For bug reports and feature requests, please join our [community][community-url]
forum and open a thread there with prefixing the title of the thread with the
name of the project if there's no separate channel for it.

Consider reading the
[Support and Release Policy](https://github.com/tunnckoCoreLabs/support-release-policy)
guide if you are interested in what are the supported Node.js versions and how
we proceed. In short, we support latest two even-numbered Node.js release lines.

### Support the project

[Become a Partner or Sponsor?][kofi-url] :dollar: Check the **OpenSource**
Commision (tier). :tada: You can get your company logo, link & name on this
file. It's also rendered on package's page in [npmjs.com][npmv-url] and
[yarnpkg.com](https://yarnpkg.com/en/package/glob-cache) sites too! :rocket:

Not financial support? Okey!
[Pull requests](https://github.com/tunnckoCoreLabs/contributing#opening-a-pull-request),
stars and all kind of
[contributions](https://opensource.guide/how-to-contribute/#what-it-means-to-contribute)
are always welcome. :sparkles:

## Contributors

This project follows the
[all-contributors](https://github.com/all-contributors/all-contributors)
specification. Contributions of any kind are welcome!

Thanks goes to these wonderful people
([emoji key](https://allcontributors.org/docs/en/emoji-key)), consider showing
your [support](#support-the-project) to them:

<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://tunnckoCore.com"><img src="https://avatars3.githubusercontent.com/u/5038030?v=4" width="100px;" alt=""/><br /><sub><b>Charlike Mike Reagent</b></sub></a><br /><a href="#infra-tunnckoCore" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/node-formidable/node-formidable/commits?author=tunnckoCore" title="Code">💻</a> <a href="https://github.com/node-formidable/node-formidable/commits?author=tunnckoCore" title="Documentation">📖</a> <a href="#ideas-tunnckoCore" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-tunnckoCore" title="Maintenance">🚧</a> <a href="https://github.com/node-formidable/node-formidable/commits?author=tunnckoCore" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

**[back to top](#readme)**

## License

Copyright (c) 2020-present, [Charlike Mike Reagent](https://tunnckocore.com)
`<opensource@tunnckocore.com>` & [contributors](#wonderful-contributors).<br>
Released under the [MPL-2.0 License][license-url].

<!-- badges -->

<!-- prettier-ignore-start -->

[contributing-url]: https://github.com/tunnckoCore/opensource/blob/master/CONTRIBUTING.md
[code_of_conduct-url]: https://github.com/tunnckoCore/opensource/blob/master/CODE_OF_CONDUCT.md

<!-- Heading badges -->

[npmv-url]: https://www.npmjs.com/package/glob-cache
[npmv-img]: https://badgen.net/npm/v/glob-cache?icon=npm&cache=300

[license-url]: https://github.com/tunnckoCore/opensource/blob/master/packages/glob-cache/LICENSE
[license-img]: https://badgen.net/npm/license/glob-cache?cache=300

[libera-manifesto-url]: https://liberamanifesto.com
[libera-manifesto-img]: https://badgen.net/badge/libera/manifesto/grey

<!-- Front line badges -->

[codecoverage-img]: https://badgen.net/badge/coverage/100%25/green?icon=codecov&cache=300

[codecoverage-url]: https://codecov.io/gh/tunnckoCore/opensource

[codestyle-url]: https://github.com/airbnb/javascript
[codestyle-img]: https://badgen.net/badge/code%20style/airbnb/ff5a5f?icon=airbnb&cache=300

[linuxbuild-url]: https://github.com/tunnckocore/opensource/actions
[linuxbuild-img]: https://badgen.net/github/checks/tunnckoCore/opensource/master?cache=300&label=build&icon=github

[ccommits-url]: https://conventionalcommits.org/
[ccommits-img]: https://badgen.net/badge/conventional%20commits/v1.0.0/green?cache=300

[standard-release-url]: https://github.com/standard-release/standard-release
[standard-release-img]: https://badgen.net/badge/semantically/released/05c5ff?cache=300

[community-img]: https://badgen.net/badge/join/community/7b16ff?cache=300
[community-url]: https://github.com/tunnckocorehq/community

[last-commit-img]: https://badgen.net/github/last-commit/tunnckoCore/opensource/master?cache=300
[last-commit-url]: https://github.com/tunnckoCore/opensource/commits/master

[nodejs-img]: https://badgen.net/badge/node/>=10.18/green?cache=300

[downloads-weekly-img]: https://badgen.net/npm/dw/glob-cache?icon=npm&cache=300
[downloads-monthly-img]: https://badgen.net/npm/dm/glob-cache?icon=npm&cache=300
[downloads-total-img]: https://badgen.net/npm/dt/glob-cache?icon=npm&cache=300

[renovateapp-url]: https://renovatebot.com
[renovateapp-img]: https://badgen.net/badge/renovate/enabled/green?cache=300

[prs-welcome-img]: https://badgen.net/badge/PRs/welcome/green?cache=300
[prs-welcome-url]: http://makeapullrequest.com

<!-- TODO: update icon -->

[paypal-url]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=HYJJEZNSGAPGC&source=url
[paypal-img]: https://badgen.net/badge/PayPal/donate/003087?cache=300&icon=https://simpleicons.now.sh/paypal/fff

<!-- TODO: update icon -->

[kofi-url]: https://ko-fi.com/tunnckoCore
[kofi-img]: https://badgen.net/badge/Buy%20me/a%20coffee/29abe0c2?cache=300&icon=https://rawcdn.githack.com/tunnckoCore/badgen-icons/f8264c6414e0bec449dd86f2241d50a9b89a1203/icons/kofi.svg

<!-- TODO: update icon -->

[bitcoin-url]: https://www.blockchain.com/btc/payment_request?address=3QNHKun1K1SUui1b4Z3KEGPPsWC1TgtnqA&message=Open+Source+Software&amount_local=10&currency=USD
[bitcoin-img]: https://badgen.net/badge/Bitcoin%20tip/3QNHKun...b4Z3KEGPPsWC1TgtnqA/yellow?cache=300&icon=https://simpleicons.now.sh/bitcoin/fff
[keybase-url]: https://keybase.io/tunnckoCore
[keybase-img]: https://badgen.net/keybase/pgp/tunnckoCore?cache=300
[twitter-url]: https://twitter.com/tunnckoCore
[twitter-img]: https://badgen.net/twitter/follow/tunnckoCore?icon=twitter&color=1da1f2&cache=300
[patreon-url]: https://www.patreon.com/bePatron?u=5579781
[patreon-img]: https://badgen.net/badge/Become/a%20patron/F96854?icon=patreon

<!-- [patreon-img]: https://badgen.net/badge/Patreon/tunnckoCore/F96854?icon=patreon -->

[patreon-sponsor-img]: https://badgen.net/badge/become/a%20sponsor/F96854?icon=patreon
[twitter-share-url]: https://twitter.com/intent/tweet?text=https://ghub.now.sh/glob-cache&via=tunnckoCore
[twitter-share-img]: https://badgen.net/badge/twitter/share/1da1f2?icon=twitter
[open-issue-url]: https://github.com/tunnckoCore/opensource/issues/new
[tunnckocore_legal]: https://badgen.net/https/liam-badge-daknys6gadky.runkit.sh/com/legal/tunnckocore?label&color=A56016&icon=https://svgshare.com/i/Dt6.svg
[tunnckocore_consulting]: https://badgen.net/https/liam-badge-daknys6gadky.runkit.sh/com/consulting/tunnckocore?label&color=07ba96&icon=https://svgshare.com/i/Dt6.svg
[tunnckocore_security]: https://badgen.net/https/liam-badge-daknys6gadky.runkit.sh/com/security/tunnckocore?label&color=ed1848&icon=https://svgshare.com/i/Dt6.svg
[tunnckocore_opensource]: https://badgen.net/https/liam-badge-daknys6gadky.runkit.sh/com/opensource/tunnckocore?label&color=ff7a2f&icon=https://svgshare.com/i/Dt6.svg
[tunnckocore_newsletter]: https://badgen.net/https/liam-badge-daknys6gadky.runkit.sh/com/newsletter/tunnckocore?label&color=5199FF&icon=https://svgshare.com/i/Dt6.svg

<!-- prettier-ignore-end -->

[cacache]: https://github.com/npm/cacache
[fast-glob]: https://github.com/mrmlnc/fast-glob
[glob]: https://github.com/isaacs/node-glob
[globby]: https://github.com/sindresorhus/globby
[tiny-glob]: https://github.com/terkelg/tiny-glob
