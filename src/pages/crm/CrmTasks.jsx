import React, { useState } from 'react';
import {
  Plus,
  Calendar,
  List,
  CheckSquare,
  Square,
  Clock,
  User,
  Trash2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Search,
  Sparkles
} from 'lucide-react';
import {
  Breadcrumb,
  Button,
  Card,
  CardHeader,
  CardBody,
  Badge,
  Modal,
  Input,
  Select,
  KPICard
} from '../../components/ui';
import { useCrm } from '../../context/CrmContext';
import { useToast } from '../../context/ToastContext';

export const CrmTasks = () => {
  const { tasks, addTask, toggleTaskCompletion, deleteTask } = useCrm();
  const { addToast } = useToast();

  const [viewMode, setViewMode] = useState('calendar'); // Default to calendar view as user requested
  const [filterPriority, setFilterPriority] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(18); // Default May 18
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    contact: '',
    priority: 'Medium',
    dueDate: '2025-05-18',
    reminder: '9:00 AM',
    assignedTo: 'Alexander Wright',
  });

  const filteredTasks = tasks.filter((t) => {
    const matchPriority = filterPriority === 'all' || t.priority === filterPriority;
    const matchSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.contact && t.contact.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchPriority && matchSearch;
  });

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!formData.title) {
      addToast({ title: 'Validation Error', message: 'Task title is required.', type: 'error' });
      return;
    }
    addTask(formData);
    addToast({ title: 'Task Created', message: `Scheduled task: ${formData.title}`, type: 'success' });
    setIsAddModalOpen(false);
    setFormData({ title: '', contact: '', priority: 'Medium', dueDate: '2025-05-18', reminder: '9:00 AM', assignedTo: 'Alexander Wright' });
  };

  // Calendar Days (31 Days for May 2025)
  const daysInMonth = 31;
  const startDayOffset = 4; // Thursday start for May 2025

  // Map tasks to days
  const getTasksForDay = (dayNum) => {
    if (dayNum === 18) return tasks;
    if (dayNum === 12) return [{ id: 99, title: 'Q2 Strategy Briefing', priority: 'High', status: 'Pending', contact: 'Marcus Vance' }];
    if (dayNum === 22) return [{ id: 98, title: 'Contract Renewal Review', priority: 'Medium', status: 'Pending', contact: 'TechNova Solutions' }];
    if (dayNum === 28) return [{ id: 97, title: 'Executive Audit Prep', priority: 'Low', status: 'Completed', contact: 'Internal Team' }];
    return [];
  };

  return (
    <div className="flex flex-col gap-6" style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
      {/* 1. Header */}
      <div className="page-header-row">
        <div>
          <Breadcrumb items={[{ label: 'CRM nErgy' }, { label: 'Tasks & Reminders' }]} />
          <h1
            style={{
              fontSize: '24px',
              fontWeight: 800,
              color: 'var(--text-primary)',
              margin: '2px 0 0 0',
              fontFamily: 'var(--font-display)',
              letterSpacing: '-0.02em',
            }}
          >
            Tasks & Calendar Reminders
          </h1>
          <p className="text-xs text-secondary margin-0" style={{ marginTop: '2px' }}>
            Schedule follow-up meetings, deal proposals, and team action items.
          </p>
        </div>

        <div className="header-actions-right">
          {/* View Switcher Controls */}
          <div
            style={{
              display: 'inline-flex',
              padding: '3px',
              borderRadius: '8px',
              backgroundColor: 'var(--surface-secondary)',
              border: '1px solid var(--border)',
            }}
          >
            <button
              type="button"
              onClick={() => setViewMode('calendar')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '0.35rem 0.75rem',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                backgroundColor: viewMode === 'calendar' ? '#ffffff' : 'transparent',
                color: viewMode === 'calendar' ? '#1d4ed8' : 'var(--text-secondary)',
                boxShadow: viewMode === 'calendar' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
              }}
            >
              <Calendar size={14} />
              Calendar View
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '0.35rem 0.75rem',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                backgroundColor: viewMode === 'list' ? '#ffffff' : 'transparent',
                color: viewMode === 'list' ? '#1d4ed8' : 'var(--text-secondary)',
                boxShadow: viewMode === 'list' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
              }}
            >
              <List size={14} />
              List View
            </button>
          </div>

          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            onClick={() => setIsAddModalOpen(true)}
          >
            Create Task
          </Button>
        </div>
      </div>

      {/* 2. Top Task Summary Strip */}
      <div className="grid-responsive-kpi">
        <KPICard
          title="PENDING TASKS"
          value={`${tasks.filter((t) => t.status === 'Pending').length}`}
          change="Due Today"
          changeType="positive"
          changePeriod="action items"
          icon={Clock}
          iconBg="rgba(29, 78, 216, 0.1)"
          iconColor="#1d4ed8"
        />
        <KPICard
          title="HIGH PRIORITY"
          value={`${tasks.filter((t) => t.priority.includes('High')).length}`}
          change="Urgent"
          changeType="negative"
          changePeriod="requires action"
          icon={AlertTriangle}
          iconBg="rgba(239, 68, 68, 0.1)"
          iconColor="#ef4444"
        />
        <KPICard
          title="COMPLETED TASKS"
          value={`${tasks.filter((t) => t.status === 'Completed').length}`}
          change="100% Done"
          changeType="positive"
          changePeriod="this week"
          icon={CheckCircle2}
          iconBg="rgba(22, 163, 74, 0.1)"
          iconColor="#16a34a"
        />
        <KPICard
          title="SLA ON-TIME RATE"
          value="99.4%"
          change="Optimal"
          changeType="positive"
          changePeriod="team performance"
          icon={Sparkles}
          iconBg="rgba(147, 51, 234, 0.1)"
          iconColor="#9333ea"
        />
      </div>

      {/* 3. Filter & Search Bar */}
      <Card style={{ borderRadius: '12px', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.02)' }}>
        <div className="p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-1 max-w-[360px]">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks by title or contact..."
              startIcon={Search}
              style={{ height: '36px', fontSize: '13px' }}
            />
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-tertiary">Priority:</span>
              <Select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                options={[
                  { label: 'All Priorities', value: 'all' },
                  { label: 'High Priority', value: 'High' },
                  { label: 'Medium Priority', value: 'Medium' },
                  { label: 'Low Priority', value: 'Low' },
                ]}
                style={{ height: '34px', fontSize: '12px' }}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* 4. CALENDAR VIEW */}
      {viewMode === 'calendar' && (
        <Card style={{ borderRadius: '12px', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.02)' }}>
          <div className="p-5 flex flex-col gap-4">
            {/* Calendar Controls Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-subtle pb-4">
              <div className="flex items-center gap-3">
                <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  May 2025
                </h2>
                <Badge variant="primary">Current Month</Badge>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => addToast({ title: 'Previous Month', message: 'Navigated to April 2025.', type: 'info' })}
                  className="p-1.5 rounded-md surface-secondary border-subtle hover:bg-hover transition-colors cursor-pointer text-secondary"
                  title="Previous Month"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCalendarDate(18)}
                  className="px-3 py-1 rounded-md text-xs font-semibold surface-secondary border-subtle hover:bg-hover transition-colors cursor-pointer text-primary"
                >
                  Today (May 18)
                </button>
                <button
                  type="button"
                  onClick={() => addToast({ title: 'Next Month', message: 'Navigated to June 2025.', type: 'info' })}
                  className="p-1.5 rounded-md surface-secondary border-subtle hover:bg-hover transition-colors cursor-pointer text-secondary"
                  title="Next Month"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Responsive 7-Column Day Names Header */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
                gap: '8px',
                textAlign: 'center',
                fontSize: '12px',
                fontWeight: 700,
                color: 'var(--text-tertiary)',
                paddingBottom: '4px',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>

            {/* Responsive 7-Column Calendar Days Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
                gap: '8px',
                width: '100%',
              }}
            >
              {/* Empty leading offset days */}
              {Array.from({ length: startDayOffset }).map((_, idx) => (
                <div
                  key={`offset-${idx}`}
                  style={{
                    backgroundColor: 'var(--surface-secondary)',
                    borderRadius: '8px',
                    opacity: 0.3,
                    minHeight: '70px',
                  }}
                />
              ))}

              {/* 31 Calendar Days */}
              {Array.from({ length: daysInMonth }).map((_, idx) => {
                const dayNum = idx + 1;
                const dayTasks = getTasksForDay(dayNum);
                const isSelected = selectedCalendarDate === dayNum;
                const isToday = dayNum === 18;

                return (
                  <div
                    key={dayNum}
                    onClick={() => setSelectedCalendarDate(dayNum)}
                    style={{
                      backgroundColor: isSelected
                        ? '#eff6ff'
                        : isToday
                        ? 'var(--surface-hover)'
                        : 'var(--surface)',
                      border: isSelected
                        ? '2px solid #1d4ed8'
                        : isToday
                        ? '1px solid #1d4ed8'
                        : '1px solid var(--border)',
                      borderRadius: '8px',
                      padding: '0.5rem',
                      minHeight: '80px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      boxShadow: isSelected ? '0 2px 6px rgba(29, 78, 216, 0.12)' : 'none',
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        style={{
                          fontSize: '12px',
                          fontWeight: isToday || isSelected ? 800 : 600,
                          color: isSelected ? '#1d4ed8' : isToday ? '#1d4ed8' : 'var(--text-primary)',
                          backgroundColor: isToday ? 'rgba(29, 78, 216, 0.1)' : 'transparent',
                          padding: isToday ? '1px 6px' : 0,
                          borderRadius: '4px',
                        }}
                      >
                        {dayNum}
                      </span>
                      {dayTasks.length > 0 && (
                        <span
                          style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            backgroundColor: dayTasks.some(t => t.priority.includes('High')) ? '#ef4444' : '#1d4ed8',
                          }}
                        />
                      )}
                    </div>

                    {/* Day Task Pills */}
                    <div className="flex flex-col gap-1 mt-1">
                      {dayTasks.slice(0, 2).map((t) => (
                        <div
                          key={t.id}
                          className="truncate"
                          style={{
                            fontSize: '10px',
                            fontWeight: 600,
                            padding: '2px 4px',
                            borderRadius: '4px',
                            backgroundColor: t.priority.includes('High')
                              ? 'rgba(239, 68, 68, 0.12)'
                              : 'rgba(29, 78, 216, 0.1)',
                            color: t.priority.includes('High') ? '#dc2626' : '#1d4ed8',
                          }}
                        >
                          {t.title}
                        </div>
                      ))}
                      {dayTasks.length > 2 && (
                        <span style={{ fontSize: '9px', color: 'var(--text-tertiary)', fontWeight: 700 }}>
                          +{dayTasks.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Scheduled Tasks Detail Panel for Selected Date */}
            <div
              className="mt-4 p-4 rounded-lg flex flex-col gap-3"
              style={{ backgroundColor: 'var(--surface-secondary)', border: '1px solid var(--border)' }}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-primary flex items-center gap-1.5">
                  <Calendar size={14} className="text-primary" />
                  Tasks Scheduled for May {selectedCalendarDate}, 2025
                </span>
                <Badge variant="primary">
                  {getTasksForDay(selectedCalendarDate).length} Tasks
                </Badge>
              </div>

              {getTasksForDay(selectedCalendarDate).length === 0 ? (
                <div className="text-xs text-tertiary">No tasks scheduled for May {selectedCalendarDate}. Click "+ Create Task" to schedule one.</div>
              ) : (
                <div className="flex flex-col gap-2">
                  {getTasksForDay(selectedCalendarDate).map((task) => (
                    <div
                      key={task.id}
                      className="p-3 surface rounded-md border-subtle flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={task.status === 'Completed'}
                          onChange={() => toggleTaskCompletion(task.id)}
                          style={{ cursor: 'pointer', width: '16px', height: '16px' }}
                        />
                        <div className="flex flex-col gap-0.5">
                          <span
                            className="font-semibold text-xs text-primary"
                            style={{ textDecoration: task.status === 'Completed' ? 'line-through' : 'none' }}
                          >
                            {task.title}
                          </span>
                          <span className="text-tertiary" style={{ fontSize: '11px' }}>
                            Related to: {task.contact || 'Enterprise Prospect'}
                          </span>
                        </div>
                      </div>

                      <Badge
                        variant={
                          task.priority.includes('High')
                            ? 'error'
                            : task.priority.includes('Medium')
                            ? 'warning'
                            : 'success'
                        }
                      >
                        {task.priority}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* 5. LIST VIEW */}
      {viewMode === 'list' && (
        <Card style={{ borderRadius: '12px', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.02)' }}>
          <div className="p-4 flex flex-col gap-3">
            {filteredTasks.length === 0 ? (
              <div className="text-center p-8 text-xs text-tertiary">No tasks match selected filter.</div>
            ) : (
              filteredTasks.map((task) => {
                const isCompleted = task.status === 'Completed';
                return (
                  <div
                    key={task.id}
                    className="p-3 surface-secondary rounded-md border-subtle flex items-center justify-between gap-3 hover:border-strong transition-all"
                    style={{ opacity: isCompleted ? 0.65 : 1 }}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <button
                        type="button"
                        onClick={() => {
                          toggleTaskCompletion(task.id);
                          addToast({
                            title: isCompleted ? 'Task Reopened' : 'Task Completed',
                            message: task.title,
                            type: isCompleted ? 'info' : 'success',
                          });
                        }}
                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                      >
                        {isCompleted ? (
                          <CheckSquare size={20} className="text-success" />
                        ) : (
                          <Square size={20} className="text-tertiary" />
                        )}
                      </button>

                      <div className="flex flex-col">
                        <span
                          className="font-semibold text-xs text-primary"
                          style={{ textDecoration: isCompleted ? 'line-through' : 'none' }}
                        >
                          {task.title}
                        </span>
                        <span className="text-tertiary text-xs">
                          Contact: {task.contact || 'N/A'} | Assigned: {task.assignedTo || 'Alexander Wright'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-xs text-tertiary">
                        <Clock size={14} />
                        <span>{task.dueDate} ({task.reminder || '9:00 AM'})</span>
                      </div>

                      <Badge variant={task.priority.includes('High') ? 'error' : task.priority.includes('Medium') ? 'warning' : 'default'}>
                        {task.priority}
                      </Badge>

                      <Button
                        variant="ghost"
                        size="sm"
                        isIconOnly
                        icon={Trash2}
                        onClick={() => {
                          deleteTask(task.id);
                          addToast({ title: 'Task Deleted', type: 'error' });
                        }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </Card>
      )}

      {/* 6. Add Task Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Schedule New Task"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleCreateTask}>
              Create Task
            </Button>
          </>
        }
      >
        <form className="flex flex-col gap-4">
          <Input
            label="Task Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Follow up on proposal contract"
            required
          />
          <Input
            label="Related Contact / Deal"
            value={formData.contact}
            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
            placeholder="e.g. Eleanor Vance"
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Due Date"
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            />
            <Select
              label="Priority Level"
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              options={['High Priority', 'Medium Priority', 'Low Priority']}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};
