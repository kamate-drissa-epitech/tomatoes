/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        instrumentationHooks: true

    },
    typescript : {
        ignoreBuildErrors : true
    },
    eslint :{
        ignoreDuringBuilds : true
    }
};

export default nextConfig;
