import { version, unref, inject, useSSRContext, defineComponent, computed, ref, h, resolveComponent, createApp, effectScope, reactive, mergeProps, onUnmounted, mergeModels, useModel, defineAsyncComponent, provide, onErrorCaptured, onServerPrefetch, createVNode, resolveDynamicComponent, hasInjectionContext, toRef, isReadonly, getCurrentInstance, isRef, isShallow, isReactive, toRaw, withCtx, openBlock, createBlock, Fragment, renderList, toDisplayString, withModifiers } from 'vue';
import { d as useRuntimeConfig$1, $ as $fetch, h as createError$1, l as hasProtocol, j as joinURL, p as parseURL, m as parseQuery, n as createHooks, w as withQuery, o as isScriptProtocol, q as withTrailingSlash, r as withoutTrailingSlash, t as sanitizeStatusCode, v as isEqual, x as stringifyParsedURL, y as stringifyQuery } from '../runtime.mjs';
import { getActiveHead } from 'unhead';
import { defineHeadPlugin } from '@unhead/shared';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderSlot, ssrRenderList, ssrRenderComponent, ssrRenderAttr, ssrRenderStyle, ssrRenderDynamicModel, ssrRenderSuspense, ssrRenderVNode } from 'vue/server-renderer';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';

function createContext$1(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als && currentInstance === void 0) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers$1.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers$1.delete(onLeave);
      }
    }
  };
}
function createNamespace$1(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext$1({ ...defaultOpts, ...opts });
      }
      contexts[key];
      return contexts[key];
    }
  };
}
const _globalThis$1 = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey$2 = "__unctx__";
const defaultNamespace = _globalThis$1[globalKey$2] || (_globalThis$1[globalKey$2] = createNamespace$1());
const getContext = (key, opts = {}) => defaultNamespace.get(key, opts);
const asyncHandlersKey$1 = "__unctx_async_handlers__";
const asyncHandlers$1 = _globalThis$1[asyncHandlersKey$1] || (_globalThis$1[asyncHandlersKey$1] = /* @__PURE__ */ new Set());

const appConfig = useRuntimeConfig$1().app;
const baseURL = () => appConfig.baseURL;
if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch.create({
    baseURL: baseURL()
  });
}
const nuxtAppCtx = /* @__PURE__ */ getContext("nuxt-app", {
  asyncContext: false
});
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  let hydratingCount = 0;
  const nuxtApp = {
    _scope: effectScope(),
    provide: void 0,
    globalName: "nuxt",
    versions: {
      get nuxt() {
        return "3.10.3";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: reactive({
      data: {},
      state: {},
      once: /* @__PURE__ */ new Set(),
      _errors: {},
      ...{ serverRendered: true }
    }),
    static: {
      data: {}
    },
    runWithContext: (fn) => nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn)),
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: {},
    _payloadRevivers: {},
    ...options
  };
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    const contextCaller = async function(hooks, args) {
      for (const hook of hooks) {
        await nuxtApp.runWithContext(() => hook(...args));
      }
    };
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  {
    if (nuxtApp.ssrContext) {
      nuxtApp.ssrContext.nuxt = nuxtApp;
      nuxtApp.ssrContext._payloadReducers = {};
      nuxtApp.payload.path = nuxtApp.ssrContext.url;
    }
    nuxtApp.ssrContext = nuxtApp.ssrContext || {};
    if (nuxtApp.ssrContext.payload) {
      Object.assign(nuxtApp.payload, nuxtApp.ssrContext.payload);
    }
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: options.ssrContext.runtimeConfig.public,
      app: options.ssrContext.runtimeConfig.app
    };
  }
  const runtimeConfig = options.ssrContext.runtimeConfig;
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
async function applyPlugin(nuxtApp, plugin) {
  if (plugin.hooks) {
    nuxtApp.hooks.addHooks(plugin.hooks);
  }
  if (typeof plugin === "function") {
    const { provide: provide2 } = await nuxtApp.runWithContext(() => plugin(nuxtApp)) || {};
    if (provide2 && typeof provide2 === "object") {
      for (const key in provide2) {
        nuxtApp.provide(key, provide2[key]);
      }
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  var _a, _b;
  const resolvedPlugins = [];
  const unresolvedPlugins = [];
  const parallels = [];
  const errors = [];
  let promiseDepth = 0;
  async function executePlugin(plugin) {
    var _a2;
    const unresolvedPluginsForThisPlugin = ((_a2 = plugin.dependsOn) == null ? void 0 : _a2.filter((name) => plugins2.some((p) => p._name === name) && !resolvedPlugins.includes(name))) ?? [];
    if (unresolvedPluginsForThisPlugin.length > 0) {
      unresolvedPlugins.push([new Set(unresolvedPluginsForThisPlugin), plugin]);
    } else {
      const promise = applyPlugin(nuxtApp, plugin).then(async () => {
        if (plugin._name) {
          resolvedPlugins.push(plugin._name);
          await Promise.all(unresolvedPlugins.map(async ([dependsOn, unexecutedPlugin]) => {
            if (dependsOn.has(plugin._name)) {
              dependsOn.delete(plugin._name);
              if (dependsOn.size === 0) {
                promiseDepth++;
                await executePlugin(unexecutedPlugin);
              }
            }
          }));
        }
      });
      if (plugin.parallel) {
        parallels.push(promise.catch((e) => errors.push(e)));
      } else {
        await promise;
      }
    }
  }
  for (const plugin of plugins2) {
    if (((_a = nuxtApp.ssrContext) == null ? void 0 : _a.islandContext) && ((_b = plugin.env) == null ? void 0 : _b.islands) === false) {
      continue;
    }
    await executePlugin(plugin);
  }
  await Promise.all(parallels);
  if (promiseDepth) {
    for (let i = 0; i < promiseDepth; i++) {
      await Promise.all(parallels);
    }
  }
  if (errors.length) {
    throw errors[0];
  }
}
// @__NO_SIDE_EFFECTS__
function defineNuxtPlugin(plugin) {
  if (typeof plugin === "function") {
    return plugin;
  }
  const _name = plugin._name || plugin.name;
  delete plugin.name;
  return Object.assign(plugin.setup || (() => {
  }), plugin, { [NuxtPluginIndicator]: true, _name });
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => args ? setup(...args) : setup();
  {
    return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
  }
}
// @__NO_SIDE_EFFECTS__
function tryUseNuxtApp() {
  var _a;
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = (_a = getCurrentInstance()) == null ? void 0 : _a.appContext.app.$nuxt;
  }
  nuxtAppInstance = nuxtAppInstance || nuxtAppCtx.tryUse();
  return nuxtAppInstance || null;
}
// @__NO_SIDE_EFFECTS__
function useNuxtApp() {
  const nuxtAppInstance = /* @__PURE__ */ tryUseNuxtApp();
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}
// @__NO_SIDE_EFFECTS__
function useRuntimeConfig(_event) {
  return (/* @__PURE__ */ useNuxtApp()).$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
const PageRouteSymbol = Symbol("route");
const useRouter = () => {
  var _a;
  return (_a = /* @__PURE__ */ useNuxtApp()) == null ? void 0 : _a.$router;
};
const useRoute = () => {
  if (hasInjectionContext()) {
    return inject(PageRouteSymbol, (/* @__PURE__ */ useNuxtApp())._route);
  }
  return (/* @__PURE__ */ useNuxtApp())._route;
};
// @__NO_SIDE_EFFECTS__
function defineNuxtRouteMiddleware(middleware) {
  return middleware;
}
const isProcessingMiddleware = () => {
  try {
    if ((/* @__PURE__ */ useNuxtApp())._processingMiddleware) {
      return true;
    }
  } catch {
    return true;
  }
  return false;
};
const navigateTo = (to, options) => {
  if (!to) {
    to = "/";
  }
  const toPath = typeof to === "string" ? to : withQuery(to.path || "/", to.query || {}) + (to.hash || "");
  if (options == null ? void 0 : options.open) {
    return Promise.resolve();
  }
  const isExternal = (options == null ? void 0 : options.external) || hasProtocol(toPath, { acceptRelative: true });
  if (isExternal) {
    if (!(options == null ? void 0 : options.external)) {
      throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
    }
    const protocol = parseURL(toPath).protocol;
    if (protocol && isScriptProtocol(protocol)) {
      throw new Error(`Cannot navigate to a URL with '${protocol}' protocol.`);
    }
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter();
  const nuxtApp = /* @__PURE__ */ useNuxtApp();
  {
    if (nuxtApp.ssrContext) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const location2 = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
      const redirect = async function(response) {
        await nuxtApp.callHook("app:redirected");
        const encodedLoc = location2.replace(/"/g, "%22");
        nuxtApp.ssrContext._renderResponse = {
          statusCode: sanitizeStatusCode((options == null ? void 0 : options.redirectCode) || 302, 302),
          body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
          headers: { location: location2 }
        };
        return response;
      };
      if (!isExternal && inMiddleware) {
        router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
        return to;
      }
      return redirect(!inMiddleware ? void 0 : (
        /* abort route navigation */
        false
      ));
    }
  }
  if (isExternal) {
    nuxtApp._scope.stop();
    if (options == null ? void 0 : options.replace) {
      (void 0).replace(toPath);
    } else {
      (void 0).href = toPath;
    }
    if (inMiddleware) {
      if (!nuxtApp.isHydrating) {
        return false;
      }
      return new Promise(() => {
      });
    }
    return Promise.resolve();
  }
  return (options == null ? void 0 : options.replace) ? router.replace(to) : router.push(to);
};
const NUXT_ERROR_SIGNATURE = "__nuxt_error";
const useError = () => toRef((/* @__PURE__ */ useNuxtApp()).payload, "error");
const showError = (error) => {
  const nuxtError = createError(error);
  try {
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    const error2 = useError();
    if (false)
      ;
    error2.value = error2.value || nuxtError;
  } catch {
    throw nuxtError;
  }
  return nuxtError;
};
const isNuxtError = (error) => !!error && typeof error === "object" && NUXT_ERROR_SIGNATURE in error;
const createError = (error) => {
  const nuxtError = createError$1(error);
  Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
    value: true,
    configurable: false,
    writable: false
  });
  return nuxtError;
};
version.startsWith("3");
function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function resolveUnrefHeadInput(ref2, lastKey = "") {
  if (ref2 instanceof Promise)
    return ref2;
  const root = resolveUnref(ref2);
  if (!ref2 || !root)
    return root;
  if (Array.isArray(root))
    return root.map((r) => resolveUnrefHeadInput(r, lastKey));
  if (typeof root === "object") {
    return Object.fromEntries(
      Object.entries(root).map(([k, v]) => {
        if (k === "titleTemplate" || k.startsWith("on"))
          return [k, unref(v)];
        return [k, resolveUnrefHeadInput(v, k)];
      })
    );
  }
  return root;
}
defineHeadPlugin({
  hooks: {
    "entries:resolve": function(ctx) {
      for (const entry2 of ctx.entries)
        entry2.resolvedInput = resolveUnrefHeadInput(entry2.input);
    }
  }
});
const headSymbol = "usehead";
const _global = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
const globalKey$1 = "__unhead_injection_handler__";
function setHeadInjectionHandler(handler) {
  _global[globalKey$1] = handler;
}
function injectHead() {
  if (globalKey$1 in _global) {
    return _global[globalKey$1]();
  }
  const head = inject(headSymbol);
  if (!head && "production" !== "production")
    console.warn("Unhead is missing Vue context, falling back to shared context. This may have unexpected results.");
  return head || getActiveHead();
}
const unhead_KgADcZ0jPj = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  enforce: "pre",
  setup(nuxtApp) {
    const head = nuxtApp.ssrContext.head;
    setHeadInjectionHandler(
      // need a fresh instance of the nuxt app to avoid parallel requests interfering with each other
      () => (/* @__PURE__ */ useNuxtApp()).vueApp._context.provides.usehead
    );
    nuxtApp.vueApp.use(head);
  }
});
function createContext(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als && currentInstance === void 0) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers.delete(onLeave);
      }
    }
  };
}
function createNamespace(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext({ ...defaultOpts, ...opts });
      }
      contexts[key];
      return contexts[key];
    }
  };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey = "__unctx__";
