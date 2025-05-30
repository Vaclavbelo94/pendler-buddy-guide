
import { useState, useCallback, useMemo } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useOptimizedNetworkStatus } from '@/hooks/useOptimizedNetworkStatus';
import { useRefactoredShiftsManagement } from '@/hooks/shifts/useRefactoredShiftsManagement';
import { Shift } from '@/hooks/shifts/useShiftsCRUD';

export const useShiftsContainer = () => {
  const { user } = useAuth();
  const { isOnline, isSlowConnection } = useOptimizedNetworkStatus();
  const [isInitialized, setIsInitialized] = useState(true);
  const [activeSection, setActiveSection] = useState('calendar');
  const [isChanging, setIsChanging] = useState(false);
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [editingShift, setEditingShift] = useState<Shift | null>(null);

  const {
    shifts,
    isLoading,
    isSaving,
    error,
    addShift: addShiftOriginal,
    updateShift: updateShiftOriginal,
    deleteShift,
    refreshShifts
  } = useRefactoredShiftsManagement(user?.id);

  const handleSectionChange = useCallback((section: string) => {
    setIsChanging(true);
    setActiveSection(section);
    setTimeout(() => setIsChanging(false), 150);
  }, []);

  const handleAddShift = useCallback(async (shiftData: Omit<Shift, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<void> => {
    const result = await addShiftOriginal(shiftData);
    if (result) {
      setIsAddSheetOpen(false);
    }
  }, [addShiftOriginal]);

  const handleEditShift = useCallback(async (shiftData: Shift): Promise<void> => {
    const result = await updateShiftOriginal(shiftData);
    if (result) {
      setIsEditSheetOpen(false);
      setEditingShift(null);
    }
  }, [updateShiftOriginal]);

  const openEditDialog = useCallback((shift: Shift) => {
    setEditingShift(shift);
    setIsEditSheetOpen(true);
  }, []);

  const handleRetry = useCallback(async () => {
    await refreshShifts();
  }, [refreshShifts]);

  const handleOpenAddSheet = useCallback(() => {
    setIsAddSheetOpen(true);
  }, []);

  return {
    user,
    isInitialized,
    isOnline,
    isSlowConnection,
    activeSection,
    isAddSheetOpen,
    setIsAddSheetOpen,
    isEditSheetOpen,
    setIsEditSheetOpen,
    editingShift,
    setEditingShift,
    shifts,
    isLoading,
    error,
    isSaving,
    isChanging,
    handleSectionChange,
    handleAddShift,
    handleEditShift,
    openEditDialog,
    handleRetry,
    handleOpenAddSheet,
    deleteShift
  };
};
