type SkeletonProps = {
  className?: string;
};

const Skeleton = ({ className = "" }: SkeletonProps) => {
  return (
    <div className={`animate-pulse rounded-md unit ${className}`}></div>
  );
};

export default Skeleton;