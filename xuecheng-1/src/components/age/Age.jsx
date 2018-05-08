import React from 'react';
import { Slider, Row, Col,InputNumber } from 'antd';

export default class Age extends React.Component {
    constructor(props){
        super(props);
        const value = props.value||{};
        this.state={
            age:value.age||20
        }
    }

    componentWillReceiveProps(nextProps){
        if( 'value' in nextProps){
            const value = nextProps.value;
            this.setState(value);
        }
    }

    handleAge=(age)=>{
        if(!('value' in this.props)){
           this.setState({age});
        }
        this.triggerChange({age});
        
    }

    triggerChange = (changeVal)=>{
        const onChange = this.props.onChange;
        if(onChange){
            onChange(Object.assign({},this.state,changeVal));
        }
    }

    render() {
        const {age} = this.state;
        return (
            <Row>
                <Col span={12}>
                    <Slider min={20} max={40} onChange={this.handleAge} value={age} />
                </Col>
                <Col span={4}>
                    <InputNumber
                        min={20}
                        max={40}
                        style={{ marginLeft: 16 }}
                        value={age}
                        onChange={this.handleAge}
                    />
                </Col>
            </Row>
        );
    }
}