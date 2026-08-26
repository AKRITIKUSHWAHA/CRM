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
  AlertCircle
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

export const CrmTasks = () => {
  const { tasks, addTask, toggleTaskCompletion, deleteTask } = useCrm();
  const { addToast } = useToast();

  const [viewMode, setViewMode] = useState('list'); // 'list' | 'calendar'
  const [filterPriority, setFilterPriority] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    contact: '',
    priority: 'Medium',
    dueDate: '2026-03-05',
    reminder: '9:00 AM',
    assignedTo: 'Alexander Wright',
  });

  const filteredTasks = tasks.filter(
    (t) => filterPriority === 'all' || t.priority === filterPriority
  );

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!formData.title) {
      addToast({ title: 'Validation Error', message: 'Task title is required.', type: 'error' });
      return;
    }
    addTask(formData);
    addToast({ title: 'Task Created', message: `Added task: ${formData.title}`, type: 'success' });
    setIsAddModalOpen(false);
    setFormData({ title: '', contact: '', priority: 'Medium', dueDate: '2026-03-05', reminder: '9:00 AM', assignedTo: 'Alexander Wright' });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="page-header-row">
        <div>
          <Breadcrumb items={[{ label: 'CRM nErgy' }, { label: 'Tasks & Reminders' }]} />
          <h1 style={{ fontSize: 'var(--text-2xl)' }}>Tasks & Reminders</h1>
          <p className="text-xs text-secondary margin-0">
            Schedule follow-up meetings, proposals, and customer reminders
          </p>
        </div>

        <div className="header-actions-right">
          {/* View Switcher Buttons */}
          <div className="flex items-center border-subtle surface-secondary rounded-sm p-1 gap-1">
            <Button
              variant={viewMode === 'list' ? 'primary' : 'ghost'}
              size="sm"
              icon={List}
              onClick={() => setViewMode('list')}
            >
              List View
            </Button>
            <Button
              variant={viewMode === 'calendar' ? 'primary' : 'ghost'}
              size="sm"
              icon={Calendar}
              onClick={() => setViewMode('calendar')}
            >
              Calendar View
            </Button>
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

      {/* Filter Bar */}
      <Card className="p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-tertiary">Filter Priority:</span>
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
          />
        </div>

        <span className="text-xs text-secondary font-semibold">
          {tasks.filter((t) => t.status === 'Pending').length} Pending Tasks
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
                  className="p-3 surface-secondary rounded-md border-subtle flex items-center justify-between gap-3 hover:border-strong transition-all"
                  style={{ opacity: isCompleted ? 0.65 : 1 }}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <button
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
                        Contact: {task.contact} | Assigned: {task.assignedTo}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-xs text-tertiary">
                      <Clock size={14} />
                      <span>{task.dueDate} ({task.reminder})</span>
                    </div>

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
              );
            })
          )}
        </Card>
      )}

      {/* CALENDAR VIEW */}
      {viewMode === 'calendar' && (
        <Card className="p-6">
          <CardHeader title="February - March 2026 Calendar Grid" subtitle="Interactive scheduled task dates" />
          <CardBody>
            <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold mb-2">
              <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 28 }, (_, i) => {
                const dayNum = i + 1;
                const hasTask = dayNum % 5 === 0 || dayNum === 28;
                return (
                  <div
                    key={i}
                    className="p-3 surface-secondary rounded-sm border-subtle min-h-20 flex flex-col justify-between text-left"
                    style={{ backgroundColor: hasTask ? 'var(--primary-light)' : 'var(--surface)' }}
                  >
                    <span className="font-bold text-xs">{dayNum}</span>
                    {hasTask && (
                      <Badge variant="primary" className="mt-1" style={{ fontSize: '10px' }}>
                        1 Task Due
                      </Badge>
                    )}
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>
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
              options={['High', 'Medium', 'Low']}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};
