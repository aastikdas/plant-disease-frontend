import React, { useState } from "react";
import axios from "axios";

const DiseaseDetector = () => {
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);
    setImagePreview(URL.createObjectURL(selected));
    setPrediction(null);
    setError(null);
  };

  const handleSubmit = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setPrediction(null);
    setError(null);

    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/predict`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setPrediction(response.data);
    } catch (err) {
      console.error(err);
      setError("Prediction failed. Please try another image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-cover min-h-screen bg-gray-400 flex flex-col items-center justify-center p-6"
    style={{ backgroundImage: "url('/bg.jpg')", }}>
      <div className="bg-yellow-100 border rounded-2xl shadow-md p-6 w-full max-w-md space-y-5">
        <h1 className="text-2xl font-bold text-center text-blue-700">Welcome to the Plant Disease Detector</h1>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full hover:cursor-pointer border border-black p-2 rounded-xl bg-gray-200"
        />

        {imagePreview && (
          <div className="flex justify-center">
            <img
              src={imagePreview}
              alt="Uploaded leaf"
              className="w-60 h-auto rounded-lg border-2 border-black shadow"
            />
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading || !file}
          className="w-full bg-green-600 hover:cursor-pointer text-white py-2 rounded hover:bg-green-700 transition"
        >
          {loading ? "Analyzing..." : "Predict Disease"}
        </button>

        {prediction && (
          <div className="p-4 border border-green-300 rounded text-green-800 bg-green-50">
            <p><strong>Prediction:</strong> {prediction.label}</p>
            <p><strong>Confidence:</strong> {prediction.confidence}%</p>
          </div>
        )}

        {error && (
          <div className="p-4 border border-red-300 rounded text-red-800 bg-red-50">
            {error}
          </div>
        )}
      </div>
      <div className="bg-purple-300 border-l-4 border-purple-700 text-zinc-900 p-4 rounded-xl mt-8 max-w-[80vw] ">
        <p className="font-semibold">⚠️ Note:</p>
        <p>
        1. When you click <strong> "Analyze"</strong> and result says <strong> "Prediction failed. Please try another image." </strong>, wait a few moments for the prediction to appear. 
        This delay happens because the backend server may need to wake up if it's been idle for some time. 
        Kindly wait patiently while the model loads and processes your image. Thank you for your understanding!
      </p>

        <p>
          2.This model is trained on scientifically curated images from the <strong>PlantVillage dataset</strong> ("https://www.kaggle.com/datasets/mohitsingh1804/plantvillage").
          It is optimized for clean, close-up, and well-lit leaf images.
          Real-world photos with background noise, shadows, or distortions may produce wrong predictions.
          We are working on improving real-world generalization.
        </p>
      </div>
      <div className="bg-slate-400 w-[100vw] h-[5vh] text-black font-bold flex items-center justify-center text-sm fixed bottom-0">
  © 2025 Aastik Das
</div>

    </div>
  );
};

export default DiseaseDetector;
