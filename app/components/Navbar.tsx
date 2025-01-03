'use client';
import { useState } from 'react';

interface NavbarProps {
    onImport: (yamlContent: string, fileName: string, jsonFlow: any) => void;
}

export default function Navbar({ onImport }: NavbarProps) {
    
    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const yamlContent = await file.text();
            let fname: string = file.name
            //TODO use a json payload instead
            // const url: string = 'http://localhost:8100/yam2svg2json?config=' + fname + '&CONFIG_FOLDER=..%2Fconfig&OUTPUT_FOLDER=..%2Foutputs'
            const url: string = 'http://localhost:8100/yam2svg2json'
            const response = await fetch(url, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                mode: 'cors',
                // body: '',//JSON.stringify({ yamlContent }),
                body: JSON.stringify({ filename: fname}),
            });
            const jsonFlow = await response.json();
            sessionStorage.setItem('workflowJson', JSON.stringify(jsonFlow));
            sessionStorage.setItem('flowName', fname);
            onImport(yamlContent, file.name, jsonFlow);
            console.log('yamlContent:', yamlContent);
            console.log('fileName:', fname);
            console.log('jsonFlow:', jsonFlow);
        }
    };

    const handleRun = async () => {
        const flowName = sessionStorage.getItem('flowName');
        // const url: string = 'http://localhost:8100/runflow?config=' + flowName;
        const url: string = 'http://localhost:8100/runflow';
        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            mode: 'cors',
            // body: '',//JSON.stringify({ yamlContent }),
            body: JSON.stringify({ filename: flowName}),
        });
        const runResponse = await response.json();
        console.log('runResponse:', runResponse);
    }



    return (
        <header className="navbar">
            <div className="logo">Flowizer</div>
            <div className="buttons">

                <button onClick={() => document.getElementById('file-upload')?.click()} className="import-button">
                    <b>Import</b>
                </button>
                <input
                    id="file-upload"
                    type="file"
                    accept=".yaml"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                />
                <button onClick={handleRun}><b>Run</b></button>
            </div>
        </header>
    );
}


