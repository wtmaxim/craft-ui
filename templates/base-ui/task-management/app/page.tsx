"use client"

import React, { useState } from 'react'
import {
    DndContext,
    DragOverlay,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragStartEvent,
    DragOverEvent,
    DragEndEvent,
    defaultDropAnimationSideEffects,
} from '@dnd-kit/core'
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
    HugeiconsIcon,
} from "@hugeicons/react"
import {
    LayoutIcon,
    Calendar03Icon,
    Add01Icon,
    CheckListIcon,
    Clock01Icon,
    PlayIcon,
    Note01Icon,
    ArchiveIcon,
    Moon02Icon,
    Sun01Icon,
    SearchIcon,
    LinkIcon
} from "@hugeicons/core-free-icons"
import { useTheme } from "next-themes"
import { toast } from "sonner"
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

// Types
export type Priority = 'Low' | 'Medium' | 'High'

export interface Task {
    id: string
    title: string
    columnId: string
    priority: Priority
    labels: string[]
    dueDate: string
}

export interface Column {
    id: string
    title: string
}

// Initial Data
const initialColumns: Column[] = [
    { id: 'pending', title: 'Pending' },
    { id: 'reviewing', title: 'Reviewing' },
    { id: 'planned', title: 'Planned' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'completed', title: 'Completed' },
    { id: 'closed', title: 'Closed' },
]

const initialTasks: Task[] = [
    {
        id: 'task-1',
        title: 'Design new landing page HERO section',
        columnId: 'pending',
        priority: 'High',
        labels: ['Design', 'UI'],
        dueDate: '2024-01-05',
    },
    {
        id: 'task-2',
        title: 'Implement authentication flow',
        columnId: 'in-progress',
        priority: 'High',
        labels: ['Backend', 'Security'],
        dueDate: '2024-01-02',
    },
    {
        id: 'task-3',
        title: 'Refactor sidebar components',
        columnId: 'reviewing',
        priority: 'Medium',
        labels: ['Refactor'],
        dueDate: '2024-01-10',
    },
    {
        id: 'task-4',
        title: 'Set up project CI/CD',
        columnId: 'planned',
        priority: 'Low',
        labels: ['DevOps'],
        dueDate: '2024-01-15',
    },
    {
        id: 'task-5',
        title: 'Review user authentication implementation',
        columnId: 'reviewing',
        priority: 'High',
        labels: ['Review', 'Security'],
        dueDate: '2024-01-12',
    },
    {
        id: 'task-6',
        title: 'Code review for payment integration',
        columnId: 'reviewing',
        priority: 'High',
        labels: ['Review', 'Payment'],
        dueDate: '2024-01-11',
    },
    {
        id: 'task-7',
        title: 'Review API documentation updates',
        columnId: 'reviewing',
        priority: 'Medium',
        labels: ['Review', 'Documentation'],
        dueDate: '2024-01-13',
    },
    {
        id: 'task-8',
        title: 'Review database migration scripts',
        columnId: 'reviewing',
        priority: 'High',
        labels: ['Review', 'Database'],
        dueDate: '2024-01-14',
    },
    {
        id: 'task-9',
        title: 'Review frontend component refactoring',
        columnId: 'reviewing',
        priority: 'Medium',
        labels: ['Review', 'Frontend'],
        dueDate: '2024-01-15',
    },
    {
        id: 'task-10',
        title: 'Review test coverage improvements',
        columnId: 'reviewing',
        priority: 'Medium',
        labels: ['Review', 'Testing'],
        dueDate: '2024-01-16',
    },
    {
        id: 'task-11',
        title: 'Review performance optimization changes',
        columnId: 'reviewing',
        priority: 'High',
        labels: ['Review', 'Performance'],
        dueDate: '2024-01-17',
    },
    {
        id: 'task-12',
        title: 'Review accessibility improvements',
        columnId: 'reviewing',
        priority: 'Medium',
        labels: ['Review', 'Accessibility'],
        dueDate: '2024-01-18',
    },
    {
        id: 'task-13',
        title: 'Review error handling implementation',
        columnId: 'reviewing',
        priority: 'High',
        labels: ['Review', 'Backend'],
        dueDate: '2024-01-19',
    },
    {
        id: 'task-14',
        title: 'Review mobile responsive design updates',
        columnId: 'reviewing',
        priority: 'Medium',
        labels: ['Review', 'Mobile', 'UI'],
        dueDate: '2024-01-20',
    },
]

