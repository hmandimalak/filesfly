import React from 'react';
import { Layout, Menu, Button, Breadcrumb, theme, Typography } from 'antd';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import logoImage from './public/skystoring.png/';

const { Header, Content, Footer } = Layout;

const items = [
  { key: '1', label: 'Aperçu' },
  
];

const Home: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center', background: '#ebe2f2' }}>
        <Typography.Title level={1} style={{ color: '#003366', fontWeight: 'bold', fontFamily: 'modern' ,marginBottom: '16px',marginLeft:'0px',display: 'flex',
          flexDirection: 'row',}}>
          FilesFly
        </Typography.Title>
        <Menu
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={items}
          style={{ flex: 1, minWidth: 0 , background: '#ebe2f2'}}
        />
        <div>
          <Link to="/signin">
            <Button  style={{ marginRight: 8 }}>
              Se connecter
            </Button>
          </Link>
          <Link to="/signup">
            <Button  style={{ marginLeft: 0 ,background:'#003366',color :'white'}}>S'inscrire</Button>
          </Link>
        </div>
      </Header>
      <Content
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          className="content-text"
          style={{
            height: '550px',
            
            flex: 1,
            background: '#ebe2f2',
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <Typography.Title level={2} style={{ color: '#003366', fontWeight: 'bold', marginBottom: '16px'}}>
          Bienvenue à FilesFly !
          </Typography.Title>
          <Typography.Paragraph style={{ marginBottom: '16px' }}>
          Notre plateforme vous offre une solution simple et sécurisée pour stocker et accéder à vos fichiers importants à tout moment et où que vous soyez. Que ce soit pour vos documents professionnels, photos de famille ou fichiers multimédias, FilesFly vous permet de les garder en sécurité. Profitez d'une interface conviviale, de fonctionnalités avancées telles que la synchronisation automatique et la sauvegarde en ligne, ainsi que d'une protection des données. Rejoignez-nous dès maintenant et découvrez comment FilesFly peut simplifier votre vie numérique.
          </Typography.Paragraph>
          <Link to="/signup">
            <Button  style={{ marginRight: '50px' }}>S'inscrire</Button>
          </Link>
        </div>
        <div className="content-image" style={{ flex: 1 ,background: '#ebe2f2',height: '550px'}}>
          <img src="welcome.gif" style={{ maxHeight: '500px', width: '100%' }} />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Skystoring ©{new Date().getFullYear()} Created by Malak Hmandi
      </Footer>
    </Layout>
  );
};

export default Home;