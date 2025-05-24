
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, ArrowLeft, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EnhancedUserPreferences {
  role: string;
  primaryGoal: string;
  contentTypes: string[];
  appType: string;
  experienceLevel: string;
  mainObjective: string;
}

interface PersonalizationStepProps {
  preferences: EnhancedUserPreferences;
  setPreferences: (prefs: EnhancedUserPreferences) => void;
  onComplete: () => void;
  onBack: () => void;
  onSkip: () => void;
  analytics: any;
}

export const PersonalizationStep: React.FC<PersonalizationStepProps> = ({
  preferences,
  setPreferences,
  onComplete,
  onBack,
  onSkip,
  analytics
}) => {
  const roles = [
    { id: 'student', label: 'Student', icon: '🎓' },
    { id: 'researcher', label: 'Researcher', icon: '🔬' },
    { id: 'professional', label: 'Professional', icon: '💼' },
    { id: 'creator', label: 'Content Creator', icon: '✨' }
  ];

  const goals = [
    { id: 'research', label: 'Research & Learning', icon: '📚' },
    { id: 'work', label: 'Work & Productivity', icon: '⚡' },
    { id: 'personal', label: 'Personal Knowledge', icon: '🧠' },
    { id: 'sharing', label: 'Sharing & Collaboration', icon: '🤝' }
  ];

  const appTypes = [
    { id: 'portfolio', label: 'Portfolio', icon: '🎨' },
    { id: 'saas', label: 'SaaS Application', icon: '🚀' },
    { id: 'community', label: 'Community Platform', icon: '👥' },
    { id: 'education', label: 'Educational Content', icon: '📖' },
    { id: 'ecommerce', label: 'E-commerce', icon: '🛒' },
    { id: 'other', label: 'Other', icon: '🔧' }
  ];

  const experienceLevels = [
    { id: 'designer', label: 'Designer', icon: '🎨' },
    { id: 'nocode', label: 'No-Code Builder', icon: '🧩' },
    { id: 'developer', label: 'Developer', icon: '💻' },
    { id: 'beginner', label: 'Complete Beginner', icon: '🌱' }
  ];

  const mainObjectives = [
    { id: 'build-quickly', label: 'Build something quickly', icon: '⚡' },
    { id: 'test-idea', label: 'Test an idea', icon: '🧪' },
    { id: 'learn', label: 'Learn by doing', icon: '📚' },
    { id: 'prototype', label: 'Create a prototype', icon: '🛠️' }
  ];

  const contentTypes = [
    { id: 'articles', label: 'Articles & Blogs' },
    { id: 'videos', label: 'Videos & Tutorials' },
    { id: 'research', label: 'Research Papers' },
    { id: 'social', label: 'Social Media Posts' },
    { id: 'documents', label: 'PDFs & Documents' },
    { id: 'images', label: 'Images & Screenshots' }
  ];

  const updatePreferences = (key: keyof EnhancedUserPreferences, value: any) => {
    const newPreferences = { ...preferences, [key]: value };
    setPreferences(newPreferences);
    analytics.trackStepCompleted(5, `personalization-${key}`);
  };

  const toggleContentType = (type: string) => {
    const current = preferences.contentTypes;
    const updated = current.includes(type)
      ? current.filter(t => t !== type)
      : [...current, type];
    updatePreferences('contentTypes', updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        <Card className="border-2 border-primary/20 shadow-xl">
          <CardContent className="p-12">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Personalize Your Experience</h2>
              <p className="text-xl text-muted-foreground">
                Help us tailor Accio to your needs (optional)
              </p>
            </div>

            <div className="space-y-8">
              {/* Role Selection */}
              <div>
                <h3 className="text-lg font-semibold mb-4">What best describes you?</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {roles.map((role) => (
                    <button
                      key={role.id}
                      onClick={() => updatePreferences('role', role.id)}
                      className={cn(
                        "p-4 rounded-lg border-2 transition-all text-center hover:scale-105",
                        preferences.role === role.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <div className="text-2xl mb-2">{role.icon}</div>
                      <div className="font-medium">{role.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* App Type Selection */}
              <div>
                <h3 className="text-lg font-semibold mb-4">What kind of app are you building?</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {appTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => updatePreferences('appType', type.id)}
                      className={cn(
                        "p-4 rounded-lg border-2 transition-all text-center hover:scale-105",
                        preferences.appType === type.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <div className="text-2xl mb-2">{type.icon}</div>
                      <div className="font-medium">{type.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Experience Level */}
              <div>
                <h3 className="text-lg font-semibold mb-4">What's your experience level?</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {experienceLevels.map((level) => (
                    <button
                      key={level.id}
                      onClick={() => updatePreferences('experienceLevel', level.id)}
                      className={cn(
                        "p-4 rounded-lg border-2 transition-all text-center hover:scale-105",
                        preferences.experienceLevel === level.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <div className="text-2xl mb-2">{level.icon}</div>
                      <div className="font-medium">{level.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Objective */}
              <div>
                <h3 className="text-lg font-semibold mb-4">What do you want to get out of Accio today?</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {mainObjectives.map((objective) => (
                    <button
                      key={objective.id}
                      onClick={() => updatePreferences('mainObjective', objective.id)}
                      className={cn(
                        "p-4 rounded-lg border-2 transition-all text-center hover:scale-105",
                        preferences.mainObjective === objective.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <div className="text-2xl mb-2">{objective.icon}</div>
                      <div className="font-medium">{objective.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Goal Selection */}
              <div>
                <h3 className="text-lg font-semibold mb-4">What's your primary goal?</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {goals.map((goal) => (
                    <button
                      key={goal.id}
                      onClick={() => updatePreferences('primaryGoal', goal.id)}
                      className={cn(
                        "p-4 rounded-lg border-2 transition-all text-center hover:scale-105",
                        preferences.primaryGoal === goal.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <div className="text-2xl mb-2">{goal.icon}</div>
                      <div className="font-medium">{goal.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Content Types */}
              <div>
                <h3 className="text-lg font-semibold mb-4">What content do you usually save?</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {contentTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => toggleContentType(type.id)}
                      className={cn(
                        "p-3 rounded-lg border-2 transition-all text-left hover:scale-105",
                        preferences.contentTypes.includes(type.id)
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <div className="font-medium">{type.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center mt-12">
              <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>

              <Button variant="ghost" onClick={onSkip}>
                Skip personalization
              </Button>

              <Button onClick={onComplete} className="flex items-center gap-2">
                Complete Setup
                <Check className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
