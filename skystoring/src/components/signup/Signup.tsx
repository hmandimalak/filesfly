import React, { useState } from 'react';
import axios from 'axios';
import { CascaderProps, message } from 'antd';  // Import message from Ant Design for error handling
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { AutoComplete, Button, Cascader, Checkbox, Col, Form, Input, InputNumber, Row, Select } from 'antd';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate for navigation

const { Option } = Select;

interface DataNodeType {
  value: string;
  label: string;
  children?: DataNodeType[];
}

const residences: CascaderProps<DataNodeType>['options'] = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Signup: React.FC = () => {
  const navigate = useNavigate();  // React Router's navigation hook

  const [form] = Form.useForm();
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onFinish = async (values: any) => {
    try {
      console.log('Form values:', values); // Log form values for debugging
      
      const response = await axios.post('http://localhost:8000/auth/signup/', {
        username: values.Username,
        email: values.email,
        password: values.password,
      });
  
      console.log('Response from server:', response.data);
  
      // Redirect to another page after successful signup
      navigate('/signin');  // Update the URL as needed
  
      console.log('Redirected to /signin');
    } catch (error) {
      console.error('Signup error:', error);
      message.error('Failed to sign up. Please check your information.');
    }
  };
  
  

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  const suffixSelector = (
    <Form.Item name="suffix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="USD">$</Option>
        <Option value="CNY">Â¥</Option>
      </Select>
    </Form.Item>
  );

  const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([]);

  const onWebsiteChange = (value: string) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`));
    }
  };

  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));


  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center',   background: '#ebe2f2',
  }}>
    <span style={{ fontWeight: 'bold', fontFamily: 'modern', color: '#003366', textAlign: 'left', position: 'absolute', top: 20, left: 20, fontSize:'50px'}}>
        FilesFly
      </span>
      <div className='container' style={{ width: '80%', maxWidth: 600, padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', textAlign: "center",background:'white'}}>
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          style={{ width: '100%',maxWidth: 600 }}
          scrollToFirstError
        >
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h2 style={{ color: '#003366' ,fontFamily: 'modern'}}>Créer votre compte</h2>
            <h2 style={{ color: '#003366',fontFamily: 'modern' }}>S'inscirire et rejoignez notre plateforme FilesFly</h2>
          </div>
          <div className='input' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Form.Item
            
              name="Username"
              tooltip="What do you want others to call you?"
              rules={[
                { required: true, message: 'Please input your nickname!', whitespace: true },
              ]}
              style={{ width: '100%', maxWidth: '300px' }}
            >
              <Input size='large' 
                prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="entrer votre nom"
                value={username} onChange={(e) => setUsername(e.target.value)}
                
              />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not a valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
              style={{ width: '100%', maxWidth: '300px' }} // Apply style directly to Form.Item
            >
              <Input size='large'
                prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Entrer votre E-mail"
                value={email} onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
              style={{ width: '100%', maxWidth: '300px' }} // Apply style directly to Form.Item
            >
              <Input.Password size='large'
                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Enterr votre mot de pass"
                value={password} onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>

            <Form.Item 
              name="confirm"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The new password that you entered does not match!'));
                  },
                }),
              ]}
              style={{ width: '100%', maxWidth: '300px' }} // Apply style directly to Form.Item
            >
              <Input.Password size='large'
                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Confirmer votre mot de pass"
              />
            </Form.Item>
          </div>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
          <p style={{color:'#003366',fontWeight:'bold',fontFamily: 'modern'}}>avez vous deja un compte ?<Link to="/signin">se connecter</Link></p></div>
            <div className='input2'>
            <Form.Item >
            <Button  htmlType="submit" size='large' style={{ width: "60%", margin: "0 auto", marginBottom:"13px" ,background:'#003366',color :'white'}}>
                s'inscrire
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
