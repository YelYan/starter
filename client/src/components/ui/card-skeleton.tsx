import { Skeleton } from "@/components/ui/skeleton";

const CardSkeleton = () => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {numbers.map((x) => (
        <Skeleton key={x} className="h-[250px] w-[200px] rounded-xl" />
      ))}
    </div>
  );
};

export default CardSkeleton;
