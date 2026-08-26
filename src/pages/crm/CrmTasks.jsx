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
  CheckCircle2,
  Filter,
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
  KPICard,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody
} from '../../components/ui';
import { useCrm } from '../../context/CrmContext';
import { useToast } from '../../context/ToastContext';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const CrmTasks = () => {
  const { tasks, addTask, toggleTaskCompletion, deleteTask } = useCrm();
  const { addToast } = useToast();

  const [viewMode, setViewMode] = useState('calendar'); // 'calendar' or 'list'
  const [filterPriority, setFilterPriority] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('2026-02-18');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Calendar Date State - Default to February 2026
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 1));

  const [formData, setFormData] = useState({
    title: '',
    contact: '',
    priority: 'Medium',
    dueDate: '2026-02-18',
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

  // Month navigation helpers
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date(2026, 1, 1));
  };

  // Calendar Calculation Logic
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  const daysInCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

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

  const currentMonthCells = [];
  for (let d = 1; d <= daysInCurrentMonth; d++) {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    currentMonthCells.push({
      dayNum: d,
      dateStr,
      isCurrentMonth: true,
    });
  }

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
  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const monthYearLabel = `${monthName} ${currentYear}`;

  const handleOpenAddModalForDate = (dateStr) => {
    setFormData({
      title: '',
      contact: '',
      priority: 'Medium',
      dueDate: dateStr || '2026-02-18',
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

  // Selected date tasks
  const selectedDateTasks = filteredTasks.filter((t) => t.dueDate === selectedDate);

  return (
    <div className="flex flex-col gap-6" style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
      {/* 1. Header */}
      <div className="page-header-row">
        <div>
          <Breadcrumb items={[{ label: 'CRM nErgy' }, { label: 'Tasks & Reminders' }]} />
          <h1 style={{ fontSize: 'var(--text-2xl)', marginTop: '0.25rem', marginBottom: '0.25rem' }}>
            Tasks & Calendar Reminders
          </h1>
          <p className="text-xs text-secondary margin-0">
            Schedule follow-up meetings, deal proposals, and team action items
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
                backgroundColor: viewMode === 'calendar' ? 'var(--primary)' : 'transparent',
                color: viewMode === 'calendar' ? '#ffffff' : 'var(--text-secondary)',
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
                backgroundColor: viewMode === 'list' ? 'var(--primary)' : 'transparent',
                color: viewMode === 'list' ? '#ffffff' : 'var(--text-secondary)',
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
            className="w-full md:w-auto justify-center"
            onClick={() => handleOpenAddModalForDate(selectedDate)}
          >
            Create Task
          </Button>
        </div>
      </div>

      {/* 2. KPI Cards Strip */}
      <div className="grid-responsive-kpi">
        <KPICard
          title="TOTAL TASKS"
          value={`${tasks.length}`}
          change="Live Sync"
          changeType="positive"
          icon={CheckSquare}
        />
        <KPICard
          title="PENDING TASKS"
          value={`${tasks.filter((t) => t.status === 'Pending').length}`}
          change="Action Required"
          changeType="warning"
          icon={Clock}
        />
        <KPICard
          title="HIGH PRIORITY"
          value={`${tasks.filter((t) => t.priority === 'High' && t.status === 'Pending').length}`}
          change="Due Soon"
          changeType="error"
          icon={AlertCircle}
        />
        <KPICard
          title="COMPLETED RATE"
          value={`${tasks.length > 0 ? Math.round((tasks.filter((t) => t.status === 'Completed').length / tasks.length) * 100) : 0}%`}
          change="Sprint Progress"
          changeType="positive"
          icon={CheckCircle2}
        />
      </div>

      {/* 3. Filter Bar */}
      <div className="table-toolbar">
        <div className="table-toolbar-search">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks by title or contact..."
            startIcon={Search}
            style={{ height: '36px' }}
          />
        </div>

        <div className="table-toolbar-actions">
          <Select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            options={[
              { label: 'All Priorities', value: 'all' },
              { label: 'High Priority', value: 'High' },
              { label: 'Medium Priority', value: 'Medium' },
              { label: 'Low Priority', value: 'Low' },
            ]}
            style={{ height: '36px', fontSize: '13px' }}
          />
        </div>
      </div>

      {/* 4. CALENDAR VIEW */}
      {viewMode === 'calendar' ? (
        <div className="flex flex-col gap-5">
          <Card style={{ padding: '1.25rem' }}>
            {/* Calendar Month Header */}
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                  {monthYearLabel}
                </h2>
                <Button variant="outline" size="sm" onClick={handleToday} style={{ fontSize: '11px', padding: '2px 8px' }}>
                  Today
                </Button>
              </div>

              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" icon={ChevronLeft} onClick={handlePrevMonth} title="Previous Month" />
                <Button variant="ghost" size="sm" icon={ChevronRight} onClick={handleNextMonth} title="Next Month" />
              </div>
            </div>

            {/* Weekday Columns */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                textAlign: 'center',
                fontWeight: 700,
                fontSize: '11px',
                color: 'var(--text-tertiary)',
                paddingBottom: '0.5rem',
                borderBottom: '1px solid var(--border)',
              }}
            >
              {DAYS_OF_WEEK.map((day) => (
                <div key={day} style={{ padding: '4px' }}>{day}</div>
              ))}
            </div>

            {/* Calendar Days Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: '4px',
                marginTop: '4px',
              }}
            >
              {allCalendarGridCells.map((cell, idx) => {
                const isSelected = selectedDate === cell.dateStr;
                const cellTasks = filteredTasks.filter((t) => t.dueDate === cell.dateStr);

                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedDate(cell.dateStr)}
                    style={{
                      minHeight: '75px',
                      padding: '6px',
                      borderRadius: '8px',
                      backgroundColor: isSelected
                        ? 'rgba(37, 99, 235, 0.08)'
                        : cell.isCurrentMonth
                        ? 'var(--surface)'
                        : 'var(--surface-secondary)',
                      border: isSelected
                        ? '2px solid var(--accent)'
                        : '1px solid var(--border)',
                      opacity: cell.isCurrentMonth ? 1 : 0.45,
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        style={{
                          fontSize: '12px',
                          fontWeight: isSelected ? 800 : cell.isCurrentMonth ? 600 : 400,
                          color: isSelected ? 'var(--accent)' : 'var(--text-primary)',
                        }}
                      >
                        {cell.dayNum}
                      </span>
                      {cellTasks.length > 0 && (
                        <span
                          style={{
                            fontSize: '10px',
                            fontWeight: 700,
                            padding: '1px 5px',
                            borderRadius: '10px',
                            backgroundColor: 'var(--accent)',
                            color: '#ffffff',
                          }}
                        >
                          {cellTasks.length}
                        </span>
                      )}
                    </div>

                    {/* Task Pills in Date Cell */}
                    <div className="flex flex-col gap-1 mt-1 overflow-hidden">
                      {cellTasks.slice(0, 2).map((t) => (
                        <div
                          key={t.id}
                          style={{
                            fontSize: '10px',
                            padding: '2px 4px',
                            borderRadius: '4px',
                            backgroundColor: t.status === 'Completed'
                              ? 'rgba(34, 197, 94, 0.15)'
                              : t.priority === 'High'
                              ? 'rgba(239, 68, 68, 0.15)'
                              : 'rgba(37, 99, 235, 0.15)',
                            color: t.status === 'Completed'
                              ? 'var(--success)'
                              : t.priority === 'High'
                              ? 'var(--error)'
                              : 'var(--accent)',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            fontWeight: 600,
                          }}
                        >
                          {t.title}
                        </div>
                      ))}
                      {cellTasks.length > 2 && (
                        <span style={{ fontSize: '9px', color: 'var(--text-tertiary)', fontWeight: 600 }}>
                          +{cellTasks.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Selected Date Detail Drawer */}
          <Card style={{ padding: '1.25rem' }}>
            <div className="flex items-center justify-between mb-3 border-b border-subtle pb-3">
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                  Tasks Scheduled for {selectedDate}
                </h3>
                <span className="text-xs text-secondary">{selectedDateTasks.length} action items on this date</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                icon={Plus}
                onClick={() => handleOpenAddModalForDate(selectedDate)}
              >
                Add Task for Date
              </Button>
            </div>

            {selectedDateTasks.length === 0 ? (
              <div className="text-center py-6 text-xs text-tertiary">
                No tasks scheduled for {selectedDate}. Click "+ Add Task for Date" to schedule.
              </div>
            ) : (
              <div className="flex flex-col gap-2.5">
                {selectedDateTasks.map((t) => (
                  <div
                    key={t.id}
                    className="p-3 surface-secondary rounded-md border-subtle flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <button
                        type="button"
                        onClick={() => toggleTaskCompletion(t.id)}
                        className="text-secondary hover:text-primary cursor-pointer p-0 bg-transparent border-0"
                      >
                        {t.status === 'Completed' ? (
                          <CheckSquare size={18} className="text-success" />
                        ) : (
                          <Square size={18} />
                        )}
                      </button>
                      <div className="flex flex-col gap-0.5 min-w-0">
                        <span
                          className="font-bold text-xs text-primary truncate"
                          style={{ textDecoration: t.status === 'Completed' ? 'line-through' : 'none' }}
                        >
                          {t.title}
                        </span>
                        <div className="flex items-center gap-2 text-xs text-secondary flex-wrap">
                          {t.contact && <span>Contact: <strong>{t.contact}</strong></span>}
                          {t.reminder && <span>• At {t.reminder}</span>}
                          {t.assignedTo && <span>• Owner: {t.assignedTo}</span>}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Badge variant={t.priority === 'High' ? 'error' : t.priority === 'Medium' ? 'warning' : 'primary'}>
                        {t.priority}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={Trash2}
                        onClick={() => deleteTask(t.id)}
                        className="text-error"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      ) : (
        /* 5. LIST VIEW */
        <Card>
          <CardBody className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell isHeader>Status</TableCell>
                  <TableCell isHeader>Task Title</TableCell>
                  <TableCell isHeader>Due Date</TableCell>
                  <TableCell isHeader>Related Contact</TableCell>
                  <TableCell isHeader>Priority</TableCell>
                  <TableCell isHeader>Assigned To</TableCell>
                  <TableCell isHeader align="right">Actions</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTasks.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell>
                      <button
                        type="button"
                        onClick={() => toggleTaskCompletion(t.id)}
                        className="cursor-pointer bg-transparent border-0 p-0"
                      >
                        {t.status === 'Completed' ? (
                          <CheckSquare size={16} className="text-success" />
                        ) : (
                          <Square size={16} className="text-tertiary" />
                        )}
                      </button>
                    </TableCell>
                    <TableCell>
                      <span
                        className="font-bold text-xs text-primary"
                        style={{ textDecoration: t.status === 'Completed' ? 'line-through' : 'none' }}
                      >
                        {t.title}
                      </span>
                    </TableCell>
                    <TableCell><span className="text-xs font-mono text-secondary">{t.dueDate}</span></TableCell>
                    <TableCell><span className="text-xs text-secondary">{t.contact || '—'}</span></TableCell>
                    <TableCell>
                      <Badge variant={t.priority === 'High' ? 'error' : t.priority === 'Medium' ? 'warning' : 'primary'}>
                        {t.priority}
                      </Badge>
                    </TableCell>
                    <TableCell><span className="text-xs text-tertiary">{t.assignedTo || 'Alexander Wright'}</span></TableCell>
                    <TableCell align="right">
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={Trash2}
                        onClick={() => deleteTask(t.id)}
                        className="text-error"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      )}

      {/* 6. Modal: Create Task */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Schedule New CRM Task"
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
        <form onSubmit={handleCreateTask} className="flex flex-col gap-4">
          <Input
            label="Task Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Follow-up on debt term sheet with CFO"
            required
          />
          <Input
            label="Related Contact / Company"
            value={formData.contact}
            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
            placeholder="e.g. Dr. Aris Thorne (BioGenix Labs)"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Reminder Time"
              value={formData.reminder}
              onChange={(e) => setFormData({ ...formData, reminder: e.target.value })}
              placeholder="e.g. 10:30 AM"
            />
            <Input
              label="Assigned Owner"
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
