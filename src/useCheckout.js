import { useState } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

const useCheckout = (endpoint) => {
  const navigate = useNavigate();
  const [postIsLoading, setPostIsLoading] = useState(false);
  const [postError, setPostError] = useState(null);

  //custom hook uses post to checkout db to upload items to db
  const postToCheckout = async (selectedItem) => {
    setPostIsLoading(true);
    setPostError(null);

    try {
      await axios.post(endpoint, selectedItem);

      setPostIsLoading(false);

      // Navigate to checkout page with selected item as state.
      navigate('/checkout', { state: selectedItem });
    } catch (error) {
      console.error("Error posting item details to checkout:", error);
      setPostError(error);
      setPostIsLoading(false);
    }
  };

  return {
    postToCheckout,
    postIsLoading,
    postError,
  };
};

export default useCheckout;
