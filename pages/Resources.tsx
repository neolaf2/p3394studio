import React, { useState } from 'react';
import { FileText, Folder, Download, Search, Upload, Plus, File } from 'lucide-react';
import { ResourceFile, ResourceFolder } from '../types';
import { useAuth } from '../context/AuthContext';

const MOCK_FOLDERS: ResourceFolder[] = [
  { id: 'f1', name: 'Working Drafts', description: 'Current active standard drafts' },
  { id: 'f2', name: 'Meeting Minutes', description: 'Records of past plenary and sub-group meetings' },
  { id: 'f3', name: 'Liaison Reports', description: 'Updates from ISO, IEC, and ITU' },
  { id: 'f4', name: 'Policy & Procedures', description: 'IEEE SA operational manuals' },
];

const MOCK_FILES: ResourceFile[] = [
  { id: 'd1', name: 'P3394.1 Draft Standard - Core Principles.pdf', type: 'PDF', size: '2.4 MB', uploadDate: '2024-10-01', uploader: 'Sarah Chen', folderId: 'f1' },
  { id: 'd2', name: 'Annex A: Risk Taxonomy.docx', type: 'DOCX', size: '850 KB', uploadDate: '2024-09-15', uploader: 'James Miller', folderId: 'f1' },
  { id: 'd3', name: 'October 2024 Plenary Minutes.pdf', type: 'PDF', size: '1.2 MB', uploadDate: '2024-10-22', uploader: 'Admin', folderId: 'f2' },
  { id: 'd4', name: 'ISO-IEC JTC1 SC42 Liaison Report.pdf', type: 'PDF', size: '3.1 MB', uploadDate: '2024-10-20', uploader: 'Sarah Chen', folderId: 'f3' },
];

const Resources: React.FC = () => {
  const { user } = useAuth();
  const [selectedFolderId, setSelectedFolderId] = useState<string>('f1');
  const [searchQuery, setSearchQuery] = useState('');
  const [files, setFiles] = useState<ResourceFile[]>(MOCK_FILES);
  const [isUploading, setIsUploading] = useState(false);

  const selectedFolder = MOCK_FOLDERS.find(f => f.id === selectedFolderId);

  const filteredFiles = files.filter(file => {
    const matchesFolder = file.folderId === selectedFolderId;
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && user) {
      const file = e.target.files[0];
      const newFile: ResourceFile = {
        id: 'temp_' + Date.now(),
        name: file.name,
        type: file.name.split('.').pop()?.toUpperCase() as any || 'FILE',
        size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
        uploadDate: new Date().toISOString().split('T')[0],
        uploader: user.name,
        folderId: selectedFolderId
      };
      setFiles([newFile, ...files]);
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Document Repository</h1>
          <p className="mt-2 text-gray-600">Secure access to standards, drafts, and administrative documents.</p>
        </div>
        
        {user && (
           <label className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-ieee-blue hover:bg-ieee-dark transition">
              <Upload size={16} className="mr-2" />
              Upload Document
              <input type="file" className="hidden" onChange={handleUpload} />
           </label>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Folders */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">Folders</h3>
          {MOCK_FOLDERS.map((folder) => (
            <button
              key={folder.id}
              onClick={() => setSelectedFolderId(folder.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
                selectedFolderId === folder.id 
                  ? 'bg-blue-50 text-ieee-blue' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Folder size={18} className={selectedFolderId === folder.id ? 'fill-current' : ''} />
              <span>{folder.name}</span>
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-3 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col min-h-[500px]">
          
          {/* Toolbar */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50 rounded-t-lg">
            <div>
              <h2 className="text-lg font-bold text-gray-800">{selectedFolder?.name}</h2>
              <p className="text-xs text-gray-500">{selectedFolder?.description}</p>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={14} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search files..."
                className="block w-64 pl-9 pr-3 py-1.5 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-ieee-blue focus:border-ieee-blue sm:text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* File List */}
          <div className="flex-1 overflow-y-auto">
             {filteredFiles.length > 0 ? (
               <ul className="divide-y divide-gray-100">
                 {filteredFiles.map((file) => (
                   <li key={file.id} className="p-4 hover:bg-gray-50 transition flex items-center justify-between group">
                     <div className="flex items-center space-x-4">
                       <div className={`p-2 rounded-lg ${
                         file.type === 'PDF' ? 'bg-red-50 text-red-600' : 
                         file.type === 'DOCX' ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-600'
                       }`}>
                         {file.type === 'PDF' || file.type === 'DOCX' ? <FileText size={20} /> : <File size={20} />}
                       </div>
                       <div>
                         <p className="text-sm font-medium text-gray-900 group-hover:text-ieee-blue">{file.name}</p>
                         <div className="flex items-center space-x-2 text-xs text-gray-500 mt-0.5">
                           <span>{file.size}</span>
                           <span>•</span>
                           <span>Updated {file.uploadDate} by {file.uploader}</span>
                         </div>
                       </div>
                     </div>
                     <button className="p-2 text-gray-400 hover:text-ieee-blue hover:bg-white rounded-full transition">
                       <Download size={18} />
                     </button>
                   </li>
                 ))}
               </ul>
             ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <Folder size={48} className="mb-2 opacity-20" />
                  <p className="text-sm">No files found in this folder.</p>
                </div>
             )}
          </div>
          
          {/* Footer Status */}
          <div className="bg-gray-50 border-t border-gray-200 px-4 py-2 text-xs text-gray-500 flex justify-between">
             <span>{filteredFiles.length} item(s)</span>
             <span>Last synced: Just now</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;