import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import type { UserCreditStatus } from '../backend';
import { Principal } from '@dfinity/principal';

// ==================== Credit Balance Queries ====================

export function useGetCreditBalance(userId?: Principal) {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();

  // Use provided userId or fall back to current user's principal
  const targetUserId = userId || identity?.getPrincipal();

  return useQuery<UserCreditStatus | null>({
    queryKey: ['creditBalance', targetUserId?.toString()],
    queryFn: async () => {
      if (!actor || !targetUserId) return null;
      return actor.getCreditBalance(targetUserId);
    },
    enabled: !!actor && !isFetching && !!targetUserId,
  });
}

export function useConsumeCredits() {
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (amount: number) => {
      if (!actor) throw new Error('Actor not available');
      if (!identity) throw new Error('User not authenticated');
      return actor.consumeCredits(BigInt(amount));
    },
    onSuccess: (success, amount) => {
      if (success && identity) {
        // Invalidate credit balance queries
        queryClient.invalidateQueries({ 
          queryKey: ['creditBalance', identity.getPrincipal().toString()] 
        });
      }
    },
  });
}

export function useListAllCreditBalances() {
  const { actor, isFetching } = useActor();

  return useQuery<UserCreditStatus[]>({
    queryKey: ['allCreditBalances'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listAllCreditBalances();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateProfileCredits() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, totalCreditsAllowed }: { userId: Principal; totalCreditsAllowed: number }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateProfileCredits(userId, BigInt(totalCreditsAllowed));
    },
    onSuccess: () => {
      // Invalidate all credit-related queries
      queryClient.invalidateQueries({ queryKey: ['creditBalance'] });
      queryClient.invalidateQueries({ queryKey: ['allCreditBalances'] });
    },
  });
}
