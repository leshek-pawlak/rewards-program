import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";

jest.mock("react-dom/client", () => {
  return {
    createRoot: jest.fn().mockImplementation(() => {
      return {
        render: jest.fn(),
      };
    }),
  };
});

describe("index", () => {
  it("renders App without crashing", () => {
    const div = document.createElement("div");
    div.id = "root";
    document.body.appendChild(div);

    const mockRender = jest.fn();
    ReactDOM.createRoot.mockReturnValue({ render: mockRender });
    // This will run the index.js file
    require("./index.js");

    expect(ReactDOM.createRoot).toHaveBeenCalledWith(div);
    expect(mockRender).toHaveBeenCalledWith(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );

    document.body.removeChild(div);
  });
});
