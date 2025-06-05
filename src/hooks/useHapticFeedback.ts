
import { useCallback } from 'react';

type HapticType = 'light' | 'medium' | 'heavy' | 'selection' | 'impact' | 'notification';

interface HapticOptions {
  pattern?: number[];
  duration?: number;
}

export const useHapticFeedback = () => {
  const triggerHaptic = useCallback((type: HapticType = 'light', options: HapticOptions = {}) => {
    // Check if device supports haptic feedback
    if (typeof window === 'undefined') return;

    // For devices with Haptic API (newer iOS Safari)
    if ('DeviceMotionEvent' in window && 'requestPermission' in (DeviceMotionEvent as any)) {
      try {
        // Simulate haptic feedback with audio context for iOS
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Different frequencies for different haptic types
        const frequencies = {
          light: 200,
          medium: 150,
          heavy: 100,
          selection: 300,
          impact: 80,
          notification: 400
        };
        
        oscillator.frequency.setValueAtTime(frequencies[type], audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
      } catch (error) {
        // Fallback to vibration API
        fallbackVibration(type, options);
      }
    } else {
      // Fallback to vibration API for Android and other devices
      fallbackVibration(type, options);
    }
  }, []);

  const fallbackVibration = useCallback((type: HapticType, options: HapticOptions) => {
    if (!navigator.vibrate) return;

    const patterns = {
      light: [10],
      medium: [20],
      heavy: [30],
      selection: [5],
      impact: [50],
      notification: [10, 50, 10]
    };

    const pattern = options.pattern || patterns[type];
    navigator.vibrate(pattern);
  }, []);

  // Convenience methods for common haptic types
  const lightTap = useCallback(() => triggerHaptic('light'), [triggerHaptic]);
  const mediumTap = useCallback(() => triggerHaptic('medium'), [triggerHaptic]);
  const heavyTap = useCallback(() => triggerHaptic('heavy'), [triggerHaptic]);
  const selectionChanged = useCallback(() => triggerHaptic('selection'), [triggerHaptic]);
  const impactFeedback = useCallback(() => triggerHaptic('impact'), [triggerHaptic]);
  const notificationFeedback = useCallback(() => triggerHaptic('notification'), [triggerHaptic]);

  return {
    triggerHaptic,
    lightTap,
    mediumTap,
    heavyTap,
    selectionChanged,
    impactFeedback,
    notificationFeedback
  };
};
