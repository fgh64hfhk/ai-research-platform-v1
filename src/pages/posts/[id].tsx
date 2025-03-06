import { GetStaticProps, GetStaticPaths } from "next";
import { getPostData } from "@/lib/posts";

interface PostProps {
  postData: {
    title: string;
    date: string;
    contentHtml: string;
  };
}

export const getStaticProps: GetStaticProps<PostProps> = async ({ params }) => {
  const postData = await getPostData(params?.id as string);

  return {
    props: {
      postData,
    },
  };
};

export default function Post({ postData }: PostProps) {
  return (
    <div>
      <h1>{postData.title}</h1>
      <p>{postData.date}</p>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "ssg-ssr" } }, { params: { id: "pre-rendering" } }],
    fallback: false, // 不存在的路徑會 404
  };
};
