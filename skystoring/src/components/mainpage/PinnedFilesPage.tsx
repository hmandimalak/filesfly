import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FileType } from './filelist';
import { message ,Button} from 'antd';
import { DownloadOutlined, DeleteOutlined } from '@ant-design/icons';


const PinnedFilesPage: React.FC = () => {
  const [pinnedFiles, setPinnedFiles] = useState<FileType[]>([]);

  useEffect(() => {
    const fetchPinnedFiles = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          // Handle the case where token is not available
          console.error('Access token not found.');
          return;
        }

        const response = await axios.get('http://localhost:8000/api/files/pinned/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const filesWithNames = response.data?.map((file: FileType) => ({
          ...file,
          name: getFileNameFromUrl(file.file),
        }));

        setPinnedFiles(filesWithNames);
        
      } catch (error) {
        console.error('Error fetching pinned files:', error);
      }
    };

    fetchPinnedFiles();
  }, []);
  const getFileNameFromUrl = (file: string) => {
    const parts = file.split('/');
    return parts[parts.length - 1];
  };
  const handleDownload = async (file: FileType) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(`http://localhost:8000/api/files/${file.uid}/download/`, {
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = file.name || 'downloadedFile';
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
      message.error('Failed to download file.');
    }
  };
  const handleDelete = async (file: FileType) => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.delete(`http://localhost:8000/api/files/${file.uid}/delete/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPinnedFiles(pinnedFiles.filter((f) => f.uid !== file.uid)); // Remove the deleted file from the state
      message.success('File deleted successfully.');
    } catch (error) {
      console.error('Error deleting file:', error);
      message.error('Failed to delete file.');
    }
  };

  return (
    <div>
      <h2>Les fichiers epinglés</h2>
      {pinnedFiles.map((file) => (
        <div key={file.uid}style={{ padding: '8px', borderBottom: '1px solid #d9d9d9', cursor: 'pointer' }}>
          {file.name}
          <Button icon={<DownloadOutlined />} onClick={() => handleDownload(file)}></Button>
          <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(file)}></Button>
        </div>
      ))}
    </div>
  );
};

export default PinnedFilesPage;
