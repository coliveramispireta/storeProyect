/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images:{
        domains: [
            'imagedelivery.net', 
            'rymportatiles.com.pe', 
            'store.storeimages.cdn-apple.com',
            'i5.walmartimages.com',
            'tiendasishop.com'
          ],
        remotePatterns: [
            {
                hostname: "www.apple.com",
            },
        ],
    },
};

export default nextConfig;
