import React from 'react';
import { Upload, Icon, message } from 'antd';
import { injectGlobal } from 'styled-components';

injectGlobal`
  .avatar-uploader {
        .ant-upload {
            width: 128px;
            height: 128px;
        }
    }
   .imgBox{
        height:'128px',
        width:'128px',
        overflow:'hidden'
        img{
            height:100%;
            width:100%;
        }
   } 
`;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}

export default class Avatarupload extends React.Component {

    state = {
        loading: false,
        path: `http://localhost:3099/${this.props.path}` || `http://localhost:3099/default_head.jpg`,
    };



    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }

        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }));
            this.setState({
                path:info.file.response.data.img_path
            });
            this.props.getfile(info.file.response.data.img_path);
        }
    }

    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const imageUrl = this.state.imageUrl;
        const path = this.state.path;
        console.log(path);
        return (
            <Upload
                name="img"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="/upload"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
                value={path}
            >
                {path ? <div style={{width:'104px',height:'104px',overflow:'hidden'}}> <img style={{width:'100%',height:'100%'}} src={path} alt="" /> </div> : uploadButton}
            </Upload>
        );
    }
}
