interface ChildrenProps {
  children: React.ReactNode;
}

const PostListLayout = ({ children }: ChildrenProps) => {
  return (
    <div className="grid grid-cols-1  gap-8  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {children}
    </div>
  );
};

export default PostListLayout;
