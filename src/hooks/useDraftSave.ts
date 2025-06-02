
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/useLanguage';

interface DraftData {
  [key: string]: any;
}

export const useDraftSave = (formKey: string) => {
  const [hasDraft, setHasDraft] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const draftKey = `ansar-draft-${formKey}`;

  useEffect(() => {
    const savedDraft = localStorage.getItem(draftKey);
    setHasDraft(!!savedDraft);
  }, [draftKey]);

  const saveDraft = useCallback((data: DraftData) => {
    const consent = localStorage.getItem('ansar-cookie-consent');
    if (consent !== 'accepted') {
      toast({
        title: "Cookie consent required",
        description: "Please accept cookies to save drafts.",
        variant: "destructive",
      });
      return;
    }

    try {
      localStorage.setItem(draftKey, JSON.stringify({
        data,
        timestamp: Date.now()
      }));
      setHasDraft(true);
      toast({
        title: t.draft.saved,
        description: "Your progress has been saved automatically.",
      });
    } catch (error) {
      console.error('Failed to save draft:', error);
    }
  }, [draftKey, toast, t.draft.saved]);

  const loadDraft = useCallback((): DraftData | null => {
    try {
      const savedDraft = localStorage.getItem(draftKey);
      if (savedDraft) {
        const { data } = JSON.parse(savedDraft);
        toast({
          title: t.draft.restored,
          description: "Your previous progress has been restored.",
        });
        return data;
      }
    } catch (error) {
      console.error('Failed to load draft:', error);
    }
    return null;
  }, [draftKey, toast, t.draft.restored]);

  const clearDraft = useCallback(() => {
    localStorage.removeItem(draftKey);
    setHasDraft(false);
  }, [draftKey]);

  return {
    saveDraft,
    loadDraft,
    clearDraft,
    hasDraft
  };
};
