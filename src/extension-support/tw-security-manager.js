/* eslint-disable no-unused-vars */

/**
 * Responsible for determining various policies related to custom extension security.
 * The default implementation restricts automatic extension loading, but grants any
 * loaded extensions the maximum possible capabilities so as to retain compatibility
 * with a vanilla scratch-vm. You may override properties of an instance of this class
 * to customize the security policies as you see fit, for example:
 * ```js
 * vm.securityManager.getSandboxMode = (url) => {
 *   if (url.startsWith("https://example.com/")) {
 *     return "unsandboxed";
 *   }
 *   return "iframe";
 * };
 * vm.securityManager.canAutomaticallyLoadExtension = (url) => {
 *   return confirm("Automatically load extension: " + url);
 * };
 * vm.securityManager.canFetch = (url) => {
 *   return url.startsWith('https://turbowarp.org/');
 * };
 * vm.securityManager.canOpenWindow = (url) => {
 *   return url.startsWith('https://turbowarp.org/');
 * };
 * vm.securityManager.canRedirect = (url) => {
 *   return url.startsWith('https://turbowarp.org/');
 * };
 * ```
 */
class SecurityManager {
    /**
     * Determine the typeof sandbox to use for a certain custom extension.
     * @param {string} extensionURL The URL of the custom extension.
     * @returns {'worker'|'iframe'|'unsandboxed'|Promise<'worker'|'iframe'|'unsandboxed'>}
     */
    getSandboxMode (extensionURL) {
        return Promise.resolve('unsandboxed');
    }

    /**
     * Determine whether a custom extension that was stored inside a project may be
     * loaded. You could, for example, ask the user to confirm loading an extension
     * before resolving.
     * @param {string} extensionURL The URL of the custom extension.
     * @returns {Promise<boolean>|boolean}
     */
    canLoadExtensionFromProject (extensionURL) {
        // Default to false for security
        // set to true so that custom extensions can be used
        return Promise.resolve(true);
    }

    /**
     * Determine whether an extension is allowed to fetch a remote resource URL.
     * This only applies to unsandboxed extensions that use the appropriate Scratch.* APIs.
     * Sandboxed extensions ignore this entirely as there is no way to force them to use our APIs.
     * data: and blob: URLs are always allowed (this method is never called).
     * @param {string} resourceURL
     * @returns {Promise<boolean>|boolean}
     */
    canFetch (resourceURL) {
        // By default, allow any requests.
        return Promise.resolve(true);
    }

    /**
     * Determine whether an extension is allowed to open a new window or tab to a given URL.
     * This only applies to unsandboxed extensions. Sandboxed extensions are unable to open windows.
     * javascript: URLs are always rejected (this method is never called).
     * @param {string} websiteURL
     * @returns {Promise<boolean>|boolean}
     */
    canOpenWindow (websiteURL) {
        // By default, allow all.
        return Promise.resolve(true);
    }

    /**
     * Determine whether an extension is allowed to redirect the current tab to a given URL.
     * This only applies to unsandboxed extensions. Sandboxed extensions are unable to redirect the parent
     * window, but are free to redirect their own sandboxed window.
     * javascript: URLs are always rejected (this method is never called).
     * @param {string} websiteURL
     * @returns {Promise<boolean>|boolean}
     */
    canRedirect (websiteURL) {
        // By default, allow all.
        return Promise.resolve(true);
    }
}

module.exports = SecurityManager;
