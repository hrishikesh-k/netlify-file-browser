<template>
  <div>
    <template v-if = "!Array.isArray($props.fileData)">
      <div v-if = "$props.fileData.hasOwnProperty('pathArray')" class = "flex items-center space-x-1 s:space-x-2.5">
        <img :src = "'/images/' + icon($props.fileData.pathArray[0]) + '.svg'" alt = "file icon" class = "h-5 w-5"/>
        <p class = "flex-grow truncate s:text-lg">{{$props.fileData.pathArray[0]}}</p>
        <p v-if = "$props.fileData.nlm" class = "bg-goldLightest font-semibold mr-2.5 px-1.5 py-0.5 rounded-md text-goldDarkest text-sm w-max dark:bg-goldDarkest dark:text-goldLighter">NLM</p>
        <p class = "truncate s:text-lg">{{size}}</p>
        <a :disabled = "disabled ? true : null" :href = "disabled ? null : 'https://' + $store.state.chosenDeploy + '--' + $store.state.chosenSite + '.netlify.app' + $props.fileData.path" class = "h-5" rel = "nofollow noopener noreferrer" target = "_blank">
          <icon :path = "$options.static.iconEye" class = "align-top" size = "5"/>
        </a>
        <div v-if = "downloading" class = "flex-shrink-0 h-5 relative w-5">
          <icon :path = "$options.static.iconCircle" class = "absolute animate-spin opacity-5 text-tealDarkest dark:text-tealLightest" size = "5"/>
          <icon :path = "$options.static.iconSemicircle" class = "absolute animate-spin text-tealDarkest dark:text-tealLightest" size = "5"/>
        </div>
        <icon v-else :path = "$options.static.iconDownload" @click = "download" class = "cursor-pointer flex-shrink-0" size = "5"/>
      </div>
      <template v-else>
        <div v-for = "fileArray in sortedFileData" :class = "!$props.collapse && 'mx-6'" :key = "JSON.stringify(fileArray)">
          <file v-if = "fileArray[0] === '_root'" :fileData = "fileArray[1]" class = "space-y-2.5"/>
          <template v-else>
            <div class = "cursor-pointer flex items-center space-x-2.5 w-full" @click = "$event.currentTarget.parentElement.classList.toggle('expanded')">
              <icon :path = "$options.static.iconFolder" size = "5"/>
              <p class = "flex-grow font-semibold truncate s:text-lg">{{fileArray[0]}}</p>
            </div>
            <file :collapse = "true" :fileData = "fileArray[1]" class = "border-grayLightest border-l-2 hidden max-h-0 ml-2 mt-2.5 pl-4 overflow-hidden space-y-2.5 dark:border-grayDarkest"/>
          </template>
        </div>
      </template>
    </template>
    <template v-else>
      <file v-for = "file in $props.fileData" :fileData = "file" :key = "JSON.stringify(file)"/>
    </template>
  </div>
