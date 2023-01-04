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
      return this.url === currentUrl;
    },
  }));
