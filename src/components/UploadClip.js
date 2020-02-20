import React from "react"
import { API_URL } from "../config"
import { getToken } from "../services/auth"
import { Upload, Icon } from "./MyStyledComponents"
import { message } from "antd"
const { Dragger } = Upload

function UploadClip(props) {
  const { appState, setAppState } = props

  const settings = {
    name: "file",
    multiple: true,
    action: API_URL + "/clips",
    method: "POST",
    beforeUpload: () => setAppState({ ...appState, uploading: true }),
    headers: {
      Authorization: getToken(),
    },
    onChange(info) {
      const { status } = info.file

      if (status !== "uploading") {
        // props.setUploading(false)
        setAppState({ ...appState, uploading: true })
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`)

        // props.addClip(info.file.response)
        setAppState({
          ...appState,
          clips: [...appState.clips, info.file.response],
          uploading: false,
        })
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
  }

  return (
    <div
      style={{
        border: "1rem solid white",
        display: "grid",
        width: "100%",
        height: "100%",
      }}
    >
      <Dragger {...settings} style={{ padding: "1rem" }}>
        <p className="ant-upload-drag-icon">
          <Icon type="inbox" />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files
        </p>
      </Dragger>
    </div>
  )
}

export default UploadClip
