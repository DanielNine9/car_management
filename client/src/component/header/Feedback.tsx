import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests

const Feedback = () => {
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Make an HTTP POST request to your backend API endpoint
      const response = await axios.post('http://localhost:9000/mail/feedback', { feedback }); // Add 'http://' protocol
      if (response.status === 200) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Error sending feedback:', error);
    }
  };

  return (
    <div className="p-4 container max-w-[1200px] mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Feedback</h2>
      {submitted ? (
        <p>Thank you for your feedback!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-medium">Leave your feedback:</label>
          <textarea
            className="w-full p-2 border rounded"
            rows={4}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          />
          <button
            type="submit"
            className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Submit Feedback
          </button>
        </form>
      )}
    </div>
  );
};

export default Feedback;
