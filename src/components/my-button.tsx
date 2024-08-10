import React from "react";
import { MyButtonShape } from "../interfaces";

const MyButton: React.FC<MyButtonShape> = ({
  onPressed = () => {},
  loading = false,
  type = "button",
  caption,
}) => {
  return (
    <div className='center'>
      <button
        className='primary-button btn-160'
        onClick={onPressed}
        type={type}
        disabled={loading}
      >
        {loading ? "Loading" : caption}
      </button>
    </div>
  );
};

export default MyButton;
