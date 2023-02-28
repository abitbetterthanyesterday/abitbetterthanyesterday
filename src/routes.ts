enum RoutesUrl {
  about = "/about",
  home = "/",
  blog = "/blog",
}
type Route = { url: RoutesUrl; navTitle: string; isActive: Boolean };

/* Routes can't be exported statically, as we don't haver access to the current URL. It has to be injected by Astro */
export const generateRoutes = (currentUrl: string): Route[] =>
  [
    {
      url: RoutesUrl.home,
      navTitle: "Home",
    },
    {
      url: RoutesUrl.about,
      navTitle: "About",
    },
    {
      url: RoutesUrl.blog,
      navTitle: "Blog",
    },
  ].map((route) => ({
    ...route,
    get isActive() {
      // This is very hacky, but I couldn't find a better way to do it so far...
      if (currentUrl.split("/").includes("blog")) {
        return this.url === RoutesUrl.blog;
      }
      if (currentUrl.split("/").includes("about")) {
        return this.url === RoutesUrl.about;
      }

      return this.url === RoutesUrl.home;
    },
  }));

export const isBlogPost = (url: string) =>
  url.includes("/blog/") && url !== "/blog/";
