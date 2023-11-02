interface PostProps {
  title: string;
  content: string;
  createdAt: string;
}

const PostCover = ({ post }: PostProps) => {
  return (
    <div>
      <span>{post.title}</span>
      <p>{post.content.slice(0, 70)}</p>
      <span>{post.createdAt.slice(0, 10)}</span>
    </div>
  );
};

export default PostCover;
