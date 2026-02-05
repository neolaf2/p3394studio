import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, Tag, Download } from 'lucide-react';
import { AgendaItem } from '../types';

const MOCK_AGENDA: AgendaItem[] = [
  {
    id: '1',
    date: '2024-11-15',
    time: '09:00 - 09:30',
    title: 'Opening Remarks & WG Chair Report',
    speaker: 'Dr. Sarah Chen, Chair',
    description: 'Review of progress since the last plenary, membership updates, and liaison reports from ISO/IEC JTC 1/SC 42.',
    type: 'presentation',
    location: 'Main Hall / Zoom A'
  },
  {
    id: '2',
    date: '2024-11-15',
    time: '09:30 - 10:30',
    title: 'Draft Review: Terms and Definitions (Section 3)',
    speaker: 'James Miller, Editor',
    description: 'Line-by-line review of the updated definitions for "Generative AI", "Foundation Model", and "Prompt Engineering".',
    type: 'discussion',
    location: 'Main Hall / Zoom A'
  },
  {
    id: '3',
    date: '2024-11-15',
    time: '10:30 - 10:45',
    title: 'Morning Break',
    speaker: '-',
    description: 'Coffee and networking.',
    type: 'break',
    location: 'Lobby'
  },
  {
    id: '4',
    date: '2024-11-15',
    time: '10:45 - 12:15',
    title: 'Workshop: Robustness Testing Methodologies',
    speaker: 'Technical Sub-group A',
    description: 'Deep dive into adversarial attack simulation standards. Please bring your laptops with the repo cloned.',
    type: 'workshop',
    location: 'Breakout Room 1 / Zoom B'
  },
  {
    id: '5',
    date: '2024-11-16',
    time: '14:00 - 15:30',
    title: 'Ethics Panel: Bias Mitigation in Healthcare AI',
    speaker: 'Prof. A. Rossi, Dr. K. Lee',
    description: 'Discussion on specific requirements for P3394.2 annex regarding medical diagnostic systems.',
    type: 'discussion',
    location: 'Main Hall / Zoom A'
  }
];

const Schedule: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'presentation' | 'discussion' | 'workshop'>('all');

  const filteredAgenda = filter === 'all' 
    ? MOCK_AGENDA 
    : MOCK_AGENDA.filter(item => item.type === filter);

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'presentation': return 'bg-blue-100 text-blue-800';
      case 'discussion': return 'bg-green-100 text-green-800';
      case 'workshop': return 'bg-purple-100 text-purple-800';
      case 'break': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Agenda & Schedule</h1>
          <p className="mt-2 text-gray-600">November Plenary • P3394 Working Group</p>
        </div>
        
        <div className="flex items-center space-x-2 bg-white p-1 rounded-lg border border-gray-200 shadow-sm">
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${filter === 'all' ? 'bg-ieee-blue text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            All
          </button>
          <button 
             onClick={() => setFilter('presentation')}
             className={`px-4 py-2 rounded-md text-sm font-medium transition ${filter === 'presentation' ? 'bg-ieee-blue text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            Sessions
          </button>
           <button 
             onClick={() => setFilter('workshop')}
             className={`px-4 py-2 rounded-md text-sm font-medium transition ${filter === 'workshop' ? 'bg-ieee-blue text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            Workshops
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredAgenda.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition duration-200">
            <div className="p-6">
              <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
                {/* Time Block */}
                <div className="flex-shrink-0 md:w-48">
                  <div className="flex items-center text-ieee-blue font-semibold text-lg">
                    <Clock size={18} className="mr-2" />
                    {item.time}
                  </div>
                  <div className="flex items-center text-gray-500 text-sm mt-1">
                    <Calendar size={14} className="mr-2" />
                    {item.date}
                  </div>
                   <div className="flex items-center text-gray-500 text-sm mt-1">
                    <MapPin size={14} className="mr-2" />
                    {item.location}
                  </div>
                </div>

                {/* Content Block */}
                <div className="flex-grow">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getBadgeColor(item.type)}`}>
                      {item.type}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                  </div>
                  
                  <div className="flex items-center text-gray-600 text-sm mb-3">
                    <User size={16} className="mr-2 text-gray-400" />
                    <span className="font-medium">{item.speaker}</span>
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex-shrink-0 flex md:flex-col gap-2 mt-4 md:mt-0">
                  {item.type !== 'break' && (
                    <button className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                      <Download size={16} className="mr-2" />
                      Materials
                    </button>
                  )}
                  {item.type === 'discussion' && (
                     <button className="inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none">
                      Join Vote
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredAgenda.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200 border-dashed">
                <Tag className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No events found</h3>
                <p className="mt-1 text-sm text-gray-500">Try adjusting your filters.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default Schedule;