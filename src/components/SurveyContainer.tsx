import React from 'react';
import { useSurvey } from '../context/SurveyContext';
import ProgressBar from './ProgressBar';

// Import all step components
import WelcomeStep from './survey/WelcomeStep';
import AgeStep from './survey/AgeStep';
import MainGoalStep from './survey/MainGoalStep';
import IncomeSourceStep from './survey/IncomeSourceStep';
import FinancialSituationStep from './survey/FinancialSituationStep';
import MonthlyIncomeStep from './survey/MonthlyIncomeStep';
import JobChallengesStep from './survey/JobChallengesStep';
import LifeSatisfactionStep from './survey/LifeSatisfactionStep';
import MoneyBarrierStep from './survey/MoneyBarrierStep';
import ExtraMoneyUseStep from './survey/ExtraMoneyUseStep';
import FinancialConfidenceStep from './survey/FinancialConfidenceStep';
import WealthyRetirementStep from './survey/WealthyRetirementStep';
import SavingMoneyStep from './survey/SavingMoneyStep';
import MoneyEarningStep from './survey/MoneyEarningStep';
import WealthGrowthStep from './survey/WealthGrowthStep';
import TradingKnowledgeStep from './survey/TradingKnowledgeStep';
import PassiveIncomeStep from './survey/PassiveIncomeStep';
import MarketInterestsStep from './survey/MarketInterestsStep';
import InvestmentReadinessStep from './survey/InvestmentReadinessStep';
import SpecialAchievementStep from './survey/SpecialAchievementStep';
import TimeCommitmentStep from './survey/TimeCommitmentStep';
import LoadingStep from './survey/LoadingStep';
import WealthGrowthProfile from './survey/WealthGrowthProfile';
import PersonalWealthChallenge from './survey/PersonalWealthChallenge';
import LeadCaptureStep from './survey/LeadCaptureStep';
import ResultsStep from './survey/ResultsStep';
import DownloadStep from './survey/DownloadStep';
import TrustElementStep from './survey/TrustElementStep';

