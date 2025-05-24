import React, { useState, useEffect } from 'react';
import { 
    Box, 
    Button, 
    Typography, 
    Stack, 
    Tabs, 
    Tab, 
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    IconButton,
    Paper,
    Grid
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CommonAppBar from '../components/CommonAppBar';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`training-tabpanel-${index}`}
            aria-labelledby={`training-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
};

interface Exercise {
    id: string;
    name: string;
    time: number;
    isRunning: boolean;
    initialTime: number;
    weight: string;
    sets: string;
    reps: string;
    notes: string;
}

interface TrainingPart {
    id: string;
    name: string;
    exercises: Exercise[];
}

const initialParts: TrainingPart[] = [];

const Timer: React.FC<{ exercise: Exercise; onUpdate: (updatedExercise: Exercise) => void }> = ({ exercise, onUpdate }) => {
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (exercise.isRunning && exercise.time > 0) {
            timer = setInterval(() => {
                onUpdate({
                    ...exercise,
                    time: exercise.time - 1
                });
            }, 1000);
        } else if (exercise.time === 0) {
            onUpdate({
                ...exercise,
                isRunning: false,
                time: exercise.initialTime
            });
        }
        return () => clearInterval(timer);
    }, [exercise.isRunning, exercise.time, exercise.initialTime]);

    const handleStart = () => {
        if (exercise.time > 0) {
            onUpdate({
                ...exercise,
                isRunning: true
            });
        }
    };

    const handleStop = () => {
        onUpdate({
            ...exercise,
            isRunning: false
        });
    };

    const handleReset = () => {
        onUpdate({
            ...exercise,
            isRunning: false,
            time: exercise.initialTime
        });
    };

    const handleClear = () => {
        onUpdate({
            ...exercise,
            isRunning: false,
            time: 0,
            initialTime: 0
        });
    };

    const handleAddTime = (seconds: number) => {
        const newTime = exercise.time + seconds;
        onUpdate({
            ...exercise,
            time: newTime,
            initialTime: newTime
        });
    };

    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            インターバルタイマー
            <Typography variant="h1" sx={{ mb: 4, fontSize: '4rem' }}>
                {formatTime(exercise.time)}
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
                <Button
                    variant="outlined"
                    onClick={() => handleAddTime(10)}
                    disabled={exercise.isRunning}
                >
                    +10秒
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => handleAddTime(30)}
                    disabled={exercise.isRunning}
                >
                    +30秒
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => handleAddTime(60)}
                    disabled={exercise.isRunning}
                >
                    +1分
                </Button>
            </Stack>
            <Stack direction="row" spacing={2}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleStart}
                    disabled={exercise.isRunning || exercise.time === 0}
                    size="large"
                >
                    スタート
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleStop}
                    disabled={!exercise.isRunning}
                    size="large"
                >
                    ストップ
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    onClick={handleReset}
                    size="large"
                >
                    リセット
                </Button>
                <Button
                    variant="contained"
                    color="warning"
                    onClick={handleClear}
                    size="large"
                >
                    クリア
                </Button>
            </Stack>
        </Box>
    );
};

const ExerciseForm: React.FC<{ 
    exercise: Exercise; 
    onUpdate: (updatedExercise: Exercise) => void;
    isEditing: boolean;
    onEditToggle: () => void;
}> = ({ exercise, onUpdate, isEditing, onEditToggle }) => {
    const [formData, setFormData] = useState({
        weight: exercise.weight,
        sets: exercise.sets,
        reps: exercise.reps,
        notes: exercise.notes
    });

    const handleChange = (field: keyof typeof formData) => (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData(prev => ({
            ...prev,
            [field]: event.target.value
        }));
    };

    const handleSave = () => {
        onUpdate({
            ...exercise,
            ...formData
        });
        onEditToggle();
    };

    if (!isEditing) {
        return (
            <Paper sx={{ p: 2, mb: 3 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                    <Typography variant="h6">トレーニング記録</Typography>
                    <IconButton onClick={onEditToggle}>
                        <EditIcon />
                    </IconButton>
                </Stack>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle2">重量</Typography>
                            <Typography>{exercise.weight || '-'}</Typography>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle2">セット数</Typography>
                            <Typography>{exercise.sets || '-'}</Typography>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle2">レップ数</Typography>
                            <Typography>{exercise.reps || '-'}</Typography>
                        </Box>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2">メモ</Typography>
                        <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                            {exercise.notes || '-'}
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        );
    }

    return (
        <Paper sx={{ p: 2, mb: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="h6">トレーニング記録の編集</Typography>
                <IconButton onClick={handleSave} color="primary">
                    <SaveIcon />
                </IconButton>
            </Stack>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box sx={{ flex: 1 }}>
                        <TextField
                            label="重量"
                            type="number"
                            value={formData.weight}
                            onChange={handleChange('weight')}
                            fullWidth
                            InputProps={{
                                endAdornment: <Typography></Typography>
                            }}
                        />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <TextField
                            label="セット数"
                            type="number"
                            value={formData.sets}
                            onChange={handleChange('sets')}
                            fullWidth
                            InputProps={{
                                endAdornment: <Typography></Typography>
                            }}
                        />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <TextField
                            label="レップ数"
                            type="number"
                            value={formData.reps}
                            onChange={handleChange('reps')}
                            fullWidth
                            InputProps={{
                                endAdornment: <Typography></Typography>
                            }}
                        />
                    </Box>
                </Box>
                <Box>
                    <TextField
                        label="メモ"
                        multiline
                        rows={4}
                        value={formData.notes}
                        onChange={handleChange('notes')}
                        fullWidth
                    />
                </Box>
            </Box>
        </Paper>
    );
};

const TrainingPage: React.FC = () => {
    const [mainTabValue, setMainTabValue] = useState(0);
    const [subTabValue, setSubTabValue] = useState(0);
    const [parts, setParts] = useState<TrainingPart[]>(initialParts);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isPartDialogOpen, setIsPartDialogOpen] = useState(false);
    const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);
    const [editingPart, setEditingPart] = useState<TrainingPart | null>(null);
    const [newExerciseName, setNewExerciseName] = useState('');
    const [newPartName, setNewPartName] = useState('');
    const [editingExerciseId, setEditingExerciseId] = useState<string | null>(null);

    const handleMainTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setMainTabValue(newValue);
        setSubTabValue(0);
    };

    const handleSubTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setSubTabValue(newValue);
    };

    const getCurrentPart = () => {
        return parts[mainTabValue];
    };

    const getCurrentExercises = () => {
        return getCurrentPart()?.exercises || [];
    };

    const handleAddPart = () => {
        setEditingPart(null);
        setNewPartName('');
        setIsPartDialogOpen(true);
    };

    const handleEditPart = (part: TrainingPart) => {
        setEditingPart(part);
        setNewPartName(part.name);
        setIsPartDialogOpen(true);
    };

    const handleDeletePart = (partId: string) => {
        setParts(prev => prev.filter(part => part.id !== partId));
        if (mainTabValue >= parts.length - 1) {
            setMainTabValue(Math.max(0, parts.length - 2));
        }
    };

    const handleSavePart = () => {
        if (!newPartName.trim()) return;

        if (editingPart) {
            // 編集
            setParts(prev => prev.map(part => 
                part.id === editingPart.id 
                    ? { ...part, name: newPartName }
                    : part
            ));
        } else {
            // 新規追加
            const newPart: TrainingPart = {
                id: `part-${Date.now()}`,
                name: newPartName,
                exercises: []
            };
            setParts(prev => [...prev, newPart]);
        }
        setIsPartDialogOpen(false);
    };

    const handleAddExercise = () => {
        setEditingExercise(null);
        setNewExerciseName('');
        setIsDialogOpen(true);
    };

    const handleEditExercise = (exercise: Exercise) => {
        setEditingExercise(exercise);
        setNewExerciseName(exercise.name);
        setIsDialogOpen(true);
    };

    const handleDeleteExercise = (exerciseId: string) => {
        const currentPart = getCurrentPart();
        setParts(prev => prev.map(part => 
            part.id === currentPart.id
                ? { ...part, exercises: part.exercises.filter(ex => ex.id !== exerciseId) }
                : part
        ));
        setSubTabValue(0);
    };

    const handleSaveExercise = () => {
        if (!newExerciseName.trim()) return;

        const currentPart = getCurrentPart();
        if (editingExercise) {
            // 編集
            setParts(prev => prev.map(part => 
                part.id === currentPart.id
                    ? {
                        ...part,
                        exercises: part.exercises.map(ex => 
                            ex.id === editingExercise.id 
                                ? { ...ex, name: newExerciseName }
                                : ex
                        )
                    }
                    : part
            ));
        } else {
            // 新規追加
            const newExercise: Exercise = {
                id: `${currentPart.id}-${Date.now()}`,
                name: newExerciseName,
                time: 0,
                isRunning: false,
                initialTime: 0,
                weight: '',
                sets: '',
                reps: '',
                notes: ''
            };
            setParts(prev => prev.map(part => 
                part.id === currentPart.id
                    ? { ...part, exercises: [...part.exercises, newExercise] }
                    : part
            ));
        }
        setIsDialogOpen(false);
    };

    const handleExerciseUpdate = (updatedExercise: Exercise) => {
        const currentPart = getCurrentPart();
        setParts(prev => prev.map(part => 
            part.id === currentPart.id
                ? {
                    ...part,
                    exercises: part.exercises.map(ex => 
                        ex.id === updatedExercise.id ? updatedExercise : ex
                    )
                }
                : part
        ));
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <CommonAppBar />
            <Box sx={{ mt: 8, width: '100%' }}>
                <Box sx={{ 
                    borderBottom: 1, 
                    borderColor: 'divider',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Tabs 
                            value={mainTabValue} 
                            onChange={handleMainTabChange} 
                            variant="scrollable"
                            scrollButtons="auto"
                            aria-label="training tabs"
                            sx={{
                                '& .MuiTabs-flexContainer': {
                                    justifyContent: 'center'
                                }
                            }}
                        >
                            {parts.map((part) => (
                                <Tab 
                                    key={part.id} 
                                    label={
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            {part.name}
                                            <IconButton
                                                size="small"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleEditPart(part);
                                                }}
                                                sx={{ ml: 1 }}
                                            >
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeletePart(part.id);
                                                }}
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    }
                                />
                            ))}
                        </Tabs>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={handleAddPart}
                            size="small"
                            sx={{ 
                                whiteSpace: 'nowrap',
                                minWidth: '120px'
                            }}
                        >
                            トレーニング部位を追加
                        </Button>
                    </Stack>
                </Box>

                {parts.map((part, index) => (
                    <TabPanel key={part.id} value={mainTabValue} index={index}>
                        <Box sx={{ mb: 3 }}>
                            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                                <Button
                                    variant="contained"
                                    startIcon={<AddIcon />}
                                    onClick={handleAddExercise}
                                >
                                    種目を追加
                                </Button>
                            </Stack>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs
                                    value={subTabValue}
                                    onChange={handleSubTabChange}
                                    variant="scrollable"
                                    scrollButtons="auto"
                                    aria-label={`${part.name} exercises`}
                                    sx={{
                                        '& .MuiTabs-flexContainer': {
                                            justifyContent: 'center'
                                        }
                                    }}
                                >
                                    {part.exercises.map((exercise) => (
                                        <Tab 
                                            key={exercise.id} 
                                            label={
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    {exercise.name}
                                                    <IconButton
                                                        size="small"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleEditExercise(exercise);
                                                        }}
                                                        sx={{ ml: 1 }}
                                                    >
                                                        <EditIcon fontSize="small" />
                                                    </IconButton>
                                                    <IconButton
                                                        size="small"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDeleteExercise(exercise.id);
                                                        }}
                                                    >
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
                                                </Box>
                                            }
                                        />
                                    ))}
                                </Tabs>
                            </Box>
                        </Box>
                        {part.exercises.length > 0 && (
                            <Box sx={{ pt: 3 }}>
                                <Typography variant="h5" sx={{ mb: 2 }}>
                                    {part.exercises[subTabValue]?.name}
                                </Typography>
                                <ExerciseForm
                                    exercise={part.exercises[subTabValue]}
                                    onUpdate={handleExerciseUpdate}
                                    isEditing={editingExerciseId === part.exercises[subTabValue].id}
                                    onEditToggle={() => setEditingExerciseId(
                                        editingExerciseId === part.exercises[subTabValue].id
                                            ? null
                                            : part.exercises[subTabValue].id
                                    )}
                                />
                                <Timer 
                                    exercise={part.exercises[subTabValue]} 
                                    onUpdate={handleExerciseUpdate}
                                />
                            </Box>
                        )}
                    </TabPanel>
                ))}
            </Box>

            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                <DialogTitle>
                    {editingExercise ? '種目を編集' : '種目を追加'}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="種目名（例：ベンチプレス）"
                        fullWidth
                        value={newExerciseName}
                        onChange={(e) => setNewExerciseName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsDialogOpen(false)}>キャンセル</Button>
                    <Button onClick={handleSaveExercise} variant="contained">
                        保存
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={isPartDialogOpen} onClose={() => setIsPartDialogOpen(false)}>
                <DialogTitle>
                    {editingPart ? '部位を編集' : '部位を追加'}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="部位名（例：胸）"
                        fullWidth
                        value={newPartName}
                        onChange={(e) => setNewPartName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsPartDialogOpen(false)}>キャンセル</Button>
                    <Button onClick={handleSavePart} variant="contained">
                        保存
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default TrainingPage;
