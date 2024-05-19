import ClipLoader from "react-spinners/ClipLoader";

export const LoadingSpinnerModule = () => {
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-background">
      <ClipLoader color={"white"} loading={true} size={150} />
    </div>
  );
};
