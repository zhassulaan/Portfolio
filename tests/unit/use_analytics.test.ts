import { afterEach, describe, expect, it, vi } from 'vitest';
import { useAnalytics } from '@/composables/use_analytics';

describe('useAnalytics', () => {
  afterEach(() => {
    delete window.plausible;
  });

  it('does nothing — and does not throw — when the analytics script is not loaded', () => {
    const { track } = useAnalytics();

    expect(() => track('CV Download')).not.toThrow();
  });

  it('forwards the event name and wraps props the way Plausible expects', () => {
    const plausible = vi.fn();
    window.plausible = plausible;
    const { track } = useAnalytics();

    track('Booking Click', { source: 'hero' });
    track('Email Copy');

    expect(plausible).toHaveBeenNthCalledWith(1, 'Booking Click', { props: { source: 'hero' } });
    expect(plausible).toHaveBeenNthCalledWith(2, 'Email Copy', undefined);
  });
});
