'use client';

import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  workflowState: {
    filename: string;
    content: string;
    setFilename: React.Dispatch<React.SetStateAction<string>>;
    setContent: React.Dispatch<React.SetStateAction<string>>;
  };
  nodeState: {
    filename: string;
    content: string;
    setFilename: React.Dispatch<React.SetStateAction<string>>;
    setContent: React.Dispatch<React.SetStateAction<string>>;
  };
  yamlContent: string;
  fileName: string;
  selectedNodeCode: string;
}

export default function CodeEditorSidebar({
  isOpen,
  onClose,
  workflowState,
  nodeState,
  yamlContent,
  fileName,
  selectedNodeCode,
}: CodeEditorSidebarProps) {
  const [width, setWidth] = useState(600); // Sidebar width state
  const [isResizing, setIsResizing] = useState(false); // Resizing state
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'workflow' | 'node'>('workflow'); // Active tab state
  useEffect(() => {
    if (activeTab === 'node') {
      nodeState.setContent(selectedNodeCode);
    }
  }, [selectedNodeCode, nodeState]);

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    e.preventDefault(); // Prevent text selection while resizing
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isResizing) {
      const newWidth = window.innerWidth - e.clientX;
      setWidth(Math.max(200, Math.min(newWidth, window.innerWidth - 100)));
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  const handleSave = async () => {
    const currentFileName = activeTab === 'workflow' ? workflowState.filename : nodeState.filename;
    const currentContent = activeTab === 'workflow' ? workflowState.content : nodeState.content;

    if ('showSaveFilePicker' in window) {
      try {
        const fileHandle = await (window as any).showSaveFilePicker({
          suggestedName: currentFileName,
          types: [
            {
              description: activeTab === 'workflow' ? 'YAML Files' : 'Python Scripts',
              accept: { 'text/yaml': ['.yaml'], 'text/python': ['.py'] },
            },
          ],
        });
        const writableStream = await fileHandle.createWritable();
        await writableStream.write(currentContent);
        await writableStream.close();
        alert('File saved successfully!');
      } catch (error) {
        console.error('Error saving file:', error);
      }
    } else {
      alert('File System Access API is not supported in your browser.');
    }
  };

  if (!isOpen) return null;

  return (
    <aside
      ref={sidebarRef}
      className="code-editor-sidebar"
      style={{
        width: `${width}px`,
        height: '100%',
        userSelect: isResizing ? 'none' : 'auto',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Resize Handle */}
      <div
        className="resize-handle"
        onMouseDown={handleMouseDown}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: '-4px',
          width: '8px',
          cursor: 'col-resize',
          background: isResizing ? 'rgba(0, 123, 255, 0.2)' : 'transparent',
          zIndex: 100,
        }}
      ></div>

      {/* Tab Selector */}
      <div className="tab-selector">
        <button
          className={`tab-button ${activeTab === 'workflow' ? 'active' : ''}`}
          onClick={() => setActiveTab('workflow')}
        >
          Workflow
        </button>
        <button
          className={`tab-button ${activeTab === 'node' ? 'active' : ''}`}
          onClick={() => setActiveTab('node')}
        >
          Node
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'workflow' ? (
          <>
            <input
              type="text"
              className="file-name-input"
              value={fileName}
              onChange={(e) => workflowState.setFilename(e.target.value)}
            />
            <Editor
              height="calc(100% - 50px)"
              defaultLanguage="yaml"
              theme="vs-dark"
              value={yamlContent}
              onChange={(value) => workflowState.setContent(value || '')}
            />
          </>
        ) : (
          <>
            {/* <input
              type="text"
              className="file-name-input"
              value={nodeState.filename}
              onChange={(e) => nodeState.setFilename(e.target.value)}
            /> */}
            <Editor
              height="calc(100% - 50px)"
              defaultLanguage="python"
              theme="vs-dark"
              value={nodeState.content}
              onChange={(value) => nodeState.setContent(value || '')}
            />
          </>
        )}
              {/* Save Button */}

      </div>
      <button className="save-button" onClick={handleSave}>
        Save
      </button>

    </aside>
  );
}

