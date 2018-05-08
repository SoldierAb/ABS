import React from 'react';
import styled from 'styled-components';
import { Cascader, Input } from 'antd';
import citys from '../../initdata/citys';

export default class Address extends React.Component {

    constructor(props) {
        super(props);

        const value = this.props.value || {};
        this.state = {
            city: value.city || [],
            address: value.address || ''
        }
    }

    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) this.setState(nextProps.value);
    }

    handleAddressChange = (e) => {
        const address = e.target.value;
        if (!('value' in this.props)) this.setState({ address });
        this.triggerChange({ address });
    }

    handleCityChange = (city) => {
        if (!('value' in this.props)) this.setState({ city });
        this.triggerChange({ city })
    }

    triggerChange = (changeVal) => {
        const onChange = this.props.onChange;
        if (onChange) onChange(Object.assign({}, this.state, changeVal))
    }

    render() {
        const { address, city } = this.state;
        return (
            <div>
                <Cascader
                    value={city}
                    options={citys}
                    onChange={this.handleCityChange}
                    style={{ width: '45%', marginRight: '3%' }}
                />
                <Input
                    type="text"
                    value={address}
                    onChange={this.handleAddressChange}
                    style={{ width: '45%' }}
                />
            </div>
        );
    }

}