_globalThis[globalKey] || (_globalThis[globalKey] = createNamespace());
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());
const nuxtLinkDefaults = { "componentName": "NuxtLink" };
const manifest_45route_45rule = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  {
    return;
  }
});
const globalMiddleware = [
  manifest_45route_45rule
];
function getRouteFromPath(fullPath) {
  if (typeof fullPath === "object") {
    fullPath = stringifyParsedURL({
      pathname: fullPath.path || "",
      search: stringifyQuery(fullPath.query || {}),
      hash: fullPath.hash || ""
    });
  }
  const url = parseURL(fullPath.toString());
  return {
    path: url.pathname,
    fullPath,
    query: parseQuery(url.search),
    hash: url.hash,
    // stub properties for compat with vue-router
    params: {},
    name: void 0,
    matched: [],
    redirectedFrom: void 0,
    meta: {},
    href: fullPath
  };
}
const router_CaKIoANnI2 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  setup(nuxtApp) {
    const initialURL = nuxtApp.ssrContext.url;
    const routes = [];
    const hooks = {
      "navigate:before": [],
      "resolve:before": [],
      "navigate:after": [],
      error: []
    };
    const registerHook = (hook, guard) => {
      hooks[hook].push(guard);
      return () => hooks[hook].splice(hooks[hook].indexOf(guard), 1);
    };
    (/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
    const route = reactive(getRouteFromPath(initialURL));
    async function handleNavigation(url, replace) {
      try {
        const to = getRouteFromPath(url);
        for (const middleware of hooks["navigate:before"]) {
          const result = await middleware(to, route);
          if (result === false || result instanceof Error) {
            return;
          }
          if (typeof result === "string" && result.length) {
            return handleNavigation(result, true);
          }
        }
        for (const handler of hooks["resolve:before"]) {
          await handler(to, route);
        }
        Object.assign(route, to);
        if (false)
          ;
        for (const middleware of hooks["navigate:after"]) {
          await middleware(to, route);
        }
      } catch (err) {
        for (const handler of hooks.error) {
          await handler(err);
        }
      }
    }
    const currentRoute = computed(() => route);
    const router = {
      currentRoute,
      isReady: () => Promise.resolve(),
      // These options provide a similar API to vue-router but have no effect
      options: {},
      install: () => Promise.resolve(),
      // Navigation
      push: (url) => handleNavigation(url),
      replace: (url) => handleNavigation(url),
      back: () => (void 0).history.go(-1),
      go: (delta) => (void 0).history.go(delta),
      forward: () => (void 0).history.go(1),
      // Guards
      beforeResolve: (guard) => registerHook("resolve:before", guard),
      beforeEach: (guard) => registerHook("navigate:before", guard),
      afterEach: (guard) => registerHook("navigate:after", guard),
      onError: (handler) => registerHook("error", handler),
      // Routes
      resolve: getRouteFromPath,
      addRoute: (parentName, route2) => {
        routes.push(route2);
      },
      getRoutes: () => routes,
      hasRoute: (name) => routes.some((route2) => route2.name === name),
      removeRoute: (name) => {
        const index = routes.findIndex((route2) => route2.name === name);
        if (index !== -1) {
          routes.splice(index, 1);
        }
      }
    };
    nuxtApp.vueApp.component("RouterLink", defineComponent({
      functional: true,
      props: {
        to: {
          type: String,
          required: true
        },
        custom: Boolean,
        replace: Boolean,
        // Not implemented
        activeClass: String,
        exactActiveClass: String,
        ariaCurrentValue: String
      },
      setup: (props, { slots }) => {
        const navigate = () => handleNavigation(props.to, props.replace);
        return () => {
          var _a;
          const route2 = router.resolve(props.to);
          return props.custom ? (_a = slots.default) == null ? void 0 : _a.call(slots, { href: props.to, navigate, route: route2 }) : h("a", { href: props.to, onClick: (e) => {
            e.preventDefault();
            return navigate();
          } }, slots);
        };
      }
    }));
    nuxtApp._route = route;
    nuxtApp._middleware = nuxtApp._middleware || {
      global: [],
      named: {}
    };
    const initialLayout = nuxtApp.payload.state._layout;
    nuxtApp.hooks.hookOnce("app:created", async () => {
      router.beforeEach(async (to, from) => {
        var _a;
        to.meta = reactive(to.meta || {});
        if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) {
          to.meta.layout = initialLayout;
        }
        nuxtApp._processingMiddleware = true;
        if (!((_a = nuxtApp.ssrContext) == null ? void 0 : _a.islandContext)) {
          const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
          for (const middleware of middlewareEntries) {
            const result = await nuxtApp.runWithContext(() => middleware(to, from));
            {
              if (result === false || result instanceof Error) {
                const error = result || createError$1({
                  statusCode: 404,
                  statusMessage: `Page Not Found: ${initialURL}`,
                  data: {
                    path: initialURL
                  }
                });
                delete nuxtApp._processingMiddleware;
                return nuxtApp.runWithContext(() => showError(error));
              }
            }
            if (result === true) {
              continue;
            }
            if (result || result === false) {
              return result;
            }
          }
        }
      });
      router.afterEach(() => {
        delete nuxtApp._processingMiddleware;
      });
      await router.replace(initialURL);
      if (!isEqual(route.fullPath, initialURL)) {
        await nuxtApp.runWithContext(() => navigateTo(route.fullPath));
      }
    });
    return {
      provide: {
        route,
        router
      }
    };
  }
});
function definePayloadReducer(name, reduce) {
  {
    (/* @__PURE__ */ useNuxtApp()).ssrContext._payloadReducers[name] = reduce;
  }
}
const reducers = {
  NuxtError: (data) => isNuxtError(data) && data.toJSON(),
  EmptyShallowRef: (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_"),
  EmptyRef: (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_"),
  ShallowRef: (data) => isRef(data) && isShallow(data) && data.value,
  ShallowReactive: (data) => isReactive(data) && isShallow(data) && toRaw(data),
  Ref: (data) => isRef(data) && data.value,
  Reactive: (data) => isReactive(data) && toRaw(data)
};
const revive_payload_server_eJ33V7gbc6 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const reducer in reducers) {
      definePayloadReducer(reducer, reducers[reducer]);
    }
  }
});
const components_plugin_KR1HBZs4kY = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components"
});
const plugins = [
  unhead_KgADcZ0jPj,
  router_CaKIoANnI2,
  revive_payload_server_eJ33V7gbc6,
  components_plugin_KR1HBZs4kY
];
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$s = {
  __name: "Progressbar",
  __ssrInlineRender: true,
  setup(__props) {
    ref(0);
    const progressHeight = ref(0);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: "progressbar",
        style: { height: `${unref(progressHeight)}%` }
      }, _attrs))} data-v-69e56e67></div>`);
    };
  }
};
const _sfc_setup$s = _sfc_main$s.setup;
_sfc_main$s.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Progressbar.vue");
  return _sfc_setup$s ? _sfc_setup$s(props, ctx) : void 0;
};
const __nuxt_component_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["__scopeId", "data-v-69e56e67"]]);
const _sfc_main$r = {
  __name: "Scroller",
  __ssrInlineRender: true,
  setup(__props) {
    const scrollY = ref(0);
    const active = ref(false);
    function handleScroll() {
      scrollY.value = (void 0).scrollY;
      active.value = scrollY.value > 500;
    }
    onUnmounted(() => {
      (void 0).removeEventListener("scroll", handleScroll);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["scroller btn", { "active": unref(active) }]
      }, _attrs))} data-v-fff61833><i class="fa-solid fa-angles-up scroller-icon" data-v-fff61833></i></div>`);
    };
  }
};
const _sfc_setup$r = _sfc_main$r.setup;
_sfc_main$r.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Scroller.vue");
  return _sfc_setup$r ? _sfc_setup$r(props, ctx) : void 0;
};
const __nuxt_component_1$8 = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["__scopeId", "data-v-fff61833"]]);
const recommendation1 = "" + __buildAssetsURL("refference_letter-kashim.BB8xaM68.pdf");
const recommendation2 = "" + __buildAssetsURL("recommendation_letter-athena_plus.BnPslT7F.pdf");
const recommendation3 = "" + __buildAssetsURL("recommendation_letter-key_horse.Cr9kLurB.pdf");
const cv = "" + __buildAssetsURL("Zhassulan_Serikuly-CV.XrFMuK9q.pdf");
const image = "" + __buildAssetsURL("photo.S6WMhy4n.png");
const zs = "" + __buildAssetsURL("zs.DzCcibsH.png");
const a_lux = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAAjCAYAAABFES5oAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAACXBIWXMAAAsTAAALEwEAmpwYAAABWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgpMwidZAAAH/0lEQVRoBe2Z/VUbORTFYU/+z2wFqINMKsikAkwFDBXEVMBQAaQCmwowFdipAFOBlQoyqYD9XSEZMZFsD5jNbsw95/o9vS9JT5rBwN7eG9468NaBtw68deBP7cD9/f0AXsN63R6JmcIUqnW5q/wUrFNFsY1W5aV85JhMranivX+RiZHdpOp2bcQVUPEpLDC6On91E19rzIRa0AX1r+EAnr3WXP+luvv7+5b1HME2sS6DTZe7SPi6Jl020zX68ZGfZ+9fOVB/e26ZvIYzKFj3uQMfNHvONk8yWy2x66JnQf90+QeZgFNf37lf/UBZzDEz6TAt/AhbKFj3uSMfNH3CVk8z29WPgOQbC/sXcppM3jl1LzO+7Zu1SCgsJ0X/4Sw78jO021X23vj9p4Qu/xIElKkgb7teBr62woT6eTnyEzdhPsaVt0mUwZ6TxEwVmECVy9nETj09ESmMNsmPYyhiUoWwTeO4WMc3zuTosru+IFV3AVNYYCzimkHf+iuXiQzFtZkanvBKaJAB4QZa7PNg3EE5ZM+p/euQ9CWpRKqHBnZhMXymf23XofFWDzQ6TEPtEyYdIx28r/bDOy93UvjD0Ddfm2iAwabvHJJd6BA/k2+7jjDe2oFGh6lbpknHYRIvq2g8ifSdVP2hfGbzySct05QTn5dxb+kJTRzmPDFjeN3KNUv4d84UHeomez8nfu2D8OIndJPD9DGVX7V+ftpNdrALMfRClz/3O2powVfimjBYJV90oJscpp+8jhax0z8/oz7E6ozBqlfv+zh4lf7sA+1xmJr/MFpE6nUcuXdLpY8FO9bvlJI56Nesi5wztr+LB5vq0WEacr5C/QJcZvJn8kc+jd/w2IERatyfR89TbUiPW16950/NT0e9D7RzmKr25WnJ5WiGdgMrGGMRD9bo3zP+Vbc5k/Jq5mevhV7qqRskVtZiS9VtyNF3kKtEjjP1euUmDrNbd4ZBN+gzk4qX6J/gEthyh7SMiRRtLIUyZexhy9XtUWIZapZaD4VenhE+TKRobR+h+pjCJbkv3f8v/9dTUb3XxYEmgEVqduy3MKDP07lHkuqn8CM116Y2CppUUWz601tyH7naxI9gCpMVOWepBG+rQx5j/dUohQVGE+J6SyVDFRGaPgUeUpaf0565BZlqcgobfUnIzUfBF9elRu5iaL11am7sx3Jm0MQ5xGj/i0ys7L0un6tN0ksOU09ujF4HqgWQfBkX6OgLxkNYQc2ltWbZaVZDbA4jHGUcH+v4CngGc5ci+SYiXmvM4TKeI+gEaz+5efr1k0JawAIK4zDJppKcgct8/HALYBgasvaG+djFY4kXaQdh7RvWVSNv4TTiAn0dBmGeIElYdTC3IS4lya1XTDh6kuMnGiJ1Y6vgRNdhhJuxcsKQ05Xkq24M1buAkk03PjcmVs1YwJdieaCai2Lbqhuva9jdx5p5FvJ3c7pjYi5hDmfLeCLqKMqdNuOzyDZFX/skLQtGCnlNVCdWn96qKGeVSgGt9RrqQjwHTw40zEUh1Z0+p6DP0XrUcBNqBikbXMAUlPdLTsjtSmKnqSLe5i6Sfg9tfeIYeaokZAWFK37NqJ22vQ9LqdPnlGMtY/LEPdZZInTRjJfS1+FnKiDUpaZqqK5o4HsvEUu0aKJqzUXyJXMocVxlnBNybcaXMh9hHKYc2Aq3fjUGBsQ3f5xJ3NhM0SYU9rLXjdx4Ih/IHEXfnD8uXk3oNF3DZhsbpY5eZSM4hBV81Yb7OSabrp34Xt8NiL+A5ab118VRS70frIuTnzj1T30sYZPLeccj3xIwI6CCLTzBtnFTiM+COmOc4rOgxZOoP3Vpjb/o+AwsoGDd597eAbGV13/5V52vE3KcxGaIFwX9vXSOTb7SWR4+WsQdlHQNlvRw83Rq61XsYkNQxy9zAc+wW6RiNbf2Krvx6yjRNf7gOUHOodZgEKLg1hD+lqt3/Dd42V2EIn8jLpi7hi2Ufg5nXr9BHkKtWxv+BE+9XiEF+T86jQ8aUCL0hUy5Dr551wyC7RhbxXgC5zBAcx9Di79GfoAtNPAbNot0fmQB9+EAOvic4Jft7sHjYg26YsdwBkt4TI72pj200EDr5SG+GbrWPYdChe2jO1AOcexM/6+PguVqoxZK18YF3dRGChs8hga1goKFenIapPMjlCtaKKimIJsaKujJ0UE+jB6aq386z7DVGI3nFbaxn3OELYZhYGGoOUHXHIfkTMgZoHdhMIR5KnRdiADlal0nMpA/RbwPT6hsa0GSiohJUNwmHR0jdUpMopo/67ifM2xJOl2RaLzPZmKUH/AV5Sc8ggNvPGbN1utBlNik60lV/DpcEjCEBh7AT/AcbhXvWNQZFStftUCKAd1xsCel32CL08JTqNpdqGYZjL5Rc8buJga7l6o1IEYNU55043X5ZNNYmEPZDDENUnBPFrLRAHuJ0EG4MbrihQIaKUA5rZ/HOstDnGICGpQaVtDAO7gOyrc+6B5pvK71Vl4P+ztgHC5JbPNhS6Hc2o/c+vSEajH73qhCgpxhA7Fu5EygxSYKknMvvyEtjGEZ6KAraOENnGSe1FN8NfwbnkADC3hO/ITNWD9G7M38QZyjGxmAcpbAPydHftUQTrBZbzPOQh3G0ks/lgivPYNuoWDd58PTJnUGWylA8sppjx8VqnkcuqczxFnsDayg8B1+ddrjU62h+lHAm8S6tcbv+4p6Q/8OcOgDstRcQRdSh/Pb8Q9XfzG2ndfN2AAAAABJRU5ErkJggg==";
const athena_plus = "" + __buildAssetsURL("athena-plus.DaHhfXMs.png");
const kashim = "" + __buildAssetsURL("kashim.DL6SZMgD.png");
const key_horse = "" + __buildAssetsURL("key-horse.CfiY8Q2B.png");
const abi_construction = "" + __buildAssetsURL("abi-construction.B7fkv-zW.png");
const age_counter = "" + __buildAssetsURL("age-counter.BOSZCwH0.png");
const art_galery = "" + __buildAssetsURL("art-galery.kkr18Kzz.png");
const asia_credit_bank = "" + __buildAssetsURL("asia-credit-bank.j28ob7xh.png");
const azm_trade = "" + __buildAssetsURL("azm-trade.NBuUFvOe.png");
const check_market = "" + __buildAssetsURL("check-market.BcTbg8zQ.png");
const dobraya = "" + __buildAssetsURL("dobraya.WCjW8OZH.png");
const dostyk_trans_terminal = "" + __buildAssetsURL("dostyk-trans-terminal.B2OY6KVl.png");
const ikeruen = "" + __buildAssetsURL("ikeruen.CCtlrg0y.png");
const kazmed = "" + __buildAssetsURL("kazmed.BndWudyK.png");
const kostyum = "" + __buildAssetsURL("kostyum.CX1xgocC.png");
const m1_service = "" + __buildAssetsURL("m1-service.BDbsL5Wj.png");
const melissa = "" + __buildAssetsURL("melissa.D0Gu0XFa.png");
const midas_event = "" + __buildAssetsURL("midas-event.CTvxK-FO.png");
const mobi_event = "" + __buildAssetsURL("mobi-event.mn3_ejon.png");
const new_navat = "" + __buildAssetsURL("new-navat.B5NS-ObI.png");
const number_speller = "" + __buildAssetsURL("number-speller.C6d8NrJ_.png");
const pharmacom = "" + __buildAssetsURL("pharmacom.CnHvzBHN.png");
const portfolio = "" + __buildAssetsURL("portfolio.Cg2h7_Lj.png");
const qazbooking = "" + __buildAssetsURL("qazbooking.DZ7D6j-d.png");
const qazaq_taxi = "" + __buildAssetsURL("qazaq-taxi.CXKYMzPz.png");
const geonomix = "" + __buildAssetsURL("geonomix.DojzQItC.png");
const qonys_toi = "" + __buildAssetsURL("qonys-toi.BHgXJvhZ.png");
const rakhat = "" + __buildAssetsURL("rakhat.hWHfA7AN.png");
const rento = "" + __buildAssetsURL("rento.CMYWsPl1.png");
const tahit = "" + __buildAssetsURL("tahit.BzLKMVX4.png");
const tez_zhet = "" + __buildAssetsURL("tez-zhet.C6AUQ51a.png");
const torgsoft = "" + __buildAssetsURL("torgsoft.DVIpRarY.png");
const unistory = "" + __buildAssetsURL("unistory.PTqSpezD.png");
const yaq = "" + __buildAssetsURL("yaq.DvATfVq5.png");
const youngs_store = "" + __buildAssetsURL("youngs-store.DiHxJJB7.png");
const info = {
  name: "Serikuly Zhassulan",
  position: ["Web Developer", "Vue.js / Nuxt.js", "React / Next.js", "Django.py + PostgreSQL"],
  image,
  description: [
    "Frontend Developer with 5+ years of commercial experience, specializing primarily in Vue.js and Nuxt.js. Strong production experience building complex web applications, geoportals, e-commerce and booking platforms with Vue.js/Nuxt.js, JavaScript and TypeScript. Also experienced with React and Next.js, with full-stack knowledge of Python, Django REST Framework and PostgreSQL.",
    "Experienced in technical leadership, including leading a 5-person development team, conducting code reviews, mentoring junior engineers, task decomposition and frontend technical decision-making. Built and maintained 50+ geoportals and digital twin solutions and delivered multiple commercial web applications from concept to production. "
  ],
  logo: zs,
  phone: "+7 (775) 976-41-65",
  gmail: "serikuly.zhassulan@gmail.com",
  location: "Almaty, Kazakhstan",
  stats: [
    {
      key: "Companies worked",
      value: 4
    },
    {
      key: "Project works",
      value: "70+"
    },
    {
      key: "Language profiency",
      value: 5
    }
  ],
  links: {
    phone: "tel:+77759764165",
    gmail: "mailto:serikuly.zhassulan@gmail.com",
    linkedin: "https://www.linkedin.com/in/serikulyzhassulan",
    hh: "https://hh.kz/applicant/resumes/5d166231ff0ae9aa040039ed1f4d6772377352",
    github: "https://github.com/zhassulaan",
    telegram: "https://msng.link/o/?young_flovver=tg",
    whatsapp: "https://wa.me/77759764165",
    facebook: "https://www.facebook.com/young.flovver",
    instagram: "https://instagram.com/zhassulaan__?igshid=YmMyMTA2M2Y"
  },
  documents: {
    cv,
    recomendations: [
      {
        cheif: "Mammadov E.",
        file: recommendation1,
        description: "TOO «KasHIM» - August, 2021 / Atyrau"
      },
      {
        cheif: "Sain S.",
        file: recommendation2,
        description: "«Athena plus» - May, 2022 / Almaty"
      },
      {
        cheif: "Kentbayev A. E.",
        file: recommendation3,
        description: "Key Horse» - August, 2026 / Almaty"
      }
    ]
  },
  experience: [
    {
      id: "key_horse",
      name: "Key Horse",
      position: "Full-Stack Developer / Frontend Team Lead (Vue.js, Django.py, PostgresSQL)",
      icon: "fa-solid fa-server",
      logo: key_horse,
      date: "June, 2022 - August, 2026 / Almaty",
      responsibilities: [
        "Developed and maintained 50+ geoportals and digital twin solutions for cities and regions across Kazakhstan, working with large volumes of geospatial and municipal data, using Vue.js, Mapbox, Django and PostgreSQL.",
        "Built 4 regional geoportals from the ground up for Ulytau, Kyzylorda, Kostanay, and Turkistan, with initial development cycles of 2–3 months followed by ongoing feature development and improvements.",
        "Led a 5-person development team on a large-scale project, coordinating development, assigning tasks to four junior developers, conducting code reviews, and providing technical guidance through workshops and hands-on mentoring.",
        "Built complex interactive Mapbox-based interfaces for visualizing and working with large volumes of geospatial and municipal data.",
        "Worked across frontend and backend, developing Django REST APIs, integrating them with Vue.js applications and PostgreSQL, and implementing data-driven services including electoral district functionality."
      ]
    },
    {
      id: "a_lux",
      name: "A - Lux",
      position: "Frontend Developer (Nuxt.js, Vue.js)",
      icon: "fa-brands fa-vuejs",
      logo: a_lux,
      date: "March, 2022 - August, 2022 / Almaty",
      responsibilities: [
        "Developed the frontend of Tez Zhet, a food delivery mobile platform built with Nuxt.js, implementing restaurant and menu catalogs, search and filtering, shopping cart, checkout and ordering flows, user authentication, delivery addresses, maps, payment flows, order history, and backend API integrations.",
        "Worked within a 30+ person engineering organization alongside frontend and backend developers, gaining experience collaborating on larger projects and shared codebases.",
        "Quickly transitioned from the React ecosystem to Vue.js and Nuxt.js, becoming productive with the new stack and contributing to commercial projects within a short period of time.",
        "Supported other developers in completing and delivering ongoing projects by troubleshooting frontend issues, implementing remaining functionality, and helping resolve development blockers.",
        "Delivered frontend solutions for clients including Asian Credit Bank, KazMed Engineering, M1 Service, and Small, adapting implementations to different products and business requirements."
      ]
    },
    {
      id: "athena_plus",
      name: "Athena Plus",
      position: "Frontend Developer (React, Next.js)",
      icon: "fa-brands fa-react",
      logo: athena_plus,
      date: "June, 2021 - May, 2022 / Almaty",
      responsibilities: [
        "Worked as the primary frontend developer in a 6–7 person cross-functional team, collaborating with a project manager, backend developer, designer, and media specialists to deliver client projects from concept to production.",
        "Independently developed and delivered multiple commercial web projects using React, Next.js, and Redux, ranging from landing pages and corporate websites to multi-page platforms, online catalogs, and full-featured web applications.",
        "Built reusable product and service catalogs with search, filtering, sorting, and category-based navigation across multiple projects, including Dobraia pharmacy network, Asia Mebel.",
        "Developed the frontend of Qazbooking.kz, an accommodation booking platform, implementing user registration, authentication, booking flows, and integration with backend APIs.",
        "Delivered solutions across travel, e-commerce, retail, hospitality, logistics, automotive, and healthcare, supporting projects through implementation, testing, launch, and post-release improvements."
      ]
    },
    {
      id: "kashim",
      name: "TOO «КасХИМ»",
      position: "Software Engineer Intern",
      icon: "fa-solid fa-laptop-code",
      logo: kashim,
      date: "January, 2021 - March, 2021 / Atyrau",
      responsibilities: [
        "Gained first hands-on experience in professional web development by working with the company’s existing website and learning its codebase, structure, and development workflow.",
        "Implemented UI improvements and missing functionality using JavaScript, HTML, and CSS, while fixing layout and usability issues across existing pages.",
        "Worked with an existing production codebase, debugging issues, testing changes, and contributing to the maintenance and improvement of the company’s website."
      ]
    }
  ],
  projects: [
    {
      name: "KAGIS / Geonomix (iulytau.kz · iturkistan.kz · alauzo.kz · and 50+ regional geoportals across Kazakhstan)",
      link: "https://iulytau.kz",
      description: "A large-scale geospatial platform and digital twin solution developed for cities and regions across Kazakhstan. The platform brings together interactive maps, municipal and spatial data, digital registries, government services, monitoring tools, and operational information within a unified system.",
      stack: "Vue.js, Vuex, Docker, PostgresSQL, Django.py, Mapbox",
      image: geonomix
    },
    {
      name: "Kostyum.kz — Men’s Fashion E-commerce Website",
      link: "https://kostyum.kz",
      description: "A modern e-commerce website for a men’s clothing retailer operating in Kazakhstan since 1998. The platform provides customers with an easy way to explore the brand’s product range, browse collections and categories, and discover detailed product information online. I developed the frontend using Nuxt.js, focusing on responsive design, reusable UI components, product catalog functionality, and a smooth user experience across desktop and mobile devices.",
      stack: "Nuxt.js",
      image: kostyum
    },
    {
      name: "KazMedEngineering — Medical Equipment Service Website",
      link: "https://www.kme.kz",
      description: "A corporate website for KazMedEngineering, an authorized Philips Medical Systems service partner in Kazakhstan specializing in diagnostics, repair, and maintenance of professional medical equipment. I developed the frontend using Nuxt.js, creating a responsive and user-friendly interface for presenting the company’s services, expertise, and medical equipment solutions across desktop and mobile devices.",
      stack: "Nuxt.js, Swiper",
      image: kazmed
    },
    {
      name: "ABI Construction — Construction Company Website",
      link: "https://abi-construction.kz",
      description: "A corporate website for ABI Construction, a design and construction company providing end-to-end services for residential and commercial projects, from initial planning and architectural design to construction and finishing. I worked on the development and customization of the website using WordPress, Vue.js, and PHP, implementing responsive user interfaces, dynamic functionality, and content management features to effectively present the company’s projects and services.",
      stack: "WordPress, Vue.js, PHP, SCSS",
      image: abi_construction
    },
    {
      name: "Midas Event — Event Agency Website",
      link: "https://midasevent.kz",
      description: "A corporate website for Midas Event, an event agency providing end-to-end event management services, from concept development and planning to full-scale execution. I developed the frontend of the website using HTML, JavaScript, and CSS, creating responsive pages and interactive elements to showcase the agency’s services, projects, and event portfolio across desktop and mobile devices.",
      stack: "React",
      image: midas_event
    },
    {
      name: "Melissa — Online Pharmacy & E-commerce Platform",
      link: "https://melissaapteka.kz",
      description: "A large-scale online pharmacy offering 13,000+ products, including medicines, vitamins, healthcare products, cosmetics, and products for children and mothers. I worked on the frontend of the e-commerce platform, developing responsive product catalogs, category navigation, search, filtering and sorting, product pages, shopping cart functionality, and integrations with backend services.",
      stack: "Nuxt.js",
      image: melissa
    },
    {
      name: "TAHIT — Manufacturing Company Website",
      link: "https://tahit.kz",
      description: "A corporate website for TAHIT, a textile manufacturing company specializing in high-quality fabric printing and production using modern sublimation technologies and European manufacturing equipment. I developed the frontend of the website, creating a responsive and visually engaging interface to showcase the company’s production capabilities, technologies, products, and services. The website was optimized to provide a consistent user experience across desktop and mobile devices.",
      stack: "Vue.js",
      image: tahit
    },
    {
      name: "Dostyk Trans Terminal — Logistics Terminal Website",
      link: "https://www.dtt.kz/",
      description: "A corporate website for Dostyk Trans Terminal, a modern logistics terminal located at the Dostyk–Alashankou border crossing, one of the key transportation links between Kazakhstan and China. The terminal provides container handling, storage, transshipment, and other logistics services.",
      stack: "Nuxt.js",
      image: dostyk_trans_terminal
    },
    {
      name: "Dobraya — Online Pharmacy & E-commerce Website",
      link: "https://dobraya-apteka.kz",
      description: "An e-commerce website for Dobraya, a pharmacy chain operating in Almaty and the Almaty region since 1995, combining its physical pharmacy network with an online shopping experience. I worked on the frontend of the online pharmacy, developing responsive product catalogs, category navigation, search and filtering, product pages, and other e-commerce functionality to provide a convenient shopping experience across desktop and mobile devices.",
      stack: "HTML, JavaScript, SCSS, CSS, Bootstrap, jQuery",
      image: dobraya
    },
    {
      name: "UniStory - AI & Web3 Business Platform",
      link: "https://unistory.netlify.app",
      description: "A modern digital platform focused on AI-powered business solutions, helping companies integrate artificial intelligence into their workflows and accelerate the development of web services, applications, and AI-driven products. I developed the frontend using React, implementing integration with a crypto wallet and building interfaces for retrieving, processing, and displaying dynamic data from backend APIs. The project involved managing wallet connection states, handling asynchronous data, and creating responsive, reusable UI components for a smooth user experience.",
      stack: "React.ts, Typescript",
      image: unistory
    },
    {
      name: "QazBooking — Online Accommodation Booking Platform",
      link: "https://qazbooking.kz",
      description: "An online booking platform for hostels and recreation centers across Kazakhstan, allowing travelers to discover accommodation and complete reservations directly online instead of relying on phone calls or messaging. I worked on the frontend and booking functionality of the platform, implementing accommodation catalogs, search, filtering and sorting, user registration and authentication, property pages, and online booking flows, with integration to backend services.",
      stack: "1C Bitrix, PHP (HTML, JavaScript, SASS, CSS), Bootstrap",
      image: qazbooking
    },
    {
      name: "Asia Mebel — Furniture Materials & Services Website",
      link: "https://asiamebel.com",
      description: "A commercial website for Asia Mebel, a retail and service company specializing in furniture materials, fittings, tools, and professional services such as cutting, milling, and PVC edge banding. I developed the frontend of the website, implementing a structured product catalog, category navigation, search, filtering and sorting, product pages, and service-related interfaces. The focus was on making a large range of materials and products easy to browse across desktop and mobile devices.",
      stack: "1C Bitrix, PHP (HTML, JavaScript, SASS, CSS), Bootstrap",
      image: azm_trade
    },
    {
      name: "Pharmacom — Pharmacy & Healthcare Website",
      link: "https://pharma.com.kz",
      description: "A corporate website for Pharmacom, a healthcare brand founded in 1996 that operates a vaccination clinic in Almaty and a network of 55 pharmacies across major cities in Kazakhstan.",
      stack: "JavaScript, HTML, CSS, Bootstrap, jQuery",
      image: pharmacom
    },
    {
      name: "NAVAT — Restaurant Landing Page",
      link: "https://newnavat.netlify.app",
      description: "A promotional landing page for NAVAT, a Central Asian restaurant brand known for its traditional teahouse-style cuisine inspired by the culinary traditions of Kazakhstan, Uzbekistan, Kyrgyzstan, Tajikistan, and the wider region. I developed the frontend of the landing page, creating a responsive and visually engaging interface to showcase the restaurant’s cuisine, menu, atmosphere, and brand identity across desktop and mobile devices.",
      stack: "JavaScript, HTML, CSS, jQuery",
      image: new_navat
    },
    {
      name: "Event Invitation Website",
      link: "https://qonys-toi.netlify.app",
      description: "A custom event invitation website designed to provide guests with event details in a simple, modern, and visually engaging format. I developed the frontend using React, creating a responsive interface optimized for both mobile and desktop devices, with interactive elements and a smooth user experience.",
      stack: "React",
      image: qonys_toi
    },
    {
      name: "MobiEvent — Mobile & Digital Finance Event Website",
      link: "https://mobievent.kz",
      description: "A website for MobiEvent, an industry event focused on the development of mobile services, digital payments, and financial technologies across Kazakhstan and the CIS region.",
      stack: "Nuxt.js",
      image: mobi_event
    },
    {
      name: "Rento — Sports Facility Booking Platform",
      link: "https://rentokz.netlify.app",
      description: "A full-featured online platform for discovering and booking sports facilities and venues, connecting customers with facility owners through a single booking system. I developed the frontend using React, implementing separate user experiences for customers and facility hosts. The platform includes a custom administration panel that allows hosts to manage their facilities, availability, and booking-related information, while customers can explore available venues and complete reservations online. The project gave me experience building a more complex product with multiple user roles, administrative functionality, authentication, booking workflows.",
      stack: "React, Redux, Firebase",
      image: rento
    },
    {
      name: "QAZAQ TAXI — Ride-Hailing Platform",
      link: "https://play.google.com/store/apps/details?id=com.user.qazaqtaxi&hl=en&gl=US",
      description: "A Kazakhstan-based ride-hailing platform designed to provide users with a fast and convenient way to request and manage taxi rides. I developed the frontend using Vue.js, Nuxt.js, and Vuetify, implementing responsive user interfaces and core ride-booking flows with a focus on a smooth experience across mobile and desktop devices.",
      stack: "Vue.js, Nuxt.js, Vuetify",
      image: qazaq_taxi
    },
    {
      name: "Tez Zhet - Food & Grocery Delivery Platform",
      link: "https://apps.apple.com/sk/app/tezzhet/id6473077229",
      description: "A multi-service delivery application that allows users to order food, groceries, and everyday products from local restaurants and stores through a single platform. I worked on the frontend development of the application, implementing product and restaurant catalogs, search and filtering, shopping cart and checkout flows, user authentication, delivery address management, order placement, order history, and integration with backend APIs. The platform was designed with a mobile-first approach, focusing on simple navigation and a smooth ordering experience across different devices.",
      stack: "Nuxt.js",
      image: tez_zhet
    },
    {
      name: "YAQ — Outdoor & Sports E-commerce Platform",
      link: "https://yaq.kz",
      description: "An e-commerce website for YAQ, a retailer specializing in professional clothing, footwear, accessories, and equipment for running, hiking, camping, tourism, and other outdoor activities. I developed the frontend of the online store, implementing product catalogs, category navigation, search, filtering and sorting, product pages, and shopping functionality. I focused on building a responsive and user-friendly shopping experience that makes it easy to navigate a large product assortment across desktop and mobile devices.",
      stack: "React",
      image: yaq
    },
    {
      name: "M1 Service — Automotive Service Website",
      link: "https://m1-service.netlify.app",
      description: "A corporate website for M1 Service, an established network of automotive service centers providing vehicle maintenance, diagnostics, and repair services.",
      stack: "Nuxt.js, TypeScript",
      image: m1_service
    },
    {
      name: "Art Gallery — React Product Gallery",
      link: "https://art-galery.netlify.app",
      description: "One of my first React projects, created while learning how to build interactive and component-based web applications. The application displays a collection of products that users can browse, search, and add to their favorites. I implemented reusable React components, dynamic search functionality, favorites management, and interactive UI updates based on user actions. This project helped me gain practical experience with React fundamentals, component architecture, state management, event handling, filtering data, and building responsive user interfaces.",
      stack: "React",
      image: art_galery
    },
    {
      name: "Rakhat Qazaqstan Óneri — Cultural Digital Project",
      link: "https://rakhat.a-lux.dev",
      description: "A digital project created for LOTTE Rakhat to showcase the richness of contemporary Kazakh culture and introduce users to Kazakhstan’s art, artists, and distinctive creative heritage.",
      stack: "Vue.js",
      image: rakhat
    },
    {
      name: "AsiaCredit Bank — Contact Center Website",
      link: "https://asiacreditbank.kz",
      description: "A web solution for AsiaCredit Bank’s Contact Center, designed to provide individuals and businesses with convenient access to information about the bank’s products, services, and customer support. I worked on the frontend implementation and maintenance of the website, developing responsive interfaces and interactive functionality using HTML, JavaScript, and SCSS, with PHP used on the server side.",
      stack: "PHP (HTML, JavaScript, SCSS, CSS)",
      image: asia_credit_bank
    },
    {
      name: "IKeruen — Logistics & Transportation Website",
      link: "https://ikeruen.kz",
      description: "A corporate website for IKeruen, a logistics company providing freight transportation services for different types and volumes of cargo.",
      stack: "Nuxt.js",
      image: ikeruen
    },
    {
      name: "TORGSOFT — Business Automation Software Website",
      link: "https://torgsoft.netlify.app",
      description: "One of my first commercial web development projects, created for TORGSOFT — a business automation software company providing solutions for managing sales, inventory, operations, and other day-to-day business processes. I worked on the frontend of the website, implementing responsive pages and UI components while gaining early hands-on experience working with a real production project and an existing commercial codebase. This project was an important step in my transition from learning web development to building and maintaining software for real businesses.",
      stack: "JavaScript, HTML, CSS",
      image: torgsoft
    },
    {
      name: "Check Market — Retail Automation & Equipment Website",
      link: "https://github.com/zhassulaan/check-market",
      description: "A commercial website for Check Market, a company providing retail and business automation solutions, including cash register equipment, security systems, installation and maintenance services, and related consumables. I developed the frontend of the website, implementing a structured product catalog, category navigation, search, filtering and sorting, product pages, and service-related interfaces. The focus was on making a broad range of equipment and business solutions easy to discover and navigate across desktop and mobile devices.",
      stack: "Next.js",
      image: check_market
    },
    {
      name: "Young’s Store — E-commerce Website",
      link: "https://youngs-store.netlify.app",
      description: "One of my very first web development projects, created while I was learning the fundamentals of frontend development and turning my programming knowledge into a complete working website. I built an online store for stylish Korean clothing where users can browse products, view product information, place orders, and submit job applications. The website was built with a strong focus on responsive design, providing a consistent experience across desktop, tablet, and mobile devices. This project played an important role in my early development journey, helping me gain practical experience with HTML, CSS, JavaScript, responsive layouts, UI implementation, and building a complete website from scratch.",
      stack: "JavaScript, HTML, CSS, Bootstrap, jQuery",
      image: youngs_store
    },
    {
      name: "Personal Portfolio — Developer Website",
      link: "https://zhassulan.netlify.app",
      description: "A personal portfolio website designed and developed to showcase my professional experience, technical skills, education, projects, and development journey in a more interactive and engaging format than a traditional resume. I built the website to serve as a central place where recruiters, companies, and other developers can explore my background, technologies I work with, and selected commercial and personal projects without relying solely on a PDF resume. The website is fully responsive and designed to provide a clean and consistent experience across desktop, tablet, and mobile devices.",
      stack: "JavaScript, HTML, CSS, jQuery",
      image: portfolio
    },
    {
      name: "Age Counter — Real-Time Age Calculator",
      link: "https://zhassulaan.github.io/AgeCounter",
      description: "One of my early JavaScript projects, created while practicing date manipulation, calculations, and dynamic DOM updates. The application calculates a user’s exact age based on their birth date and displays how long they have lived in years, months, days, hours, minutes, and seconds, updating the results dynamically. This project helped me strengthen my understanding of JavaScript date handling, user input validation, real-time calculations, and DOM manipulation while building a simple responsive user interface.",
      stack: "JavaScript, HTML, CSS, moment.js",
      image: age_counter
    },
    {
      name: "Number speller",
      link: "https://zhassulaan.github.io/Number-speller",
      description: "Number to word counter converter in three languages.",
      stack: "JavaScript, HTML, CSS",
      image: number_speller
    }
  ],
  education: [
    {
      title: "National School - Gymnasium No. 13",
      description: "Primary School - Atyrau",
      date: "2008 - 2014"
    },
    {
      title: "Kazakh - Turkish Lyceum",
      description: "High School - Atyrau",
      date: "2014 - 2019"
    },
    {
      title: "Suleyman Demirel University",
      description: "Bachelor of «Engineering and Natural Sciences» - Almaty",
      date: "2019 - 2023"
    },
    {
      title: "HTML, CSS, and JS for Web Developers",
      description: "Coursera",
      date: "May - 2021"
    },
    {
      title: "Front - End Web Development with React",
      description: "Coursera",
      date: "April - 2022"
    },
    {
      title: "Python (Basic) Certificate",
      description: "HackerRank",
      date: "June - 2022"
    },
    {
      title: "Java (Basic) Certificate",
      description: "HackerRank",
      date: "June - 2022"
    },
    {
      title: "SQL (Basic) Certificate",
      description: "HackerRank",
      date: "June - 2022"
    }
  ],
  achievement: [
    {
      title: "Olympiad in Mathematics",
      link: "https://drive.google.com/file/d/1FhD5mtBb9VX-Fv1ujiogRi6cYO8xd2DT",
      description: "II place",
      date: "2013"
    },
    {
      title: "International Competition «Kenguru - Math for all»",
      link: "https://drive.google.com/file/d/1y_I3_SPkK8VtgmOfLqFOHdAPU7nudGP4",
      description: "III place",
      date: "2016"
    },
    {
      title: "Regional Olympiad in Informatics",
      link: "",
      description: "I place",
      date: "2017"
    },
    {
      title: "Robotics",
      link: "https://drive.google.com/file/d/1d5cTWh0y8LDrCVYhXj_5GZlXAKT8dGkN",
      description: "I place",
      date: "2017"
    },
    {
      title: "International Competition «Infomatrix»",
      link: "https://drive.google.com/file/d/1u3UMHzxXUi6G4kEWZPkPYKewY3i_lpyJ",
      description: "Silver medal",
      date: "2018"
    },
    {
      title: "Euler Olympiad in Mathematics",
      link: "",
      description: "II place",
      date: "2018"
    },
    {
      title: "«IELTS»",
      link: "",
      description: "7 Band",
      date: "2018"
    },
    {
      title: "Dostyk Intellectual Olympiad",
      link: "https://drive.google.com/file/d/1yZUrKA01CuQJWMqfKT1kei4B9BJQdpIb",
      description: "I place",
      date: "2018"
    },
    {
      title: "Certificate of Chinese Proficiency",
      link: "https://drive.google.com/file/d/16B_xxDNRz7HviOhAtrDwvILR6Y7X105j",
      description: "II level",
      date: "2019"
    },
    {
      title: "Secondary Education",
      link: "https://drive.google.com/file/d/1QS2dibgwZRQ8Va0kIf20Cpmq9_9G3JED",
      description: "Red diploma",
      date: "2019"
    },
    {
      title: "Jaxart 2019",
      link: "https://drive.google.com/file/d/1xL7XQZ-ILjUSxEFRRmfsVkZ4v4Nj7zq0",
      description: "Participation",
      date: "2019"
    },
    {
      title: "Certificate of English Proficiency",
      link: "https://drive.google.com/file/d/1i2wlS6PG-HIQpwW5mwjoykEHuBbPo_ZW",
      description: "Upper-Intermediate (B2)",
      date: "2022"
    },
    {
      title: "Film Fest",
      link: "https://drive.google.com/file/d/1Il_qnjWe3R2pNkpLVYY_hEW4Oduu-uRH",
      description: "III place",
      date: "2022"
    },
    {
      title: "Bachelor degree",
      link: "https://drive.google.com/file/d/18C7FIeKxUVyKwXf2K95jU1TsKytAKB3K",
      description: "Red diploma",
      date: "2023"
    }
  ],
  skills: [
    {
      id: "frontend",
      title: "Frontend",
      subtitle: "Aproximately 8 years",
      icon: "fa-solid fa-code",
      list: [
        {
          key: "vue_nuxt",
          name: "Vue.js / Nuxt.js (Vuex)",
          percentage: 100
        },
        {
          key: "react_next",
          name: "React / Next .js (Redux)",
          percentage: 95
        },
        {
          key: "pinia",
          name: "Pinia",
          percentage: 100
        },
        {
          key: "ts",
          name: "TypeScript",
          percentage: 100
        },
        {
          key: "js",
          name: "JavaScript",
          percentage: 100
        },
        {
          key: "html",
          name: "HTML",
          percentage: 100
        },
        {
          key: "css",
          name: "CSS",
          percentage: 100
        }
      ]
    },
    {
      id: "backend_database",
      title: "Backend + DataBase",
      subtitle: "More than 4 years",
      icon: "fa-solid fa-clapperboard",
      list: [
        {
          key: "django",
          name: "Django.py",
          percentage: 80
        },
        {
          key: "postgre_sql",
          name: "PostgreSQL",
          percentage: 100
        },
        {
          key: "pl_sql",
          name: "Oracle PL / SQL",
          percentage: 85
        },
        {
          key: "my_sql",
          name: "MySQL",
          percentage: 85
        }
      ]
    },
    {
      id: "tools",
      title: "Tools",
      subtitle: "More than 7 years",
      icon: "fa-solid fa-object-group",
      list: [
        {
          key: "git",
          name: "Git",
          percentage: 100
        },
        {
          key: "docker",
          name: "Docker",
          percentage: 80
        },
        {
          key: "figma",
          name: "Figma",
          percentage: 100
        },
        {
          key: "jira",
          name: "Atlassian Jira",
          percentage: 95
        },
        {
          key: "postman",
          name: "Postman",
          percentage: 100
        }
      ]
    },
    {
      id: "languages",
      title: "Languages",
      subtitle: "From birth",
      icon: "fa-solid fa-language",
      list: [
        {
          key: "english",
          name: "English",
          level: "Upper-Intermediate",
          percentage: 80,
          link: "https://drive.google.com/file/d/1FDTru0F0fmUbImlWmFKx1PQ9QbS0zvqR"
        },
        {
          key: "kazakh",
          name: "Kazakh",
          level: "Native",
          percentage: 100,
          link: ""
        },
        {
          key: "russian",
          name: "Russian",
          level: "Fluent",
          percentage: 95,
          link: ""
        },
        {
          key: "turkish",
          name: "Turkish",
          level: "Upper-Intermediate",
          percentage: 80,
          link: ""
        },
        {
          key: "chinese",
          name: "Chinese",
          level: "Conversant",
          percentage: 40,
          link: "https://drive.google.com/file/d/1Nc2r3H21SrN_16sO473fxIXHeC-gScnL"
        }
      ]
    }
  ]
};
const _sfc_main$q = {
  __name: "Header",
  __ssrInlineRender: true,
  setup(__props) {
    const active = ref(false);
    const list = [
      {
        id: "home",
        text: "Home",
        icon: "fa-house"
      },
      {
        id: "about",
        text: "About me",
        icon: "fa-user"
      },
      {
        id: "projects",
        text: "Projects",
        icon: "fa-laptop-code"
      },
      {
        id: "experience",
        text: "Experience",
        icon: "fa-briefcase"
      },
      {
        id: "recomendations",
        text: "Recomendations",
        icon: "fa-note-sticky"
      },
      {
        id: "skills",
        text: "Skills",
        icon: "fa-file"
      },
      {
        id: "qualification",
        text: "Qualification",
        icon: "fa-graduation-cap"
      },
      {
        id: "contacts",
        text: "Contacts",
        icon: "fa-address-book"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<header${ssrRenderAttrs(mergeProps({
        class: ["header box", { "active": unref(active) }]
      }, _attrs))}><div class="header-wrap"><img${ssrRenderAttr("src", unref(info).logo)} alt="Logo" class="header-logo"><div class="header-toggle btn"><span></span></div><ul class="header-menu"><!--[-->`);
      ssrRenderList(list, (item) => {
        _push(`<li><a${ssrRenderAttr("href", `#${item.id}`)} class="header-menu__item"><i class="${ssrRenderClass(`fa-solid ${item.icon} icon`)}"></i><p class="text">${ssrInterpolate(item.text)}</p></a></li>`);
      });
      _push(`<!--]--></ul></div></header>`);
    };
  }
};
const _sfc_setup$q = _sfc_main$q.setup;
_sfc_main$q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/Header.vue");
  return _sfc_setup$q ? _sfc_setup$q(props, ctx) : void 0;
};
const __nuxt_component_2$4 = _sfc_main$q;
const firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
// @__NO_SIDE_EFFECTS__
function defineNuxtLink(options) {
  const componentName = options.componentName || "NuxtLink";
  function resolveTrailingSlashBehavior(to, resolve) {
    if (!to || options.trailingSlash !== "append" && options.trailingSlash !== "remove") {
      return to;
    }
    if (typeof to === "string") {
      return applyTrailingSlashBehavior(to, options.trailingSlash);
    }
    const path = "path" in to && to.path !== void 0 ? to.path : resolve(to).path;
    const resolvedPath = {
      ...to,
      path: applyTrailingSlashBehavior(path, options.trailingSlash)
    };
    if ("name" in resolvedPath) {
      delete resolvedPath.name;
    }
    return resolvedPath;
  }
  return defineComponent({
    name: componentName,
    props: {
      // Routing
      to: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      href: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      // Attributes
      target: {
        type: String,
        default: void 0,
        required: false
      },
      rel: {
        type: String,
        default: void 0,
        required: false
      },
      noRel: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Prefetching
      prefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      noPrefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Styling
      activeClass: {
        type: String,
        default: void 0,
        required: false
      },
      exactActiveClass: {
        type: String,
        default: void 0,
        required: false
      },
      prefetchedClass: {
        type: String,
        default: void 0,
        required: false
      },
      // Vue Router's `<RouterLink>` additional props
      replace: {
        type: Boolean,
        default: void 0,
        required: false
      },
      ariaCurrentValue: {
        type: String,
        default: void 0,
        required: false
      },
      // Edge cases handling
      external: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Slot API
      custom: {
        type: Boolean,
        default: void 0,
        required: false
      }
    },
    setup(props, { slots }) {
      const router = useRouter();
      const config = /* @__PURE__ */ useRuntimeConfig();
      const to = computed(() => {
        const path = props.to || props.href || "";
        return resolveTrailingSlashBehavior(path, router.resolve);
      });
      const isAbsoluteUrl = computed(() => typeof to.value === "string" && hasProtocol(to.value, { acceptRelative: true }));
      const hasTarget = computed(() => props.target && props.target !== "_self");
      const isExternal = computed(() => {
        if (props.external) {
          return true;
        }
        if (hasTarget.value) {
          return true;
        }
        if (typeof to.value === "object") {
          return false;
        }
        return to.value === "" || isAbsoluteUrl.value;
      });
      const prefetched = ref(false);
      const el = void 0;
      const elRef = void 0;
      return () => {
        var _a, _b;
        if (!isExternal.value) {
          const routerLinkProps = {
            ref: elRef,
            to: to.value,
            activeClass: props.activeClass || options.activeClass,
            exactActiveClass: props.exactActiveClass || options.exactActiveClass,
            replace: props.replace,
            ariaCurrentValue: props.ariaCurrentValue,
            custom: props.custom
          };
          if (!props.custom) {
            if (prefetched.value) {
              routerLinkProps.class = props.prefetchedClass || options.prefetchedClass;
            }
            routerLinkProps.rel = props.rel || void 0;
          }
          return h(
            resolveComponent("RouterLink"),
            routerLinkProps,
            slots.default
          );
        }
        const href = typeof to.value === "object" ? ((_a = router.resolve(to.value)) == null ? void 0 : _a.href) ?? null : to.value && !props.external && !isAbsoluteUrl.value ? resolveTrailingSlashBehavior(joinURL(config.app.baseURL, to.value), router.resolve) : to.value || null;
        const target = props.target || null;
        const rel = firstNonUndefined(
          // converts `""` to `null` to prevent the attribute from being added as empty (`rel=""`)
          props.noRel ? "" : props.rel,
          options.externalRelAttribute,
          /*
          * A fallback rel of `noopener noreferrer` is applied for external links or links that open in a new tab.
          * This solves a reverse tabnapping security flaw in browsers pre-2021 as well as improving privacy.
          */
          isAbsoluteUrl.value || hasTarget.value ? "noopener noreferrer" : ""
        ) || null;
        if (props.custom) {
          if (!slots.default) {
            return null;
          }
          const navigate = () => navigateTo(href, { replace: props.replace, external: props.external });
          return slots.default({
            href,
            navigate,
            get route() {
              if (!href) {
                return void 0;
              }
              const url = parseURL(href);
              return {
                path: url.pathname,
                fullPath: url.pathname,
                get query() {
                  return parseQuery(url.search);
                },
                hash: url.hash,
                params: {},
                name: void 0,
                matched: [],
                redirectedFrom: void 0,
                meta: {},
                href
              };
            },
            rel,
            target,
            isExternal: isExternal.value,
            isActive: false,
            isExactActive: false
          });
        }
        return h("a", { ref: el, href, rel, target }, (_b = slots.default) == null ? void 0 : _b.call(slots));
      };
    }
  });
}
const __nuxt_component_0$1 = /* @__PURE__ */ defineNuxtLink(nuxtLinkDefaults);
function applyTrailingSlashBehavior(to, trailingSlash) {
  const normalizeFn = trailingSlash === "append" ? withTrailingSlash : withoutTrailingSlash;
  const hasProtocolDifferentFromHttp = hasProtocol(to) && !to.startsWith("http");
  if (hasProtocolDifferentFromHttp) {
    return to;
  }
  return normalizeFn(to, true);
}
const _sfc_main$p = {
  __name: "TypedText",
  __ssrInlineRender: true,
  props: {
    position: Array
  },
  setup(__props) {
    const props = __props;
    const typeValue = ref("");
    const typeStatus = ref(false);
    props.position;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><span class="typed-text" data-v-637397b4>${ssrInterpolate(unref(typeValue))}</span><span class="blinking-cursor" data-v-637397b4>|</span><span class="${ssrRenderClass([{ typing: unref(typeStatus) }, "cursor"])}" data-v-637397b4> </span><!--]-->`);
    };
  }
};
const _sfc_setup$p = _sfc_main$p.setup;
_sfc_main$p.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TypedText.vue");
  return _sfc_setup$p ? _sfc_setup$p(props, ctx) : void 0;
};
const __nuxt_component_1$7 = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["__scopeId", "data-v-637397b4"]]);
const _sfc_main$o = {
  __name: "Button",
  __ssrInlineRender: true,
  props: {
    text: String,
    icon: String,
    transparent: {
      type: Boolean,
      default: false
    },
    second: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        class: ["button", { "green": !__props.transparent }]
      }, _attrs))} data-v-3ab570f1>`);
      if (__props.second) {
        _push(`<i class="${ssrRenderClass(`${__props.icon} icon`)}" data-v-3ab570f1></i>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<p class="button-text" data-v-3ab570f1>${ssrInterpolate(__props.text)}</p><i class="${ssrRenderClass(`${__props.icon} icon`)}" data-v-3ab570f1></i></button>`);
    };
  }
};
const _sfc_setup$o = _sfc_main$o.setup;
_sfc_main$o.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Button.vue");
  return _sfc_setup$o ? _sfc_setup$o(props, ctx) : void 0;
};
const __nuxt_component_3$1 = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["__scopeId", "data-v-3ab570f1"]]);
const _sfc_main$n = {
  __name: "Home",
  __ssrInlineRender: true,
  setup(__props) {
    const list = [
      {
        id: "github",
        link: info.links.github,
        icon: "fa-brands fa-github"
      },
      {
        id: "linkedin",
        link: info.links.linkedin,
        icon: "fa-brands fa-linkedin"
      },
      {
        id: "gmail",
        link: info.links.gmail,
        icon: "fa-solid fa-envelope"
      },
      {
        id: "telegram",
        link: info.links.telegram,
        icon: "fa-brands fa-telegram"
      },
      {
        id: "phone",
        link: info.links.phone,
        icon: "fa-solid fa-phone"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0$1;
      const _component_TypedText = __nuxt_component_1$7;
      const _component_Button = __nuxt_component_3$1;
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "home",
        class: "section"
      }, _attrs))}><div class="home"><div class="home-wrap"><ul class="home-icons"><!--[-->`);
      ssrRenderList(list, (item) => {
        _push(`<li>`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: item.link
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="${ssrRenderClass(`${item.icon} icon`)}"${_scopeId}></i>`);
            } else {
              return [
                createVNode("i", {
                  class: `${item.icon} icon`
                }, null, 2)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul><div class="home-info"><p class="text">Hello, my name is</p><h1 class="text">${ssrInterpolate(unref(info).name)}</h1><h2 class="text">`);
      _push(ssrRenderComponent(_component_TypedText, {
        position: unref(info).position
      }, null, _parent));
      _push(`</h2>`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        to: unref(info).links.hh
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Button, {
              text: "Head Hunter",
              icon: "fa-brands fa-instagram"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Button, {
                text: "Head Hunter",
                icon: "fa-brands fa-instagram"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><a id="btn_home" href="#about">`);
      _push(ssrRenderComponent(_component_Button, {
        text: "Scroll Down",
        icon: "fa-solid fa-square-caret-down",
        transparent: true,
        second: true
      }, null, _parent));
      _push(`</a></div></section>`);
    };
  }
};
const _sfc_setup$n = _sfc_main$n.setup;
_sfc_main$n.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/section/Home.vue");
  return _sfc_setup$n ? _sfc_setup$n(props, ctx) : void 0;
};
const __nuxt_component_3 = _sfc_main$n;
const _sfc_main$m = {
  __name: "Section",
  __ssrInlineRender: true,
  props: {
    id: String,
    title: String,
    subtitle: String
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: __props.id,
        class: "section"
      }, _attrs))} data-v-fdd68a77><div class="section-header" data-v-fdd68a77><h1 class="title" data-v-fdd68a77>${ssrInterpolate(__props.title)}</h1><h6 class="subtitle" data-v-fdd68a77>${ssrInterpolate(__props.subtitle)}</h6></div>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</section>`);
    };
  }
};
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Section.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["__scopeId", "data-v-fdd68a77"]]);
const _sfc_main$l = {
  __name: "Stat",
  __ssrInlineRender: true,
  props: {
    number: {
      type: Number,
      default: 0
    },
    text: String
  },
  setup(__props) {
    const props = __props;
    const formattedNumber = computed(() => {
      return props.number < 10 ? `0${props.number}` : props.number;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "stat" }, _attrs))} data-v-e6c3ced7><h3 class="stat-value" data-v-e6c3ced7>${ssrInterpolate(unref(formattedNumber))}</h3><h6 class="stat-key" data-v-e6c3ced7>${ssrInterpolate(__props.text)}</h6></div>`);
    };
  }
};
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Stat.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
const __nuxt_component_1$6 = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["__scopeId", "data-v-e6c3ced7"]]);
const _sfc_main$k = {
  __name: "About",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Section = __nuxt_component_0;
      const _component_Stat = __nuxt_component_1$6;
      const _component_Button = __nuxt_component_3$1;
      _push(ssrRenderComponent(_component_Section, mergeProps({
        id: "about",
        title: "About me",
        subtitle: "My introduction"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="about section-content"${_scopeId}><img${ssrRenderAttr("src", unref(info).image)}${ssrRenderAttr("alt", unref(info).name)} class="about-image"${_scopeId}><div class="about-info"${_scopeId}><!--[-->`);
            ssrRenderList(unref(info).description, (text) => {
              _push2(`<p class="text"${_scopeId}>${ssrInterpolate(text)}</p>`);
            });
            _push2(`<!--]--><div class="about-info__stats"${_scopeId}><!--[-->`);
            ssrRenderList(unref(info).stats, (stat) => {
              _push2(ssrRenderComponent(_component_Stat, {
                key: stat.key,
                number: stat.value,
                text: stat.key
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]--></div><a download${ssrRenderAttr("href", unref(info).documents.cv)}${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Button, {
              text: "Download CV",
              icon: "fa-solid fa-cloud-arrow-down"
            }, null, _parent2, _scopeId));
            _push2(`</a></div></div>`);
          } else {
            return [
              createVNode("div", { class: "about section-content" }, [
                createVNode("img", {
                  src: unref(info).image,
                  alt: unref(info).name,
                  class: "about-image"
                }, null, 8, ["src", "alt"]),
                createVNode("div", { class: "about-info" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(info).description, (text) => {
                    return openBlock(), createBlock("p", { class: "text" }, toDisplayString(text), 1);
                  }), 256)),
                  createVNode("div", { class: "about-info__stats" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(info).stats, (stat) => {
                      return openBlock(), createBlock(_component_Stat, {
                        key: stat.key,
                        number: stat.value,
                        text: stat.key
                      }, null, 8, ["number", "text"]);
                    }), 128))
                  ]),
                  createVNode("a", {
                    download: "",
                    href: unref(info).documents.cv
                  }, [
                    createVNode(_component_Button, {
                      text: "Download CV",
                      icon: "fa-solid fa-cloud-arrow-down"
                    })
                  ], 8, ["href"])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/section/About.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
const __nuxt_component_4 = _sfc_main$k;
const _sfc_main$j = {
  __name: "Carousel",
  __ssrInlineRender: true,
  props: {
    list: Array
  },
  setup(__props) {
    ref(0);
    onUnmounted(() => {
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "carousel" }, _attrs))} data-v-7982421c><div class="carousel-inner" data-v-7982421c><!--[-->`);
      ssrRenderList(__props.list, (item, index) => {
        _push(`<div class="carousel-item" data-v-7982421c>`);
        ssrRenderSlot(_ctx.$slots, "default", { element: item }, null, _push, _parent);
        _push(`</div>`);
      });
      _push(`<!--]--></div><button data-v-7982421c><i id="prev" class="fa-regular fa-circle-left icon btn" data-v-7982421c></i></button><button data-v-7982421c><i id="next" class="fa-regular fa-circle-right icon btn" data-v-7982421c></i></button></div>`);
    };
  }
};
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Carousel.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
const __nuxt_component_1$5 = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["__scopeId", "data-v-7982421c"]]);
const _sfc_main$i = {
  __name: "Project",
  __ssrInlineRender: true,
  props: {
    project: Object
  },
  setup(__props) {
    const props = __props;
    const { name, link, description, stack, image: image2 } = props.project;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Button = __nuxt_component_3$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "project" }, _attrs))}><a${ssrRenderAttr("href", unref(link))} class="project-image"><img${ssrRenderAttr("src", unref(image2))}${ssrRenderAttr("alt", unref(name))} class="image"></a><div class="project-data"><h3 class="title">${ssrInterpolate(unref(name))}</h3><h6 class="description">Tech stack: ${ssrInterpolate(unref(stack))}</h6><p class="text">${ssrInterpolate(unref(description))}</p><a${ssrRenderAttr("href", unref(link))}>`);
      _push(ssrRenderComponent(_component_Button, {
        text: "Watch this project",
        icon: "fa-solid fa-angles-right"
      }, null, _parent));
      _push(`</a></div></div>`);
    };
  }
};
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Project.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const __nuxt_component_2$3 = _sfc_main$i;
const _sfc_main$h = {
  __name: "Projects",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Section = __nuxt_component_0;
      const _component_Carousel = __nuxt_component_1$5;
      const _component_Project = __nuxt_component_2$3;
      _push(ssrRenderComponent(_component_Section, mergeProps({
        id: "projects",
        title: "Projects",
        subtitle: "My works"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Carousel, {
              list: unref(info).projects
            }, {
              default: withCtx(({ element }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Project, { project: element }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Project, { project: element }, null, 8, ["project"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Carousel, {
                list: unref(info).projects
              }, {
                default: withCtx(({ element }) => [
                  createVNode(_component_Project, { project: element }, null, 8, ["project"])
                ]),
                _: 1
              }, 8, ["list"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/section/Projects.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const __nuxt_component_5 = _sfc_main$h;
const _sfc_main$g = {
  __name: "Modal",
  __ssrInlineRender: true,
  props: {
    company: Object
  },
  setup(__props) {
    const props = __props;
    const { id, name, position, logo, date, responsibilities } = props.company;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: `modal-${unref(id)}`,
        class: "modal"
      }, _attrs))}><div class="modal-background btn"></div><div class="modal-wrap"><i class="fa-solid fa-xmark modal-close icon btn"></i><div class="modal-header"><div class="modal-header__left"><h4>${ssrInterpolate(unref(position))}</h4><h6 class="text">${ssrInterpolate(unref(date))}</h6></div><img${ssrRenderAttr("src", unref(logo))}${ssrRenderAttr("alt", unref(name))} class="logo"></div><ul class="modal-responsibility"><!--[-->`);
      ssrRenderList(unref(responsibilities), (responsibility, index) => {
        _push(`<li class="modal-responsibility__item"><i class="fa-solid fa-circle icon"></i><p>${ssrInterpolate(responsibility)}</p></li>`);
      });
      _push(`<!--]--></ul></div></div>`);
    };
  }
};
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modal.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const __nuxt_component_1$4 = _sfc_main$g;
const _sfc_main$f = {
  __name: "Card",
  __ssrInlineRender: true,
  props: {
    company: Object
  },
  setup(__props) {
    const props = __props;
    const { name, icon } = props.company;
    const isOpen = ref(false);
    function toggleModal(id) {
      isOpen.value = !isOpen.value;
      let modal = (void 0).querySelector(`#modal-${id}`);
      if (isOpen.value) {
        modal.classList.add("active");
        (void 0).body.style.overflow = "hidden";
      } else {
        modal.classList.remove("active");
        (void 0).body.style.overflow = "auto";
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Button = __nuxt_component_3$1;
      const _component_Modal = __nuxt_component_1$4;
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: __props.company.id,
        class: "card"
      }, _attrs))} data-v-027b3554><i class="${ssrRenderClass(`${unref(icon)} card-icon`)}" data-v-027b3554></i><h3 class="card-text" data-v-027b3554>${ssrInterpolate(unref(name))}</h3>`);
      _push(ssrRenderComponent(_component_Button, {
        text: "View More",
        icon: "fa-solid fa-angle-down",
        transparent: true,
        onClick: ($event) => toggleModal(__props.company.id)
      }, null, _parent));
      _push(ssrRenderComponent(_component_Modal, {
        company: __props.company,
        onClose: ($event) => toggleModal(__props.company.id)
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Card.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const __nuxt_component_1$3 = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__scopeId", "data-v-027b3554"]]);
const _sfc_main$e = {
  __name: "Experience",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Section = __nuxt_component_0;
      const _component_Card = __nuxt_component_1$3;
      _push(ssrRenderComponent(_component_Section, mergeProps({
        id: "experience",
        title: "Experience",
        subtitle: "My profesional journey"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="experience section-content"${_scopeId}><!--[-->`);
            ssrRenderList(unref(info).experience, (item) => {
              _push2(ssrRenderComponent(_component_Card, {
                key: item.id,
                company: item
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "experience section-content" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(info).experience, (item) => {
                  return openBlock(), createBlock(_component_Card, {
                    key: item.id,
                    company: item
                  }, null, 8, ["company"]);
                }), 128))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/section/Experience.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const __nuxt_component_6 = _sfc_main$e;
const _sfc_main$d = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "stars" }, _attrs))} data-v-334300f9><!--[-->`);
  ssrRenderList(5, (i) => {
    _push(`<i class="fa-solid fa-star icon" data-v-334300f9></i>`);
  });
  _push(`<!--]--></div>`);
}
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Stars.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const __nuxt_component_1$2 = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-334300f9"]]);
const _sfc_main$c = {
  __name: "Recomendation",
  __ssrInlineRender: true,
  props: {
    recomendation: Object
  },
  setup(__props) {
    const props = __props;
    const { file, cheif, description } = props.recomendation;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<a${ssrRenderAttrs(mergeProps({
        download: "",
        href: unref(file),
        class: "recomendation"
      }, _attrs))} data-v-e9fd74f3><i class="fa-solid fa-file icon" data-v-e9fd74f3></i><div class="recomendation-line" data-v-e9fd74f3></div><div data-v-e9fd74f3><h4 class="recomendation-name" data-v-e9fd74f3>${ssrInterpolate(unref(cheif))}</h4><h6 class="recomendation-place" data-v-e9fd74f3>${ssrInterpolate(unref(description))}</h6></div></a>`);
    };
  }
};
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Recomendation.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const __nuxt_component_2$2 = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-e9fd74f3"]]);
const _sfc_main$b = {
  __name: "Recomendations",
  __ssrInlineRender: true,
  setup(__props) {
    const recomendations = info.documents.recomendations;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Section = __nuxt_component_0;
      const _component_Stars = __nuxt_component_1$2;
      const _component_Recomendation = __nuxt_component_2$2;
      _push(ssrRenderComponent(_component_Section, mergeProps({
        id: "recomendations",
        title: "Recomendations",
        subtitle: "Characteristics from my cheifs"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="recomendations section-content"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Stars, null, null, _parent2, _scopeId));
            _push2(`<!--[-->`);
            ssrRenderList(unref(recomendations), (recomendation, index) => {
              _push2(ssrRenderComponent(_component_Recomendation, {
                key: index,
                recomendation
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "recomendations section-content" }, [
                createVNode(_component_Stars),
                (openBlock(true), createBlock(Fragment, null, renderList(unref(recomendations), (recomendation, index) => {
                  return openBlock(), createBlock(_component_Recomendation, {
                    key: index,
                    recomendation
                  }, null, 8, ["recomendation"]);
                }), 128))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/section/Recomendations.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const __nuxt_component_7 = _sfc_main$b;
const _sfc_main$a = {
  __name: "Skill",
  __ssrInlineRender: true,
  props: {
    skill: Object
  },
  setup(__props) {
    const props = __props;
    const { key, name, percentage, level, link } = props.skill;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: unref(key),
        class: "skill"
      }, _attrs))} data-v-d70c3c43><div class="skill-data" data-v-d70c3c43><a${ssrRenderAttr("href", unref(link))} data-v-d70c3c43><h5 data-v-d70c3c43>${ssrInterpolate(unref(name))}</h5></a>`);
      if (unref(level)) {
        _push(`<a${ssrRenderAttr("href", unref(link))} data-v-d70c3c43><p class="level" data-v-d70c3c43>${ssrInterpolate(unref(level))}</p></a>`);
      } else {
        _push(`<p class="percentage" data-v-d70c3c43>${ssrInterpolate(unref(percentage))}%</p>`);
      }
      _push(`</div><div class="skill-bar" data-v-d70c3c43><div class="skill-bar__inner" style="${ssrRenderStyle({ width: unref(percentage) + "%" })}" data-v-d70c3c43></div></div></div>`);
    };
  }
};
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Skill.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const __nuxt_component_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-d70c3c43"]]);
const _sfc_main$9 = {
  __name: "Skills",
  __ssrInlineRender: true,
  setup(__props) {
    const active = ref(info.skills[0].id);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Section = __nuxt_component_0;
      const _component_Skill = __nuxt_component_1$1;
      _push(ssrRenderComponent(_component_Section, mergeProps({
        id: "skills",
        title: "Skills",
        subtitle: "My abilities"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="skills section-content"${_scopeId}><!--[-->`);
            ssrRenderList(unref(info).skills, (skill) => {
              _push2(`<div${ssrRenderAttr("id", skill.id)} class="${ssrRenderClass([{ "active": unref(active) === skill.id }, "skills-box"])}"${_scopeId}><div class="skills-box__header"${_scopeId}><i class="${ssrRenderClass(`${skill.icon} icon`)}"${_scopeId}></i><div${_scopeId}><h4${_scopeId}>${ssrInterpolate(skill.title)}</h4><h6 class="subtitle"${_scopeId}>${ssrInterpolate(skill.subtitle)}</h6></div><button${_scopeId}><i class="fa-solid fa-angle-down icon btn"${_scopeId}></i></button></div><div class="skills-box__list"${_scopeId}><!--[-->`);
              ssrRenderList(skill.list, (item) => {
                _push2(ssrRenderComponent(_component_Skill, {
                  key: item.key,
                  skill: item
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div></div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "skills section-content" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(info).skills, (skill) => {
                  return openBlock(), createBlock("div", {
                    id: skill.id,
                    key: skill.id,
                    class: ["skills-box", { "active": unref(active) === skill.id }]
                  }, [
                    createVNode("div", { class: "skills-box__header" }, [
                      createVNode("i", {
                        class: `${skill.icon} icon`
                      }, null, 2),
                      createVNode("div", null, [
                        createVNode("h4", null, toDisplayString(skill.title), 1),
                        createVNode("h6", { class: "subtitle" }, toDisplayString(skill.subtitle), 1)
                      ]),
                      createVNode("button", null, [
                        createVNode("i", {
                          class: "fa-solid fa-angle-down icon btn",
                          onClick: ($event) => active.value = skill.id
                        }, null, 8, ["onClick"])
                      ])
                    ]),
                    createVNode("div", { class: "skills-box__list" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(skill.list, (item) => {
                        return openBlock(), createBlock(_component_Skill, {
                          key: item.key,
                          skill: item
                        }, null, 8, ["skill"]);
                      }), 128))
                    ])
                  ], 10, ["id"]);
                }), 128))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/section/Skills.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const __nuxt_component_8 = _sfc_main$9;
const _sfc_main$8 = {
  __name: "Toggler",
  __ssrInlineRender: true,
  props: {
    section: String,
    icon: String,
    active: String
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        id: `toggler-${__props.section}`,
        class: ["toggler btn", { "active": __props.active === __props.section }]
      }, _attrs))} data-v-c4083126><i class="${ssrRenderClass(`${__props.icon} icon`)}" data-v-c4083126></i><h4 class="text" data-v-c4083126>${ssrInterpolate(__props.section.charAt(0).toUpperCase() + __props.section.slice(1))}</h4></button>`);
    };
  }
};
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Toggler.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-c4083126"]]);
const _sfc_main$7 = {
  __name: "Tree",
  __ssrInlineRender: true,
  props: {
    section: String,
    list: Array,
    active: String
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: `tree-${__props.section}`,
        class: ["tree", { "active": __props.active === __props.section }]
      }, _attrs))} data-v-e99036cc><!--[-->`);
      ssrRenderList(__props.list, (item, index) => {
        _push(`<div class="${ssrRenderClass([
          index % 2 === 1 && __props.section === "education" || index % 2 === 0 && __props.section === "achievement" ? "right" : "left",
          "tree-row"
        ])}" data-v-e99036cc><div class="tree-row__cell" data-v-e99036cc></div><div class="tree-row__cell" data-v-e99036cc><span class="circle" data-v-e99036cc></span><span class="line" data-v-e99036cc></span></div><div class="tree-row__cell" data-v-e99036cc><a${ssrRenderAttr("href", item.link)} data-v-e99036cc><h5 class="title" data-v-e99036cc>${ssrInterpolate(item.title)}</h5></a><h6 class="subtitle" data-v-e99036cc>${ssrInterpolate(item.description)}</h6><div class="date" data-v-e99036cc><i class="fa-solid fa-calendar-days date-icon" data-v-e99036cc></i><p class="date-text" data-v-e99036cc>${ssrInterpolate(item.date)}</p></div></div><div class="tree-row__cell" data-v-e99036cc><span class="circle" data-v-e99036cc></span><span class="line" data-v-e99036cc></span></div><div class="tree-row__cell" data-v-e99036cc></div></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Tree.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_2$1 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-e99036cc"]]);
const _sfc_main$6 = {
  __name: "Qualification",
  __ssrInlineRender: true,
  setup(__props) {
    const sections = ["education", "achievement"];
    const active = ref("education");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Section = __nuxt_component_0;
      const _component_Toggler = __nuxt_component_1;
      const _component_Tree = __nuxt_component_2$1;
      _push(ssrRenderComponent(_component_Section, mergeProps({
        id: "qualification",
        title: "Qualification",
        subtitle: "My knowledge and certificates"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="qualification section-content"${_scopeId}><div class="qualification-header"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Toggler, {
              section: sections[0],
              icon: "fa-solid fa-graduation-cap",
              active: unref(active),
              onClick: ($event) => active.value = sections[0]
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Toggler, {
              section: sections[1],
              icon: "fa-solid fa-briefcase",
              active: unref(active),
              onClick: ($event) => active.value = sections[1]
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_Tree, {
              section: sections[0],
              list: unref(info).education,
              active: unref(active)
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Tree, {
              section: sections[1],
              list: unref(info).achievement,
              active: unref(active)
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "qualification section-content" }, [
                createVNode("div", { class: "qualification-header" }, [
                  createVNode(_component_Toggler, {
                    section: sections[0],
                    icon: "fa-solid fa-graduation-cap",
                    active: unref(active),
                    onClick: ($event) => active.value = sections[0]
                  }, null, 8, ["section", "active", "onClick"]),
                  createVNode(_component_Toggler, {
                    section: sections[1],
                    icon: "fa-solid fa-briefcase",
                    active: unref(active),
                    onClick: ($event) => active.value = sections[1]
                  }, null, 8, ["section", "active", "onClick"])
                ]),
                createVNode(_component_Tree, {
                  section: sections[0],
                  list: unref(info).education,
                  active: unref(active)
                }, null, 8, ["section", "list", "active"]),
                createVNode(_component_Tree, {
                  section: sections[1],
                  list: unref(info).achievement,
                  active: unref(active)
                }, null, 8, ["section", "list", "active"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/section/Qualification.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_9 = _sfc_main$6;
const _sfc_main$5 = {
  __name: "Input",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    id: String,
    label: String,
    type: String,
    placeholder: String,
    textarea: {
      type: Boolean,
      default: false
    }
  }, {
    "modelValue": {},
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props) {
    const model = useModel(__props, "modelValue");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "input" }, _attrs))} data-v-be7dba1f><label${ssrRenderAttr("for", __props.id)} data-v-be7dba1f>${ssrInterpolate(__props.label)}</label>`);
      if (__props.textarea) {
        _push(`<textarea${ssrRenderAttr("id", __props.id)} cols="1" rows="16"${ssrRenderAttr("placeholder", __props.placeholder)} data-v-be7dba1f>${ssrInterpolate(model.value)}</textarea>`);
      } else {
        _push(`<input${ssrRenderAttr("id", __props.id)}${ssrRenderAttr("type", __props.type)}${ssrRenderAttr("placeholder", __props.placeholder)}${ssrRenderDynamicModel(__props.type, model.value, null)} data-v-be7dba1f>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Input.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-be7dba1f"]]);
const _sfc_main$4 = {
  __name: "Contacts",
  __ssrInlineRender: true,
  setup(__props) {
    const user = ref("");
    const contact = ref("");
    const message = ref("");
    const error = ref("");
    const sended = ref(false);
    const data = [
      {
        key: "Phone",
        value: info.phone,
        link: info.links.phone,
        icon: "fa-phone"
      },
      {
        key: "Email",
        value: info.gmail,
        link: info.links.gmail,
        icon: "fa-envelope"
      },
      {
        key: "Location",
        value: info.location,
        link: "#",
        icon: "fa-location-dot"
      }
    ];
    function validation(event) {
      event.preventDefault();
      console.log(user.value);
      if (user.value === "") {
        error.value = "Write your name-surename.";
        return false;
      } else if (contact.value === "") {
        error.value = "Leave your contact information.";
        return false;
      } else if (message.value === "") {
        error.value = "Leave a message.";
        return false;
      } else {
        send();
        return true;
      }
    }
    function send() {
      var params = { from_name: user.value, from_email: contact.value, from_message: message.value };
      emailjs.send("service_ellnze8", "template_vg1m6jx", params).then(function(res) {
        console.log("success", res.status);
      });
      sended.value = true;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Section = __nuxt_component_0;
      const _component_nuxt_link = __nuxt_component_0$1;
      const _component_Input = __nuxt_component_2;
      const _component_Button = __nuxt_component_3$1;
      _push(ssrRenderComponent(_component_Section, mergeProps({
        id: "contacts",
        title: "Contact me",
        subtitle: "Get in touch"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="contacts"${_scopeId}><div class="contacts-info"${_scopeId}><!--[-->`);
            ssrRenderList(data, (item) => {
              _push2(`<div class="contact"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_nuxt_link, {
                to: item.link
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<i class="${ssrRenderClass(`fa-solid ${item.icon} icon`)}"${_scopeId2}></i>`);
                  } else {
                    return [
                      createVNode("i", {
                        class: `fa-solid ${item.icon} icon`
                      }, null, 2)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_nuxt_link, {
                to: item.link
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<h4${_scopeId2}>${ssrInterpolate(item.key)}</h4><h6 class="subtitle"${_scopeId2}>${ssrInterpolate(item.value)}</h6>`);
                  } else {
                    return [
                      createVNode("h4", null, toDisplayString(item.key), 1),
                      createVNode("h6", { class: "subtitle" }, toDisplayString(item.value), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div>`);
            });
            _push2(`<!--]--></div><form id="form" method="post" enctype="text/plain" class="contacts-form"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Input, {
              id: "name",
              label: "Name - Surname",
              type: "text",
              placeholder: "Name - Surname",
              modelValue: unref(user),
              "onUpdate:modelValue": ($event) => isRef(user) ? user.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Input, {
              id: "contact",
              label: "Contacts",
              type: "text",
              placeholder: "Phone number / Email",
              modelValue: unref(contact),
              "onUpdate:modelValue": ($event) => isRef(contact) ? contact.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Input, {
              id: "message",
              label: "Message",
              placeholder: "Message...",
              textarea: true,
              modelValue: unref(message),
              "onUpdate:modelValue": ($event) => isRef(message) ? message.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Button, {
              text: "Send Message",
              icon: "fa-solid fa-paper-plane",
              type: "submit"
            }, null, _parent2, _scopeId));
            _push2(`<p${_scopeId}>${ssrInterpolate(unref(error))}</p></form></div>`);
          } else {
            return [
              createVNode("div", { class: "contacts" }, [
                createVNode("div", { class: "contacts-info" }, [
                  (openBlock(), createBlock(Fragment, null, renderList(data, (item) => {
                    return createVNode("div", {
                      key: item.key,
                      class: "contact"
                    }, [
                      createVNode(_component_nuxt_link, {
                        to: item.link
                      }, {
                        default: withCtx(() => [
                          createVNode("i", {
                            class: `fa-solid ${item.icon} icon`
                          }, null, 2)
                        ]),
                        _: 2
                      }, 1032, ["to"]),
                      createVNode(_component_nuxt_link, {
                        to: item.link
                      }, {
                        default: withCtx(() => [
                          createVNode("h4", null, toDisplayString(item.key), 1),
                          createVNode("h6", { class: "subtitle" }, toDisplayString(item.value), 1)
                        ]),
                        _: 2
                      }, 1032, ["to"])
                    ]);
                  }), 64))
                ]),
                createVNode("form", {
                  id: "form",
                  onSubmit: withModifiers(validation, ["prevent"]),
                  method: "post",
                  enctype: "text/plain",
                  class: "contacts-form"
                }, [
                  createVNode(_component_Input, {
                    id: "name",
                    label: "Name - Surname",
                    type: "text",
                    placeholder: "Name - Surname",
                    modelValue: unref(user),
                    "onUpdate:modelValue": ($event) => isRef(user) ? user.value = $event : null
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_Input, {
                    id: "contact",
                    label: "Contacts",
                    type: "text",
                    placeholder: "Phone number / Email",
                    modelValue: unref(contact),
                    "onUpdate:modelValue": ($event) => isRef(contact) ? contact.value = $event : null
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_Input, {
                    id: "message",
                    label: "Message",
                    placeholder: "Message...",
                    textarea: true,
                    modelValue: unref(message),
                    "onUpdate:modelValue": ($event) => isRef(message) ? message.value = $event : null
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_Button, {
                    text: "Send Message",
                    icon: "fa-solid fa-paper-plane",
                    type: "submit"
                  }),
                  createVNode("p", null, toDisplayString(unref(error)), 1)
                ], 32)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/section/Contacts.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_10 = _sfc_main$4;
const _sfc_main$3 = {
  __name: "Footer",
  __ssrInlineRender: true,
  setup(__props) {
    const list = [
      {
        id: "projects",
        text: "Projects"
      },
      {
        id: "experience",
        text: "Experience"
      },
      {
        id: "recomendations",
        text: "Recomendations"
      },
      {
        id: "qualification",
        text: "Qualification"
      }
    ];
    const icons = [
      {
        id: "whatsapp",
        link: info.links.whatsapp,
        icon: "fa-brands fa-whatsapp"
      },
      {
        id: "facebook",
        link: info.links.facebook,
        icon: "fa-brands fa-facebook"
      },
      {
        id: "instagram",
        link: info.links.instagram,
        icon: "fa-brands fa-instagram"
      },
      {
        id: "telegram",
        link: info.links.telegram,
        icon: "fa-brands fa-telegram"
      },
      {
        id: "gmail",
        link: info.links.gmail,
        icon: "fa-solid fa-at"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0$1;
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "footer" }, _attrs))}><div class="box"><div class="footer-wrap"><div class="footer-wrap__cell"><h2 class="title">${ssrInterpolate(unref(info).name)}</h2><h4 class="subtitle">Middle ${ssrInterpolate(unref(info).position[0])}</h4></div><ul class="footer-wrap__cell"><!--[-->`);
      ssrRenderList(list, (item) => {
        _push(`<li><a${ssrRenderAttr("href", `#${item.id}`)}><p class="text">${ssrInterpolate(item.text)}</p></a></li>`);
      });
      _push(`<!--]--></ul><ul class="footer-icons"><!--[-->`);
      ssrRenderList(icons, (icon) => {
        _push(`<li>`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          to: icon.link
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="${ssrRenderClass(`${icon.icon} icon`)}"${_scopeId}></i>`);
            } else {
              return [
                createVNode("i", {
                  class: `${icon.icon} icon`
                }, null, 2)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div><p class="footer-copy text">© Serikuly Zh. All rights reserved.</p></div></footer>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/Footer.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_11 = _sfc_main$3;
const _sfc_main$2 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_Progressbar = __nuxt_component_0$2;
  const _component_Scroller = __nuxt_component_1$8;
  const _component_layout_header = __nuxt_component_2$4;
  const _component_section_home = __nuxt_component_3;
  const _component_section_about = __nuxt_component_4;
  const _component_section_projects = __nuxt_component_5;
  const _component_section_experience = __nuxt_component_6;
  const _component_section_recomendations = __nuxt_component_7;
  const _component_section_skills = __nuxt_component_8;
  const _component_section_qualification = __nuxt_component_9;
  const _component_section_contacts = __nuxt_component_10;
  const _component_layout_footer = __nuxt_component_11;
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_Progressbar, null, null, _parent));
  _push(ssrRenderComponent(_component_Scroller, null, null, _parent));
  _push(ssrRenderComponent(_component_layout_header, null, null, _parent));
  _push(`<div class="main"><div class="box">`);
  _push(ssrRenderComponent(_component_section_home, null, null, _parent));
  _push(ssrRenderComponent(_component_section_about, null, null, _parent));
  _push(ssrRenderComponent(_component_section_projects, null, null, _parent));
  _push(ssrRenderComponent(_component_section_experience, null, null, _parent));
  _push(ssrRenderComponent(_component_section_recomendations, null, null, _parent));
  _push(ssrRenderComponent(_component_section_skills, null, null, _parent));
  _push(ssrRenderComponent(_component_section_qualification, null, null, _parent));
  _push(ssrRenderComponent(_component_section_contacts, null, null, _parent));
  _push(`</div></div>`);
  _push(ssrRenderComponent(_component_layout_footer, null, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const AppComponent = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$1 = {
  __name: "nuxt-error-page",
  __ssrInlineRender: true,
  props: {
    error: Object
  },
  setup(__props) {
    const props = __props;
    const _error = props.error;
    (_error.stack || "").split("\n").splice(1).map((line) => {
      const text = line.replace("webpack:/", "").replace(".vue", ".js").trim();
      return {
        text,
        internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
      };
    }).map((i) => `<span class="stack${i.internal ? " internal" : ""}">${i.text}</span>`).join("\n");
    const statusCode = Number(_error.statusCode || 500);
    const is404 = statusCode === 404;
    const statusMessage = _error.statusMessage ?? (is404 ? "Page Not Found" : "Internal Server Error");
    const description = _error.message || _error.toString();
    const stack = void 0;
    const _Error404 = defineAsyncComponent(() => import('./error-404-DuRBzZDb.mjs').then((r) => r.default || r));
    const _Error = defineAsyncComponent(() => import('./error-500-D18x7jX2.mjs').then((r) => r.default || r));
    const ErrorTemplate = is404 ? _Error404 : _Error;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ErrorTemplate), mergeProps({ statusCode: unref(statusCode), statusMessage: unref(statusMessage), description: unref(description), stack: unref(stack) }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-error-page.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ErrorComponent = _sfc_main$1;
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const IslandRenderer = defineAsyncComponent(() => import('./island-renderer-D44ZhitY.mjs').then((r) => r.default || r));
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide(PageRouteSymbol, useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    onErrorCaptured((err, target, info2) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info2).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = nuxtApp.runWithContext(() => showError(err));
        onServerPrefetch(() => p);
        return false;
      }
    });
    const islandContext = nuxtApp.ssrContext.islandContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(error)) {
            _push(ssrRenderComponent(unref(ErrorComponent), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(AppComponent), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const RootComponent = _sfc_main;
let entry;
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(RootComponent);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (error) {
      await nuxt.hooks.callHook("app:error", error);
      nuxt.payload.error = nuxt.payload.error || createError(error);
    }
    if (ssrContext == null ? void 0 : ssrContext._renderResponse) {
      throw new Error("skipping render");
    }
    return vueApp;
  };
}
const entry$1 = (ssrContext) => entry(ssrContext);

export { _export_sfc as _, __nuxt_component_0$1 as a, createError as c, entry$1 as default, injectHead as i, resolveUnrefHeadInput as r };
//# sourceMappingURL=server.mjs.map
