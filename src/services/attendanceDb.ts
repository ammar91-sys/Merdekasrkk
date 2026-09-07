import { EmployeeRegistration } from '../types';
import { INITIAL_REGISTRATIONS } from '../data/eventData';

const DB_NAME = 'UTHM_Merdeka_Attendance_DB';
const DB_VERSION = 1;
const STORE_NAME = 'attendance_records';
const LOCAL_STORAGE_BACKUP_KEY = 'uthm_merdeka_attendance_records_v1';

type ChangeListener = (records: EmployeeRegistration[]) => void;

class AttendanceDatabaseService {
  private dbPromise: Promise<IDBDatabase | null> | null = null;
  private listeners: Set<ChangeListener> = new Set();
  private cache: EmployeeRegistration[] = [];
  private isInitialized = false;

  constructor() {
    this.init();
  }

  private init() {
    // 1. Initial synchronous load from localStorage for zero-latency initial render
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_BACKUP_KEY);
      if (stored) {
        this.cache = JSON.parse(stored);
      } else {
        // Seed with INITIAL_REGISTRATIONS marked as Confirmed
        this.cache = INITIAL_REGISTRATIONS.map(reg => ({
          ...reg,
          attendanceStatus: reg.attendanceStatus || 'Confirmed',
          confirmedAt: reg.confirmedAt || new Date().toISOString(),
        }));
        this.saveToLocalStorage(this.cache);
      }
    } catch (e) {
      console.warn('LocalStorage load warning:', e);
      this.cache = [...INITIAL_REGISTRATIONS];
    }

    // 2. Open IndexedDB for true client-side database persistence
    if (typeof window !== 'undefined' && window.indexedDB) {
      this.dbPromise = new Promise((resolve) => {
        try {
          const request = window.indexedDB.open(DB_NAME, DB_VERSION);

          request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
            const db = (event.target as IDBOpenDBRequest).result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
              const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
              store.createIndex('employeeId', 'employeeId', { unique: false });
              store.createIndex('ticketNumber', 'ticketNumber', { unique: true });
              store.createIndex('department', 'department', { unique: false });
            }
          };

          request.onsuccess = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            this.syncIndexedDbWithCache(db).then(() => {
              this.isInitialized = true;
              resolve(db);
            });
          };

          request.onerror = (err) => {
            console.error('IndexedDB open error:', err);
            resolve(null);
          };
        } catch (e) {
          console.error('Failed to init IndexedDB:', e);
          resolve(null);
        }
      });
    }
  }

  private async syncIndexedDbWithCache(db: IDBDatabase): Promise<void> {
    return new Promise((resolve) => {
      try {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const getAllReq = store.getAll();

        getAllReq.onsuccess = () => {
          const idbRecords: EmployeeRegistration[] = getAllReq.result || [];
          if (idbRecords.length > 0) {
            // IndexedDB has data, sync back to cache and localStorage
            this.cache = idbRecords;
            this.saveToLocalStorage(this.cache);
            this.notify();
          } else if (this.cache.length > 0) {
            // Seed IndexedDB from cache
            this.cache.forEach((item) => store.put(item));
          }
          resolve();
        };

        getAllReq.onerror = () => resolve();
      } catch (e) {
        resolve();
      }
    });
  }

  private saveToLocalStorage(records: EmployeeRegistration[]) {
    try {
      localStorage.setItem(LOCAL_STORAGE_BACKUP_KEY, JSON.stringify(records));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }

  private notify() {
    this.listeners.forEach((listener) => {
      try {
        listener([...this.cache]);
      } catch (e) {
        console.error('Error in change listener:', e);
      }
    });
  }

  public subscribe(listener: ChangeListener): () => void {
    this.listeners.add(listener);
    // Immediately invoke with current state
    listener([...this.cache]);
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Synchronous get of all attendance records from memory cache
   */
  public getAll(): EmployeeRegistration[] {
    return [...this.cache];
  }

  /**
   * Save a newly confirmed attendance record into database
   */
  public async saveAttendance(record: EmployeeRegistration): Promise<EmployeeRegistration> {
    const enrichedRecord: EmployeeRegistration = {
      ...record,
      attendanceStatus: record.attendanceStatus || 'Confirmed',
      confirmedAt: record.confirmedAt || new Date().toISOString(),
    };

    // Update in-memory & LocalStorage
    const existingIndex = this.cache.findIndex((r) => r.id === enrichedRecord.id);
    if (existingIndex >= 0) {
      this.cache[existingIndex] = enrichedRecord;
    } else {
      this.cache.unshift(enrichedRecord);
    }
    this.saveToLocalStorage(this.cache);
    this.notify();

    // Persist to IndexedDB
    if (this.dbPromise) {
      const db = await this.dbPromise;
      if (db) {
        try {
          const tx = db.transaction(STORE_NAME, 'readwrite');
          const store = tx.objectStore(STORE_NAME);
          store.put(enrichedRecord);
        } catch (e) {
          console.warn('IndexedDB put error:', e);
        }
      }
    }

    return enrichedRecord;
  }

  /**
   * Update attendance status (e.g., mark as 'Checked-In' or edit details)
   */
  public async updateAttendance(id: string, updates: Partial<EmployeeRegistration>): Promise<boolean> {
    const index = this.cache.findIndex((r) => r.id === id);
    if (index === -1) return false;

    const updatedRecord = { ...this.cache[index], ...updates };
    this.cache[index] = updatedRecord;
    this.saveToLocalStorage(this.cache);
    this.notify();

    if (this.dbPromise) {
      const db = await this.dbPromise;
      if (db) {
        try {
          const tx = db.transaction(STORE_NAME, 'readwrite');
          const store = tx.objectStore(STORE_NAME);
          store.put(updatedRecord);
        } catch (e) {
          console.warn('IndexedDB update error:', e);
        }
      }
    }

    return true;
  }

  /**
   * Toggle between 'Confirmed' and 'Checked-In'
   */
  public async toggleCheckIn(id: string): Promise<'Confirmed' | 'Checked-In' | null> {
    const record = this.cache.find((r) => r.id === id);
    if (!record) return null;

    const newStatus: 'Confirmed' | 'Checked-In' =
      record.attendanceStatus === 'Checked-In' ? 'Confirmed' : 'Checked-In';

    await this.updateAttendance(id, { attendanceStatus: newStatus });
    return newStatus;
  }

  /**
   * Delete attendance record from database
   */
  public async deleteAttendance(id: string): Promise<boolean> {
    this.cache = this.cache.filter((r) => r.id !== id);
    this.saveToLocalStorage(this.cache);
    this.notify();

    if (this.dbPromise) {
      const db = await this.dbPromise;
      if (db) {
        try {
          const tx = db.transaction(STORE_NAME, 'readwrite');
          const store = tx.objectStore(STORE_NAME);
          store.delete(id);
        } catch (e) {
          console.warn('IndexedDB delete error:', e);
        }
      }
    }

    return true;
  }

  /**
   * Reset database back to default seed records
   */
  public async resetToDefault(): Promise<void> {
    this.cache = INITIAL_REGISTRATIONS.map(reg => ({
      ...reg,
      attendanceStatus: 'Confirmed',
      confirmedAt: new Date().toISOString(),
    }));
    this.saveToLocalStorage(this.cache);
    this.notify();

    if (this.dbPromise) {
      const db = await this.dbPromise;
      if (db) {
        try {
          const tx = db.transaction(STORE_NAME, 'readwrite');
          const store = tx.objectStore(STORE_NAME);
          store.clear();
          this.cache.forEach((r) => store.put(r));
        } catch (e) {
          console.warn('IndexedDB reset error:', e);
        }
      }
    }
  }

  /**
   * Export all attendance data as CSV for HR / organizers
   */
  public exportCSV(): void {
    const headers = [
      'Ticket Number',
      'Employee Name',
      'Staff ID',
      'Email',
      'Department',
      'Office Location',
      'Attendance Type',
      'Attendance Status',
      'Table Number',
      'T-Shirt Size',
      'Dietary Preference',
      'Dietary Notes',
      'Plus One',
      'Plus One Name',
      'Registered Date',
      'Confirmed At'
    ];

    const rows = this.cache.map((r) => [
      r.ticketNumber,
      `"${r.employeeName.replace(/"/g, '""')}"`,
      r.employeeId,
      r.email,
      `"${r.department.replace(/"/g, '""')}"`,
      `"${r.officeLocation}"`,
      r.attendanceType,
      r.attendanceStatus || 'Confirmed',
      `"${r.tableNumber || ''}"`,
      r.shirtSize,
      r.dietaryPreference,
      `"${(r.dietaryNotes || '').replace(/"/g, '""')}"`,
      r.plusOne ? 'Yes' : 'No',
      `"${(r.plusOneName || '').replace(/"/g, '""')}"`,
      r.registrationDate,
      r.confirmedAt || ''
    ]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `UTHM_Merdeka_Attendance_Database_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  /**
   * Export as structured JSON backup
   */
  public exportJSON(): void {
    const jsonStr = JSON.stringify(this.cache, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `UTHM_Merdeka_Attendance_Database_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export const attendanceDb = new AttendanceDatabaseService();
