// Navbar.tsx
import React, { useState } from 'react';
import {
  FolderOpenOutlined,
  FileOutlined,
  PushpinOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme, Typography } from 'antd';
import { Link } from 'react-router-dom';
import Searchbar from './searchbar';
import SearchResults from './SearchResults';

const { Header } = Layout;


interface NavbarProps {
  onSelectContent: (content: string) => void;
}

type MenuItem = {
  key: React.Key;
  icon?: React.ReactNode;
  children?: MenuItem[];
  label: React.ReactNode; // Add the label property
};

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const Navbar: React.FC<{
  onmesdossiersclick: () => void;
  onSidebarItemClick: (content: string) => void;
  onPinnedClick: () => void;
  onmesfichiersclick: () => void;
}> = ({
  onSidebarItemClick,
  onPinnedClick,
  onmesfichiersclick,
  onmesdossiersclick,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  const items: MenuItem[] = [
    
    getItem(
      <span onClick={onmesfichiersclick}>Mes fichiers</span>,
      '1',
      <FileOutlined />,
    ),
    getItem(
      <span onClick={onmesdossiersclick}>Mes dossiers</span>,
      '2',
      <FolderOpenOutlined />,
    ),
    getItem(
      <span onClick={onPinnedClick}>épingle</span>,
      '9',
      <PushpinOutlined />,
    ),
  ];
  const navigateToSearchResults = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <Header style={{ display: 'flex', alignItems: 'center', background: 'white' }}>
      <div style={{ display: 'flex', marginRight: '15px' }}>
      
        <Typography.Title
          style={{
            color: '#003366',
            fontSize: '50px',
            fontWeight: 'bold',
            fontFamily:'modern',
            marginRight: '30px',
            float : 'left',
          }}
        >
          FilesFly
        </Typography.Title>
      </div>
      <Menu
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        items={items}
        style={{ flex: 1, minWidth: 0 }}
      />
      <Searchbar onSearchButtonClick={navigateToSearchResults} />
      {searchQuery ? (
                  <SearchResults query={searchQuery} />


                ) :  null}
    </Header>
  );
};

export default Navbar;