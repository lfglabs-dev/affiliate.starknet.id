import React, { FunctionComponent } from "react";


const Error: FunctionComponent = () => {
  return (
    <div className="flex justify-center  items-center min-h-screen bg-gray-100">
      <div className="text-center p-8 w-full ">
        <div className="mb-6">
          <img
            src="/visuals/errorIllu.webp"
            alt="Error illustration: connect to Starknet wallet"
            className="w-80 h-80 object-contain mx-auto"
          />
        </div>

        <h2 className="text-4xl font-semibold  text-center">Oh no... access error!</h2>
        <p className="mt-4 text-lg text-gray-700">
          To access your Stark affiliate space, you need to connect to a Starknet wallet.
        </p>
      </div>
    </div>
  );
};

export default Error;
