import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';

import useBulkSelection from '../useBulkSelection';

describe('useBulkSelection', () => {
  const allItems = [1, 2, 3, 4, 5];
  const mockOnBulkDelete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initializes with empty selection', () => {
    const { result } = renderHook(() =>
      useBulkSelection({ allItems, onBulkDelete: mockOnBulkDelete })
    );

    expect(result.current.selectedIDs.size).toBe(0);
    expect(result.current.isSelectionMode).toBe(false);
  });

  it('toggles selection mode', () => {
    const { result } = renderHook(() =>
      useBulkSelection({ allItems, onBulkDelete: mockOnBulkDelete })
    );

    expect(result.current.isSelectionMode).toBe(false);

    act(() => {
      result.current.toggleSelectionMode();
    });

    expect(result.current.isSelectionMode).toBe(true);

    act(() => {
      result.current.toggleSelectionMode();
    });

    expect(result.current.isSelectionMode).toBe(false);
  });

  it('toggles individual selection', () => {
    const { result } = renderHook(() =>
      useBulkSelection({ allItems, onBulkDelete: mockOnBulkDelete })
    );

    act(() => {
      result.current.toggleSelection(1);
    });

    expect(result.current.selectedIDs.has(1)).toBe(true);
    expect(result.current.selectedIDs.size).toBe(1);

    act(() => {
      result.current.toggleSelection(1);
    });

    expect(result.current.selectedIDs.has(1)).toBe(false);
    expect(result.current.selectedIDs.size).toBe(0);
  });

  it('toggles multiple selections', () => {
    const { result } = renderHook(() =>
      useBulkSelection({ allItems, onBulkDelete: mockOnBulkDelete })
    );

    act(() => {
      result.current.toggleSelection(1);
      result.current.toggleSelection(2);
      result.current.toggleSelection(3);
    });

    expect(result.current.selectedIDs.size).toBe(3);
    expect(result.current.selectedIDs.has(1)).toBe(true);
    expect(result.current.selectedIDs.has(2)).toBe(true);
    expect(result.current.selectedIDs.has(3)).toBe(true);
  });

  it('toggles select all from empty selection', () => {
    const { result } = renderHook(() =>
      useBulkSelection({ allItems, onBulkDelete: mockOnBulkDelete })
    );

    act(() => {
      result.current.toggleSelectAll();
    });

    expect(result.current.selectedIDs.size).toBe(allItems.length);
    allItems.forEach((id) => {
      expect(result.current.selectedIDs.has(id)).toBe(true);
    });
  });

  it('toggles select all to deselect all', () => {
    const { result } = renderHook(() =>
      useBulkSelection({ allItems, onBulkDelete: mockOnBulkDelete })
    );

    act(() => {
      result.current.toggleSelectAll();
    });

    expect(result.current.selectedIDs.size).toBe(allItems.length);

    act(() => {
      result.current.toggleSelectAll();
    });

    expect(result.current.selectedIDs.size).toBe(0);
  });

  it('clears selection', () => {
    const { result } = renderHook(() =>
      useBulkSelection({ allItems, onBulkDelete: mockOnBulkDelete })
    );

    act(() => {
      result.current.toggleSelection(1);
      result.current.toggleSelection(2);
    });

    expect(result.current.selectedIDs.size).toBe(2);

    act(() => {
      result.current.clearSelection();
    });

    expect(result.current.selectedIDs.size).toBe(0);
  });

  it('clears selection when toggling selection mode', () => {
    const { result } = renderHook(() =>
      useBulkSelection({ allItems, onBulkDelete: mockOnBulkDelete })
    );

    act(() => {
      result.current.toggleSelection(1);
      result.current.toggleSelection(2);
    });

    expect(result.current.selectedIDs.size).toBe(2);

    act(() => {
      result.current.toggleSelectionMode();
    });

    expect(result.current.selectedIDs.size).toBe(0);
  });

  it('handles bulk delete with confirmation', () => {
    const mockConfirm = vi.fn(() => true);
    global.confirm = mockConfirm;

    const { result } = renderHook(() =>
      useBulkSelection({ allItems, onBulkDelete: mockOnBulkDelete })
    );

    act(() => {
      result.current.toggleSelectionMode();
      result.current.toggleSelection(1);
      result.current.toggleSelection(2);
    });

    act(() => {
      result.current.handleBulkDelete();
    });

    expect(mockConfirm).toHaveBeenCalled();
    expect(mockOnBulkDelete).toHaveBeenCalledWith([1, 2]);
    expect(result.current.selectedIDs.size).toBe(0);
    expect(result.current.isSelectionMode).toBe(false);
  });

  it('cancels bulk delete when user cancels confirmation', () => {
    const mockConfirm = vi.fn(() => false);
    global.confirm = mockConfirm;

    const { result } = renderHook(() =>
      useBulkSelection({ allItems, onBulkDelete: mockOnBulkDelete })
    );

    act(() => {
      result.current.toggleSelection(1);
      result.current.toggleSelection(2);
    });

    act(() => {
      result.current.handleBulkDelete();
    });

    expect(mockConfirm).toHaveBeenCalled();
    expect(mockOnBulkDelete).not.toHaveBeenCalled();
    expect(result.current.selectedIDs.size).toBe(2);
  });

  it('does not call onBulkDelete when no items selected', () => {
    const { result } = renderHook(() =>
      useBulkSelection({ allItems, onBulkDelete: mockOnBulkDelete })
    );

    act(() => {
      result.current.handleBulkDelete();
    });

    expect(mockOnBulkDelete).not.toHaveBeenCalled();
  });
});