// Components
function KanbanTaskCard({ task, isOverlay }: { task: Task; isOverlay?: boolean }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task.id,
        data: {
            type: 'Task',
            task,
        },
    })

    const style = {
        transition,
        transform: CSS.Translate.toString(transform),
    }

    if (isDragging && !isOverlay) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="bg-card/50 border border-border rounded-lg p-4 h-[120px] opacity-30"
            />
        )
    }

    const priorityColors = {
        Low: 'bg-blue-500/10 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 dark:border-blue-500/20',
        Medium: 'bg-yellow-500/10 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20 dark:border-yellow-500/20',
        High: 'bg-red-500/10 dark:bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20 dark:border-red-500/20',
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={cn(
                "group relative bg-card border border-border rounded-xl p-4 cursor-grab active:cursor-grabbing hover:border-border/80 transition-all duration-200 shadow-sm",
                isOverlay && "cursor-grabbing shadow-2xl scale-[1.02] border-border bg-muted"
            )}
        >
            <div className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-medium text-card-foreground leading-snug line-clamp-2">
                        {task.title}
                    </h3>
                </div>

                <div className="flex flex-wrap gap-1.5">
                    {task.labels.map((label) => (
                        <span
                            key={label}
                            className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-muted text-muted-foreground uppercase tracking-wider"
                        >
                            {label}
                        </span>
                    ))}
                </div>

                <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-3">
                        <Badge variant="outline" className={cn("text-[10px] h-5 px-1.5 font-semibold uppercase tracking-tight", priorityColors[task.priority])}>
                            {task.priority}
                        </Badge>
                        <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                            <HugeiconsIcon icon={Calendar03Icon} className="size-3" />
                            <span>{new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function KanbanColumn({ column, tasks, onAddTask }: { column: Column; tasks: Task[]; onAddTask: (colId: string) => void }) {
    const {
        setNodeRef,
    } = useSortable({
        id: column.id,
        data: {
            type: 'Column',
            column,
        },
    })

    const taskIds = tasks.map((t) => t.id)

    const getColumnIcon = (id: string) => {
        switch (id) {
            case 'pending': return <HugeiconsIcon icon={Clock01Icon} className="size-4 text-muted-foreground" />
            case 'reviewing': return <HugeiconsIcon icon={Note01Icon} className="size-4 text-orange-500 dark:text-orange-400" />
            case 'planned': return <HugeiconsIcon icon={Calendar03Icon} className="size-4 text-blue-500 dark:text-blue-400" />
            case 'in-progress': return <HugeiconsIcon icon={PlayIcon} className="size-4 text-yellow-500 dark:text-yellow-400" />
            case 'completed': return <HugeiconsIcon icon={CheckListIcon} className="size-4 text-green-500 dark:text-green-400" />
            case 'closed': return <HugeiconsIcon icon={ArchiveIcon} className="size-4 text-muted-foreground" />
            default: return null
        }
    }

    return (
        <div
            ref={setNodeRef}
            className="flex flex-col w-[300px] shrink-0 bg-card/50 border border-border rounded-2xl p-3 h-full min-h-0"
        >
            <div className="flex items-center justify-between mb-4 px-1 shrink-0">
                <div className="flex items-center gap-2.5">
                    <div className="flex items-center justify-center size-7 rounded-lg bg-muted border border-border">
                        {getColumnIcon(column.id)}
                    </div>
                    <div>
                        <h2 className="text-sm font-semibold text-card-foreground flex items-center gap-2">
                            {column.title}
                            <span className="text-[11px] font-medium text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full min-w-[1.2rem] text-center">
                                {tasks.length}
                            </span>
                        </h2>
                    </div>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 text-muted-foreground hover:text-foreground"
                    onClick={() => onAddTask(column.id)}
                >
                    <HugeiconsIcon icon={Add01Icon} className="size-4" />
                </Button>
            </div>

            <div className="flex flex-col gap-3 overflow-y-auto overflow-x-hidden flex-1 min-h-0 pb-4 pr-1">
                <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
                    {tasks.map((task) => (
                        <KanbanTaskCard key={task.id} task={task} />
                    ))}
                </SortableContext>
            </div>
        </div>
    )
}

function TasksPageContent() {
    const [tasks, setTasks] = useState<Task[]>(initialTasks)
    const [columns, setColumns] = useState<Column[]>(initialColumns)
    const [activeTask, setActiveTask] = useState<Task | null>(null)
    const [isAddTaskOpen, setIsAddTaskOpen] = useState(false)
    const [initialColumnId, setInitialColumnId] = useState<string>('pending')
    const { toggle } = useSidebar()
    
    // Filter states
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedPriority, setSelectedPriority] = useState<string>('all')
    const [selectedStatus, setSelectedStatus] = useState<string>('all')

    const handleShare = async () => {
        try {
            const url = window.location.href
            await navigator.clipboard.writeText(url)
            toast("URL copiée dans le presse-papier", {
                description: "L'URL de la page a été copiée avec succès",
            })
        } catch (err) {
            console.error('Failed to copy URL:', err)
            toast("Erreur lors de la copie", {
                description: "Impossible de copier l'URL dans le presse-papier",
            })
        }
    }

    const handleAddTask = (newTaskData: { title: string; description: string; priority: Priority; labels: string[]; columnId: string }) => {
        const newTask: Task = {
            id: Math.random().toString(36).substring(7),
            title: newTaskData.title,
            columnId: newTaskData.columnId,
            priority: newTaskData.priority,
            labels: newTaskData.labels,
            dueDate: new Date().toISOString(),
        }
        setTasks((prev) => [newTask, ...prev])
        setIsAddTaskOpen(false)
    }

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    const onDragStart = (event: DragStartEvent) => {
        if (event.active.data.current?.type === 'Task') {
            setActiveTask(event.active.data.current.task)
        }
    }

    const onDragOver = (event: DragOverEvent) => {
        const { active, over } = event
        if (!over) return

        const activeId = active.id
        const overId = over.id

        if (activeId === overId) return

        const isActiveTask = active.data.current?.type === 'Task'
        const isOverTask = over.data.current?.type === 'Task'
        const isOverColumn = over.data.current?.type === 'Column'

        if (!isActiveTask) return

        if (isActiveTask && isOverTask) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id === activeId)
                const overIndex = tasks.findIndex((t) => t.id === overId)

                if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
                    const updatedTasks = [...tasks]
                    updatedTasks[activeIndex] = { ...updatedTasks[activeIndex], columnId: tasks[overIndex].columnId }
                    return arrayMove(updatedTasks, activeIndex, overIndex)
                }

                return arrayMove(tasks, activeIndex, overIndex)
            })
        }

        if (isActiveTask && isOverColumn) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id === activeId)
                const updatedTasks = [...tasks]
                updatedTasks[activeIndex] = { ...updatedTasks[activeIndex], columnId: overId as string }
                return arrayMove(updatedTasks, activeIndex, activeIndex)
            })
        }
    }

    const { theme, setTheme } = useTheme()

    // Filter tasks based on search, priority, and status
    const filteredTasks = tasks.filter((task) => {
        // Search filter
        if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) {
            return false
        }
        
        // Priority filter
        if (selectedPriority !== 'all' && task.priority !== selectedPriority) {
            return false
        }
        
        // Status filter
        if (selectedStatus !== 'all' && task.columnId !== selectedStatus) {
            return false
        }
        
        return true
    })

    const clearFilters = () => {
        setSearchQuery('')
        setSelectedPriority('all')
        setSelectedStatus('all')
    }

    const hasActiveFilters = searchQuery || selectedPriority !== 'all' || selectedStatus !== 'all'

    const onDragEnd = (event: DragEndEvent) => {
        setActiveTask(null)
        const { active, over } = event
        if (!over) return

        const activeId = active.id
        const overId = over.id

        if (activeId === overId) return

        const isActiveColumn = active.data.current?.type === 'Column'
        if (!isActiveColumn) return

        setColumns((columns) => {
            const activeColumnIndex = columns.findIndex((col) => col.id === activeId)
            const overColumnIndex = columns.findIndex((col) => col.id === overId)

            return arrayMove(columns, activeColumnIndex, overColumnIndex)
        })
    }

    return (
        <div className="flex h-screen w-full overflow-hidden bg-background">
            <AppSidebar />
            <div className="flex flex-col flex-1 min-w-0 bg-background">
                {/* Top Bar - Dashboard Style with Title */}
                <div className="flex items-center justify-between h-14 border-b border-border px-4">
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted"
                            onClick={toggle}
                        >
                            <HugeiconsIcon icon={LayoutIcon} className="size-4" />
                            <span className="sr-only">Toggle Sidebar</span>
                        </Button>
                        <div className="h-4 w-[1px] bg-border" />
                        <h1 className="text-sm font-semibold text-foreground">Tasks</h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-8 text-xs gap-2"
                        >
                            <svg className="size-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                            GitHub
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted"
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        >
                            <HugeiconsIcon icon={theme === "dark" ? Sun01Icon : Moon02Icon} className="size-4" />
                            <span className="sr-only">Toggle Theme</span>
                        </Button>
                        <span className="text-xs text-muted-foreground">Last update 3 days ago</span>
                        <div className="flex items-center -space-x-2">
                            <Avatar size="sm" className="border-2 border-background ring-2 ring-background">
                                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" alt="User 1" />
                                <AvatarFallback className="bg-muted text-muted-foreground text-[10px]">JD</AvatarFallback>
                            </Avatar>
                            <Avatar size="sm" className="border-2 border-background ring-2 ring-background">
                                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" alt="User 2" />
                                <AvatarFallback className="bg-muted text-muted-foreground text-[10px]">SM</AvatarFallback>
                            </Avatar>
                            <Avatar size="sm" className="border-2 border-background ring-2 ring-background">
                                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="User 3" />
                                <AvatarFallback className="bg-muted text-muted-foreground text-[10px]">AL</AvatarFallback>
                            </Avatar>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-8 text-xs gap-2"
                            onClick={handleShare}
                        >
                            <HugeiconsIcon icon={LinkIcon} className="size-4" />
                            Share
                        </Button>
                    </div>
                </div>

                {/* Filters Bar */}
                <div className="border-b border-border bg-card/30 px-4 py-3">
                    <div className="flex items-center gap-4 flex-wrap">
                        {/* Search Bar */}
                        <div className="flex-1 min-w-[200px] max-w-md">
                            <div className="relative">
                                <HugeiconsIcon icon={SearchIcon} className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search tasks..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-9 h-9"
                                />
                            </div>
                        </div>

                        {/* Priority Filter */}
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-muted-foreground">Priority:</span>
                            <Select value={selectedPriority} onValueChange={(value) => value && setSelectedPriority(value)}>
                                <SelectTrigger className="h-9 w-[140px] text-xs">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Priorities</SelectItem>
                                    <SelectItem value="High">High</SelectItem>
                                    <SelectItem value="Medium">Medium</SelectItem>
                                    <SelectItem value="Low">Low</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Status Filter */}
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-muted-foreground">Status:</span>
                            <Select value={selectedStatus} onValueChange={(value) => value && setSelectedStatus(value)}>
                                <SelectTrigger className="h-9 w-[160px] text-xs">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Statuses</SelectItem>
                                    {columns.map((column) => (
                                        <SelectItem key={column.id} value={column.id}>
                                            {column.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-1.5 ml-auto">
                            {hasActiveFilters && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={clearFilters}
                                    className="h-7 px-2.5 text-xs text-muted-foreground hover:text-foreground"
                                >
                                    Clear
                                </Button>
                            )}
                            <Button
                                size="sm"
                                className="h-7 text-xs bg-primary text-primary-foreground hover:bg-primary/90 px-3"
                                onClick={() => {
                                    setInitialColumnId('pending')
                                    setIsAddTaskOpen(true)
                                }}
                            >
                                <HugeiconsIcon icon={Add01Icon} className="size-3.5 mr-1.5" />
                                New Task
                            </Button>
                        </div>
                    </div>
                </div>

                <main className="flex-1 overflow-x-auto px-8 pt-8 pb-8 scrollbar-hide min-h-0">
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCorners}
                        onDragStart={onDragStart}
                        onDragOver={onDragOver}
                        onDragEnd={onDragEnd}
                    >
                        <div className="flex gap-6 h-full min-w-max pb-4 items-start">
                            <SortableContext items={columns.map((c) => c.id)} strategy={verticalListSortingStrategy}>
                                {columns.map((column) => (
                                    <KanbanColumn
                                        key={column.id}
                                        column={column}
                                        tasks={filteredTasks.filter((t) => t.columnId === column.id)}
                                        onAddTask={(colId) => {
                                            setInitialColumnId(colId)
                                            setIsAddTaskOpen(true)
                                        }}
                                    />
                                ))}
                            </SortableContext>
                        </div>

                        <DragOverlay dropAnimation={{
                            sideEffects: defaultDropAnimationSideEffects({
                                styles: {
                                    active: {
                                        opacity: '0.5',
                                    },
                                },
                            }),
                        }}>
                            {activeTask ? (
                                <KanbanTaskCard task={activeTask} isOverlay />
                            ) : null}
                        </DragOverlay>
                    </DndContext>
                </main>

                <AddTaskDialog
                    open={isAddTaskOpen}
                    onOpenChange={setIsAddTaskOpen}
                    onSubmit={handleAddTask}
                    initialColumnId={initialColumnId}
                    columns={columns}
                />
            </div>
        </div>
    )
}

