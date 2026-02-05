import React, { useState } from 'react';
import { MessageSquare, Plus, Filter, MessageCircle, Clock, User as UserIcon, Tag, ChevronLeft } from 'lucide-react';
import { ForumTopic, ForumReply } from '../types';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

// Mock Data
const MOCK_TOPICS: ForumTopic[] = [
  {
    id: '1',
    title: 'Defining "Robustness" in the context of Generative AI',
    content: 'We need to reach a consensus on the definition of robustness for Section 4. Does it include prompt injection resilience?',
    authorId: 'u1',
    authorName: 'Dr. Sarah Chen',
    category: 'Technical',
    createdAt: '2024-11-10T10:00:00Z',
    views: 154,
    replies: [
      { id: 'r1', content: 'I agree. We should reference NIST AI 100-1 for this.', authorId: 'u2', authorName: 'James Miller', createdAt: '2024-11-10T11:30:00Z' }
    ]
  },
  {
    id: '2',
    title: 'Bias Metrics for Multi-modal Models',
    content: 'How do we measure bias when the input is text but the output is an image? The current draft only covers text-to-text.',
    authorId: 'u3',
    authorName: 'Prof. A. Rossi',
    category: 'Ethics',
    createdAt: '2024-11-12T09:15:00Z',
    views: 89,
    replies: []
  },
  {
    id: '3',
    title: 'Timeline for Committee Draft Balloting',
    content: 'Just a reminder that the balloting period opens next Monday. Please review the drafts in the Resources tab.',
    authorId: 'u1',
    authorName: 'Dr. Sarah Chen',
    category: 'Process',
    createdAt: '2024-11-14T08:00:00Z',
    views: 203,
    replies: []
  }
];

