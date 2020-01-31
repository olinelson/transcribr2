import React from "react"
import { API_URL } from "../config"
import { getUser } from "../services/auth"
import { Upload, Icon } from "./MyStyledComponents"
import { message } from "antd"
const { Dragger } = Upload

function UploadClip(props) {
  const settings = {
    name: "audioFile",
    multiple: true,
    action: API_URL + "/clips",
    method: "POST",
    headers: {
      Authorization: getUser(),
    },
    data: {
      name: "new file name",
    },
    onChange(info) {
      const { status } = info.file

      if (status !== "uploading") {
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
    <>
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
    </>
  )
}

export default UploadClip
