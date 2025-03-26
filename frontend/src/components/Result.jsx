const Result = ({ prediction }) => {
    return (
      <div className="p-4 mt-4 text-xl font-semibold text-white bg-green-500 rounded">
        Predicted Total Sales: {parseFloat(prediction).toFixed(2)}
      </div>
    );
  };
  
  export default Result;
  