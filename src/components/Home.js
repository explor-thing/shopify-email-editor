import React, { useRef, useState } from "react";
import EmailEditor from "react-email-editor";
import axios from "../http";
import {
  Card,
  Container,
  Button,
  ButtonGroup,
  CardGroup,
  Alert,
} from "react-bootstrap";

function Home() {
  const emailEditorRef = useRef(null);
  const [html, setHtml] = useState(null);
  const [jsonData, setJsonData] = useState(null);
  const exportHtml = async () => {
    await emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data;
      // axios
      //   .post("/api/save", { data: design })
      //   .then((success) => {
      //     console.log("Success Stored Data.");
      //   })
      //   .catch((error) => {
      //     console.log("Error Stored Data.");
      //   });
      console.log(design);
      setHtml(html);
      setJsonData(design);
      console.log("exportHtml", html);
    });
  };
  const loadEditor = () => {
    setHtml(null);
  };
  const loadDesign = () => {
    console.log("Email Editor Loaded");
    if (jsonData) {
      if (
        emailEditorRef !== undefined &&
        emailEditorRef !== null &&
        emailEditorRef.current !== null
      ) {
        emailEditorRef.current.editor.loadDesign(jsonData);
      } else {
        setTimeout(() => loadDesign(), 500);
      }
    }
  };
  return (
    <>
      <Card className="p-1" style={{ maxHeight: "100vh" }}>
        <Card.Header className="d-flex justify-content-between align-items-center">
          Email Editor
          <div>
            {html ? (
              <Button variant="primary" onClick={loadEditor}>
                Edit
              </Button>
            ) : (
              <Button variant="success" onClick={exportHtml}>
                Save
              </Button>
            )}
          </div>
        </Card.Header>
        <Card.Body>
          {html ? (
            <div dangerouslySetInnerHTML={{ __html: html }}></div>
          ) : (
            <React.StrictMode>
              <EmailEditor
                ref={emailEditorRef}
                style={{ minHeight: "100vh" }}
                onLoad={loadDesign}
              />
            </React.StrictMode>
          )}
        </Card.Body>
      </Card>
    </>
  );
}

export default Home;
