import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, MapPin, Video, Users, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { staggerContainer, staggerItem, slideUp } from '@utils/animations';

interface Event {
  id: number;
  title: string;
  time: string;
  date: number;
  type: 'meeting' | 'deadline' | 'milestone';
  participants?: string[];
}

const defaultEvents: Event[] = [
  { id: 1, title: 'Client Meeting - Tokopedia', time: '10:00 AM', date: 17, type: 'meeting', participants: ['Sarah', 'Ahmad'] },
  { id: 2, title: 'Security Audit Deadline', time: '11:59 PM', date: 18, type: 'deadline' },
  { id: 3, title: 'Project Kickoff - Gojek', time: '2:00 PM', date: 19, type: 'meeting', participants: ['Budi', 'Rendy'] },
  { id: 4, title: 'Cloud Migration Milestone', time: '5:00 PM', date: 20, type: 'milestone' },
  { id: 5, title: 'Team Standup', time: '9:00 AM', date: 21, type: 'meeting', participants: ['All Team'] },
  { id: 6, title: 'Compliance Report Due', time: '11:59 PM', date: 22, type: 'deadline' },
];

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function DashboardCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(17);
  const [events] = useState<Event[]>(defaultEvents);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const getEventsForDate = (day: number) => events.filter(e => e.date === day);

  const getTypeColor = (type: string) => {
    if (type === 'meeting') return 'bg-blue-500/20 border-blue-500/30 text-blue-400';
    if (type === 'deadline') return 'bg-red-500/20 border-red-500/30 text-red-400';
    return 'bg-purple-500/20 border-purple-500/30 text-purple-400';
  };

  return (
    <div className="space-y-6">
      <motion.div variants={slideUp} initial="hidden" animate="visible" className="relative">
        <div className="relative border border-white/10 rounded-sm sm:rounded-sm p-8 sm:p-10 overflow-hidden bg-[#0f172a] shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-500/5 via-transparent to-red-900/5" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 sm:w-48 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-70" />
          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm border border-red-500/30 bg-red-500/10">
                  <Sparkles className="w-3.5 h-3.5 text-red-400" />
                  <span className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-widest">Calendar</span>
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-mono font-black mb-4 tracking-tight">
                <span className="text-white drop-shadow-md">
                  Schedule &{' '}
                </span>
                <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-400 bg-clip-text text-transparent filter drop-shadow-lg">
                  Events
                </span>
              </h1>
              <p className="text-gray-400 text-base sm:text-lg max-w-2xl leading-relaxed">
                Manage your meetings, project deadlines, and important milestones.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div className="lg:col-span-2 bg-[#0f172a] rounded-sm border border-white/10 shadow-2xl p-6 lg:p-8 overflow-hidden relative" variants={staggerContainer} initial="hidden" animate="visible">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-red-700 to-transparent opacity-50" />
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-mono font-bold text-white tracking-tight">{monthNames[month]} <span className="text-gray-400 font-medium">{year}</span></h2>
            <div className="flex gap-2">
              <button onClick={prevMonth} className="p-2.5 rounded-sm bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] hover:border-white/20 text-gray-400 hover:text-white transition-all shadow-sm">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={nextMonth} className="p-2.5 rounded-sm bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] hover:border-white/20 text-gray-400 hover:text-white transition-all shadow-sm">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-4">
            {dayNames.map(day => (
              <div key={day} className="text-center text-xs font-bold text-gray-500 py-2 uppercase tracking-wider bg-black/20 rounded-sm">{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} className="p-2" />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dayEvents = getEventsForDate(day);
              const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
              const isSelected = day === selectedDate;

              return (
                <motion.button
                  key={day}
                  variants={staggerItem}
                  onClick={() => setSelectedDate(day)}
                  className={`relative p-3 rounded-sm text-sm font-medium transition-all duration-300 min-h-[60px] flex flex-col items-center justify-start group
                    ${isToday ? 'bg-gradient-to-b from-red-500/20 to-red-500/5 border border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                      : isSelected ? 'bg-white/10 border border-white/30 shadow-lg scale-105 z-10'
                        : 'bg-white/[0.02] border border-white/5 hover:bg-white/[0.06] hover:border-white/20'}`}
                >
                  <span className={`${isToday ? 'text-red-400 font-bold' : isSelected ? 'text-white font-bold' : 'text-gray-400 group-hover:text-gray-200'}`}>{day}</span>

                  {dayEvents.length > 0 && (
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 mt-auto">
                      {dayEvents.slice(0, 3).map((e, idx) => (
                        <div key={idx} className={`w-1.5 h-1.5 rounded-full shadow-sm
                          ${e.type === 'meeting' ? 'bg-blue-400 shadow-blue-400/50'
                            : e.type === 'deadline' ? 'bg-red-400 shadow-red-400/50'
                              : 'bg-purple-400 shadow-purple-400/50'}`}
                        />
                      ))}
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        <div className="bg-[#0f172a] rounded-sm border border-white/10 shadow-2xl p-6 lg:p-8 h-fit">
          <h2 className="text-xl font-mono font-bold text-white mb-6 border-b border-white/10 pb-4">
            Events for <span className="text-red-400">{monthNames[month]} {selectedDate}</span>
          </h2>
          <div className="space-y-4">
            {getEventsForDate(selectedDate).length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-white/5 mx-auto flex items-center justify-center mb-3 border border-white/10">
                  <CalendarIcon className="w-6 h-6 text-gray-500" />
                </div>
                <p className="text-gray-400 font-medium">No events scheduled</p>
                <p className="text-xs text-gray-500 mt-1">Enjoy your free day!</p>
              </div>
            ) : (
              getEventsForDate(selectedDate).map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-sm border bg-gradient-to-br from-white/5 to-transparent backdrop-blur-md shadow-md hover:shadow-lg transition-shadow group ${getTypeColor(event.type)}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-sm bg-black/20 text-current shadow-inner">
                      {event.type === 'meeting' ? <Video className="w-4 h-4" /> : event.type === 'deadline' ? <Clock className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold truncate group-hover:text-white transition-colors">{event.title}</h3>
                      <p className="text-xs font-mono opacity-80 mt-1">{event.time}</p>
                      {event.participants && (
                        <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-current/20 text-xs font-medium">
                          <Users className="w-3.5 h-3.5 opacity-80" />
                          <span className="truncate opacity-90">{event.participants.join(', ')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
