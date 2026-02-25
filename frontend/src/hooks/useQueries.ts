import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import type { UserProfile, UserFavorites, UserPreferences, SearchHistory } from '../backend';
import { Principal } from '@dfinity/principal';

// ==================== User Profile Queries ====================

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

// ==================== User Favorites Queries ====================

export function useGetCurrentUserFavorites() {
  const { actor, isFetching } = useActor();

  return useQuery<UserFavorites | null>({
    queryKey: ['currentUserFavorites'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCurrentUserFavorites();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveCurrentUserFavorites() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (favorites: UserFavorites) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCurrentUserFavorites(favorites);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserFavorites'] });
    },
  });
}

// ==================== User Preferences Queries ====================

export function useGetCurrentUserPreferences() {
  const { actor, isFetching } = useActor();

  return useQuery<UserPreferences | null>({
    queryKey: ['currentUserPreferences'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCurrentUserPreferences();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveCurrentUserPreferences() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (preferences: UserPreferences) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCurrentUserPreferences(preferences);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserPreferences'] });
    },
  });
}

// ==================== Tool Usage Queries ====================

export function useGetAllToolUsageCounts() {
  const { actor, isFetching } = useActor();

  return useQuery<Array<[string, bigint]>>({
    queryKey: ['toolUsageCounts'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllToolUsageCounts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetToolUsageCount() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (toolId: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.getToolUsageCount(toolId);
    },
  });
}

export function useRecordToolUsage() {
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (toolId: string) => {
      if (!actor || !identity) throw new Error('Actor or identity not available');
      const userId = identity.getPrincipal();
      return actor.recordToolUsage(userId, toolId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['toolUsageCounts'] });
      queryClient.invalidateQueries({ queryKey: ['usageStats'] });
    },
  });
}

// ==================== Search History Queries ====================

export function useGetSearchHistory() {
  const { actor, isFetching } = useActor();

  return useQuery<SearchHistory[]>({
    queryKey: ['searchHistory'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSearchHistory();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddSearchHistory() {
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ searchQuery, resultCount }: { searchQuery: string; resultCount: number }) => {
      if (!actor || !identity) throw new Error('Actor or identity not available');
      const userId = identity.getPrincipal();
      return actor.addSearchHistory(userId, searchQuery, BigInt(resultCount));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['searchHistory'] });
    },
  });
}

// ==================== Usage Stats (Placeholder) ====================

export function useGetUsageStats() {
  // Return placeholder data - tracking not yet implemented
  return useQuery({
    queryKey: ['usageStats'],
    queryFn: async () => ({
      weeklyUsage: 0,
      totalUsage: 0,
      toolsUsedThisWeek: 0,
      todayUsage: 0,
    }),
    enabled: true,
  });
}
