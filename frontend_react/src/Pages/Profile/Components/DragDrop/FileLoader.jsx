import { useState } from "react";
import { sentIcon, pdfSvg, delIcon } from "./Icons.jsx";

export default function FileLoader({ file }) {
  const [fileStatus, setfileStatus] = useState("uploadToBrowser");
  const [progress, setprogress] = useState(0);

  // call api to upload file
  function handleProgressBar(event) {
    const file = event.target.files[0];
    if (!file) return;
    const fileName =
      file.name.length > 12
        ? `${file.name.substring(0, 13)}... .${file.name.split(".")[1]}`
        : file.name;
    const formData = new FormData();
    formData.append("file", file);
    // setFiles(prevstate => [...prevstate, (name: fileName, loading: 0 }]);
    // setShowProgress(true);
    // axios.post('', formData, (
    // onUploadProgress: ((loaded, total}) => {
    // setFiles(prevState-> (
    // const newfiles [...prevstate];
    // newfiles [newfiles.length - 1].loading Math.floor((loaded/total) * 100);
    // return newfiles;
  }

  function sentToServer() {
    setfileStatus("uploadToServer");
    try {
      //call api and handle progress bar
      console.log("first");
    } catch (e) {
      setfileStatus("uploadError");
    }
  }
  return (
    <>
      {fileStatus == "uploadToBrowser" && (
        <FileReady file={file} sentToServer={sentToServer} />
      )}
      {fileStatus == "uploadToServer" && (
        <FileProgress file={file} progress={progress} />
      )}
      {fileStatus == "uploadError" && <FileError file={file} />}
    </>
  );
}
function FileReady({ file, sentToServer }) {
  return (
    <div
      style={{
        direction: "ltr",
        width: "100%",
        borderRadius: "8px",
        border: "1px solid #eeeeee",
        display: "flex",
        alignItems: "center",
        padding: ".5rem .5rem",
        boxSizing: "border-box",
        margin: ".5rem 0",
        position: "relative",
      }}
    >
      <div style={{ width: "5%" }}>{pdfSvg}</div>
      <div
        style={{
          width: "80%",
          fontFamily: "Tajawal",
          fontWeight: 400,
          fontSize: "14px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span>{file?.path}</span>
        <span>{file?.size} </span>
      </div>
      <div
        onClick={() => {
          sentToServer();
        }}
        style={{
          fontFamily: "Tajawal",
          fontWeight: 500,
          fontSize: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#131f89",
          width: "100px",
          height: "40px",
          borderRadius: "5px",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        send file
      </div>
    </div>
  );
}

function FileProgress({ file, progress }) {
  return (
    <div
      style={{
        direction: "ltr",
        width: "100%",
        borderRadius: "8px",
        border: "1px solid #eeeeee",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: ".5rem .5rem",
        boxSizing: "border-box",
        margin: ".5rem 0",
        position: "relative",
      }}
    >
      <div style={{ width: "5%" }}>{pdfSvg}</div>
      <div
        style={{
          width: "95%",
          fontFamily: "Tajawal",
          fontWeight: 400,
          fontSize: "14px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span>{file?.path}</span>
        <span>{file?.size} </span>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              position: "relative",
              display: "inline-block",
              width: "95%",
              height: "7px",
              background: "#EAECF0",
              borderRadius: "5px",
            }}
          >
            <span
              style={{
                position: "absolute",
                display: "inline-block",
                width: `${progress}%`,
                height: "7px",
                background: "#131F89",
                borderRadius: "5px",
              }}
            />
          </span>

          <span>{progress}%</span>
        </div>
      </div>
      <div style={{ position: "absolute", top: "10px", right: "10px" }}>
        {sentIcon}
      </div>
    </div>
  );
}

function FileError({ file }) {
  return (
    <div
      style={{
        direction: "ltr",
        width: "100%",
        borderRadius: "8px",
        border: "1px solid #FDA29B",
        display: "flex",
        alignItems: "center",
        padding: ".5rem .5rem",
        boxSizing: "border-box",
        margin: ".5rem 0",
        position: "relative",
      }}
    >
      <div style={{ width: "5%" }}>{pdfSvg}</div>
      <div
        style={{
          color: "#FF4949",
          width: "95%",
          fontFamily: "Tajawal",
          fontWeight: 500,
          fontSize: "14px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span>{file?.path}</span>
        <span>Upload failed, please try again </span>
        <span>Try again</span>
      </div>
      <div style={{ position: "absolute", top: "10px", right: "10px" }}>
        {delIcon}
      </div>
    </div>
  );
}
