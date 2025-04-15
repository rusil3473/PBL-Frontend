import React, { useState } from "react";
import axios from "axios";
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { Axios } from "./axios";
const apiUrl = process.env.URL;

const App = () => {
  const [code, setCode] = useState(
    `#include <graphics.h>\nusing namespace std;\nint main() {\n  int gd,gm;\n  initgraph(&gd,&gm,NULL);\n  line(100,100,200,200); \n  getch(); \n  closegraph(); \n  return 0;\n}`
  );
  const [output, setOutput] = useState("");
  const [downloadLink, setDownloadLink] = useState("");

  const handleCompile = async (fileId) => {
    try {
      setOutput("Compiling...");
      const response = await Axios.post("/compile", {
        code,
      });

      if (response.data.errors) {
        setOutput(response.data.errors);
        console.log(JSON.stringify(response.data.errors, null, 2));
      } else {
        console.log("Response Data:", response.data, response.fileId);
        setOutput(response.data.message);
        if (response.data.downloadLink) {
          setDownloadLink(`${apiUrl}/download/${response.data.fileId}`);
        }
      }
    } catch (error) {
      setOutput("Error connecting to server");
      console.error(error);
    }
  };

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col items-center  p-6">
      <h2 className="text-3xl font-semibold mb-4">C++ L-Graph Compiler</h2>
      <div className="w-full h-full bg-gray-800 p-4 rounded-lg shadow-lg">
        <CodeMirror
          value={code}
          height="400px"
          theme={dracula}
          extensions={[cpp()]}
          onChange={(value) => setCode(value)}
          className="border border-gray-700 rounded-md"
        />
        <button
          onClick={handleCompile}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg cursor-pointer"
        >
          Compile
        </button>
        <pre className="mt-4 p-3 bg-gray-700 rounded text-sm">{output}</pre>
        {downloadLink && (
          <a
            href={downloadLink}
            download="program.exe"
            className="block mt-4 text-center text-blue-400 hover:underline"
          >
            Download Compiled File
          </a>
        )}
      </div>
    </div>
  );
};

export default App;