function AddTaskDialog({
    open,
    onOpenChange,
    onSubmit,
    initialColumnId,
    columns
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: { title: string; description: string; priority: Priority; labels: string[]; columnId: string }) => void;
    initialColumnId: string;
    columns: Column[];
}) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [priority, setPriority] = useState<Priority>('Medium')
    const [labels, setLabels] = useState('')
    const [columnId, setColumnId] = useState(initialColumnId)

    // Update internal state when initialColumnId changes
    React.useEffect(() => {
        setColumnId(initialColumnId)
    }, [initialColumnId])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit({
            title,
            description,
            priority,
            labels: labels.split(',').map(l => l.trim()).filter(l => l !== ''),
            columnId
        })
        // Reset form
        setTitle('')
        setDescription('')
        setPriority('Medium')
        setLabels('')
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold tracking-tight">Add New Task</DialogTitle>
                    <DialogDescription>
                        Create a new task for your team. Fill in the details below.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                    <div className="space-y-2">
                        <Label htmlFor="title" className="font-medium">Title</Label>
                        <Input
                            id="title"
                            placeholder="Enter task title..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description" className="font-medium">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Add a detailed description..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="min-h-[100px]"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="priority" className="font-medium">Priority</Label>
                            <Select value={priority} onValueChange={(val) => setPriority(val as Priority)}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Low">Low</SelectItem>
                                    <SelectItem value="Medium">Medium</SelectItem>
                                    <SelectItem value="High">High</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="column" className="font-medium">Status</Label>
                            <Select value={columnId} onValueChange={(val) => val && setColumnId(val)}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {columns.map(col => (
                                        <SelectItem key={col.id} value={col.id}>{col.title}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="labels" className="font-medium">Labels (comma separated)</Label>
                        <Input
                            id="labels"
                            placeholder="DESIGN, UI, BACKEND..."
                            value={labels}
                            onChange={(e) => setLabels(e.target.value)}
                        />
                    </div>
                    <DialogFooter className="pt-4">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" className="font-semibold">
                            Create Task
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default function TasksPage() {
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <SidebarProvider>
            <TasksPageContent />
        </SidebarProvider>
    )
}
