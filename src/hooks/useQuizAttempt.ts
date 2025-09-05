import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { SurveyResponse } from '../types/survey';

interface UserProfile {
  name: string;
  role: string;
}

export const useQuizAttempt = () => {
  const [attemptId, setAttemptId] = useState<string | null>(null);

  const createAttempt = useCallback(async (userProfile: UserProfile) => {
    try {
      const { data, error } = await supabase
        .from('quiz_attempts')
        .insert([
          {
            user_profile: userProfile,
            quiz_url: window.location.href,
            started_trading: false
          }
        ])
        .select()
        .single();

      if (error) throw error;
      setAttemptId(data.id);
      return data.id;
    } catch (error) {
      console.error('Error creating quiz attempt:', error);
      throw error;
    }
  }, []);

  const updateAttempt = useCallback(async (updates: Partial<SurveyResponse>) => {
    if (!attemptId) return;

    try {
      const { error } = await supabase
        .from('quiz_attempts')
        .update({
          current_question: getCurrentQuestionNumber(updates),
          user_profile: {
            name: updates.name || 'Anonymous User',
            role: 'user'
          }
        })
        .eq('id', attemptId);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating quiz attempt:', error);
      throw error;
    }
  }, [attemptId]);

  const completeAttempt = useCallback(async (finalResponses: SurveyResponse) => {
    if (!attemptId) return;

    try {
      const { error } = await supabase
        .from('quiz_attempts')
        .update({
          completed: true,
          user_profile: {
            name: finalResponses.name || 'Anonymous User',
            role: 'user'
          }
        })
        .eq('id', attemptId);

      if (error) throw error;
    } catch (error) {
      console.error('Error completing quiz attempt:', error);
      throw error;
    }
  }, [attemptId]);

  const getCurrentQuestionNumber = (responses: Partial<SurveyResponse>): number => {
    const steps = [
      'gender',
      'age',
      'mainGoal',
      'incomeSource',
      'financialSituation',
      'monthlyIncome',
      'jobChallenges',
      'lifeSatisfaction',
      'moneyBarrier',
      'extraMoneyUse',
      'financialConfidence',
      'wealthyRetirement',
      'savingMoney',
      'moneyEarningExperience',
      'wealthGrowthInterest',
      'tradingKnowledge',
      'passiveIncomeKnowledge',
      'marketInterests',
      'investmentReadiness',
      'specialAchievement',
      'timeCommitment'
    ];

    return steps.filter(step => responses[step as keyof SurveyResponse] !== undefined).length;
  };

  return {
    attemptId,
    createAttempt,
    updateAttempt,
    completeAttempt
  };
};