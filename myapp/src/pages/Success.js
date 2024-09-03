import React, { useState } from 'react';
import '../css/success.css'; // Import your CSS styles

function Success({ message = "Success! Your action was completed."}) {
  const [showMessage, setShowMessage] = useState(true);

  setTimeout(() => {
    setShowMessage(false);
  }, 3000);
  

  return (
    <div className="success">

      {showMessage && (
        <div className="success-message">
            {message}
        </div>
      )}
    </div>
  );
}

export default Success;
