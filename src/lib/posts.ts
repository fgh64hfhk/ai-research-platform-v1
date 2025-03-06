import fs from "fs";
import path from "path";
import matter from "gray-matter"; // 解析 Markdown metadata
import { remark } from "remark";
import html from "remark-html";

// 定義文章的資料夾
const postsDirectory = path.join(process.cwd(), "posts");

// 定義文章的型別
interface PostData {
  id: string;
  title: string;
  date: string;
  contentHtml: string;
}

// 讀取 Markdown 檔案，並轉換為 HTML
export async function getPostData(id: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // 解析 Markdown metadata
  const matterResult = matter(fileContents);

  // 使用 `remark` 轉換 Markdown -> HTML
  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...(matterResult.data as { title: string; date: string }), // 確保 metadata 有 `title` 和 `date`
  };
}