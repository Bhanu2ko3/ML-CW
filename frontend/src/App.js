import { useState } from "react";
import Form from "./components/Form";
import Result from "./components/Result";

const App = () => {
  const [prediction, setPrediction] = useState(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Restaurant Sales Prediction</h1>
      <Form setPrediction={setPrediction} />
      {prediction !== null && <Result prediction={prediction} />}
    </div>
  );
};

export default App;
