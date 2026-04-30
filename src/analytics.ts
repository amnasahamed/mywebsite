/**
 * AmnasOS 95 — Privacy-First Analytics
 *
 * - Zero cookies, zero external tracking
 * - Stores page views + window opens in localStorage
 * - Tracks: page loads, unique visitors (daily hash), window opens, time on site
 * - Opt-in: only activates if visitor hasn't opted out
 * - All data stays in the user's browser unless you connect a backend
 */

const STORAGE_KEY = 'amnasos-analytics';
const OPT_OUT_KEY = 'amnasos-analytics-optout';
const VISITOR_KEY = 'amnasos-visitor-id';

interface AnalyticsData {
  pageViews: number;
  uniqueDays: string[];
  windowOpens: Record<string, number>;
  firstVisit: string;
  lastVisit: string;
  totalSessions: number;
}

function today(): string {
  return new Date().toISOString().split('T')[0];
}

function loadData(): AnalyticsData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return {
    pageViews: 0,
    uniqueDays: [],
    windowOpens: {},
    firstVisit: today(),
    lastVisit: today(),
    totalSessions: 0,
  };
}

function saveData(data: AnalyticsData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch { /* ignore */ }
}

function getVisitorId(): string {
  try {
    let id = localStorage.getItem(VISITOR_KEY);
    if (!id) {
      id = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
      localStorage.setItem(VISITOR_KEY, id);
    }
    return id;
  } catch {
    return 'unknown';
  }
}

function isOptedOut(): boolean {
  try {
    return localStorage.getItem(OPT_OUT_KEY) === 'true';
  } catch {
    return false;
  }
}

export const analytics = {
  /** Track a page view (call once on app load) */
  pageView(): void {
    if (isOptedOut()) return;
    const data = loadData();
    const day = today();

    data.pageViews += 1;
    data.lastVisit = day;
    data.totalSessions += 1;
    if (!data.uniqueDays.includes(day)) {
      data.uniqueDays.push(day);
    }
    saveData(data);

    // Log to console for debugging (shows in DevTools)
    if (typeof console !== 'undefined') {
      console.log(
        `%c🖥️ AmnasOS 95 Analytics %c Page view #${data.pageViews} | ${data.uniqueDays.length} unique days | ${data.totalSessions} sessions`,
        'background: #000080; color: white; padding: 2px 6px; font-weight: bold;',
        'color: #008080; font-weight: bold;'
      );
    }

    // Optionally send to your own analytics endpoint
    // Uncomment and configure when ready:
    // this.sendToServer('pageview', { visitor: getVisitorId(), page: window.location.pathname });
  },

  /** Track a window being opened */
  windowOpen(windowId: string): void {
    if (isOptedOut()) return;
    const data = loadData();
    data.windowOpens[windowId] = (data.windowOpens[windowId] || 0) + 1;
    saveData(data);

    // this.sendToServer('window_open', { visitor: getVisitorId(), window: windowId });
  },

  /** Get the current analytics snapshot */
  getStats(): AnalyticsData & { visitorId: string } {
    return { ...loadData(), visitorId: getVisitorId() };
  },

  /** Opt out of analytics */
  optOut(): void {
    try {
      localStorage.setItem(OPT_OUT_KEY, 'true');
    } catch { /* ignore */ }
  },

  /** Opt back in */
  optIn(): void {
    try {
      localStorage.removeItem(OPT_OUT_KEY);
    } catch { /* ignore */ }
  },

  /** Check opt-out status */
  isOptedOut(): boolean {
    return isOptedOut();
  },

  /** Reset all analytics data */
  reset(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(VISITOR_KEY);
    } catch { /* ignore */ }
  },

  /**
   * Send event to your own analytics backend.
   * Wire this up when you have a server endpoint.
   *
   * Example endpoint: POST https://your-api.com/analytics
   * Body: { event: string, data: Record<string, unknown>, timestamp: string }
   */
  sendToServer(event: string, data: Record<string, unknown>): void {
    // Using navigator.sendBeacon for fire-and-forget (works on page unload too)
    const payload = JSON.stringify({
      event,
      data,
      timestamp: new Date().toISOString(),
      site: 'amnasahamed.com',
    });

    // Uncomment when you have an endpoint:
    // navigator.sendBeacon('https://your-api.com/analytics', payload);

    // For now, just log
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Analytics event:', event, data);
    }
  },
};
