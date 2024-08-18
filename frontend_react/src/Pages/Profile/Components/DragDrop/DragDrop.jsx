import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { uploadIcon } from "./Icons.jsx";
import {
  acceptStyle,
  focusedStyle,
  rejectStyle,
  baseStyle,
  thumb,
  thumbInner,
  thumbsContainer,
  img,
} from "./styledComponents.js";
import FileLoader from "./FileLoader.jsx";

export default function DragDrop({ isPreview }) {
  const [files, setFiles] = useState([]);
  const [error, seterror] = useState("");
  const fileInput = useRef(null);

  const {
    getRootProps,
    getInputProps,
    open,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: {
      "image/png": [".png", ".gif", ".jpeg", ".jpg"],
    },
    maxFiles: 1,
    // maxSize: "",
    onDrop: (acceptedFiles, fileRejections, event) => {
      setFiles(
        acceptedFiles.map((file) =>
          // <FileLoader key={file.path} file={file} />
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      seterror(fileRejections[0]?.errors[0]?.code);
    },
  });
  useEffect(() => {
    console.log("errr", error);
  }, [error]);

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <div
      className="container"
      style={{
        borderRadius: "8px",
        border: "1px solid #eeeeee",
        padding: "1rem",
        boxSizing: "border-box",
        margin: "1rem 0",
      }}
    >
      <div {...getRootProps({ style })}>
        <input
          {...getInputProps({ name: "base64" })}
          ref={fileInput}
          type="file"
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontFamily: "Tajawal",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "18px",
          }}
        >
          <div
            onClick={open}
            style={{
              width: "40px",
              height: "40px",
              border: "1px solid #BDBDBD",
              borderRadius: "8px",
              backgroundColor: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {uploadIcon}
          </div>
          <span style={{ paddingTop: ".8rem" }}>
            Drag drop some files here, or click to select files
          </span>
          <span>SVG, PNG, JPG or GIF (max. 800x400px)</span>
        </div>
      </div>
      <aside>
        {/* {files} */}
        {/* <Previews files={files} /> */}
      </aside>
      <div>
        <Previews files={files} />
      </div>
    </div>
  );
}

function Previews({ files }) {
  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));
  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);
  return <aside style={thumbsContainer}>{thumbs}</aside>;
}