const SurveyContainer: React.FC = () => {
  const { 
    currentStep, 
    responses,
    persona,
    language,
    setStep, 
    updateResponses,
    restart,
    calculatePersona,
  } = useSurvey();

  const handleGenderNext = (gender: string) => {
    updateResponses({ gender });
    setStep('age');
  };

  const handleAgeNext = (age: string) => {
    updateResponses({ age });
    setStep('trust-element-1');
  };

  const handleTrustElement1Next = () => {
    setStep('main-goal');
  };

  const handleMainGoalNext = (mainGoal: string) => {
    updateResponses({ mainGoal });
    setStep('income-source');
  };

  const handleIncomeSourceNext = (incomeSource: string) => {
    updateResponses({ incomeSource });
    setStep('financial-situation');
  };

  const handleFinancialSituationNext = (financialSituation: string) => {
    updateResponses({ financialSituation });
    setStep('trust-element-2');
  };

  const handleTrustElement2Next = () => {
    setStep('monthly-income');
  };

  const handleMonthlyIncomeNext = (monthlyIncome: string) => {
    updateResponses({ monthlyIncome });
    setStep('job-challenges');
  };

  const handleJobChallengesNext = (jobChallenges: string) => {
    updateResponses({ jobChallenges });
    setStep('trust-element-3');
  };

  const handleTrustElement3Next = () => {
    setStep('life-satisfaction');
  };

  const handleLifeSatisfactionNext = (lifeSatisfaction: string) => {
    updateResponses({ lifeSatisfaction });
    setStep('money-barrier');
  };

  const handleMoneyBarrierNext = (moneyBarrier: string) => {
    updateResponses({ moneyBarrier });
    setStep('extra-money-use');
  };

  const handleExtraMoneyUseNext = (extraMoneyUse: string) => {
    updateResponses({ extraMoneyUse });
    setStep('financial-confidence');
  };

  const handleFinancialConfidenceNext = (financialConfidence: string) => {
    updateResponses({ financialConfidence });
    setStep('trust-element-4');
  };

  const handleTrustElement4Next = () => {
    setStep('wealthy-retirement');
  };

  const handleWealthyRetirementNext = (wealthyRetirement: string) => {
    updateResponses({ wealthyRetirement });
    setStep('saving-money');
  };

  const handleSavingMoneyNext = (savingMoney: string) => {
    updateResponses({ savingMoney });
    setStep('money-earning');
  };

  const handleMoneyEarningNext = (moneyEarningExperience: string) => {
    updateResponses({ moneyEarningExperience });
    setStep('wealth-growth');
  };

  const handleWealthGrowthNext = (wealthGrowthInterest: string) => {
    updateResponses({ wealthGrowthInterest });
    setStep('trading-knowledge');
  };

  const handleTradingKnowledgeNext = (tradingKnowledge: string) => {
    updateResponses({ tradingKnowledge });
    setStep('trust-element-5');
  };

  const handleTrustElement5Next = () => {
    setStep('passive-income');
  };

  const handlePassiveIncomeNext = (passiveIncomeKnowledge: number) => {
    updateResponses({ passiveIncomeKnowledge });
    setStep('market-interests');
  };

  const handleMarketInterestsNext = (marketInterests: string[]) => {
    updateResponses({ marketInterests });
    setStep('investment-readiness');
  };

  const handleInvestmentReadinessNext = (investmentReadiness: number) => {
    updateResponses({ investmentReadiness });
    setStep('special-achievement');
  };

  const handleSpecialAchievementNext = (achievement: string) => {
    updateResponses({ specialAchievement: achievement });
    setStep('time-commitment');
  };

  const handleTimeCommitmentNext = (time: string) => {
    updateResponses({ timeCommitment: time });
    setStep('loading-challenge');
  };

  const handleLoadingChallengeComplete = () => {
    setStep('personal-wealth-challenge');
  };

  const handlePersonalWealthChallengeNext = () => {
    setStep('lead-capture');
  };

  const handleLeadCaptureNext = async (name: string, email: string) => {
    await updateResponses({ name, email });
    calculatePersona();
    setStep('results');
  };

  const handleResultsNext = () => {
    // Results page is now the final step - no redirect to download
    // User can restart from Results page if needed
  };

  const showProgressBar = currentStep !== 'welcome' && 
                         !currentStep.startsWith('trust-element') &&
                         !currentStep.startsWith('loading') &&
                         currentStep !== 'results' &&
                         currentStep !== 'wealth-growth-profile' &&
                         currentStep !== 'lead-capture' &&
                         currentStep !== 'personal-wealth-challenge';

  const getProgressStep = () => {
    const stepOrder = [
      'age',
      'main-goal',
      'income-source',
      'financial-situation',
      'monthly-income',
      'job-challenges',
      'life-satisfaction',
      'money-barrier',
      'extra-money-use',
      'financial-confidence',
      'wealthy-retirement',
      'saving-money',
      'money-earning',
      'wealth-growth',
      'trading-knowledge',
      'passive-income',
      'market-interests',
      'investment-readiness',
      'special-achievement',
      'time-commitment'
    ];
    
    const index = stepOrder.indexOf(currentStep);
    return index >= 0 ? index + 1 : 1;
  };

  const renderStep = () => {
    switch(currentStep) {
      case 'welcome':
        return <WelcomeStep onNext={handleGenderNext} />;
      case 'age':
        return <AgeStep onNext={handleAgeNext} onPrevious={() => setStep('welcome')} gender={responses.gender} />;
      case 'trust-element-1':
        return <TrustElementStep onNext={handleTrustElement1Next} variant={1} />;
      case 'main-goal':
        return <MainGoalStep onNext={handleMainGoalNext} />;
      case 'income-source':
        return <IncomeSourceStep onNext={handleIncomeSourceNext} />;
      case 'financial-situation':
        return <FinancialSituationStep onNext={handleFinancialSituationNext} />;
      case 'trust-element-2':
        return <TrustElementStep onNext={handleTrustElement2Next} variant={2} financialSituation={responses.financialSituation} />;
      case 'monthly-income':
        return <MonthlyIncomeStep onNext={handleMonthlyIncomeNext} />;
      case 'job-challenges':
        return <JobChallengesStep onNext={handleJobChallengesNext} />;
      case 'trust-element-3':
        return <TrustElementStep onNext={handleTrustElement3Next} variant={3} />;
      case 'life-satisfaction':
        return <LifeSatisfactionStep onNext={handleLifeSatisfactionNext} />;
      case 'money-barrier':
        return <MoneyBarrierStep onNext={handleMoneyBarrierNext} />;
      case 'extra-money-use':
        return <ExtraMoneyUseStep onNext={handleExtraMoneyUseNext} />;
      case 'financial-confidence':
        return <FinancialConfidenceStep onNext={handleFinancialConfidenceNext} />;
      case 'trust-element-4':
        return <TrustElementStep onNext={handleTrustElement4Next} variant={4} financialConfidence={responses.financialConfidence} />;
      case 'wealthy-retirement':
        return <WealthyRetirementStep onNext={handleWealthyRetirementNext} />;
      case 'saving-money':
        return <SavingMoneyStep onNext={handleSavingMoneyNext} />;
      case 'money-earning':
        return <MoneyEarningStep onNext={handleMoneyEarningNext} />;
      case 'wealth-growth':
        return <WealthGrowthStep onNext={handleWealthGrowthNext} />;
      case 'trading-knowledge':
        return <TradingKnowledgeStep onNext={handleTradingKnowledgeNext} />;
      case 'trust-element-5':
        return <TrustElementStep onNext={handleTrustElement5Next} variant={5} />;
      case 'passive-income':
        return <PassiveIncomeStep onNext={handlePassiveIncomeNext} />;
      case 'market-interests':
        return <MarketInterestsStep onNext={handleMarketInterestsNext} />;
      case 'investment-readiness':
        return <InvestmentReadinessStep onNext={handleInvestmentReadinessNext} />;
      case 'special-achievement':
        return <SpecialAchievementStep onNext={handleSpecialAchievementNext} />;
      case 'time-commitment':
        return <TimeCommitmentStep onNext={handleTimeCommitmentNext} />;
      case 'loading-challenge':
        return <LoadingStep onComplete={handleLoadingChallengeComplete} nextStep="personal-wealth-challenge" />;
      case 'personal-wealth-challenge':
        return <PersonalWealthChallenge onNext={handlePersonalWealthChallengeNext} responses={responses} />;
      case 'lead-capture':
        return <LeadCaptureStep onNext={handleLeadCaptureNext} />;
      case 'results':
        return <ResultsStep persona={persona} responses={responses} restart={restart} isPremium={responses.isPremium} />;
      default:
        return <WelcomeStep onNext={handleGenderNext} />;
    }
  };

  return (
    <>
      {showProgressBar && (
        <ProgressBar 
          currentStep={getProgressStep()} 
          totalSteps={20} 
        />
      )}
      <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 flex-1 flex flex-col min-h-[calc(100vh-4rem)] sm:min-h-0">
        {renderStep()}
      </div>
    </>
  );
};

export default SurveyContainer;