const Forum: React.FC = () => {
  const { user } = useAuth();
  const [topics, setTopics] = useState<ForumTopic[]>(MOCK_TOPICS);
  const [selectedTopic, setSelectedTopic] = useState<ForumTopic | null>(null);
  const [filter, setFilter] = useState<string>('All');
  const [isCreating, setIsCreating] = useState(false);
  
  // New Topic Form State
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<ForumTopic['category']>('General');
  
  // Reply Form State
  const [replyContent, setReplyContent] = useState('');

  const filteredTopics = filter === 'All' ? topics : topics.filter(t => t.category === filter);

  const handleCreateTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const newTopic: ForumTopic = {
      id: Date.now().toString(),
      title: newTitle,
      content: newContent,
      authorId: user.id,
      authorName: user.name,
      category: newCategory,
      createdAt: new Date().toISOString(),
      views: 0,
      replies: []
    };

    setTopics([newTopic, ...topics]);
    setIsCreating(false);
    setNewTitle('');
    setNewContent('');
  };

  const handleReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedTopic) return;

    const newReply: ForumReply = {
      id: Date.now().toString(),
      content: replyContent,
      authorId: user.id,
      authorName: user.name,
      createdAt: new Date().toISOString()
    };

    const updatedTopic = {
      ...selectedTopic,
      replies: [...selectedTopic.replies, newReply]
    };

    setTopics(topics.map(t => t.id === selectedTopic.id ? updatedTopic : t));
    setSelectedTopic(updatedTopic);
    setReplyContent('');
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Technical': return 'bg-gray-100 text-gray-800';
      case 'Ethics': return 'bg-blue-100 text-blue-800';
      case 'Process': return 'bg-purple-100 text-purple-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  if (selectedTopic) {
    // Detail View
    return (
      <div className="space-y-6">
        <button 
          onClick={() => setSelectedTopic(null)}
          className="flex items-center text-sm text-gray-500 hover:text-ieee-blue transition"
        >
          <ChevronLeft size={16} className="mr-1" /> Back to Topics
        </button>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex gap-2 mb-3">
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${getCategoryColor(selectedTopic.category)}`}>
                {selectedTopic.category}
              </span>
              <span className="text-xs text-gray-500 flex items-center">
                 <Clock size={12} className="mr-1" />
                 {new Date(selectedTopic.createdAt).toLocaleDateString()}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{selectedTopic.title}</h1>
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
              <div className="w-8 h-8 rounded-full bg-ieee-blue text-white flex items-center justify-center font-bold text-xs">
                {selectedTopic.authorName.charAt(0)}
              </div>
              <span className="font-medium">{selectedTopic.authorName}</span>
            </div>
            <div className="prose max-w-none text-gray-700">
              <p>{selectedTopic.content}</p>
            </div>
          </div>

          <div className="bg-gray-50 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <MessageCircle size={20} className="mr-2" />
              Replies ({selectedTopic.replies.length})
            </h3>
            
            <div className="space-y-4 mb-8">
              {selectedTopic.replies.map((reply) => (
                <div key={reply.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold text-sm text-gray-900">{reply.authorName}</span>
                    <span className="text-xs text-gray-500">{new Date(reply.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-gray-700">{reply.content}</p>
                </div>
              ))}
              {selectedTopic.replies.length === 0 && (
                <p className="text-sm text-gray-500 italic">No replies yet. Be the first to discuss.</p>
              )}
            </div>

            {user ? (
              <form onSubmit={handleReply} className="mt-4">
                <textarea
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-ieee-blue focus:ring-ieee-blue sm:text-sm p-3 border"
                  rows={3}
                  placeholder="Type your reply here..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-ieee-blue hover:bg-ieee-dark focus:outline-none"
                >
                  Post Reply
                </button>
              </form>
            ) : (
              <div className="bg-blue-50 p-4 rounded-md text-sm text-blue-800 text-center">
                Please <Link to="/login" className="underline font-bold">log in</Link> to join the discussion.
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Discussion Forum</h1>
          <p className="mt-2 text-gray-600">Collaborate, debate, and share knowledge on AI standards.</p>
        </div>
        
        {user && !isCreating && (
          <button
            onClick={() => setIsCreating(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-ieee-blue hover:bg-ieee-dark transition"
          >
            <Plus size={16} className="mr-2" />
            New Topic
          </button>
        )}
      </div>

      {isCreating && (
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 mb-6 animate-fade-in-down">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Create New Topic</h2>
          <form onSubmit={handleCreateTopic} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-ieee-blue focus:ring-ieee-blue sm:text-sm border p-2"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-ieee-blue focus:ring-ieee-blue sm:text-sm border p-2"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as any)}
              >
                <option value="General">General</option>
                <option value="Ethics">Ethics</option>
                <option value="Technical">Technical</option>
                <option value="Process">Process</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Content</label>
              <textarea
                required
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-ieee-blue focus:ring-ieee-blue sm:text-sm border p-2"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-ieee-blue hover:bg-ieee-dark"
              >
                Post Topic
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filters */}
      <div className="flex space-x-2 overflow-x-auto pb-2 border-b border-gray-200">
        {['All', 'General', 'Technical', 'Ethics', 'Process'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition ${
              filter === cat 
                ? 'bg-gray-800 text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Topic List */}
      <div className="space-y-3">
        {filteredTopics.map((topic) => (
          <div 
            key={topic.id} 
            onClick={() => setSelectedTopic(topic)}
            className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition cursor-pointer group"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wide ${getCategoryColor(topic.category)}`}>
                    {topic.category}
                  </span>
                  <span className="text-xs text-gray-400">
                    Posted by {topic.authorName} • {new Date(topic.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-ieee-blue truncate pr-4">
                  {topic.title}
                </h3>
                <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                  {topic.content}
                </p>
              </div>
              <div className="flex flex-col items-end space-y-2 text-gray-400">
                 <div className="flex items-center text-xs">
                    <MessageSquare size={14} className="mr-1" />
                    {topic.replies.length} replies
                 </div>
                 <div className="flex items-center text-xs">
                    <UserIcon size={14} className="mr-1" />
                    {topic.views} views
                 </div>
              </div>
            </div>
          </div>
        ))}
        {filteredTopics.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="mx-auto h-12 w-12 text-gray-300" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No discussions found</h3>
            <p className="mt-1 text-sm text-gray-500">Get the conversation started by creating a new topic.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Forum;