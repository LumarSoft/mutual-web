import ClipLoader from "react-spinners/ClipLoader";

export const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center">
      <ClipLoader color={"#000"} loading={true} size={150} />
    </div>
  );
};
