import React, { FunctionComponent } from "react";

const Error: FunctionComponent = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="mb-6">
          <img
            src="/visuals/errorIllu.webp"
            alt="Error illustration: connect to Starknet wallet"
            className="w-72 h-72 object-contain mx-auto"
          />
        </div>

        <h2 className="text-2xl font-semibold text-red-600 text-center">Oh no... access error!</h2>
        <p className="mt-4 text-lg text-gray-700">
          To access your Stark affiliate space, you need to connect to a Starknet wallet.
        </p>
      </div>
    </div>
  );
};

export default Error;
