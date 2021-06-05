import React, { useRef } from "react";
import EmailEditor from "react-email-editor";
import { Card, Container, Button } from "react-bootstrap";

function EMailEditor() {
  const emailEditorRef = useRef(null);
  const exportHtml = () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data;
      console.log("exportHtml", html);
    });
  };
  const onLoad = () => {
    console.log("Email Editor Loaded");
  };
  return (
    <Container className="h-50 d-inline-block">
      <Button>Save Template</Button>
      <EmailEditor ref={emailEditorRef} onLoad={onLoad} />
    </Container>
  );
}

export default EMailEditor;
