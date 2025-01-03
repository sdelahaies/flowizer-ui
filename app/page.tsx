'use client';

import Navbar from './components/Navbar';
import CodeEditorSidebar from './components/CodeEditorSidebar';
import ReactFlowContainer from './components/ReactFlowContainer';
import { useState } from 'react';

export default function HomePage() {
  const [leftSidebarVisible, setLeftSidebarVisible] = useState(true);
  const [rightSidebarVisible, setRightSidebarVisible] = useState(false);

  // State for the code and file name
  const [fileName, setFileName] = useState('');
  const [workflowFileName, setWorkflowFileName] = useState('');
  const [workflowConfig, setWorkflowConfig] = useState('');
  const [nodeFileName, setNodeFileName] = useState('');
  const [nodeScript, setNodeScript] = useState('');
  const toggleSidebar = () => setRightSidebarVisible((prev) => !prev);

  const [yamlContent, setYamlContent] = useState<string>('');
  const [jsonFlow, setJsonFlow] = useState<any>(null);

  const [selectedNodeCode, setSelectedNodeCode] = useState('');

  const handleImport = (yaml: string, name: string, jsonFlow: any) => {
    setYamlContent(yaml);
    setFileName(name);
    setJsonFlow(jsonFlow);
  };


  return (
    <div>
      {/* Header/Navbar */}
      <Navbar onImport={handleImport}/>

      {/* Main App Container */}
      <div className="app-container">
        {/* Left Sidebar */}
        {/* {leftSidebarVisible && <Sidebar />} */}

        {/* Main Panel */}
        <main className="main-panel">
          {/* <button
            className="toggle-sidebar"
            onClick={() => setLeftSidebarVisible(!leftSidebarVisible)}
          >
            {leftSidebarVisible ? '◀' : '▶'}
          </button> */}
          <button
            className="toggle-right-sidebar"
            onClick={() => setRightSidebarVisible(!rightSidebarVisible)}
          >
            {rightSidebarVisible ?  '▶' : '◀'}
          </button>
          <ReactFlowContainer jsonFlow={jsonFlow} setSelectedNodeCode={setSelectedNodeCode}/>
        </main>

        

        {/* Right Sidebar */}
        {rightSidebarVisible && (
            <CodeEditorSidebar
            isOpen={rightSidebarVisible}
            onClose={() => setRightSidebarVisible(false)}
            workflowState={{
            filename: workflowFileName,
            content: workflowConfig,
            setFilename: setWorkflowFileName,
            setContent: setWorkflowConfig,
            }}
            nodeState={{
            filename: nodeFileName,
            content: nodeScript,
            setFilename: setNodeFileName,
            setContent: setNodeScript,
            }}
            yamlContent={yamlContent}
            fileName={fileName}
            selectedNodeCode={selectedNodeCode}
            />

        )}
      </div>
    </div>
  );
}
