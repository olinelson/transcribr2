import React from "react"
import { Form, Icon, Input, Button, Checkbox } from "./MyStyledComponents"
import { handleLogin } from "../services/auth"
import { openNotificationWithIcon } from "./Notifications"
import { navigate, Link } from "gatsby"
import {API_URL} from '../config'
import { getToken } from '../services/auth'

class YoutubeForm extends React.Component {
    state = {
        loading: this.props.appState.youtubeUploading || false,
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                try {
                    this.setState({ loading: true })
                    openNotificationWithIcon('success', "Youtube download started!")
                    this.props.setAppState({ ...this.props.appState, youtubeUploading: true, uploadYoutubeDrawerOpen:  false })
                    const res = await fetch(API_URL + '/youtube', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: getToken()
                        },
                        body: JSON.stringify({
                            url: values.url
                        })
                    })
                    if (!res.ok) throw new Error('Invalid url')
                    const clip = await res.json()

                     // parses JSON response into native JavaScript objects
                    openNotificationWithIcon('success', `${clip.name} created!`)
                    this.props.setAppState({ ...this.props.appState, clips: [...this.props.appState.clips, clip], youtubeUploading: false})
                } catch (error) {
                    openNotificationWithIcon('error', 'Coudn\'t create clip, please try again')
                    this.setState({loading: false})
                    this.props.setAppState({ ...this.props.appState, youtubeUploading: false, uploadYoutubeDrawerOpen: true })
                    // setClip({ ...clip, saving: false, editClipDrawerOpen: false })
                }
            }
            this.setState({ loading: false })
        })
    }

    render() {

        const { getFieldDecorator } = this.props.form
        return (
            <Form onSubmit={this.handleSubmit} >
                <Form.Item>
                    {getFieldDecorator("url", {
                        rules: [{ required: true, message: "Please input a valid youtube url" }],
                    })(
                        <Input
                            disabled={this.state.loading}
                            className="url"
                            name="url"
                            type="url"
                            prefix={<Icon type="link" style={{ color: "rgba(0,0,0,.25)" }} />}
                            placeholder="https://www.youtube.com/watch?v=96n33WWgE9g"
                            rules={[{
                                required: true,
                                message: 'Please enter a youtube url',
                            }]}
                        />
                    )}
                </Form.Item>
               
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={this.state.loading}
                        disabled={this.state.loading}
                    >
                       Upload
          </Button>
                </Form.Item>
            </Form>
        )
    }
}

const WrappedYoutubeForm = Form.create({ name: "wrapped-youtube-form" })(YoutubeForm)

export default WrappedYoutubeForm
