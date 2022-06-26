<template>
  <main v-if = "js">
    <div v-if = "$store.state.error" class = "bg-white l:w-3/4 mx-auto py-6 rounded-lg shadow w-full dark:bg-black dark:shadow-none">
      <p class = "font-semibold mx-6 text-2xl">Error</p>
      <hr class = "border-grayLightest border-t-2 mt-2.5 mx-6 dark:border-grayDarkest">
      <p class = "mt-5 mx-6">{{$store.state.error}}</p>
      <button @click = "$store.commit('setState', {
        property: autoConfig ? ['autoConfig', 'authToken', 'chosenDeploy', 'error'] : 'error',
        value: autoConfig ? [false, null, null, null] : null
      })" class = "bg-grayLighter flex hover:bg-tealLightest items-center mx-6 mt-5 px-4 py-2 rounded-md space-x-1 text-black dark:bg-grayDarker dark:hover:bg-grayDarkest dark:text-white">Retry</button>
    </div>
    <template v-else>
      <template v-if = "$store.state.authToken">
        <div v-if = "!userName" class = "bg-white l:w-3/4 mx-auto py-6 rounded-lg shadow w-full dark:bg-black dark:shadow-none">
          <div class = "animate-pulse bg-grayLighter h-8 mx-6 w-3/4 s:w-1/2 dark:bg-tealDarker"></div>
          <hr class = "border-grayLightest border-t-2 mt-2.5 mx-6 dark:border-grayDarkest">
          <div class = "animate-pulse bg-grayLighter h-4 mt-5 mx-6 w-3/4 dark:bg-tealDarker s:w-1/3"></div>
        </div>
        <template v-else>
          <div v-if = "!autoConfig" class = "bg-white l:w-3/4 mx-auto py-6 rounded-lg shadow w-full dark:bg-black dark:shadow-none">
            <div class = "flex items-center mx-6">
              <p class = "font-semibold text-2xl">Welcome {{userName}}</p>
              <button @click = "stopDownload(); $store.commit('setState', {
                property: ['authToken', 'chosenDeploy', 'chosenSite'],
                value: [null, null, null]
              }); chosenAccount = userAccounts = userBranches = userDeploys = userFiles = userFilesNlm = userFilesOrganized = userName = userSince = userSites = null; downloaded = pageAccount = pageDeploy = pageSite = userFileCount = userFileNlmSize = userFileSize = 0; searchAccount = searchSite = ''; searchDeploy = 'All';" class = "bg-redDarker flex font-medium hover:bg-redDarkest items-center justify-center ml-auto px-4 py-2 rounded-md text-white dark:bg-redLighter dark:hover:bg-redLightest dark:text-redDarkest s:space-x-1">
                <span class = "hidden s:inline">Logout</span>
                <icon :path = "$options.static.iconLogout" size = "5"/>
              </button>
            </div>
            <hr class = "border-grayLightest border-t-2 mt-2.5 mx-6 dark:border-grayDarkest">
            <p class = "mt-5 mx-6">User since {{userSinceFormatted}}</p>
          </div>
          <div v-if = "!autoConfig && !chosenAccount" class = "bg-white l:w-3/4 mt-5 mx-auto py-6 rounded-lg shadow w-full dark:bg-black dark:shadow-none">
            <div class = "flex items-center mx-6">
              <button @click = "$store.state.downloadStop.abort(); $store.commit('setState', {
                property: 'authToken',
                value: null
              }); userAccounts = userName = null; pageAccount = 0; searchAccount = ''" class = "bg-grayLighter flex hover:bg-tealLightest items-center justify-center px-4 py-2 rounded-md text-black dark:bg-grayDarker dark:hover:bg-grayDarkest dark:text-white s:space-x-1">
                <icon :path = "$options.static.iconArrowLeft" size = "5"/>
                <span class = "hidden s:inline">Back</span>
              </button>
              <p class = "font-semibold ml-2.5 text-2xl">Accounts</p>
              <button v-if = "userAccounts" @click = "userAccounts = null; pageAccount = 0; searchAccount = ''; accountApi()" class = "bg-grayLighter flex hover:bg-tealLightest items-center justify-center ml-auto px-4 py-2 rounded-md text-black dark:bg-grayDarker dark:hover:bg-grayDarkest dark:text-white s:space-x-1">
                <span class = "hidden s:inline">Refresh</span>
                <icon :path = "$options.static.iconRefresh" size = "5"/>
              </button>
            </div>
            <hr class = "border-grayLightest border-t-2 mt-2.5 mx-6 dark:border-grayDarkest">
            <template v-if = "!userAccounts">
              <skeleton v-for = "index in 3" :index = "index" :key = "index" :max = "3" type = "account"/>
            </template>
            <template v-else>
              <search v-model:value = "searchAccount" class = "mt-5" placeholder = "accounts"/>
              <div class = "mt-5">
                <template v-if = "filteredAccounts.length > 0">
                  <item v-for = "account in paginate(filteredAccounts, pageAccount)" :dataStructure = "account" :disabled = "disabled('account', account)" :key = "account.id" @click = "disabled('account', account) ? null : siteApi(account.slug)" type = "account"/>
                  <paginate :max = "maxPage(filteredAccounts)" v-model:value = "pageAccount"/>
                </template>
                <p v-else class = "mx-6">No results found</p>
              </div>
            </template>
          </div>
          <div v-if = "!autoConfig && !$store.state.chosenSite && chosenAccount" class = "bg-white l:w-3/4 mt-5 mx-auto py-6 rounded-lg shadow w-full dark:bg-black dark:shadow-none">
            <div class = "flex items-center mx-6">
              <button @click = "$store.state.downloadStop.abort(); chosenAccount = userSites = null; pageSite = 0; searchSite = '';" class = "bg-grayLighter flex hover:bg-tealLightest items-center justify-center px-4 py-2 rounded-md text-black dark:bg-grayDarker dark:hover:bg-grayDarkest dark:text-white s:space-x-1">
                <icon :path = "$options.static.iconArrowLeft" size = "5"/>
                <span class = "hidden s:inline">Back</span>
              </button>
              <p class = "font-semibold ml-2.5 text-2xl">Sites</p>
              <button v-if = "userSites" @click = "userSites = null; pageSite = 0; searchSite = ''; siteApi(chosenAccount)" class = "bg-grayLighter flex hover:bg-tealLightest items-center justify-center ml-auto px-4 py-2 rounded-md text-black dark:bg-grayDarker dark:hover:bg-grayDarkest dark:text-white s:space-x-1">
                <span class = "hidden s:inline">Refresh</span>
                <icon :path = "$options.static.iconRefresh" size = "5"/>
              </button>
            </div>
            <hr class = "border-grayLightest border-t-2 mt-2.5 mx-6 dark:border-grayDarkest">
            <template v-if = "!userSites">
              <skeleton v-for = "index in 5" :index = "index" :key = "index" :max = "5" type = "site"/>
            </template>
            <template v-else>
              <search v-model:value = "searchSite" class = "mt-5" placeholder = "sites"/>
              <div class = "mt-5">
                <template v-if = "filteredSites.length > 0">
                  <item v-for = "site in paginate(filteredSites, pageSite)" :dataStructure = "site" :key = "site.id" @click = "deployApi(site.id)" type = "site"/>
                  <paginate :max = "maxPage(filteredSites)" v-model:value = "pageSite"/>
                </template>
                <p v-else class = "mx-6">No results found</p>
              </div>
            </template>
          </div>
          <div v-if = "!autoConfig && !$store.state.chosenDeploy && $store.state.chosenSite" class = "bg-white l:w-3/4 mt-5 mx-auto py-6 rounded-lg shadow w-full dark:bg-black dark:shadow-none">
            <div class = "flex items-center mx-6">
              <button @click = "$store.state.downloadStop.abort(); $store.commit('setState', {
                property: 'chosenSite',
                value: null
              }); userBranches = userDeploys = null; pageDeploy = 0; searchDeploy = 'All'" class = "bg-grayLighter flex hover:bg-tealLightest items-center justify-center px-4 py-2 rounded-md text-black dark:bg-grayDarker dark:hover:bg-grayDarkest dark:text-white s:space-x-1">
                <icon :path = "$options.static.iconArrowLeft" size = "5"/>
                <span class = "hidden s:inline">Back</span>
              </button>
              <p class = "font-semibold ml-2.5 text-2xl">Deploys</p>
              <button v-if = "userDeploys" @click = "userBranches = userDeploys = null; pageDeploy = 0; searchDeploy = 'All'; deployApi($store.state.chosenSite)" class = "bg-grayLighter flex hover:bg-tealLightest items-center justify-center ml-auto px-4 py-2 rounded-md text-black dark:bg-grayDarker dark:hover:bg-grayDarkest dark:text-white s:space-x-1">
                <span class = "hidden s:inline">Refresh</span>
                <icon :path = "$options.static.iconRefresh" size = "5"/>
              </button>
            </div>
            <hr class = "border-grayLightest border-t-2 mt-2.5 mx-6 dark:border-grayDarkest">
            <template v-if = "!userDeploys">
              <skeleton v-for = "index in 5" :index = "index" :key = "index" :max = "5" type = "deploy"/>
            </template>
            <template v-else>
              <div class = "mt-5 mx-6 relative s:w-1/2">
                <div @click = "$event.target.parentElement.classList.toggle('expanded')" class = "bg-white border-2 border-grayLighter cursor-pointer font-medium hover:border-tealLighter px-6 py-1.5 rounded-md w-full dark:bg-black dark:border-grayDarkest dark:hover:border-tealLightest">{{searchDeploy}}</div>
                <icon :path = "$options.static.iconSelector" class = "absolute cursor-pointer inset-y-2.5 pointer-events-none right-2.5 text-grayDarkest" size = "5"/>
                <div class = "absolute bg-white border-2 border-grayLighter hidden max-h-0 mt-1 overflow-hidden rounded-md w-full z-10 dark:bg-black dark:border-grayDarkest dark:hover:border-tealLightest">
                  <div class = "max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-tealLighter scrollbar-track-tealDarkest">
                    <div @click = "setBranch($event, 'All')" class = "even:bg-grayLightest cursor-pointer hover:bg-grayLightest px-6 py-2 truncate w-full dark:even:bg-tealDarker dark:hover:bg-tealDarker">All</div>
                    <div v-for = "branch in userBranches" @click = "setBranch($event, branch)" :key = "branch" class = "even:bg-grayLightest cursor-pointer hover:bg-grayLightest px-6 py-2 truncate w-full dark:even:bg-tealDarker dark:hover:bg-tealDarker">{{branch}}</div>
                    <div v-if = "userDeploys.some(deploy => deploy.context === 'deploy-preview' && deploy.review_id)" @click = "setBranch($event, 'Deploy previews')" class = "even:bg-grayLightest cursor-pointer hover:bg-grayLightest px-6 py-2 truncate w-full dark:even:bg-tealDarker dark:hover:bg-tealDarker">Deploy previews</div>
                  </div>
                </div>
              </div>
              <div class = "mt-5">
                <item v-for = "deploy in paginate(filteredDeploys, pageDeploy)" :dataStructure = "deploy" :deployIndex = "userDeploys.findIndex(item => item.id === deploy.id)" :disabled = "disabled('deploy', deploy)" :key = "deploy.id" :totalDeploys = "userDeploys.length" @click = "disabled('deploy', deploy) ? null : deploy.nlm ? assetApi(deploy.id) : fileApi(deploy.id)" type = "deploy"/>
                <paginate :max = "maxPage(filteredDeploys)" v-model:value = "pageDeploy"/>
              </div>
            </template>
          </div>
          <template v-if = "$store.state.chosenDeploy">
            <div class = "bg-white l:w-3/4 mt-5 mx-auto py-6 rounded-lg shadow w-full dark:bg-black dark:shadow-none">
              <div class = "flex items-center mx-6">
                <button v-if = "!autoConfig" @click = "stopDownload(); $store.commit('setState', {
                  property: 'chosenDeploy',
                  value: null
                }); userFiles = userFilesNlm = userFilesOrganized = null; userFileNlmSize = userFileSize = 0" class = "bg-grayLighter flex hover:bg-tealLightest items-center justify-center px-4 py-2 rounded-md text-black dark:bg-grayDarker dark:hover:bg-grayDarkest dark:text-white s:space-x-1">
                  <icon :path = "$options.static.iconArrowLeft" size = "5"/>
                  <span class = "hidden s:inline">Back</span>
                </button>
                <button v-else @click = "stopDownload(); autoConfig = false; $store.commit('setState', {
                  property: ['chosenDeploy', 'chosenSite'],
                  value: [null, null]
                }); userFiles = userFilesNlm = userFilesOrganized = null; userFileNlmSize = userFileSize = 0; accountApi()" class = "bg-grayLighter flex hover:bg-tealLightest items-center justify-center px-4 py-2 rounded-md text-black dark:bg-grayDarker dark:hover:bg-grayDarkest dark:text-white s:space-x-1">
                  <icon :path = "$options.static.iconRefresh" size = "5"/>
                  <span class = "hidden s:inline">Reset</span>
                </button>
                <p class = "font-semibold ml-2.5 text-2xl">Files</p>
                <button v-if = "userFiles" @click = "toggleModal('download'); downloaded === 0 && downloadAll(true)" class = "bg-grayLighter flex hover:bg-tealLightest items-center justify-center ml-auto px-4 py-2 rounded-md text-black dark:bg-grayDarker dark:hover:bg-grayDarkest dark:text-white s:space-x-1">
                  <span class = "hidden s:inline">Download all</span>
                  <icon :path = "$options.static.iconDownload" size = "5"/>
                </button>
              </div>
              <hr class = "border-grayLightest border-t-2 mt-2.5 mx-6 dark:border-grayDarkest">
              <template v-if = "!userFiles">
                <div class = "animate-pulse bg-grayLighter h-4 mt-5 mx-6 rounded w-3/4 dark:bg-tealDarker"></div>
                <div v-for = "index in 10" :key = "index" class = "flex items-center mt-5 mx-6 space-x-2.5">
                  <div class = "animate-pulse bg-grayLighter h-5 rounded w-5 dark:bg-tealDarker"></div>
                  <div class = "animate-pulse bg-grayLighter h-5 rounded w-60 dark:bg-tealDarker"></div>
                </div>
              </template>
              <template v-else>
                <p class = "mt-5 mx-6">
                  <span>Total files: {{userFiles.length}}</span>
                  <span v-if = "userFilesNlm">&nbsp;({{userFilesNlm.length}} in Netlify Large Media)</span>
                </p>
                <p class = "mt-1 mx-6">
                  <span>Total size: ~{{size(userFileSize)}}</span>
                  <span v-if = "userFilesNlm">&nbsp;(+ {{size(userFileNlmSize)}} from Netlify Large Media)</span>
                </p>
                <file v-if = "userFilesOrganized" :fileData = "userFilesOrganized" class = "mt-5 space-y-5"/>
                <p v-else-if = "userFiles.length > 5000" class = "mx-6">This deploy includes more than 5000 files. It's not safe to preview such a big deploy in the browser. Thus, click on <strong>Download all</strong> button in the top right of this card to directly download the deploy.</p>
              </template>
            </div>
          </template>
        </template>
      </template>
      <div v-else class = "bg-white l:w-3/4 mx-auto py-6 rounded-lg shadow w-full dark:bg-black dark:shadow-none">
        <p class = "font-semibold text-2xl mx-6">Deploy Browser</p>
        <hr class = "border-grayLightest border-t-2 mt-2.5 mx-6 dark:border-grayDarkest">
        <div class = "mt-5">
          <p class = "mx-6">Not sure what you deployed? Getting countless 404s? Or just wanna browse your generated project's file structure?</p>
          <p class = "mt-5 mx-6">Known limitations:</p>
          <ul class = "list-disc mt-2.5 ml-12 mr-6">
            <li>Previewing might not be compatible depending on your site's redirects' configuration. For example, if you're using HTTP Auth, RBAC, or are redirecting your pages to a different URL, the preview would work exactly like your actual website.</li>
            <li>
              <span>Files hosted with Netlify Large Media cannot be downloaded by this tool in their original version. You'd get a Git pointer for those files. To download the actual file, you'd have to use the preview. Such files are marked with the&nbsp;</span>
              <span class = "bg-goldLightest font-semibold px-1.5 py-0.5 rounded-md text-goldDarkest text-sm w-max dark:bg-goldDarkest dark:text-goldLighter">NLM</span>
              <span>&nbsp;badge.</span>
            </li>
            <li>
              <span>Files in&nbsp;</span>
              <code class = "bg-code px-2 py-1 rounded-sm dark:bg-pageBG">/.netlify/</code>
              <span>&nbsp;path like Netlify Functions cannot be downloaded or previewed.</span>
            </li>
            <li>The higher the number of files in the deploy, the longer it takes to generate the file tree. The process will eventually finish, but could cause the page to go unresponsive while it's going on. Thus, deploys over 5000 files can potentially freeze the browser. If your deploy contains more files than that, a file tree would not be generated and you would have to directly download it to your device.</li>
            <li>
              <span>Downloading a large file (usually over than 500 MiB) individually might fail on some devices as the UI uses&nbsp;</span>
              <code class = "bg-code px-2 py-1 rounded-sm dark:bg-pageBG">blob</code>
              <span>&nbsp;to save those files temporarily. This storage's quota is based on user's device's and browser's limitations.</span>
            </li>
            <li>Downloading might fail due to content blocking scripts. Make sure your browser is using minimum to no extensions when downloading the files.</li>
            <li>
              <span>Cancelling a full-deploy download from the browser won't cancel the process in the UI. It's because of&nbsp;</span>
              <a href = "https://www.github.com/jimmywarting/StreamSaver.js/issues/13/" rel = "nofollow noopener noreferrer" target = "_blank">
                <span class = "underline">this issue</span>
                <icon :path = "$options.static.iconExternalLink" class = "align-top" size = "4"/>
              </a>.
              <span>Use the cancel button next to the progress bar.</span>
            </li>
          </ul>
          <p class = "font-semibold mt-5 mx-6">NOTE: Do not share the link that will redirect you to this application with anyone. It contains your access token that can be exploited to act on your behalf on Netlify.</p>
          <button @click = "authorizeNetlify" class = "bg-tealDarker flex font-medium hover:bg-tealDarkest items-center justify-center mt-5 mx-6 px-4 py-2 rounded-md space-x-1 text-white dark:bg-tealLighter dark:hover:bg-tealLightest dark:text-tealDarkest">
            <icon :path = "$options.static.iconNetlify" size = "5" fill/>
            <span>Login with Netlify</span>
          </button>
        </div>
      </div>
    </template>
    <div class = "flex flex-wrap items-center l:w-3/4 mt-5 mx-auto space-y-2.5 w-full s:space-y-0">
      <p class = "text-center w-full s:border-r s:pr-2.5 s:text-left s:w-auto">&copy; {{copyright}} Hrishikesh Kokate</p>
      <button @click = "toggleModal('about')" class = "text-center w-full s:pl-2.5 s:text-left s:w-auto">About</button>
      <button @click = "toggleTheme" class = "bg-grayLighter flex font-medium justify-center hover:bg-tealLightest items-center ml-auto px-4 py-2 rounded-md dark:bg-grayDarker dark:hover:bg-grayDarkest s:space-x-1">
        <span class = "hidden s:inline">Toggle theme</span>
        <icon :path = "theme === 'dark' ? $options.static.iconSun : $options.static.iconMoon" size = "5"/>
      </button>
    </div>
    <div v-if = "modal" @click.self = "toggleModal" class = "bg-overlay fixed flex h-screen items-center left-0 p-6 top-0 w-screen">
      <div class = "bg-white l:w-3/4 mx-auto rounded-lg max-w-xl overflow-hidden shadow-lg w-full dark:bg-grayDark dark:shadow-none">
        <div class = "max-h-96 overflow-auto scrollbar-thin scrollbar-thumb-tealLighter scrollbar-track-tealDarkest">
          <template v-if = "aboutModal">
            <p class = "font-semibold text-2xl mt-6 mx-6">About</p>
            <hr class = "border-grayLightest border-t-2 mt-2.5 mx-6 dark:border-grayDarker">
            <div class = "mt-5">
              <p class = "mx-6">Deploy File Browser [Beta]</p>
              <p class = "mx-6">
                <a href = "https://www.github.com/Hrishikesh-K/netlify-file-browser/" rel = "nofollow noopener noreferrer" target = "_blank">
                  <span class = "underline">Source code on GitHub</span>
                  <icon :path = "$options.static.iconExternalLink" class = "align-top" size = "4"/>
                </a>
              </p>
              <p class = "mt-5 mx-6">Open source libraries used:</p>
              <div class = "flex flex-wrap mx-6 mt-2.5">
                <credit :homepage = "['Homepage', null]" :license = "['License', null]" name = "Name"/>
                <credit :homepage = "['Website', 'https://www.date-fns.org/']" :license = "['MIT', 'https://www.github.com/date-fns/date-fns/blob/master/LICENSE.md']" class = "mt-1" name = "date-fns"/>
                <credit :homepage = "['Website', 'https://101arrowz.github.io/fflate/']" :license = "['MIT', 'https://www.github.com/101arrowz/fflate/blob/master/LICENSE']" name = "fflate"/>
                <credit :homepage = "['GitHub', 'https://www.github.com/Nijikokun/file-size/']" :license = "['MIT', 'https://www.github.com/nijikokun/file-size/blob/master/LICENSE']" name = "file-size"/>
                <credit :homepage = "['Website', 'https://www.heroicons.com/']" :license = "['MIT', 'https://www.github.com/tailwindlabs/heroicons/blob/master/LICENSE']" name = "Heroicons"/>
                <credit :homepage = "['GitHub', 'https://www.github.com/PKief/vscode-material-icon-theme/']" :license = "['MIT', 'https://www.github.com/PKief/vscode-material-icon-theme/blob/main/LICENSE.md']" name = "Material Icon Theme"/>
                <credit :homepage = "['Website', 'https://www.tailwindcss.com/']" :license = "['MIT', 'https://www.github.com/tailwindlabs/tailwindcss/blob/master/LICENSE']" name = "TailwindCSS"/>
                <credit :homepage = "['GitHub', 'https://www.github.com/adoxography/tailwind-scrollbar/']" :license = "['MIT', 'https://www.github.com/adoxography/tailwind-scrollbar/blob/main/LICENSE']" name = "tailwind-scrollbar"/>
                <credit :homepage = "['GitHub', 'https://www.github.com/philippbosch/tailwindcss-selection-variant/']" :license = "['MIT', 'https://www.github.com/philippbosch/tailwindcss-selection-variant#license']" name = "tailwindcss-selection variant"/>
                <credit :homepage = "['Website', 'https://www.vitejs.dev/']" :license = "['MIT', 'https://www.github.com/vitejs/vite/blob/main/LICENSE']" name = "Vite"/>
                <credit :homepage = "['GitHub', 'https://www.github.com/vitejs/vite/tree/main/packages/plugin-vue']" :license = "['MIT', 'https://www.github.com/vitejs/vite/blob/main/LICENSE']" name = "@vitejs/plugin-vue"/>
                <credit :homepage = "['GitHub', 'https://www.github.com/anncwb/vite-plugin-html/']" :license = "['MIT', 'https://www.github.com/anncwb/vite-plugin-html/blob/main/LICENSE']" name = "vite-plugin-html"/>
                <credit :homepage = "['Website', 'https://v3.vuejs.org/']" :license = "['MIT', 'https://www.github.com/vuejs/vue/blob/dev/LICENSE']" name = "Vue.js"/>
                <credit :homepage = "['Website', 'https://next.router.vuejs.org/']" :license = "['MIT', 'https://www.github.com/vuejs/vue-router-next/blob/master/LICENSE']" name = "Vue Router"/>
                <credit :homepage = "['Website', 'https://next.vuex.vuejs.org/']" :license = "['MIT', 'https://www.github.com/vuejs/vuex/blob/dev/LICENSE']" name = "Vuex"/>
              </div>
            </div>
          </template>
          <template v-if = "downloadModal">
            <p class = "font-semibold text-2xl mt-5 mx-6">Downloading</p>
            <hr class = "border-grayLightest border-t-2 mt-2.5 mx-6 dark:border-grayDarker">
            <p v-if = "downloaded < userFiles.length" class = "break-all mt-5 mx-6">Now downloading {{userFiles[downloaded].path}}</p>
            <div :class = "'flex items-center mx-6 space-x-2.5 ' + (downloaded < userFiles.length ? 'mt-2.5' : 'mt-5')">
              <div class = "bg-tealDarkest h-2 relative rounded-full w-1/2">
                <div :style = "'width:' + ((downloaded / userFiles.length) * 100) + '%'" class = "absolute bg-tealLighter h-full left-0 rounded-full top-0"></div>
              </div>
              <icon v-if = "downloaded < userFiles.length" :path = "$options.static.iconXCircle" @click = "stopDownload" class = "cursor-pointer" size = "5"/>
            </div>
            <p class = "mt-1 mx-6">{{downloaded}} of {{userFiles.length}} downloaded</p>
            <p class = "mt-5 mx-6">
              <span>Files are being downloaded and zipped&nbsp;</span>
              <span class = "font-semibold">in the browser</span>
              <span>. This is consuming time and resources on your device.&nbsp;</span>
              <span class = "font-semibold">Do not close the tab/window while the download is in progress.</span>
            </p>
          </template>
          <button @click = "toggleModal" class = "bg-grayLighter font-medium hover:bg-tealLightest mb-6 mt-5 mx-6 px-4 py-2 rounded-md dark:bg-grayDarker dark:hover:bg-grayDarkest">
            <span>Close</span>
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
  import {callApi, filesize, format, getYear, iconDownload, iconExternalLink, iconXCircle, parseISO} from './assets/data'
  import credit from './components/credit.vue'
  import file from './components/file.vue'
  import icon from './components/icon.vue'
  import item from './components/item.vue'
  import paginate from './components/paginate.vue'
  import search from './components/search.vue'
  import skeleton from './components/skeleton.vue'
  import streamSaver from 'streamsaver'
  import {Zip, ZipPassThrough} from 'fflate'
  streamSaver.mitm = `${location.origin}/mitm.html`
  export default {
    components: {
      credit,
      file,
      icon,
      item,
      paginate,
      search,
      skeleton
    },
    computed: {
      copyright() {
        return getYear(new Date())
      },
      filteredAccounts() {
        this.pageAccount = 0
        if (this.searchAccount === '') {
          return this.userAccounts
        } else {
          return this.filter(this.userAccounts, this.searchAccount, 'slug')
        }
      },
      filteredDeploys() {
        this.pageDeploy = 0
        switch (this.searchDeploy) {
          case 'All':
            return this.userDeploys
          case 'Deploy previews':
            return this.userDeploys.filter(deploy => {
              return deploy.context === 'deploy-preview' && deploy.review_id
            })
          default:
            return this.userDeploys.filter(deploy => {
              return deploy.branch === this.searchDeploy
            })
        }
      },
      filteredSites() {
        this.pageSite = 0
        if (this.searchSite === '') {
          return this.userSites
        } else {
          return this.filter(this.userSites, this.searchSite, 'name')
        }
      },
      userSinceFormatted() {
        return format(parseISO(this.userSince), 'LLLL d, yyyy')
      }
    },
    data() {
      return {
        aboutModal: false,
        autoConfig: false,
        chosenAccount: null,
        downloaded: 0,
        downloadModal: false,
        js: false,
        modal: false,
        pageAccount: 0,
        pageDeploy: 0,
        pageSite: 0,
        searchAccount: '',
        searchDeploy: 'All',
        searchSite: '',
        theme: 'light',
        userAccounts: null,
        userBranches: null,
        userDeploys: null,
        userFiles: null,
        userFilesNlm: null,
        userFilesOrganized: null,
        userFileSize: 0,
        userFileNlmSize: 0,
        userName: null,
        userSince: null,
        userSites: null
      }
    },
    methods: {
      accountApi() {
        callApi('accounts').then(accounts => {
          const accountArray = []
          this.sort(accounts, 'slug').forEach(({lifecycle_state, name, slug, team_logo_url}) => {
            accountArray.push({
              lifecycle_state,
              name,
              slug,
              team_logo_url
            })
          })
          if (accountArray.length === 1) {
            const chosenAccount = accountArray[0].slug
            this.chosenAccount = chosenAccount
            this.siteApi(chosenAccount)
          }
          this.userAccounts = accountArray
        })
      },
      assetApi(deployId, page, assetArray) {
        if (!page) {
          this.$store.commit('setState', {
            property: 'chosenDeploy',
            value: deployId
          })
          assetArray = []
        }
        callApi(`large_media_assets/?site_id=${this.$store.state.chosenSite}${page ? `&page=${page}&per_page=100` : ''}`).then(assets => {
          assets.forEach(({path, size}) => {
            assetArray.push({
              path
            })
            this.userFileNlmSize += size
          })
          if (assets.length === 100) {
            this.assetApi(page ? page++ : 2, assetArray)
          } else {
            this.userFilesNlm = this.sort(assetArray, 'path')
            this.fileApi()
          }
        })
      },
      authorizeNetlify() {
        const state = Math.random()
        location.href = `https://app.netlify.com/authorize?client_id=${import.meta.env.VITE_CLIENT_ID}&response_type=token&redirect_uri=${location.origin}&state=${state}`
        localStorage.setItem(JSON.stringify(state), JSON.stringify(true))
      },
      authTokenApi() {
        callApi('user').then(({created_at, full_name}) => {
          this.userName = full_name
          this.userSince = created_at
        }).then(() => {
          if (!this.autoConfig) {
            this.accountApi()
          } else {
            callApi(`deploys/${this.$store.state.chosenDeploy}`).then(({site_capabilities}) => {
              if (site_capabilities.large_media_enabled) {
                this.assetApi(this.$store.state.chosenDeploy)
              } else {
                this.fileApi(this.$store.state.chosenDeploy)
              }
            })
          }
        })
      },
      checkTheme() {
        const selectedTheme = localStorage.getItem('theme')
        if (selectedTheme) {
          this.setTheme(selectedTheme)
        } else {
          if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.setTheme('dark')
          } else {
            this.setTheme('light')
          }
          window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', this.checkTheme)
        }
      },
      deployApi(siteId, page, deployArray, branchArray) {
        if (!page) {
          this.$store.commit('setState', {
            property: 'chosenSite',
            value: siteId
          })
          deployArray = []
          branchArray = []
        }
        callApi(`sites/${siteId}/deploys${page ? `?page=${page}&per_page=100` : ''}`).then(deploys => {
          deploys.forEach(({branch, context, created_at, id, review_id, screenshot_url, site_capabilities, state}) => {
            if (branch && !branchArray.includes(branch)) {
              branchArray.push(branch)
            }
            deployArray.push({
              branch,
              context,
              created_at,
              id,
              nlm: site_capabilities.large_media_enabled,
              review_id,
              screenshot_url,
              state
            })
          })
          if (deploys.length === 100) {
            this.deployApi(this.$store.state.chosenSite, page ? page++ : 2, deployArray, branchArray)
          } else {
            if (deployArray.length === 1) {
              this.$store.commit('setState', {
                property: 'chosenDeploy',
                value: deployArray[0].id
              })
              this.fileApi(this.$store.state.chosenDeploy)
            }
            this.userBranches = this.sort(branchArray)
            this.userDeploys = deployArray
          }
        })
      },
      disabled(type, data) {
        if (type === 'account') {
          return !(data.lifecycle_state === 'active')
        } else if (type === 'deploy') {
          return !(data.state === 'ready')
        }
      },
      downloadAll(init) {
        if (init) {
          this.$options.static.zip = new Zip()
          this.$options.static.zipReadableStream = new ReadableStream({
            start: controller => {
              this.$options.static.zip.ondata = (error, data, final) => {
                if (error) {
                  controller.error(error)
                } else {
                  controller.enqueue(data)
                  if (final) {
                    controller.close()
                  }
                }
              }
            }
          })
          this.$options.static.zipReadableStream.pipeTo(streamSaver.createWriteStream(`deploy-${this.$store.state.chosenDeploy}.zip`, {
            size: this.userFileSize
          }), {
            signal: this.$store.state.downloadStop.signal
          }).catch(error => {
            if (!(error.name === 'AbortError')) {
              this.$store.commit('setState', {
                property: 'error',
                value: `Error zipping because ${error}`
              })
            }
          })
          window.onunload = () => {
            this.stopDownload()
          }
        }
        callApi(`deploys/${this.$store.state.chosenDeploy}/files${this.userFiles[this.downloaded].path}`, true).then(async file => {
          const zippedFileStream = new ZipPassThrough(`deploy-${this.$store.state.chosenDeploy}${this.userFiles[this.downloaded].path}`)
          this.$options.static.zip.add(zippedFileStream)
          let fileReader = file.getReader()
          while (true) {
            let {done, value} = await fileReader.read()
            if (done) {
              zippedFileStream.push(new Uint8Array(0), true)
              break
            }
            zippedFileStream.push(value)
          }
        }).then(() => {
          this.downloaded++
          if (this.downloaded < this.userFiles.length) {
            this.downloadAll()
          } else {
            this.$options.static.zip.end()
            window.onunload = null
          }
        })
      },
      fileApi(deployId) {
        if (deployId) {
          this.$store.commit('setState', {
            property: 'chosenDeploy',
            value: deployId
          })
        }
        const fileList = {
          '_root': []
        }
        callApi(`deploys/${this.$store.state.chosenDeploy}/files`).then(files => {
          this.userFiles = files
          if (files.length < 5000) {
            this.$store.commit('setState', {
              property: 'chosenSite',
              value: files[0].site_id
            })
            this.sort(files, 'path').map(({path, size}) => {
              this.userFileSize = this.userFileSize + size
              const pathArray = path.slice(1).split('/')
              if (pathArray.length > 1) {
                fileList[pathArray[0]] = []
              }
              const nlm = this.userFilesNlm ? this.userFilesNlm.some(asset => asset.path === path && size <= 132) : false
              if (nlm) {
                this.userFileNlmSize -= size
              }
              return {
                nlm,
                path,
                pathArray: pathArray,
                size
              }
            }).forEach(fileObject => {
              function pathArrayToObject(file, object) {
                const pathArray = file.pathArray
                if (pathArray.length === 1) {
                  object['_root'].push(file)
                } else if (pathArray.length === 2) {
                  const newObject = Object.assign(file, {
                    pathArray: pathArray.slice(1)
                  })
                  if (Array.isArray(object[pathArray[0]])) {
                    object[pathArray[0]].push(newObject)
                  } else {
                    if (!Array.isArray(object[pathArray[0]]['_root'])) {
                      object[pathArray[0]]['_root'] = []
                    }
                    object[pathArray[0]]['_root'].push(newObject)
                  }
                } else {
                  if (Array.isArray(object[pathArray[0]])) {
                    if (object[pathArray[0]].length === 0) {
                      object[pathArray[0]] = {}
                    } else {
                      const existingArray = object[pathArray[0]]
                      object[pathArray[0]] = {}
                      object[pathArray[0]]['_root'] = existingArray
                    }
                  }
                  if (!(object[pathArray[0]].hasOwnProperty(pathArray[1]))) {
                    object[pathArray[0]][pathArray[1]] = []
                  }
                  pathArrayToObject(Object.assign(file, {
                    pathArray: pathArray.slice(1)
                  }), object[pathArray[0]])
                }
              }
              pathArrayToObject(fileObject, fileList)
            })
            this.userFilesOrganized = fileList
          }
        })
      },
      filter(array, search, property) {
        return array.filter(item => {
          return item[property].match(search)
        })
      },
      maxPage(array) {
        return Math.ceil(array.length / this.$options.static.pageSize)
      },
      paginate(array, index) {
        return array.slice(index * this.$options.static.pageSize, (index * this.$options.static.pageSize) + this.$options.static.pageSize)
      },
      setBranch(event, branch) {
        this.searchDeploy = branch
        event.target.parentElement.parentElement.parentElement.classList.toggle('expanded')
      },
      setTheme(theme) {
        this.theme = theme
        const html = document.querySelector('html')
        if (theme === 'dark') {
          html.classList.add('dark')
          html.classList.remove('light')
        } else {
          html.classList.add('light')
          html.classList.remove('dark')
        }
      },
      siteApi(slug, page, siteArray) {
        if (!page) {
          this.chosenAccount = slug
          siteArray = []
        }
        callApi(`${slug}/sites${page ? `?page=${page}&per_page=100` : ''}`).then(sites => {
          sites.forEach(({custom_domain, id, name, screenshot_url}) => {
            siteArray.push({
              custom_domain,
              id,
              name,
              screenshot_url
            })
          })
          if (sites.length === 100) {
            this.siteApi(this.chosenAccount, page ? page++ : 2, siteArray)
          } else {
            if (siteArray.length === 1) {
              this.$store.commit('setState', {
                property: 'chosenSite',
                value: siteArray[0].id
              })
              this.deployApi(this.$store.state.chosenSite)
            }
            this.userSites = this.sort(siteArray, 'name')
          }
        })
      },
      size(bytes) {
        return filesize(bytes).human()
      },
      sort(array, property) {
        if (property) {
          return array.sort((firstItem, secondItem) => {
            return firstItem[property].localeCompare(secondItem[property], undefined, {
              numeric: true
            })
          })
        } else {
          return array.sort((firstItem, secondItem) => {
            return firstItem.localeCompare(secondItem, undefined, {
              numeric: true
            })
          })
        }
      },
      stopDownload() {
        this.downloaded = 0
        this.$store.state.downloadStop.abort()
        if (this.$options.static.zipReadableStream) {
          this.$options.static.zip = null
          this.$options.static.zipReadableStream = null
        }
        if (this.modal) {
          this.toggleModal()
        }
      },
      toggleModal(type) {
        this.modal = !this.modal
        if (this.modal) {
          document.body.style.overflow = 'hidden'
        } else {
          this.aboutModal = false
          this.downloadModal = false
          document.body.style.overflow = 'auto'
        }
        if (typeof type === 'string') {
          this[`${type}Modal`] = !this[`${type}Modal`]
        }
      },
      toggleTheme() {
        if (this.theme === 'dark') {
          this.setTheme('light')
        } else {
          this.setTheme('dark')
        }
        localStorage.setItem('theme', this.theme)
        window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', this.checkTheme)
      }
    },
    mounted() {
      this.js = true
      this.checkTheme()
      const hashWatcher = this.$watch('$route', value => {
        if (value.hash) {
          const response = this.$route.hash.replace(/^#/, '').split('&').reduce((result, pair) => {
            const keyValue = pair.split('=')
            result[keyValue[0]] = keyValue[1]
            return result
          }, {})
          this.$router.replace('/')
          if (response.auto) {
            if (response.access_token && response.did) {
              this.autoConfig = true
              this.$store.commit('setState', {
                property: ['authToken', 'chosenDeploy'],
                value: [response.access_token, response.did]
              })
              this.authTokenApi()
            } else {
              this.$store.commit('setState', {
                property: 'error',
                value: 'There was a problem with automatic config. Kindly recheck the submitted data.'
              })
            }
          } else if (response.access_token) {
            if (!localStorage.getItem(response.state)) {
              this.$store.commit('setState', {
                property: 'error',
                value: 'This appears to be an attack. Kindly retry.'
              })
            } else {
              localStorage.removeItem(response.state)
              this.$store.commit('setState', {
                property: 'authToken',
                value: response.access_token
              })
              this.authTokenApi()
            }
          }
        }
        hashWatcher()
      })
    },
    static: {
      iconArrowLeft: 'M10 19l-7-7m0 0l7-7m-7 7h18',
      iconDownload: iconDownload,
      iconExternalLink: iconExternalLink,
      iconLogout: 'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1',
      iconMoon: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z',
      iconNetlify: 'M16.4947,8.9405l-0.0073-0.0031c-0.0042-0.0016-0.0084-0.0031-0.012-0.0068c-0.0121-0.013-0.0175-0.0309-0.0146-0.0485l0.4036-2.4651l1.8929,1.8913L16.7886,9.145c-0.0055,0.0022-0.0113,0.0033-0.0172,0.0031h-0.0078c-0.0026-0.0016-0.0052-0.0037-0.0104-0.0089C16.6799,9.0578,16.5923,8.9904,16.4947,8.9405z M19.2403,8.7903l2.024,2.0217c0.4204,0.4204,0.6308,0.6301,0.7076,0.8732c0.0115,0.036,0.0209,0.072,0.0282,0.109L17.163,9.748c-0.0026-0.0011-0.0052-0.0021-0.0078-0.0031c-0.0193-0.0078-0.0418-0.0167-0.0418-0.0365s0.023-0.0292,0.0423-0.037l0.0063-0.0026L19.2403,8.7903z M21.9175,12.4431c-0.1044,0.1961-0.3081,0.3996-0.6527,0.7443l-2.2819,2.2789l-2.9514-0.6139l-0.0157-0.0031c-0.0261-0.0042-0.0538-0.0089-0.0538-0.0323c-0.0227-0.2458-0.1465-0.4712-0.342-0.6223c-0.012-0.012-0.0089-0.0308-0.0052-0.048c0-0.0026,0-0.0052,0.001-0.0073l0.5551-3.404l0.0021-0.0115c0.0031-0.0261,0.0078-0.0563,0.0313-0.0563c0.2403-0.0299,0.4585-0.1548,0.6057-0.3469c0.0047-0.0052,0.0078-0.011,0.0141-0.0141c0.0167-0.0078,0.0366,0,0.0538,0.0073l5.039,2.1292L21.9175,12.4431z M18.4581,15.9905l-3.7524,3.7483l0.6423-3.9433l0.001-0.0052c0.0005-0.0052,0.0016-0.0104,0.0031-0.0151c0.0052-0.0125,0.0188-0.0177,0.0319-0.023l0.0063-0.0026c0.1406-0.0599,0.265-0.1524,0.3629-0.2697c0.0125-0.0146,0.0277-0.0287,0.047-0.0313c0.005-0.0008,0.0101-0.0008,0.0151,0l2.6422,0.5425L18.4581,15.9905z M13.9114,20.5322l-0.423,0.4225L8.8124,14.204c-0.0017-0.0025-0.0034-0.0049-0.0052-0.0073c-0.0073-0.0099-0.0151-0.0198-0.0136-0.0313c0-0.0083,0.0057-0.0156,0.0115-0.0219l0.0052-0.0068c0.0141-0.0209,0.0261-0.0417,0.0392-0.0642l0.0104-0.0183l0.0016-0.0016c0.0073-0.0125,0.0141-0.0245,0.0266-0.0313c0.011-0.0052,0.0261-0.0031,0.0381-0.0005l5.1805,1.0672c0.0145,0.0022,0.0282,0.0082,0.0397,0.0172c0.0068,0.0068,0.0084,0.0141,0.0099,0.0224c0.0733,0.2768,0.2718,0.5036,0.5368,0.6129c0.0146,0.0073,0.0084,0.0235,0.0016,0.0407c-0.0034,0.0075-0.006,0.0154-0.0078,0.0235C14.6216,16.2013,14.0618,19.6115,13.9114,20.5322z M13.0279,21.4142c-0.3117,0.3083-0.4955,0.4715-0.7034,0.5373c-0.2049,0.0647-0.4248,0.0647-0.6297,0c-0.2433-0.0772-0.4538-0.2869-0.8741-0.7073l-4.696-4.6908l1.2266-1.9002c0.0057-0.0094,0.0115-0.0177,0.0209-0.0245c0.0131-0.0094,0.0319-0.0052,0.0475,0c0.2815,0.0848,0.5838,0.0695,0.8553-0.0433c0.0141-0.0052,0.0282-0.0089,0.0392,0.001c0.0055,0.005,0.0104,0.0106,0.0146,0.0167l4.6991,6.8117V21.4142z M5.672,16.1011l-1.0773-1.0761l2.1274-0.9066c0.0054-0.0024,0.0113-0.0036,0.0172-0.0037c0.0178,0,0.0282,0.0177,0.0376,0.0339c0.0214,0.0329,0.044,0.0649,0.0679,0.096l0.0068,0.0083c0.0063,0.0089,0.0021,0.0177-0.0042,0.0261l-1.1749,1.822H5.672z M4.118,14.5488l-1.3629-1.3614c-0.2318-0.2316-0.4-0.3996-0.517-0.544l4.144,0.8586c0.0052,0.001,0.0104,0.0018,0.0157,0.0026c0.0256,0.0042,0.0538,0.0089,0.0538,0.0329c0,0.0261-0.0308,0.0381-0.0569,0.048l-0.012,0.0052L4.118,14.5488z M2,11.9434c0.0047-0.0877,0.0205-0.1744,0.047-0.2582c0.0773-0.2431,0.2872-0.4528,0.7081-0.8732l1.7441-1.7422c0.803,1.1642,1.6082,2.3268,2.4156,3.488c0.0141,0.0188,0.0298,0.0396,0.0136,0.0553c-0.0762,0.084-0.1525,0.1758-0.2063,0.2754c-0.0058,0.0128-0.0148,0.0239-0.0261,0.0323c-0.0068,0.0042-0.0141,0.0026-0.0219,0.001H6.673L2,11.9429L2,11.9434z M4.966,8.6036L7.31,6.261c0.2209,0.0965,1.0235,0.435,1.7404,0.7376c0.5431,0.2295,1.0381,0.4381,1.1937,0.506c0.0157,0.0063,0.0298,0.0125,0.0366,0.0282c0.0042,0.0094,0.0021,0.0214,0,0.0313c-0.0754,0.3435,0.0272,0.7018,0.2731,0.9535c0.0157,0.0156,0,0.0381-0.0136,0.0574l-0.0073,0.011l-2.3811,3.6841c-0.0063,0.0104-0.012,0.0193-0.0225,0.0261c-0.0125,0.0078-0.0303,0.0042-0.0449,0.0005c-0.0926-0.0242-0.1878-0.0372-0.2835-0.0386c-0.0856,0-0.1786,0.0156-0.2726,0.0329H7.5278c-0.0104,0.0016-0.0198,0.0037-0.0282-0.0026c-0.0092-0.0075-0.0172-0.0165-0.0235-0.0266l-2.5106-3.658H4.966z M7.7847,5.7879l3.036-3.0326c0.4204-0.4199,0.6308-0.6301,0.8741-0.7068c0.2049-0.0647,0.4248-0.0647,0.6297,0c0.2433,0.0767,0.4538,0.2869,0.8741,0.7068l0.6579,0.6572l-2.1592,3.3404c-0.0053,0.0097-0.0126,0.0182-0.0214,0.025c-0.0131,0.0089-0.0313,0.0052-0.047,0c-0.3456-0.1048-0.7207-0.0326-1.0026,0.193c-0.0141,0.0146-0.035,0.0063-0.0527-0.0016C10.2917,6.8468,8.0985,5.9209,7.7847,5.7879z M14.3151,3.8705l1.9937,1.9915l-0.4804,2.9721v0.0078c-0.0004,0.0068-0.0018,0.0134-0.0042,0.0198c-0.0052,0.0104-0.0157,0.0125-0.0261,0.0156c-0.1027,0.0311-0.1995,0.0792-0.2862,0.1424c-0.0037,0.0027-0.0072,0.0056-0.0104,0.0089c-0.0057,0.0063-0.0115,0.012-0.0209,0.013c-0.0077,0.0002-0.0153-0.001-0.0225-0.0037l-3.038-1.2894L12.4143,7.746c-0.0193-0.0078-0.0423-0.0172-0.0423-0.037c-0.0179-0.1691-0.0732-0.3321-0.1619-0.4773c-0.0146-0.024-0.0308-0.049-0.0183-0.0735L14.3151,3.8705z M12.2619,8.3595l2.848,1.2049c0.0157,0.0073,0.0329,0.0141,0.0397,0.0303c0.0027,0.0097,0.0027,0.02,0,0.0297c-0.0084,0.0417-0.0157,0.0892-0.0157,0.1372v0.0798c0,0.0198-0.0204,0.0282-0.0392,0.036L15.089,9.8794c-0.4512,0.1925-6.334,2.6983-6.3429,2.6983c-0.0089,0-0.0183,0-0.0272-0.0089c-0.0157-0.0156,0-0.0376,0.0141-0.0574c0.0025-0.0034,0.0049-0.0069,0.0073-0.0104l2.3404-3.6199l0.0042-0.0063c0.0136-0.0219,0.0292-0.0464,0.0543-0.0464l0.0235,0.0037c0.0533,0.0073,0.1003,0.0141,0.1478,0.0141c0.3551,0,0.6841-0.1727,0.8825-0.4679c0.0047-0.0079,0.0107-0.0149,0.0178-0.0209C12.2248,8.3469,12.2457,8.3521,12.2619,8.3595z M9.0003,13.1504l6.4124-2.7316c0,0,0.0094,0,0.0183,0.0089c0.035,0.0349,0.0648,0.0584,0.0935,0.0803l0.0141,0.0089c0.0131,0.0073,0.0261,0.0156,0.0272,0.0292c0,0.0052,0,0.0083-0.001,0.013l-0.5493,3.3706l-0.0021,0.0136c-0.0037,0.0261-0.0073,0.0558-0.0319,0.0558c-0.2973,0.02-0.5656,0.1854-0.717,0.4418l-0.0026,0.0042c-0.0073,0.012-0.0141,0.0235-0.0261,0.0297c-0.011,0.0052-0.0251,0.0031-0.0366,0.0005l-5.1137-1.0536C9.0802,13.4206,9.0061,13.1509,9.0003,13.1504z',
      iconRefresh: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
      iconSelector: 'M8 9l4-4 4 4m0 6l-4 4-4-4',
      iconSun: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z',
      iconXCircle: iconXCircle,
      pageSize: 5,
      zip: null,
      zipReadableStream: null
    }
  }
</script>