</template>
<script>
  import {callApi, filesize, iconDownload} from '../assets/data'
  import icon from './icon.vue'
  export default {
    components: {
      icon
    },
    computed: {
      disabled() {
        return ['_headers', '_redirects', 'netlify.toml'].some(element => {
          return this.fileData.pathArray[0] === element
        })
      },
      size() {
        return filesize(this.$props.fileData.size).human()
      },
      sortedFileData() {
        return Object.entries(this.$props.fileData).sort((_, secondElement) => {
          if (secondElement[0] === '_root') {
            return -1
          }
        })
      }
    },
    data() {
      return {
        downloading: false
      }
    },
    methods: {
      download() {
        this.downloading = true
        this.$store.commit('setState', {
          property: ['downloading', 'downloadStop'],
          value: ['true', new AbortController()]
        })
        callApi(`deploys/${this.$store.state.chosenDeploy}/files${this.$props.fileData.path}`, true, true).then(file => {
          this.downloading = false
          let blob = document.createElement('a')
          blob.href = URL.createObjectURL(file)
          blob.download = this.$props.fileData.pathArray[0]
          blob.click()
          URL.revokeObjectURL(blob.href)
          blob.remove()
          blob = file = null
        })
      },
      icon(file) {
        function checkEndsWith(array) {
          return array.some(element => {
            return file.endsWith(element)
          })
        }
        const computedIcon = Object.keys(this.$options.static.fileIcons).find(key => {
          return this.$options.static.fileIcons[key].includes(/(?:\.([^.]+))?$/.exec(file)[1])
        })
        switch (true) {
          case checkEndsWith(['ace', 'adonisrc.json']):
            return 'adonis'
          case checkEndsWith(['androidmanifest.xml']):
            return 'android'
          case checkEndsWith(['angular.json', 'angular-cli.json']):
            return 'angular'
          case checkEndsWith(['apollo.config.js']):
            return 'apollo'
          case checkEndsWith(['appveyor.yml']):
            return 'appveyor'
          case checkEndsWith(['aurelia.json']):
            return 'aurelia'
          case checkEndsWith(['authors', 'authors.md', 'authors.txt']):
            return 'authors'
          case checkEndsWith(['azure-pipelines.yaml', 'azure-pipelines.yml']):
            return 'azure-pipelines'
          case checkEndsWith(['babel-plugin-macros.config.js', 'babel-plugin-macrosrc', 'babel-plugin-macrosrc.js', 'babel-plugin-macrosrc.json', 'babel-plugin-macrosrc.yaml', 'babel-plugin-macrosrc.yml', 'babel-transform.js', 'babel.config.cjs', 'babel.config.js', 'babel.config.json', 'babel.config.mjs', 'babelrc.js', 'babelrc.json', 'babelrc.mjs', 'babelrc.cjs',]):
            return 'babel'
          case checkEndsWith(['bitbucket-pipelines.yaml', 'bitbucket-pipelines.yml']):
            return 'bitbucket'
          case checkEndsWith(['bower.json']):
            return 'bower'
          case checkEndsWith(['browserslist']):
            return 'browserlist'
          case checkEndsWith(['buildkite.yaml', 'buildkite.yml']):
            return 'buildkite'
          case checkEndsWith(['cabal.project', 'cabal.project.freeze', 'cabal.project.local']):
            return 'cabal'
          case checkEndsWith(['capacitor.config.json']):
            return 'capacitor'
          case checkEndsWith(['copying', 'copying.md', 'copying.txt', 'copyright', 'copyright.md', 'copyright.txt', 'licence', 'licence.md', 'licence.txt', 'license', 'license.md', 'license.txt']):
            return 'certificate'
          case checkEndsWith(['changelog', 'changelog.md', 'changelog.txt', 'changes', 'changes.md', 'changes.txt']):
            return 'changelog'
          case checkEndsWith(['circle.yml']):
            return 'circleci'
          case checkEndsWith(['cmakecache.txt', 'cmakelists.txt']):
            return 'cmake'
          case checkEndsWith(['codeclimate.yml']):
            return 'code-climate'
          case checkEndsWith(['codecov.yml']):
            return 'codecov'
          case checkEndsWith(['codeowners']):
            return 'codeowners'
          case checkEndsWith(['commitlint.config.js', 'commitlint.yaml', 'commitlint.yml', 'commitlintrc.js', 'commitlintrc.json', 'commitlintrc.yaml', 'commitlintrc.yml']):
            return 'commitlint'
          case checkEndsWith(['code_of_conduct.md', 'code_of_conduct.txt']):
            return 'conduct'
          case checkEndsWith(['pre-commit', 'pre-push', 'post-merge']):
            return 'console'
          case checkEndsWith(['contributing.md']):
            return 'contributing'
          case checkEndsWith(['credits', 'credits.md', 'credits.txt']):
            return 'credits'
          case checkEndsWith(['css.map']):
            return 'css-map'
          case checkEndsWith(['cypress.env.json', 'cypress.json']):
            return 'cypress'
          case checkEndsWith(['dependabot.yml']):
            return 'dependabot'
          case checkEndsWith(['html.bubble', 'php.bubble']):
            return 'dinophp'
          case checkEndsWith(['drone.yml']):
            return 'drone'
          case checkEndsWith(['docker-compose.alpha.yaml', 'docker-compose.alpha.yml', 'docker-compose.beta.yaml', 'docker-compose.beta.yml', 'docker-compose.ci.yaml', 'docker-compose.ci.yml', 'docker-compose.dev.yaml', 'docker-compose.dev.yml', 'docker-compose.development.yaml', 'docker-compose.development.yml', 'docker-compose.local.yaml', 'docker-compose.local.yml', 'docker-compose.override.yaml', 'docker-compose.override.yml', 'docker-compose.prod.yaml', 'docker-compose.prod.yml', 'docker-compose.production.yaml', 'docker-compose.production.yml', 'docker-compose.stage.yaml', 'docker-compose.stage.yml', 'docker-compose.staging.yaml', 'docker-compose.staging.yml', 'docker-compose.test.yaml', 'docker-compose.test.yml', 'docker-compose.testing.yaml', 'docker-compose.testing.yml', 'docker-compose.web.yaml', 'docker-compose.web.yml', 'docker-compose.worker.yaml', 'docker-compose.worker.yml', 'docker-compose.yaml', 'docker-compose.yml', 'dockerfile', 'dockerfile.alpha', 'dockerfile.beta', 'dockerfile.ci', 'dockerfile.dev', 'dockerfile.development', 'dockerfile.local', 'dockerfile.prod', 'dockerfile.production', 'dockerfile.stage', 'dockerfile.staging', 'dockerfile.test', 'dockerfile.testing', 'dockerfile.web', 'dockerfile.worker']):
            return 'docker'
          case checkEndsWith(['dune', 'dune-project', 'dune-workspace', 'dune-workspace.dev']):
            return 'dune'
          case checkEndsWith(['ember-cli-builds.js', 'ember-cli.js']):
            return 'ember'
          case checkEndsWith(['eslintrc-jsdoc.js', 'eslintrc-md.js', 'eslintrc.cjs', 'eslintrc.js', 'eslintrc.json', 'eslintrc.yaml', 'eslintrc.yml']):
            return 'eslint'
          case checkEndsWith(['appfile', 'fastfile']):
            return 'fastlane'
          case checkEndsWith(['favicon.ico']):
            return 'favicon'
          case checkEndsWith(['firebase.json', 'firestore.indexes.json', 'firestore.rules']):
            return 'firebase'
          case checkEndsWith(['fuse.js']):
            return 'fusebox'
          case checkEndsWith(['gemfile']):
            return 'gemfile'
          case checkEndsWith(['gatsby-browser.js', 'gatsby.config.js', 'gatsby-config.js', 'gatsby-node.js', 'gatsby-ssr.js']):
            return 'gatsby'
          case checkEndsWith(['git-history']):
            return 'git'
          case checkEndsWith(['gitlab-ci.yml']):
            return 'gitlab'
          case checkEndsWith(['gitpod.yml']):
            return 'gitpod'
          case checkEndsWith(['gradle.properties', 'gradle-wrapper.properties', 'gradlew']):
            return 'gradle'
          case checkEndsWith(['project.graphcool']):
            return 'graphcool'
          case checkEndsWith(['graphql.config.js', 'graphql.config.json', 'graphql.config.toml', 'graphql.config.ts', 'graphql.config.yaml', 'graphql.config.yml', 'graphqlrc.js', 'graphqlrc.json', 'graphqlrc.toml', 'graphqlrc.ts', 'graphqlrc.yaml', 'graphqlrc.yml']):
            return 'graphql'
          case checkEndsWith(['gulpfile.babel.js', 'gulpfile.js', 'gulpfile.mjs', 'gulpfile.ts']):
            return 'gulp'
          case checkEndsWith(['go.mod', 'go.sum']):
            return 'go-mod'
          case checkEndsWith(['gruntfile.babel.coffee', 'gruntfile.babel.js', 'gruntfile.babel.ts', 'gruntfile.coffee', 'gruntfile.js', 'gruntfile.ts']):
            return 'grunt'
          case checkEndsWith(['nycrc.json']):
            return 'istanbul'
          case checkEndsWith(['procfile', 'procfile.windows']):
            return 'heroku'
          case checkEndsWith(['horusec-config.json']):
            return 'horusec'
          case checkEndsWith(['cname']):
            return 'http'
          case checkEndsWith(['husky.config.js', 'huskyrc.js', 'huskyrc.json', 'huskyrc.yaml', 'huskyrc.yml']):
            return 'husky'
          case checkEndsWith(['io-config.json', 'ionic.config.json']):
            return 'ionic'
          case checkEndsWith(['cjs.map', 'js.map', 'mjs.map']):
            return 'javascript-map'
          case checkEndsWith(['jest-e2e.config.js', 'jest-e2e.json', 'jest-github-actions-reporter.js', 'jest-unit.config.js', 'jest.config.cjs', 'jest.config.js', 'jest.config.json', 'jest.config.mjs', 'jest.config.ts', 'jest.e2e.config.cjs', 'jest.e2e.config.js', 'jest.e2e.config.json', 'jest.e2e.config.mjs', 'jest.e2e.config.ts', 'jest.json', 'jest.setup.js', 'jest.setup.ts', 'jest.teardown.js', 'jestrc.js', 'jestrc.json']):
            return 'jest'
          case checkEndsWith(['jenkinsfile']):
            return 'jenkins'
          case checkEndsWith(['jsconfig.json']):
            return 'jsconfig'
          case checkEndsWith(['cdp.pid', 'composer.lock']):
            return 'json'
          case checkEndsWith(['karma.conf.coffee', 'karma.conf.js', 'karma.conf.ts', 'karma.config.js', 'karma.config.ts', 'karma-main.js', 'karma-main.ts']):
            return 'karma'
          case checkEndsWith(['artisan', 'blade.php', 'inky.php']):
            return 'laravel'
          case checkEndsWith(['lerna.json']):
            return 'lerna'
          case checkEndsWith(['lighthouserc.js', 'lighthouserc.json', 'lighthouserc.yaml', 'lighthouserc.yml']):
            return 'lighthouse'
          case checkEndsWith(['security', 'security.md', 'security.txt']):
            return 'lock'
          case checkEndsWith(['makefile']):
            return 'makefile'
          case checkEndsWith(['jvm.config', 'maven.config']):
            return 'maven'
          case checkEndsWith(['meson.build', 'meson_options.txt']):
            return 'meson'
          case checkEndsWith(['mocha.opts', 'mocharc.yaml', 'mocharc.yml', 'mocharc.js', 'mocharc.json', 'mocharc.jsonc']):
            return 'mocha'
          case checkEndsWith(['modernizrrc.js', 'modernizrrc.json']):
            return 'modernizr'
          case checkEndsWith(['nest-cli.json', 'nestconfig.json']):
            return 'nest'
          case checkEndsWith(['_headers', '_redirects', 'netlify.toml']):
            return 'netlify'
          case checkEndsWith(['next.config.js', 'next.config.ts']):
            return 'next'
          case checkEndsWith(['nginx.conf']):
            return 'nginx'
          case checkEndsWith(['package.json', 'package-lock.json']):
            return 'nodejs'
          case checkEndsWith(['nodemon.json', 'nodemon-debug.json']):
            return 'nodemon'
          case checkEndsWith(['nx.json']):
            return 'nrwl'
          case checkEndsWith(['nuget.config', 'nuget.exe']):
            return 'nuget'
          case checkEndsWith(['nuxt.config.js', 'nuxt.config.ts']):
            return 'nuxt'
          case checkEndsWith(['percy.yml']):
            return 'percy'
          case checkEndsWith(['php-cs-fixer.dist.php', 'php-cs-fixer.php', 'php_cs.dist', 'php_cs.dist.php', 'php_cs.php']):
            return 'php-cs-fixer'
          case checkEndsWith(['phpunit-watcher.yml', 'phpunit-watcher.yml.dist', 'phpunit.xml', 'phpunit.xml.dist', 'phpunit.result.cache']):
            return 'phpunit'
          case checkEndsWith(['postcss.config.cjs', 'postcss.config.js', 'postcssrc.js', 'postcssrc.json', 'postcssrc.yml']):
            return 'postcss'
          case checkEndsWith(['posthtml.config.js', 'posthtmlrc.js', 'posthtmlrc.json', 'posthtmlrc.yml']):
            return 'posthtml'
          case checkEndsWith(['prettier.config.cjs', 'prettierrc.cjs', 'prettierrc.js', 'prettierrc.json', 'prettierrc.json5', 'prettierrc.toml', 'prettierrc.yaml', 'prettierrc.yml', 'prettier.config.js']):
            return 'prettier'
          case checkEndsWith(['prisma.yml']):
            return 'prisma'
          case checkEndsWith(['protractor.conf.coffee', 'protractor.conf.js', 'protractor.conf.ts', 'protractor.config.js', 'protractor.config.ts']):
            return 'protractor'
          case checkEndsWith(['pug-lintrc.js', 'pug-lintrc.json']):
            return 'pug'
          case checkEndsWith(['manifest.in', 'pipfile', 'pylintrc', 'requirements.txt']):
            return 'python-misc'
          case checkEndsWith(['quasar.conf.js']):
            return 'quasar'
          case checkEndsWith(['readme', 'readme.md', 'readme.txt']):
            return 'readme'
          case checkEndsWith(['renovate.json', 'renovate.json5', 'renovaterc.json']):
            return 'renovate'
          case checkEndsWith(['milestones.md', 'milestones.txt', 'roadmap.md', 'roadmap.txt', 'timeline.md', 'timeline.txt']):
            return 'roadmap'
          case checkEndsWith(['robots.txt']):
            return 'robots'
          case checkEndsWith(['rollup-config.js', 'rollup-config.ts', 'rollup.config.base.js', 'rollup.config.base.ts', 'rollup.config.common.js', 'rollup.config.common.ts', 'rollup.config.dev.js', 'rollup.config.dev.ts', 'rollup.config.js', 'rollup.config.prod.js', 'rollup.config.prod.ts', 'rollup.config.prod.vendor.js', 'rollup.config.prod.vendor.ts', 'rollup.config.ts',]):
            return 'rollup'
          case checkEndsWith(['rome.json']):
            return 'rome'
          case checkEndsWith(['rubocop.yml', 'rubocop-todo.yml', 'rubocop_todo.yml']):
            return 'rubocop'
          case checkEndsWith(['release.config.js', 'releaserc.js', 'releaserc.json', 'releaserc.yaml', 'releaserc.yml']):
            return 'semantic-release'
          case checkEndsWith(['sentryclirc']):
            return 'sentry'
          case checkEndsWith(['manifest.mf', 'sln.dotsettings', 'sln.dotsettings.user']):
            return 'settings'
          case checkEndsWith(['snowpack.config.cjs', 'snowpack.config.js', 'snowpack.config.json', 'snowpack.config.mjs', 'snowpack.config.ts', 'snowpack.deps.json']):
            return 'snowpack'
          case checkEndsWith(['stencil.config.js', 'stencil.config.ts']):
            return 'stencil'
          case checkEndsWith(['stitches.config.js', 'stitches.config.ts']):
            return 'stitches'
          case checkEndsWith(['stories.js', 'stories.jsx', 'stories.mdx', 'stories.svelte', 'stories.ts', 'stories.tsx', 'story.js', 'story.jsx', 'story.mdx', 'story.ts', 'story.tsx',]):
            return 'storybook'
          case checkEndsWith(['stryker.conf.js', 'stryker.conf.json']):
            return 'stryker'
          case checkEndsWith(['stylelint.config.js', 'stylelintignore', 'stylelintrc.js', 'stylelintrc.json', 'stylelintrc.yaml', 'stylelintrc.yml']):
            return 'stylelint'
          case checkEndsWith(['svelte.config.cjs', 'svelte.config.js']):
            return 'svelte'
          case checkEndsWith(['svgo.config.js']):
            return 'svgo'
          case checkEndsWith(['svgrrc', 'svgrrc.js', 'svgrrc.json', 'svgrrc.yaml', 'svgrrc.yml', 'svgr.config.js']):
            return 'svgr'
          case checkEndsWith(['tailwind.config.cjs', 'tailwind.config.js', 'tailwind.config.ts', 'tailwind.js', 'tailwind.ts']):
            return 'tailwindcss'
          case checkEndsWith(['tf.json']):
            return 'terraform'
          case checkEndsWith(['tiltfile']):
            return 'tilt'
          case checkEndsWith(['travis.yml']):
            return 'travis'
          case checkEndsWith(['tsconfig.app.json', 'tsconfig.base.json', 'tsconfig.build.json', 'tsconfig.editor.json', 'tsconfig.eslint.json', 'tsconfig.json', 'tsconfig.lib.json', 'tsconfig.spec.json']):
            return 'tsconfig'
          case checkEndsWith(['.env.defaults', '.env.dev', '.env.development', '.env.development.local', '.env.dist', '.env.example', '.env.local', '.env.preview', '.env.prod', '.env.production', '.env.production.local', '.env.qa', '.env.qa.local', '.env.sample', '.env.schema', '.env.staging', '.env.staging.local', '.env.template', '.env.test', '.env.test.local', '.env.testing']):
            return 'tune'
          case checkEndsWith(['vagrantfile']):
            return 'vagrant'
          case checkEndsWith(['now.json', 'vercel.json']):
            return 'vercel'
          case checkEndsWith(['vcxitems.filters', 'vcxproj.filters']):
            return 'visualstudio'
          case checkEndsWith(['vite.config.cjs', 'vite.config.js', 'vite.config.mjs', 'vite.config.ts']):
            return 'vite'
          case checkEndsWith(['v.mod', 'vpkg.json']):
            return 'vlang'
          case checkEndsWith(['vetur.config.js', 'vetur.config.ts', 'vue.config.js', 'vue.config.ts']):
            return 'vue-config'
          case checkEndsWith(['wakatime-project']):
            return 'wakatime'
          case checkEndsWith(['wallaby.conf.js', 'wallaby.js']):
            return 'wallaby'
          case checkEndsWith(['webpack.base.cjs', 'webpack.base.js', 'webpack.base.ts', 'webpack.cjs', 'webpack.client.cjs', 'webpack.client.js', 'webpack.client.ts', 'webpack.common.cjs', 'webpack.common.js', 'webpack.common.ts', 'webpack.config.babel.js', 'webpack.config.babel.ts', 'webpack.config.base.babel.js', 'webpack.config.base.babel.ts', 'webpack.config.base.cjs', 'webpack.config.base.js', 'webpack.config.base.ts', 'webpack.config.cjs', 'webpack.config.client.cjs', 'webpack.config.client.js', 'webpack.config.client.ts', 'webpack.config.coffee', 'webpack.config.common.babel.js', 'webpack.config.common.babel.ts', 'webpack.config.common.cjs', 'webpack.config.common.js', 'webpack.config.common.ts', 'webpack.config.dev.babel.js', 'webpack.config.dev.babel.ts', 'webpack.config.dev.cjs', 'webpack.config.dev.js', 'webpack.config.dev.ts', 'webpack.config.js', 'webpack.config.prod.babel.cjs', 'webpack.config.prod.babel.js', 'webpack.config.prod.babel.ts', 'webpack.config.prod.cjs', 'webpack.config.prod.js', 'webpack.config.prod.ts', 'webpack.config.production.babel.js', 'webpack.config.production.babel.ts', 'webpack.config.production.cjs', 'webpack.config.production.js', 'webpack.config.production.ts', 'webpack.config.server.cjs', 'webpack.config.server.js', 'webpack.config.server.ts', 'webpack.config.staging.babel.js', 'webpack.config.staging.babel.ts', 'webpack.config.staging.cjs', 'webpack.config.staging.js', 'webpack.config.staging.ts', 'webpack.config.test.cjs', 'webpack.config.test.js', 'webpack.config.test.ts', 'webpack.config.ts', 'webpack.config.vendor.cjs', 'webpack.config.vendor.js', 'webpack.config.vendor.production.cjs', 'webpack.config.vendor.production.js', 'webpack.config.vendor.production.ts', 'webpack.config.vendor.ts', 'webpack.dev.cjs', 'webpack.dev.js', 'webpack.dev.ts', 'webpack.development.cjs', 'webpack.development.js', 'webpack.development.ts', 'webpack.dist.cjs', 'webpack.dist.js', 'webpack.dist.ts', 'webpack.js', 'webpack.mix.cjs', 'webpack.mix.js', 'webpack.prod.cjs', 'webpack.prod.config.cjs', 'webpack.prod.config.js', 'webpack.prod.js', 'webpack.prod.ts', 'webpack.production.cjs', 'webpack.production.js', 'webpack.production.ts', 'webpack.server.cjs', 'webpack.server.js', 'webpack.server.ts', 'webpack.test.cjs', 'webpack.test.js', 'webpack.test.ts', 'webpack.ts', 'webpackfile.cjs', 'webpackfile.js', 'webpackfile.ts',]):
            return 'webpack'
          case checkEndsWith(['windi.config.cjs', 'windi.config.js', 'windi.config.json', 'windi.config.ts']):
            return 'windicss'
          case checkEndsWith(['e2e-spec.cjs', 'e2e-spec.js', 'e2e-spec.mjs', 'js.snap', 'spec.cjs', 'spec.js', 'spec.mjs', 'test.cjs', 'test.js', 'test.mjs']):
            return 'test-js'
          case checkEndsWith(['jsx.snap', 'spec.jsx', 'spec.tsx', 'test.jsx', 'test.tsx', 'tsx.snap']):
            return 'test-jsx'
          case checkEndsWith(['e2e-spec.ts', 'spec.ts', 'test.ts', 'ts.snap']):
            return 'test-ts'
          case checkEndsWith(['d.ts']):
            return 'typescript-def'
          case checkEndsWith(['xml.dist', 'xml.dist.sample']):
            return 'xml'
          case checkEndsWith(['yaml.dist', 'yml.dist']):
            return 'yaml'
          case checkEndsWith(['yarn-error.log', 'yarn.lock', 'yarnrc.yaml', 'yarnrc.yml']):
            return 'yarn'
          case (typeof computedIcon === 'string'):
            return computedIcon
          default:
            return 'file'
        }
      }
    },
    name: 'file',
    props: {
      collapse: Boolean,
      fileData: [Array, Object]
    },
    static: {
      fileIcons: {
        '3d': ['ac', 'blend', 'mesh', 'mqo', 'obj', 'pmd', 'pmx', 'skp', 'stl', 'vac', 'vdp', 'vox'],
        abc: ['abc'],
        actionscript: ['as'],
        ada: ['ada', 'adb', 'ads', 'ali'],
        advpl_include: ['ch'],
        advpl_prw: ['prw', 'prx'],
        advpl_ptm: ['ptm'],
        advpl_tlpp: ['tlpp'],
        apiblueprint: ['apib', 'apiblueprint'],
        android: ['apk', 'dex', 'smali'],
        angular: ['ng-template'],
        applescript: ['applescript', 'ipa'],
        asciidoc: ['ad', 'adoc', 'asciidoc'],
        astro: ['astro'],
        astyle: ['astylerc'],
        arduino: ['ino'],
        assembly: ['a51', 'aea', 'agc', 'ags', 'argus', 'asm', 'binsource', 'inc', 'mitigus', 'ms', 'nasm', 's'],
        audio: ['aiff', 'flac', 'm4a', 'mp3', 'wav', 'wma'],
        autohotkey: ['ahk'],
        autoit: ['au3'],
        azure: ['azcli'],
        babel: ['babelrc'],
        bazel: ['bazel', 'bazelignore', 'bazelrc', 'bazelversion', 'bzl'],
        ballerina: ['bal', 'balx'],
        bicep: ['bicep'],
        bithound: ['bithoundrc'],
        blink: ['blink'],
        bower: ['bowerrc'],
        brainfuck: ['b', 'bf'],
        browserlist: ['browserslistrc'],
        buck: ['buckconfig'],
        bucklescript: ['cmj'],
        c: ['c', 'i', 'mi'],
        cabal: ['cabal'],
        cake: ['cake'],
        certificate: ['cer', 'cert', 'crt'],
        chess: ['fen', 'pgn'],
        clojure: ['clj', 'cljc', 'cljs'],
        cloudfoundry: ['cfignore'],
        cmake: ['cmake'],
        coconut: ['coco'],
        cobol: ['cbl', 'cob'],
        coffee: ['coffee', 'cson', 'iced'],
        coldfusion: ['cfc', 'cfm', 'cfml', 'lucee'],
        commitlint: ['commitlintrc'],
        console: ['awk', 'bash', 'bat', 'cmd', 'csh', 'exp', 'fish', 'ksh', 'sh', 'tcsh', 'zsh'],
        cpp: ['c++', 'cc', 'cp', 'cpp', 'cxx', 'ii', 'mii', 'mm'],
        crystal: ['cr', 'ecr'],
        csharp: ['cs', 'csx'],
        css: ['css'],
        coala: ['coafile', 'coarc'],
        command: ['command'],
        cucumber: ['feature'],
        cuda: ['cu', 'cuh'],
        d: ['d'],
        dart: ['dart', 'pubignore'],
        database: ['accdb', 'db', 'db3', 'mdb', 'pdb', 'pgsql', 'pkb', 'pks', 'postgres', 'psql', 'sql', 'sqlite', 'sqlite3'],
        denizenscript: ['dsc'],
        dhall: ['dhall', 'dhallb'],
        dinophp: ['bubble'],
        disc: ['iso'],
        django: ['djt'],
        docker: ['dockerfile', 'dockerignore'],
        document: ['txt'],
        dotjs: ['def', 'dot', 'jst'],
        drawio: ['dio', 'drawio'],
        edge: ['edge'],
        editorconfig: ['editorconfig'],
        ejs: ['ejs'],
        elixir: ['eex', 'ex', 'exs', 'heex', 'leex'],
        elm: ['elm'],
        email: ['ics', 'mailmap'],
        ember: ['ember-cli'],
        erlang: ['erl'],
        eslint: ['eslintrc', 'eslintcache', 'eslintignore'],
        exe: ['exe', 'msi'],
        firebase: ['firebaserc'],
        flash: ['swf'],
        flow: ['flowconfig'],
        fortran: ['f', 'f03', 'f08', 'f77', 'f90', 'f95'],
        fsharp: ['fs', 'fsi', 'fsproj', 'fsx'],
        font: ['bmap', 'eot', 'fnt', 'fonts', 'mrf', 'ntf', 'odttf', 'otf', 'sui', 'suit', 'ttc', 'ttf', 'woff', 'woff2'],
        forth: ['4th', 'frt', 'fth'],
        foxpro: ['fxp', 'prg'],
        gcp: ['gcloudignore'],
        gemini: ['gmi', 'gemini'],
        git: ['gitattributes', 'gitconfig', 'gitignore', 'gitignore_global', 'gitkeep', 'gitmodules', 'patch'],
        go: ['go'],
        godot: ['gd'],
        'godot-assets': ['godot', 'tres', 'tscn'],
        gradle: ['gradle'],
        grain: ['gr'],
        graphcool: ['graphcool'],
        graphql: ['gql', 'graphql', 'graphqlconfig', 'graphqlrc'],
        groovy: ['groovy'],
        h: ['h'],
        hack: ['hhconfig'],
        haml: ['haml'],
        handlebars: ['hbs', 'mustache'],
        haskell: ['hs'],
        haxe: ['hx'],
        hcl: ['hcl'],
        helm: ['helmignore'],
        http: ['http', 'rest'],
        hex: ['bin', 'dat', 'hex'],
        hpp: ['h++', 'hh', 'hp', 'hpp', 'hxx', 'inl', 'tcc'],
        html: ['asp', 'htm', 'html', 'html_vm', 'xhtml'],
        husky: ['huskyrc'],
        i18n: ['mo', 'po', 'pot'],
        idris: ['ibc', 'idr'],
        image: ['afphoto', 'ami', 'apx', 'ase', 'aseprite', 'bmp', 'bpg', 'brk', 'clip', 'cpt', 'cur', 'dds', 'dng', 'eps', 'exr', 'fpx', 'gbr', 'gif', 'heic', 'heif', 'ico', 'img', 'jb2', 'jbig2', 'jfif', 'jng', 'jpeg', 'jpg', 'jxr', 'kra', 'mdp', 'ora', 'pbm', 'pdn', 'pgf', 'pgm', 'pic', 'png', 'pnm', 'ppm', 'psb', 'psd', 'raw', 'reb', 'sai', 'tga', 'tif', 'tiff', 'webp', 'xcf'],
        imba: ['imba'],
        istanbul: ['nycrc'],
        jar: ['jar'],
        java: ['java', 'jsp'],
        javaclass: ['class'],
        javascript: ['esx', 'js', 'mjs'],
        jenkins: ['jenkins'],
        jinja: ['j2', 'jinja', 'jinja2', 'jinja-html'],
        jest: ['jestrc'],
        julia: ['jl'],
        jupyter: ['ipynb'],
        json: ['esformatter', 'jsbeautifyrc', 'jscsrc', 'jshintrc', 'json', 'json5', 'jsonl', 'lintstagedrc', 'ndjson', 'tsbuildinfo'],
        key: ['asc', 'gpg', 'htpasswd', 'key', 'passwd', 'pem', 'pub'],
        kivy: ['kv'],
        kl: ['kl'],
        kotlin: ['kt', 'kts'],
        kusto: ['kql'],
        less: ['less'],
        lib: ['bib', 'lib'],
        lilypond: ['ly'],
        lisp: ['cl', 'fast', 'lisp', 'lsp'],
        livescript: ['ls'],
        liquid: ['liquid'],
        lock: ['lock'],
        log: ['log'],
        lolcode: ['lol'],
        lua: ['lua', 'luacheckrc'],
        markdown: ['markdown', 'md', 'rst'],
        markojs: ['marko'],
        mathematica: ['nb'],
        merlin: ['merlin'],
        meson: ['wrap'],
        mdx: ['mdx'],
        minecraft: ['mcfunction'],
        mint: ['mint'],
        mjml: ['mjml', 'mjmlconfig'],
        modernizr: ['modernizrrc'],
        moonscript: ['moon'],
        mxml: ['mxml'],
        nim: ['nim', 'nimble'],
        nix: ['nix'],
        nodejs: ['esmrc', 'node-version', 'nvmrc'],
        npm: ['npmignore', 'npmrc'],
        nrwl: ['nxignore'],
        nuget: ['nupkg', 'nuspec'],
        nunjucks: ['njk', 'nunjucks'],
        ocaml: ['cmx', 'ml', 'mli'],
        odin: ['odin'],
        opa: ['rego'],
        opam: ['opam'],
        pascal: ['pas'],
        pawn: ['amx', 'pwn'],
        pdf: ['pdf'],
        perl: ['pm', 'raku'],
        php: ['php'],
        pipeline: ['pipeline'],
        postcss: ['pcss', 'postcssrc', 'sss'],
        posthtml: ['posthtmlrc'],
        powerpoint: ['potm', 'potx', 'ppa', 'ppam', 'pps', 'ppsm', 'ppsx', 'ppt', 'pptm', 'pptx'],
        powershell: ['ps1', 'psm1', 'psd1', 'ps1xml', 'psc1', 'pssc'],
        puppet: ['pp'],
        purescript: ['pure', 'purs'],
        prettier: ['prettierignore', 'prettierrc'],
        prisma: ['prisma'],
        processing: ['pde'],
        prolog: ['p', 'pl', 'pro'],
        proto: ['proto'],
        pug: ['jade', 'pug', 'pug-lintrc'],
        python: ['py'],
        'python-misc': ['pyc', 'pylintrc', 'python-version', 'whl'],
        qsharp: ['qs'],
        r: ['r', 'rhistory', 'rmd'],
        racket: ['rkt'],
        raml: ['raml'],
        razor: ['cshtml', 'vbhtml'],
        react: ['jsx'],
        react_ts: ['tsx'],
        reason: ['re', 'rei'],
        red: ['red'],
        renovate: ['renovaterc'],
        replit: ['replit'],
        rescript: ['res', 'resi'],
        restql: ['restql', 'rql'],
        riot: ['riot', 'tag'],
        robot: ['robot'],
        ruby: ['erb', 'rb'],
        rust: ['rs'],
        san: ['san'],
        sas: ['ast', 'astore', 'sas', 'sas7bdat', 'sashdat', 'sast'],
        sass: ['sass', 'scss'],
        sbt: ['sbt'],
        scala: ['sc', 'scala'],
        scheme: ['scm', 'ss'],
        search: ['code-search'],
        settings: ['buildignore', 'cfg', 'clang-format', 'clang-tidy', 'conf', 'config', 'dlc', 'dll', 'ini', 'jshintignore', 'mrconfig', 'option', 'prefs', 'prop', 'props', 'properties', 'settings', 'toml', 'yardopts'],
        'semantic-release': ['releaserc'],
        sequelize: ['sequelizerc'],
        shaderlab: ['unity'],
        sketch: ['sketch'],
        slim: ['slim'],
        slug: ['slugignore'],
        smarty: ['tpl'],
        sml: ['cm', 'fun', 'grm', 'lex', 'mlb', 'mlton', 'sig', 'sml', 'use'],
        solidity: ['sol'],
        stylelint: ['stylelintrc'],
        stylus: ['styl'],
        sublime: ['sublime-project', 'sublime-workspace'],
        svelte: ['svelte'],
        svg: ['svg'],
        swc: ['swc'],
        swift: ['swift'],
        snyk: ['snyk'],
        table: ['csv', 'tsv', 'xls', 'xlsx'],
        tcl: ['tcl'],
        teal: ['tl'],
        terraform: ['tf', 'tfstate', 'tfvars'],
        template: ['template'],
        tex: ['dtx', 'ltx', 'sty', 'tex'],
        textlint: ['textlintrc'],
        todo: ['todo'],
        twig: ['twig'],
        twine: ['tw', 'twee'],
        typescript: ['ts'],
        uml: ['iuml', 'plantuml', 'pu', 'puml', 'wsd'],
        url: ['url'],
        vala: ['vala'],
        velocity: ['fhtml', 'vm', 'vtl'],
        vercel: ['nowignore', 'vercelignore'],
        verilog: ['sv', 'svh', 'vhd'],
        vfl: ['vfl'],
        video: ['avi', 'flv', 'gifv', 'm2v', 'm4v', 'mkv', 'mov', 'mp2', 'mp4', 'mpe', 'mpeg', 'mpg', 'mpv', 'ogg', 'ogv', 'qt', 'rm', 'rmvb', 'vob', 'webm', 'wmv', 'yuv'],
        vim: ['exrc', 'gvimrc', 'vim', 'viminfo', 'vimrc'],
        virtual: ['vbox', 'vbox-prev', 'vdi'],
        visualstudio: ['csproj', 'ruleset', 'sln', 'suo', 'vb', 'vbs', 'vcxitems', 'vcxproj'],
        vlang: ['v'],
        vscode: ['code-workplace', 'vscodeignore', 'vsix', 'vsixmanifest'],
        vue: ['vue'],
        watchman: ['watchmanconfig'],
        webassembly: ['wasm', 'wat'],
        webhint: ['hintrc'],
        wepy: ['wpy'],
        wolframlanguage: ['wl', 'wls'],
        word: ['doc', 'docx', 'rtf'],
        xaml: ['xaml'],
        xml: ['dmn', 'dtd', 'htaccess', 'iml', 'manifest', 'plist', 'project', 'resx', 'tmlanguage', 'xml', 'xquery', 'xsd', 'xsl', 'xslt'],
        yaml: ['yaml', 'yaml-tmlanguage', 'yml'],
        yang: ['yang'],
        yarn: ['yarnclean', 'yarn-integrity', 'yarnrc'],
        zig: ['zig'],
        zip: ['7z', 'br', 'brotli', 'bzip2', 'gz', 'gzip', 'rar', 'tar', 'tgz', 'xz', 'zip'],
      },
      iconCircle: 'm21,12a9,9 0 1 1 -18,0a9,9 0 0 1 18,0z',
      iconDownload: iconDownload,
      iconEye: ['M15 12a3 3 0 11-6 0 3 3 0 016 0z', 'M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'],
      iconFolder: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z',
      iconSemicircle: 'm21.05711,12a9,9 0 1 1 -18,0'
    }
  }
</script>