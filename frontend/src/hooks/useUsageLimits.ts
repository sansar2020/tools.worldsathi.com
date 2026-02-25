import { useState, useEffect, useCallback } from 'react';

interface UsageLimitData {
  count: number;
  resetDate: string;
}

const DAILY_LIMIT = 10;
const STORAGE_PREFIX = 'tool_usage_';

export function useUsageLimits(toolId: string) {
  const [remainingUses, setRemainingUses] = useState<number>(DAILY_LIMIT);
  const [isLimitReached, setIsLimitReached] = useState<boolean>(false);
  const [resetDate, setResetDate] = useState<Date>(new Date());

  const storageKey = `${STORAGE_PREFIX}${toolId}`;

  const checkAndUpdateLimit = useCallback(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      const today = new Date().toDateString();

      if (stored) {
        const data: UsageLimitData = JSON.parse(stored);
        
        if (data.resetDate === today) {
          const remaining = DAILY_LIMIT - data.count;
          setRemainingUses(Math.max(0, remaining));
          setIsLimitReached(remaining <= 0);
        } else {
          setRemainingUses(DAILY_LIMIT);
          setIsLimitReached(false);
          localStorage.setItem(storageKey, JSON.stringify({
            count: 0,
            resetDate: today,
          }));
        }
      } else {
        setRemainingUses(DAILY_LIMIT);
        setIsLimitReached(false);
        localStorage.setItem(storageKey, JSON.stringify({
          count: 0,
          resetDate: today,
        }));
      }

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      setResetDate(tomorrow);
    } catch (error) {
      console.warn('Failed to check usage limits:', error);
    }
  }, [storageKey]);

  useEffect(() => {
    checkAndUpdateLimit();
  }, [checkAndUpdateLimit]);

  const incrementUsage = useCallback(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      const today = new Date().toDateString();

      if (stored) {
        const data: UsageLimitData = JSON.parse(stored);
        
        if (data.resetDate === today) {
          const newCount = data.count + 1;
          localStorage.setItem(storageKey, JSON.stringify({
            count: newCount,
            resetDate: today,
          }));
          
          const remaining = DAILY_LIMIT - newCount;
          setRemainingUses(Math.max(0, remaining));
          setIsLimitReached(remaining <= 0);
        } else {
          localStorage.setItem(storageKey, JSON.stringify({
            count: 1,
            resetDate: today,
          }));
          setRemainingUses(DAILY_LIMIT - 1);
          setIsLimitReached(false);
        }
      }
    } catch (error) {
      console.warn('Failed to increment usage:', error);
    }
  }, [storageKey]);

  return {
    remainingUses,
    isLimitReached,
    resetDate,
    incrementUsage,
  };
}
