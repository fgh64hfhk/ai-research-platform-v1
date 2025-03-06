import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};
const withMDX = createMDX({
  // 支援 GitHub 風格 Markdown（- [x] 代辦事項、~~刪除線~~）
  // 確保 HTML 內容安全
});

export default withMDX(nextConfig);
