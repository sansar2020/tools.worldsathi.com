import React, { useState, useEffect } from 'react';
import ToolPageTemplate from './ToolPageTemplate';
import { Button } from '@/components/Button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ALL_TOOLS } from '@/constants/tools';
import { getRelatedTools } from '@/utils/toolHelpers';
import { Play, Pause, RotateCcw } from 'lucide-react';

export default function Productivity1() {
  const tool = ALL_TOOLS.find((t) => t.id === 'pomodoro-timer')!;
  const relatedTools = getRelatedTools(tool.id, ALL_TOOLS, 3);

  // Customizable settings
  const [workDuration, setWorkDuration] = useState<number>(25);
  const [breakDuration, setBreakDuration] = useState<number>(5);
  const [cycles, setCycles] = useState<number>(4);

  // Timer state
  const [timeLeft, setTimeLeft] = useState(workDuration * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [currentCycle, setCurrentCycle] = useState(1);

  // Update timeLeft when workDuration changes and timer is not active
  useEffect(() => {
    if (!isActive && !isBreak) {
      setTimeLeft(workDuration * 60);
    }
  }, [workDuration, isActive, isBreak]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (!isBreak) {
        // Work session ended, start break
        setIsBreak(true);
        setTimeLeft(breakDuration * 60);
      } else {
        // Break ended
        if (currentCycle < cycles) {
          // Start next work session
          setIsBreak(false);
          setCurrentCycle((c) => c + 1);
          setTimeLeft(workDuration * 60);
        } else {
          // All cycles completed
          setIsActive(false);
          setIsBreak(false);
          setCurrentCycle(1);
          setTimeLeft(workDuration * 60);
        }
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, isBreak, currentCycle, cycles, workDuration, breakDuration]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setCurrentCycle(1);
    setTimeLeft(workDuration * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleWorkDurationChange = (value: string) => {
    const num = parseInt(value);
    if (!isNaN(num) && num >= 1 && num <= 60) {
      setWorkDuration(num);
    }
  };

  const handleBreakDurationChange = (value: string) => {
    const num = parseInt(value);
    if (!isNaN(num) && num >= 1 && num <= 30) {
      setBreakDuration(num);
    }
  };

  const handleCyclesChange = (value: string) => {
    const num = parseInt(value);
    if (!isNaN(num) && num >= 1 && num <= 10) {
      setCycles(num);
    }
  };

  const faqs = [
    {
      question: 'What is the Pomodoro Technique?',
      answer: 'The Pomodoro Technique is a time management method that uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks.',
    },
    {
      question: 'How long should work sessions be?',
      answer: 'The traditional Pomodoro is 25 minutes, but you can customize it to 15-60 minutes based on your preference and task complexity.',
    },
    {
      question: 'How long should breaks be?',
      answer: 'Short breaks are typically 5 minutes, but you can adjust them to 1-30 minutes based on your needs.',
    },
    {
      question: 'How many cycles should I do?',
      answer: 'The traditional approach is 4 cycles before a longer break, but you can customize this from 1-10 cycles.',
    },
    {
      question: 'Can I change the timer settings?',
      answer: 'Yes! You can customize work duration, break duration, and number of cycles before starting the timer.',
    },
  ];

  return (
    <ToolPageTemplate
      tool={tool}
      gradientFilename="tool-pomodoro-timer-gradient.dim_1200x300.png"
      faqs={faqs}
      relatedTools={relatedTools}
      aboutContent={tool.aboutContent}
    >
      <div className="space-y-8">
        {/* Timer Settings */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold mb-4">Timer Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="work-duration">Work Duration (minutes)</Label>
              <Input
                id="work-duration"
                type="number"
                min="1"
                max="60"
                value={workDuration}
                onChange={(e) => handleWorkDurationChange(e.target.value)}
                disabled={isActive}
                className="bg-background"
              />
              <p className="text-xs text-muted-foreground">Range: 1-60 minutes</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="break-duration">Break Duration (minutes)</Label>
              <Input
                id="break-duration"
                type="number"
                min="1"
                max="30"
                value={breakDuration}
                onChange={(e) => handleBreakDurationChange(e.target.value)}
                disabled={isActive}
                className="bg-background"
              />
              <p className="text-xs text-muted-foreground">Range: 1-30 minutes</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cycles">Number of Cycles</Label>
              <Input
                id="cycles"
                type="number"
                min="1"
                max="10"
                value={cycles}
                onChange={(e) => handleCyclesChange(e.target.value)}
                disabled={isActive}
                className="bg-background"
              />
              <p className="text-xs text-muted-foreground">Range: 1-10 cycles</p>
            </div>
          </div>
        </div>

        {/* Timer Display */}
        <div className="flex flex-col items-center justify-center space-y-6 p-8 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl border-2 border-primary/20">
          <div className="text-center">
            <p className="text-sm font-medium text-muted-foreground mb-2">
              {isBreak ? 'Break Time' : 'Work Session'}
            </p>
            <p className="text-xs text-muted-foreground">
              Cycle {currentCycle} of {cycles}
            </p>
          </div>

          <div className="text-8xl font-bold text-primary font-mono">
            {formatTime(timeLeft)}
          </div>

          <div className="flex gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={toggleTimer}
              className="gap-2 min-w-[140px]"
            >
              {isActive ? (
                <>
                  <Pause className="w-5 h-5" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  Start
                </>
              )}
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={resetTimer}
              className="gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Reset
            </Button>
          </div>

          {/* Progress Indicator */}
          <div className="w-full max-w-md">
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>Progress</span>
              <span>
                {Math.round(
                  ((isBreak ? breakDuration * 60 : workDuration * 60) - timeLeft) /
                    (isBreak ? breakDuration * 60 : workDuration * 60) *
                    100
                )}
                %
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-1000"
                style={{
                  width: `${
                    ((isBreak ? breakDuration * 60 : workDuration * 60) - timeLeft) /
                    (isBreak ? breakDuration * 60 : workDuration * 60) *
                    100
                  }%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3 text-accent-foreground">
            Pomodoro Tips
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Customize your work and break durations to match your focus patterns</li>
            <li>• Use breaks to stretch, hydrate, or rest your eyes</li>
            <li>• Eliminate distractions during work sessions</li>
            <li>• Track completed cycles to measure productivity</li>
            <li>• Adjust settings based on task complexity and energy levels</li>
          </ul>
        </div>
      </div>
    </ToolPageTemplate>
  );
}
