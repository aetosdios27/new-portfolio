import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei", "next-mdx-remote"],
  serverExternalPackages: ["shiki", "rehype-pretty-code", "vscode-textmate", "vscode-oniguruma"],
};

export default nextConfig;
