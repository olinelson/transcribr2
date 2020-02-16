import React from "react"
import { API_URL } from "../config"
import { getToken } from "../services/auth"
import { Upload, Icon } from "./MyStyledComponents"
import { message } from "antd"
const { Dragger } = Upload

function UploadClip(props) {
  const settings = {
    name: "file",
    multiple: true,
    action: API_URL + "/clips",
    method: "POST",
    beforeUpload: () => props.setUploading(true),
    headers: {
      Authorization: getToken(),
    },
    onChange(info) {
      const { status } = info.file

      if (status !== "uploading") {
        props.setUploading(false)
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`)

        props.addClip(info.file.response)
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
  }

  return (
    <div style={{ maxWidth: "85vw" }}>
      <Dragger {...settings}>
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
