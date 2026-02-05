export interface AgendaItem {
  id: string;
  time: string;
  date: string;
  title: string;
  speaker: string;
  description: string;
  type: 'presentation' | 'discussion' | 'workshop' | 'break';
  location: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

export enum WorkingGroupTrack {
  ETHICS = 'Ethics & Governance',
  TECHNICAL = 'Technical Standards',
  APPLICATION = 'Industry Applications'
}

export interface User {
  id: string;
  name: string;
  email: string;
  affiliation: string;
  role: 'Chair' | 'Member' | 'Guest';
  avatar?: string;
}

export interface ForumReply {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string;
}

export interface ForumTopic {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  category: 'General' | 'Ethics' | 'Technical' | 'Process';
  createdAt: string;
  replies: ForumReply[];
  views: number;
}

export interface ResourceFile {
  id: string;
  name: string;
  type: 'PDF' | 'DOCX' | 'XLSX' | 'TXT';
  size: string;
  uploadDate: string;
  uploader: string;
  folderId: string;
}

export interface ResourceFolder {
  id: string;
  name: string;
  description: string;
}