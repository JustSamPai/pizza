import { useState } from 'react';
import axios from 'axios';
// custom hook to post data to checkout 
const usePostToCheckout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const postToCheckout = async (selectedPizza) => {
    setIsLoading(true);
    setError(null);

    try {
      //attempts to save data via an upload/post
        const response = await axios.post('http://localhost:8000/checkout', selectedPizza);

      if (response.status === 201) {
        console.log("Pizza added to checkout successfully!");

      }
      //error handling
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return [postToCheckout, isLoading, error];
};

export default usePostToCheckout;
