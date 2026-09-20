import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // /hours was its own page until contact absorbed it. Permanent
        // because the merge is the decision, not an experiment: a 308 passes
        // the old URL's ranking to /contact and stops Google keeping both.
        // It was linked from the menu and from contact, and may be in a
        // search index or someone's bookmark, so it redirects rather than
        // 404s. #hours lands on the table itself.
        source: "/hours",
        destination: "/contact#hours",
        permanent: true,
      },
      {
        // /treat/<concern> became /what-we-treat/<concern>. Renamed before
        // launch, so there is no ranking to lose - but the old paths were
        // in the menu and the home page, and a 308 costs nothing.
        source: "/treat/:slug",
        destination: "/what-we-treat/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
