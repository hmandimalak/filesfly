// MainPage.tsx
import React, { useState, useEffect } from "react";
import { Layout, Button, Flex, Space, Typography } from "antd";
import { Routes, Route, Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import Searchbar from "./searchbar";
import FolderList from "./folderlist";
import FileList, { FileType } from "./filelist";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import axios from "axios";
import PinnedFilesPage from "./PinnedFilesPage";
import MyStoring from "./MyStoring";
import { FolderOutlined, FileOutlined } from "@ant-design/icons";
import SearchResults from "./SearchResults";

const { Header, Content, Footer } = Layout;

export interface FolderType {
  id: number;
  name: string;
}

const MainPage: React.FC = () => {
  const [selectedContent, setSelectedContent] = useState<string>("folderlist");
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [folders, setFolders] = useState<FolderType[]>([]);
  const [menu, setMenu] = useState<string>("Mesfichiers");

  const handleButtonClick = (content: string) => {
    setSelectedContent(content);
  };

  const handleMesdossiersClick = () => {
    setMenu("Mesdossiers");
  };

  const handleMesfichierClick = () => {
    setMenu("Mesfichiers");
  };

  const navigateToSearchResults = (query: string) => {
    setSearchQuery(query);
  };

  const fetchFolders = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(
        "http://192.168.11.45:8000/api_folder/folders/",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Use Bearer for Authorization
          },
        }
      );

      setFolders(response.data);
    } catch (error) {
      console.error("Error fetching folders:", error);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  return (
    <Layout style={{ minHeight: "100vh", background: 'white'}}>
      <Sidebar
        onmesdossiersclick={handleMesdossiersClick}
        onSidebarItemClick={handleButtonClick}
        onPinnedClick={() => setMenu("pinned")}
        onmesfichiersclick={handleMesfichierClick}
      />
      <Layout>
        <Header
          style={{
            display: "flex",
            justifyContent: "center",
            background: "white",
          }}
        >
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Layout>
            <DndProvider backend={HTML5Backend}>
            {searchQuery ? (
                  <SearchResults query={searchQuery} />


                ) : (
                  <>
              {menu === "Mesfichiers" ? (
                <FileList
                  searchQuery={searchQuery}
                  onSelect={() => {}}
                  onFileDrop={() => {}}
                  onMoveToFolder={(files, folderId) => {
                    console.log(`Move files to folder ${folderId}`, files);
                  }}
                  folders={folders}
                />
              ) : menu === "Mesdossiers" ? (
                <FolderList />
              ) : (
                <PinnedFilesPage />
                
              )}
              </>
                )}
            </DndProvider>
          </Layout>
        </Content>
        <Footer style={{ textAlign: "center", background: "white" }}>
          ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainPage;
