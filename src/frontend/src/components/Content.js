import React from 'react';
import { Layout } from 'antd';

const {
  Content
} = Layout;

const MyContent = ({ children, fullWidth, color }) => {
  return (
    <Content
      style={{
        ...styles.container,
        padding: fullWidth ? 0 : '0px 5%',
        backgroundColor: color || '#fff',
        maxWidth: fullWidth ? '100%' : 1400
      }}
    >
      {children}
    </Content>
  )
}

const styles = {
  container: {
    width: '100%',
    margin: '0px auto'
  }
}

export default MyContent;
