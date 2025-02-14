/** @type {import('next').NextConfig} */

import createNextIntlPlugin from "next-intl/plugin"
const withNextIntl = createNextIntlPlugin()

const nextConfig = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.citysresidences.com",
        pathname: "**",
      },
    ],
  },
}

export default withNextIntl(nextConfig)
