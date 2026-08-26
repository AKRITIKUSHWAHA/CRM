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
  CalendarDays,
  CheckCircle2
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
  Checkbox
} from '../../components/ui';
import { useCrm } from '../../context/CrmContext';
import { useToast } from '../../context/ToastContext';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const CrmTasks = () => {
  const { tasks, addTask, toggleTaskCompletion, deleteTask } = useCrm();
  const { addToast } = useToast();

  const [viewMode, setViewMode] = useState('calendar'); // Default to 'calendar' or 'list'
  const [filterPriority, setFilterPriority] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDateForNewTask, setSelectedDateForNewTask] = useState('');

  // Calendar Date State - Default to February 2026 (matching project mock data)
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 1));

  const [formData, setFormData] = useState({
    title: '',
    contact: '',
    priority: 'Medium',
    dueDate: '2026-02-28',
    reminder: '9:00 AM',
    assignedTo: 'Alexander Wright',
  });

  const filteredTasks = tasks.filter(
    (t) => filterPriority === 'all' || t.priority === filterPriority
  );

  // Month navigation helpers
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); // 0-indexed: 0 = Jan, 1 = Feb, etc.

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date(2026, 1, 1)); // Jump to Feb 2026
  };

  // Calendar Calculation Logic
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Sun, 1 = Mon, ...
  const daysInCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

  // Previous month trailing padding cells
  const prevMonthCells = [];
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const dayNum = daysInPrevMonth - i;
    const m = currentMonth === 0 ? 12 : currentMonth;
    const y = currentMonth === 0 ? currentYear - 1 : currentYear;
    const dateStr = `${y}-${String(m).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
    prevMonthCells.push({
      dayNum,
      dateStr,
      isCurrentMonth: false,
    });
  }

  // Current month cells
  const currentMonthCells = [];
  for (let d = 1; d <= daysInCurrentMonth; d++) {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    currentMonthCells.push({
      dayNum: d,
      dateStr,
      isCurrentMonth: true,
    });
  }

  // Next month leading padding cells (complete to 35 or 42 grid slots)
  const totalCellsSoFar = prevMonthCells.length + currentMonthCells.length;
  const totalGridSlots = totalCellsSoFar > 35 ? 42 : 35;
  const nextMonthCells = [];
  const remainingSlots = totalGridSlots - totalCellsSoFar;
  for (let d = 1; d <= remainingSlots; d++) {
    const m = currentMonth === 11 ? 1 : currentMonth + 2;
    const y = currentMonth === 11 ? currentYear + 1 : currentYear;
    const dateStr = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    nextMonthCells.push({
      dayNum: d,
      dateStr,
      isCurrentMonth: false,
    });
  }

  const allCalendarGridCells = [...prevMonthCells, ...currentMonthCells, ...nextMonthCells];

  // Month formatted title
  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const monthYearLabel = `${monthName} ${currentYear}`;

  // Count of tasks in the currently viewed month
  const tasksInViewedMonth = filteredTasks.filter((t) => {
    if (!t.dueDate) return false;
    const [y, m] = t.dueDate.split('-').map(Number);
    return y === currentYear && m === currentMonth + 1;
  });

  const handleOpenAddModalForDate = (dateStr) => {
    setFormData({
      title: '',
      contact: '',
      priority: 'Medium',
      dueDate: dateStr || `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-15`,
      reminder: '9:00 AM',
      assignedTo: 'Alexander Wright',
    });
    setIsAddModalOpen(true);
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!formData.title) {
      addToast({ title: 'Validation Error', message: 'Task title is required.', type: 'error' });
      return;
    }
    addTask(formData);
    addToast({ title: 'Task Scheduled', message: `Added "${formData.title}" for ${formData.dueDate}`, type: 'success' });
    setIsAddModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Breadcrumb items={[{ label: 'CRM nErgy' }, { label: 'Tasks & Reminders' }]} />
          <h1 style={{ fontSize: 'var(--text-2xl)', marginTop: '0.25rem', marginBottom: '0.25rem' }}>Tasks & Reminders</h1>
          <p className="text-xs text-secondary margin-0">
            Schedule follow-up meetings, proposals, and customer reminders
          </p>
        </div>

        <div className="dashboard-actions-grid w-full md:w-auto">
          {/* View Switcher Buttons */}
          <div className="flex items-center border-subtle surface-secondary rounded-sm p-1 gap-1 w-full md:w-auto">
            <Button
              variant={viewMode === 'list' ? 'primary' : 'ghost'}
              size="sm"
              icon={List}
              className="flex-1 md:flex-none justify-center"
              onClick={() => setViewMode('list')}
            >
              List View
            </Button>
            <Button
              variant={viewMode === 'calendar' ? 'primary' : 'ghost'}
              size="sm"
              icon={Calendar}
              className="flex-1 md:flex-none justify-center"
              onClick={() => setViewMode('calendar')}
            >
              Calendar View
            </Button>
          </div>

          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            className="w-full md:w-auto justify-center"
            onClick={() => handleOpenAddModalForDate(`${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-05`)}
          >
            Create Task
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <Card className="p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex items-center justify-between md:justify-start gap-2 w-full md:w-auto">
          <span className="text-xs font-semibold text-tertiary whitespace-nowrap">Filter Priority:</span>
          <Select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            options={[
              { label: 'All Priorities', value: 'all' },
              { label: 'High Priority', value: 'High' },
              { label: 'Medium Priority', value: 'Medium' },
              { label: 'Low Priority', value: 'Low' },
            ]}
            style={{ height: '32px', fontSize: '12px' }}
            className="w-full sm:w-auto"
          />
        </div>

        <span className="text-xs text-secondary font-semibold text-center md:text-left">
          {tasks.filter((t) => t.status === 'Pending').length} Pending Tasks ({tasksInViewedMonth.length} in {monthName})
        </span>
      </Card>

      {/* LIST VIEW */}
      {viewMode === 'list' && (
        <Card className="p-4 flex flex-col gap-3">
          {filteredTasks.length === 0 ? (
            <div className="text-center p-8 text-xs text-tertiary">No tasks match selected filter.</div>
          ) : (
            filteredTasks.map((task) => {
              const isCompleted = task.status === 'Completed';
              return (
                <div
                  key={task.id}
                  className="p-3 surface-secondary rounded-md border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-strong transition-all"
                  style={{ opacity: isCompleted ? 0.65 : 1 }}
                >
                  <div className="flex items-start sm:items-center gap-3 flex-1">
                    <button
                      onClick={() => {
                        toggleTaskCompletion(task.id);
                        addToast({
                          title: isCompleted ? 'Task Reopened' : 'Task Completed',
                          message: task.title,
                          type: isCompleted ? 'info' : 'success',
                        });
                      }}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', marginTop: '2px' }}
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
                      <span className="text-tertiary text-xs mt-1 sm:mt-0">
                        Contact: {task.contact} | Assigned: {task.assignedTo}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto mt-2 sm:mt-0 pt-2 sm:pt-0 border-t border-subtle sm:border-none">
                    <div className="flex items-center gap-1 text-xs text-tertiary">
                      <Clock size={14} />
                      <span>{task.dueDate} ({task.reminder})</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge variant={task.priority === 'High' ? 'error' : task.priority === 'Medium' ? 'warning' : 'default'}>
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
                </div>
              );
            })
          )}
        </Card>
      )}

      {/* CALENDAR VIEW — FULL 7-COLUMN RESPONSIVE MONTHLY GRID */}
      {viewMode === 'calendar' && (
        <div className="calendar-wrapper">
          {/* Calendar Header Navigation Bar */}
          <div className="calendar-header-bar">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <CalendarDays size={20} className="text-primary" />
                <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                  {monthYearLabel}
                </h2>
              </div>
              <Badge variant="primary" style={{ fontSize: '11px' }}>
                {tasksInViewedMonth.length} {tasksInViewedMonth.length === 1 ? 'Task' : 'Tasks'}
              </Badge>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center gap-2">
              <div className="flex items-center border-subtle rounded-sm surface-secondary p-0.5">
                <Button
                  variant="ghost"
                  size="sm"
                  isIconOnly
                  icon={ChevronLeft}
                  onClick={handlePrevMonth}
                  title="Previous Month"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleToday}
                  style={{ fontSize: '12px', padding: '0.25rem 0.6rem' }}
                >
                  Today
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  isIconOnly
                  icon={ChevronRight}
                  onClick={handleNextMonth}
                  title="Next Month"
                />
              </div>

              <Button
                variant="outline"
                size="sm"
                icon={Plus}
                onClick={() => handleOpenAddModalForDate(`${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-01`)}
              >
                Add Event
              </Button>
            </div>
          </div>

          {/* 7-Column Calendar Grid Container */}
          <div className="calendar-grid-container">
            <div className="calendar-month-grid">
              {/* 1. Weekday Header Row (7 Equal Columns: Sun - Sat) */}
              {DAYS_OF_WEEK.map((day) => (
                <div key={day} className="calendar-weekday-header">
                  {day}
                </div>
              ))}

              {/* 2. Date Cells (7 Equal Columns, Arranged Horizontally by Weekday) */}
              {allCalendarGridCells.map((cell, index) => {
                const dayTasks = filteredTasks.filter((t) => t.dueDate === cell.dateStr);
                const isToday = cell.dateStr === '2026-02-28' || cell.dateStr === '2026-02-01';

                return (
                  <div
                    key={`${cell.dateStr}-${index}`}
                    className={`calendar-day-cell ${!cell.isCurrentMonth ? 'other-month' : ''} ${isToday ? 'today' : ''}`}
                    onClick={() => handleOpenAddModalForDate(cell.dateStr)}
                    title={`Click to schedule task on ${cell.dateStr}`}
                  >
                    {/* Top Row: Date Number */}
                    <div className="calendar-day-top">
                      <span className="calendar-day-number">
                        {cell.dayNum}
                      </span>
                      {dayTasks.length > 0 && (
                        <span style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 600 }}>
                          {dayTasks.length} {dayTasks.length === 1 ? 'task' : 'tasks'}
                        </span>
                      )}
                    </div>

                    {/* Tasks inside this Date Cell */}
                    <div className="flex flex-col gap-1 w-full mt-1">
                      {dayTasks.map((task) => {
                        const isCompleted = task.status === 'Completed';
                        return (
                          <div
                            key={task.id}
                            className={`calendar-task-pill priority-${task.priority}`}
                            onClick={(e) => {
                              e.stopPropagation(); // prevent opening add modal
                              toggleTaskCompletion(task.id);
                              addToast({
                                title: isCompleted ? 'Task Reopened' : 'Task Completed',
                                message: task.title,
                                type: isCompleted ? 'info' : 'success',
                              });
                            }}
                            title={`${task.title} (${task.priority} Priority) - Click to toggle completion`}
                            style={{
                              opacity: isCompleted ? 0.6 : 1,
                              textDecoration: isCompleted ? 'line-through' : 'none',
                            }}
                          >
                            <span
                              style={{
                                width: '6px',
                                height: '6px',
                                borderRadius: '50%',
                                backgroundColor:
                                  task.priority === 'High'
                                    ? '#ef4444'
                                    : task.priority === 'Medium'
                                    ? '#f59e0b'
                                    : '#3b82f6',
                                flexShrink: 0,
                              }}
                            />
                            <span className="truncate flex-1 font-medium" style={{ fontSize: '11px' }}>
                              {task.title}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Add Task Modal */}
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
              Schedule Task
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
              required
            />
            <Select
              label="Priority Level"
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              options={['High', 'Medium', 'Low']}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Reminder Time"
              value={formData.reminder}
              onChange={(e) => setFormData({ ...formData, reminder: e.target.value })}
              placeholder="e.g. 9:00 AM"
            />
            <Input
              label="Assigned To"
              value={formData.assignedTo}
              onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
              placeholder="e.g. Alexander Wright"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};
