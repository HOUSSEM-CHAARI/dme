import React, { useState, useEffect, useRef, createContext, useContext, useCallback } from 'react';

// ============================================
// DME Premium UI Component Library
// SaaS-Grade Healthcare Platform
// Inspired by: Linear, Stripe, Notion, Doctolib
// ============================================

// === Icon Components (SVG-based, Optimized) ===
export const Icons = {
  // Navigation
  Home: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  Users: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  User: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  FileText: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  Folder: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  ),
  Calendar: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  Settings: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  LogOut: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
  Search: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  Bell: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  // Actions
  Plus: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  Edit: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  ),
  Trash: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  ),
  Download: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  Upload: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  ),
  Eye: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  EyeOff: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ),
  // Status
  Check: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  X: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  AlertCircle: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  CheckCircle: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  Info: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  // Medical
  Heart: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  Activity: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  Clipboard: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    </svg>
  ),
  Stethoscope: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
      <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
      <circle cx="20" cy="10" r="2" />
    </svg>
  ),
  Pill: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
      <path d="m8.5 8.5 7 7" />
    </svg>
  ),
  TestTube: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5h0c-1.4 0-2.5-1.1-2.5-2.5V2" />
      <path d="M8.5 2h7" />
      <path d="M14.5 16h-5" />
    </svg>
  ),
  Image: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  ),
  BarChart: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
    </svg>
  ),
  TrendingUp: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  TrendingDown: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
      <polyline points="17 18 23 18 23 12" />
    </svg>
  ),
  // Arrows
  ChevronRight: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  ChevronLeft: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="15 18 9 12 15 6" />
    </svg>
  ),
  ChevronDown: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  ChevronUp: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="18 15 12 9 6 15" />
    </svg>
  ),
  ArrowRight: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  ArrowLeft: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  ),
  // Other
  Menu: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  ),
  MoreVertical: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="5" r="1" />
      <circle cx="12" cy="19" r="1" />
    </svg>
  ),
  MoreHorizontal: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
    </svg>
  ),
  Clock: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Phone: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  Mail: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  MapPin: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Printer: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="6 9 6 2 18 2 18 9" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="8" />
    </svg>
  ),
  Filter: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  ),
  RefreshCw: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  ),
  Lock: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  UserPlus: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <line x1="20" y1="8" x2="20" y2="14" />
      <line x1="23" y1="11" x2="17" y2="11" />
    </svg>
  ),
  Building: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  ),
  Award: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="8" r="7" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
  ),
  AlertTriangle: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  Save: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </svg>
  ),
  Shield: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  Zap: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  LogIn: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" y1="12" x2="3" y2="12" />
    </svg>
  ),
  Trash2: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  ),
  ExternalLink: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  ),
  Copy: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  ),
  Command: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
    </svg>
  ),
};

// === Utility: Render Icon Safely ===
const renderIcon = (icon, props = {}) => {
  if (!icon) return null;
  if (React.isValidElement(icon)) return icon;
  const IconComponent = icon;
  return <IconComponent {...props} />;
};

// === Premium Button Component ===
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  type = 'button',
  className = '',
  style = {},
  ...props
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const sizes = {
    xs: { padding: '6px 10px', fontSize: '12px', height: '28px', iconSize: 14, gap: '4px' },
    sm: { padding: '6px 12px', fontSize: '13px', height: '32px', iconSize: 14, gap: '6px' },
    md: { padding: '8px 16px', fontSize: '14px', height: '40px', iconSize: 16, gap: '8px' },
    lg: { padding: '10px 20px', fontSize: '15px', height: '44px', iconSize: 18, gap: '8px' },
    xl: { padding: '12px 24px', fontSize: '16px', height: '52px', iconSize: 20, gap: '10px' },
  };

  const variants = {
    primary: {
      background: 'var(--bg-gradient-primary)',
      color: '#fff',
      border: 'none',
      shadow: 'var(--shadow-primary)',
      hoverShadow: 'var(--shadow-primary-lg)',
    },
    secondary: {
      background: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      border: '1px solid var(--border-primary)',
      shadow: 'var(--shadow-xs)',
      hoverBackground: 'var(--bg-secondary)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-secondary)',
      border: 'none',
      hoverBackground: 'var(--bg-tertiary)',
    },
    danger: {
      background: 'var(--color-error-500)',
      color: '#fff',
      border: 'none',
      shadow: 'var(--shadow-error)',
    },
    success: {
      background: 'var(--bg-gradient-secondary)',
      color: '#fff',
      border: 'none',
      shadow: 'var(--shadow-success)',
    },
    accent: {
      background: 'var(--bg-gradient-accent)',
      color: '#fff',
      border: 'none',
      shadow: 'var(--shadow-accent)',
    },
    outline: {
      background: 'transparent',
      color: 'var(--color-primary-600)',
      border: '1px solid var(--color-primary-600)',
      hoverBackground: 'var(--color-primary-50)',
    },
  };

  const s = sizes[size] || sizes.md;
  const v = variants[variant] || variants.primary;

  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: s.gap,
    fontFamily: 'var(--font-sans)',
    fontWeight: '500',
    fontSize: s.fontSize,
    height: s.height,
    padding: s.padding,
    borderRadius: 'var(--radius-lg)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
    whiteSpace: 'nowrap',
    userSelect: 'none',
    background: isHovered && v.hoverBackground ? v.hoverBackground : v.background,
    color: v.color,
    border: v.border || 'none',
    boxShadow: isHovered && v.hoverShadow ? v.hoverShadow : (v.shadow || 'none'),
    transform: isPressed ? 'scale(0.98)' : isHovered ? 'translateY(-1px)' : 'none',
    opacity: disabled ? 0.5 : 1,
    width: fullWidth ? '100%' : 'auto',
    ...style,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={className}
      style={baseStyle}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setIsPressed(false); }}
      onMouseDown={() => !disabled && setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      {...props}
    >
      {loading && (
        <span style={{
          width: s.iconSize,
          height: s.iconSize,
          border: '2px solid currentColor',
          borderTopColor: 'transparent',
          borderRadius: '50%',
          animation: 'spin 0.6s linear infinite',
        }} />
      )}
      {!loading && Icon && iconPosition === 'left' && renderIcon(Icon, { style: { width: s.iconSize, height: s.iconSize } })}
      {children}
      {!loading && Icon && iconPosition === 'right' && renderIcon(Icon, { style: { width: s.iconSize, height: s.iconSize } })}
    </button>
  );
}

// === Premium Input Component ===
export function Input({
  label,
  error,
  icon: Icon,
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled = false,
  required = false,
  helpText,
  size = 'md',
  style = {},
  inputStyle = {},
  ...props
}) {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  const sizes = {
    sm: { height: '32px', fontSize: '13px', padding: '8px 12px', iconPadding: '36px' },
    md: { height: '40px', fontSize: '14px', padding: '10px 14px', iconPadding: '42px' },
    lg: { height: '48px', fontSize: '15px', padding: '12px 16px', iconPadding: '48px' },
  };

  const s = sizes[size] || sizes.md;

  return (
    <div style={{ marginBottom: '16px', ...style }}>
      {label && (
        <label style={{
          display: 'block',
          fontSize: '13px',
          fontWeight: '500',
          color: 'var(--text-primary)',
          marginBottom: '6px',
        }}>
          {label}
          {required && <span style={{ color: 'var(--color-error-500)', marginLeft: '4px' }}>*</span>}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        {Icon && (
          <div style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: focused ? 'var(--color-primary-500)' : 'var(--text-tertiary)',
            transition: 'color 150ms',
            display: 'flex',
            pointerEvents: 'none',
          }}>
            {renderIcon(Icon, { style: { width: 16, height: 16 } })}
          </div>
        )}
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: '100%',
            height: s.height,
            padding: s.padding,
            paddingLeft: Icon ? s.iconPadding : undefined,
            paddingRight: isPassword ? s.iconPadding : undefined,
            fontSize: s.fontSize,
            fontFamily: 'var(--font-sans)',
            color: 'var(--text-primary)',
            background: disabled ? 'var(--bg-tertiary)' : 'var(--bg-primary)',
            border: `1px solid ${error ? 'var(--color-error-500)' : focused ? 'var(--color-primary-500)' : 'var(--border-primary)'}`,
            borderRadius: 'var(--radius-lg)',
            outline: 'none',
            transition: 'all 150ms',
            boxShadow: focused ? '0 0 0 3px var(--ring-color)' : 'var(--shadow-xs)',
            boxSizing: 'border-box',
            ...inputStyle,
          }}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              color: 'var(--text-tertiary)',
              display: 'flex',
            }}
          >
            {showPassword ? <Icons.EyeOff style={{ width: 16, height: 16 }} /> : <Icons.Eye style={{ width: 16, height: 16 }} />}
          </button>
        )}
      </div>
      {helpText && !error && (
        <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '6px' }}>{helpText}</p>
      )}
      {error && (
        <p style={{ fontSize: '12px', color: 'var(--color-error-500)', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Icons.AlertCircle style={{ width: 12, height: 12 }} />
          {error}
        </p>
      )}
    </div>
  );
}

// === Premium Select Component ===
export function Select({ label, children, error, value, onChange, disabled, required, size = 'md', style = {}, ...props }) {
  const [focused, setFocused] = useState(false);

  const sizes = {
    sm: { height: '32px', fontSize: '13px', padding: '8px 36px 8px 12px' },
    md: { height: '40px', fontSize: '14px', padding: '10px 40px 10px 14px' },
    lg: { height: '48px', fontSize: '15px', padding: '12px 44px 12px 16px' },
  };

  const s = sizes[size] || sizes.md;

  return (
    <div style={{ marginBottom: '16px', ...style }}>
      {label && (
        <label style={{
          display: 'block',
          fontSize: '13px',
          fontWeight: '500',
          color: 'var(--text-primary)',
          marginBottom: '6px',
        }}>
          {label}
          {required && <span style={{ color: 'var(--color-error-500)', marginLeft: '4px' }}>*</span>}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        <select
          value={value}
          onChange={onChange}
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: '100%',
            height: s.height,
            padding: s.padding,
            fontSize: s.fontSize,
            fontFamily: 'var(--font-sans)',
            color: 'var(--text-primary)',
            background: disabled ? 'var(--bg-tertiary)' : 'var(--bg-primary)',
            border: `1px solid ${error ? 'var(--color-error-500)' : focused ? 'var(--color-primary-500)' : 'var(--border-primary)'}`,
            borderRadius: 'var(--radius-lg)',
            outline: 'none',
            cursor: 'pointer',
            appearance: 'none',
            transition: 'all 150ms',
            boxShadow: focused ? '0 0 0 3px var(--ring-color)' : 'var(--shadow-xs)',
            boxSizing: 'border-box',
          }}
          {...props}
        >
          {children}
        </select>
        <Icons.ChevronDown style={{
          position: 'absolute',
          right: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '16px',
          height: '16px',
          color: 'var(--text-tertiary)',
          pointerEvents: 'none',
        }} />
      </div>
      {error && (
        <p style={{ fontSize: '12px', color: 'var(--color-error-500)', marginTop: '6px' }}>{error}</p>
      )}
    </div>
  );
}

// === Premium Textarea Component ===
export function Textarea({ label, error, rows = 4, required, value, onChange, placeholder, size = 'md', style = {}, ...props }) {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ marginBottom: '16px', ...style }}>
      {label && (
        <label style={{
          display: 'block',
          fontSize: '13px',
          fontWeight: '500',
          color: 'var(--text-primary)',
          marginBottom: '6px',
        }}>
          {label}
          {required && <span style={{ color: 'var(--color-error-500)', marginLeft: '4px' }}>*</span>}
        </label>
      )}
      <textarea
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%',
          padding: '12px 14px',
          fontSize: '14px',
          fontFamily: 'var(--font-sans)',
          color: 'var(--text-primary)',
          background: 'var(--bg-primary)',
          border: `1px solid ${error ? 'var(--color-error-500)' : focused ? 'var(--color-primary-500)' : 'var(--border-primary)'}`,
          borderRadius: 'var(--radius-lg)',
          outline: 'none',
          resize: 'vertical',
          transition: 'all 150ms',
          boxShadow: focused ? '0 0 0 3px var(--ring-color)' : 'var(--shadow-xs)',
          boxSizing: 'border-box',
          minHeight: '100px',
        }}
        {...props}
      />
      {error && (
        <p style={{ fontSize: '12px', color: 'var(--color-error-500)', marginTop: '6px' }}>{error}</p>
      )}
    </div>
  );
}

// === Premium Card Component ===
export function Card({ children, style = {}, padding = '20px', hover = false, onClick, className = '', variant = 'default' }) {
  const [isHovered, setIsHovered] = useState(false);

  const variants = {
    default: {
      background: 'var(--bg-card)',
      border: '1px solid var(--border-primary)',
    },
    elevated: {
      background: 'var(--bg-card)',
      border: 'none',
      boxShadow: 'var(--shadow-md)',
    },
    outlined: {
      background: 'transparent',
      border: '1px solid var(--border-primary)',
    },
  };

  const v = variants[variant] || variants.default;

  return (
    <div
      onClick={onClick}
      className={className}
      onMouseEnter={() => hover && setIsHovered(true)}
      onMouseLeave={() => hover && setIsHovered(false)}
      style={{
        ...v,
        borderRadius: 'var(--radius-xl)',
        padding,
        boxShadow: isHovered ? 'var(--shadow-card-hover)' : (v.boxShadow || 'var(--shadow-card)'),
        transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: onClick ? 'pointer' : 'default',
        transform: isHovered ? 'translateY(-2px)' : 'none',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// === Premium Badge Component ===
export function Badge({ children, variant = 'default', size = 'md', dot = false }) {
  const variants = {
    default: { bg: 'var(--color-gray-100)', color: 'var(--color-gray-700)' },
    primary: { bg: 'var(--color-primary-100)', color: 'var(--color-primary-700)' },
    success: { bg: 'var(--color-success-100)', color: 'var(--color-success-700)' },
    warning: { bg: 'var(--color-warning-100)', color: 'var(--color-warning-700)' },
    danger: { bg: 'var(--color-error-100)', color: 'var(--color-error-700)' },
    info: { bg: 'var(--color-info-100)', color: 'var(--color-info-600)' },
    purple: { bg: 'var(--color-purple-100)', color: 'var(--color-purple-700)' },
    teal: { bg: 'var(--color-secondary-100)', color: 'var(--color-secondary-700)' },
  };

  const sizes = {
    xs: { padding: '2px 6px', fontSize: '10px' },
    sm: { padding: '2px 8px', fontSize: '11px' },
    md: { padding: '3px 10px', fontSize: '12px' },
    lg: { padding: '4px 12px', fontSize: '13px' },
  };

  const v = variants[variant] || variants.default;
  const s = sizes[size] || sizes.md;

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '5px',
      background: v.bg,
      color: v.color,
      ...s,
      fontWeight: '500',
      borderRadius: 'var(--radius-full)',
      whiteSpace: 'nowrap',
      lineHeight: 1.4,
    }}>
      {dot && (
        <span style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: v.color,
          flexShrink: 0,
        }} />
      )}
      {children}
    </span>
  );
}

// === Premium Avatar Component ===
export function Avatar({ name = '', src, size = 40, status, variant = 'circle' }) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  const colors = [
    { bg: 'var(--color-primary-100)', color: 'var(--color-primary-700)' },
    { bg: 'var(--color-secondary-100)', color: 'var(--color-secondary-700)' },
    { bg: 'var(--color-purple-100)', color: 'var(--color-purple-700)' },
    { bg: 'var(--color-accent-100)', color: 'var(--color-accent-700)' },
    { bg: 'var(--color-success-100)', color: 'var(--color-success-700)' },
    { bg: 'var(--color-warning-100)', color: 'var(--color-warning-700)' },
  ];

  const colorIndex = name.charCodeAt(0) % colors.length;
  const { bg, color } = colors[colorIndex] || colors[0];

  const statusColors = {
    online: 'var(--color-success-500)',
    offline: 'var(--color-gray-400)',
    busy: 'var(--color-error-500)',
    away: 'var(--color-warning-500)',
  };

  const borderRadius = variant === 'square' ? 'var(--radius-lg)' : '50%';

  return (
    <div style={{ position: 'relative', display: 'inline-flex' }}>
      {src ? (
        <img
          src={src}
          alt={name}
          style={{
            width: size,
            height: size,
            borderRadius,
            objectFit: 'cover',
            border: '2px solid var(--bg-primary)',
            boxShadow: 'var(--shadow-sm)',
          }}
        />
      ) : (
        <div style={{
          width: size,
          height: size,
          borderRadius,
          background: bg,
          color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: '600',
          fontSize: size * 0.38,
          fontFamily: 'var(--font-sans)',
          border: '2px solid var(--bg-primary)',
          boxShadow: 'var(--shadow-sm)',
        }}>
          {initials || <Icons.User style={{ width: size * 0.45, height: size * 0.45 }} />}
        </div>
      )}
      {status && (
        <span style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: Math.max(size * 0.25, 10),
          height: Math.max(size * 0.25, 10),
          borderRadius: '50%',
          background: statusColors[status] || statusColors.offline,
          border: '2px solid var(--bg-primary)',
        }} />
      )}
    </div>
  );
}

// === Premium StatCard Component ===
export function StatCard({ label, value, icon: Icon, iconSize = 22, trend, trendValue, color = 'primary', loading = false, subtitle }) {
  const [isHovered, setIsHovered] = useState(false);

  const colors = {
    primary: {
      bg: 'var(--color-primary-50)',
      icon: 'var(--color-primary-600)',
      gradient: 'var(--bg-gradient-primary)',
      shadow: 'var(--shadow-primary)',
    },
    success: {
      bg: 'var(--color-success-50)',
      icon: 'var(--color-success-600)',
      gradient: 'var(--bg-gradient-secondary)',
      shadow: 'var(--shadow-success)',
    },
    warning: {
      bg: 'var(--color-warning-50)',
      icon: 'var(--color-warning-600)',
      gradient: 'linear-gradient(135deg, var(--color-warning-500), var(--color-warning-600))',
      shadow: '0 4px 14px rgba(245, 158, 11, 0.25)',
    },
    danger: {
      bg: 'var(--color-error-50)',
      icon: 'var(--color-error-600)',
      gradient: 'linear-gradient(135deg, var(--color-error-500), var(--color-error-600))',
      shadow: 'var(--shadow-error)',
    },
    purple: {
      bg: 'var(--color-purple-50)',
      icon: 'var(--color-purple-600)',
      gradient: 'linear-gradient(135deg, var(--color-purple-500), var(--color-purple-600))',
      shadow: '0 4px 14px rgba(168, 85, 247, 0.25)',
    },
    teal: {
      bg: 'var(--color-secondary-50)',
      icon: 'var(--color-secondary-600)',
      gradient: 'var(--bg-gradient-secondary)',
      shadow: '0 4px 14px rgba(20, 184, 166, 0.25)',
    },
  };

  const c = colors[color] || colors.primary;

  return (
    <Card
      style={{ position: 'relative', overflow: 'hidden' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            fontSize: '13px',
            fontWeight: '500',
            color: 'var(--text-secondary)',
            marginBottom: '8px',
            letterSpacing: '0.01em',
          }}>
            {label}
          </p>
          {loading ? (
            <Skeleton width="80px" height="32px" />
          ) : (
            <p style={{
              fontSize: '28px',
              fontWeight: '700',
              color: 'var(--text-primary)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              fontFamily: 'var(--font-display)',
            }}>
              {value}
            </p>
          )}
          {subtitle && (
            <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '4px' }}>{subtitle}</p>
          )}
          {trend && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '10px' }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '2px',
                fontSize: '12px',
                fontWeight: '600',
                color: trend === 'up' ? 'var(--color-success-600)' : 'var(--color-error-600)',
                background: trend === 'up' ? 'var(--color-success-50)' : 'var(--color-error-50)',
                padding: '2px 6px',
                borderRadius: 'var(--radius-sm)',
              }}>
                {trend === 'up' ? <Icons.TrendingUp style={{ width: 12, height: 12 }} /> : <Icons.TrendingDown style={{ width: 12, height: 12 }} />}
                {trendValue}
              </span>
              <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>vs last month</span>
            </div>
          )}
        </div>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: 'var(--radius-xl)',
          background: c.gradient,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: isHovered ? c.shadow : 'none',
          transition: 'all 200ms',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          flexShrink: 0,
        }}>
          {renderIcon(Icon, { style: { width: iconSize, height: iconSize, color: '#fff' } })}
        </div>
      </div>
    </Card>
  );
}

// === Premium Alert Component ===
export function Alert({ children, variant = 'info', title, onClose, style = {} }) {
  const variants = {
    info: { bg: 'var(--color-info-50)', border: 'var(--color-info-200)', icon: Icons.Info, color: 'var(--color-info-600)' },
    success: { bg: 'var(--color-success-50)', border: 'var(--color-success-200)', icon: Icons.CheckCircle, color: 'var(--color-success-600)' },
    warning: { bg: 'var(--color-warning-50)', border: 'var(--color-warning-200)', icon: Icons.AlertTriangle, color: 'var(--color-warning-600)' },
    error: { bg: 'var(--color-error-50)', border: 'var(--color-error-200)', icon: Icons.AlertCircle, color: 'var(--color-error-600)' },
  };

  const v = variants[variant] || variants.info;
  const IconComponent = v.icon;

  return (
    <div style={{
      background: v.bg,
      border: `1px solid ${v.border}`,
      borderRadius: 'var(--radius-lg)',
      padding: '14px 16px',
      display: 'flex',
      gap: '12px',
      ...style,
    }}>
      <IconComponent style={{ width: 18, height: 18, color: v.color, flexShrink: 0, marginTop: '1px' }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && <p style={{ fontWeight: '600', color: v.color, marginBottom: '2px', fontSize: '14px' }}>{title}</p>}
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{children}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            color: v.color,
            opacity: 0.7,
            display: 'flex',
            borderRadius: 'var(--radius-sm)',
          }}
        >
          <Icons.X style={{ width: 14, height: 14 }} />
        </button>
      )}
    </div>
  );
}

// === Premium Spinner Component ===
export function Spinner({ size = 24, color = 'var(--color-primary-500)', thickness = 2 }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        width: size,
        height: size,
        border: `${thickness}px solid ${color}20`,
        borderTopColor: color,
        borderRadius: '50%',
        animation: 'spin 0.6s linear infinite',
      }} />
    </div>
  );
}

// === Premium Skeleton Component ===
export function Skeleton({ width = '100%', height = '20px', borderRadius = 'var(--radius-md)', style = {}, variant = 'default' }) {
  const variants = {
    default: {},
    text: { borderRadius: 'var(--radius-sm)' },
    circular: { borderRadius: '50%' },
    rectangular: { borderRadius: 'var(--radius-md)' },
  };

  const v = variants[variant] || variants.default;

  return (
    <div style={{
      width,
      height,
      borderRadius: v.borderRadius || borderRadius,
      background: 'linear-gradient(90deg, var(--color-gray-100) 25%, var(--color-gray-50) 50%, var(--color-gray-100) 75%)',
      backgroundSize: '200% 100%',
      animation: 'shimmer 1.5s infinite linear',
      ...style,
    }} />
  );
}

// === Premium Modal Component ===
export function Modal({ open, onClose, title, children, size = 'md', footer, showClose = true }) {
  const sizes = {
    sm: '400px',
    md: '520px',
    lg: '680px',
    xl: '860px',
    full: '95vw',
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--bg-backdrop)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 'var(--z-modal)',
        padding: '20px',
        animation: 'fadeIn 150ms ease-out',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'var(--bg-primary)',
          borderRadius: 'var(--radius-2xl)',
          width: '100%',
          maxWidth: sizes[size],
          maxHeight: '90vh',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-2xl)',
          animation: 'scaleIn 200ms cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 20px',
          borderBottom: '1px solid var(--border-primary)',
        }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-display)',
          }}>{title}</h3>
          {showClose && (
            <button
              onClick={onClose}
              style={{
                background: 'var(--bg-secondary)',
                border: 'none',
                cursor: 'pointer',
                padding: '6px',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-secondary)',
                display: 'flex',
                transition: 'all 150ms',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'var(--bg-tertiary)';
                e.target.style.color = 'var(--text-primary)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'var(--bg-secondary)';
                e.target.style.color = 'var(--text-secondary)';
              }}
            >
              <Icons.X style={{ width: 16, height: 16 }} />
            </button>
          )}
        </div>

        {/* Content */}
        <div style={{ padding: '20px', overflowY: 'auto', flex: 1 }}>
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div style={{
            padding: '14px 20px',
            borderTop: '1px solid var(--border-primary)',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '10px',
            background: 'var(--bg-secondary)',
          }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

// === Premium Tabs Component ===
export function Tabs({ tabs, active, onChange, style = {}, variant = 'pills' }) {
  const variants = {
    pills: {
      container: {
        display: 'flex',
        gap: '4px',
        background: 'var(--bg-tertiary)',
        padding: '4px',
        borderRadius: 'var(--radius-lg)',
      },
      tab: (isActive) => ({
        flex: 1,
        padding: '8px 14px',
        border: 'none',
        background: isActive ? 'var(--bg-primary)' : 'transparent',
        color: isActive ? 'var(--color-primary-600)' : 'var(--text-secondary)',
        fontWeight: isActive ? '600' : '500',
        fontSize: '13px',
        cursor: 'pointer',
        borderRadius: 'var(--radius-md)',
        transition: 'all 150ms',
        boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
      }),
    },
    underline: {
      container: {
        display: 'flex',
        gap: '0',
        borderBottom: '1px solid var(--border-primary)',
      },
      tab: (isActive) => ({
        padding: '10px 16px',
        border: 'none',
        borderBottom: `2px solid ${isActive ? 'var(--color-primary-500)' : 'transparent'}`,
        marginBottom: '-1px',
        background: 'transparent',
        color: isActive ? 'var(--color-primary-600)' : 'var(--text-secondary)',
        fontWeight: isActive ? '600' : '500',
        fontSize: '13px',
        cursor: 'pointer',
        transition: 'all 150ms',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
      }),
    },
  };

  const v = variants[variant] || variants.pills;

  return (
    <div style={{ ...v.container, marginBottom: '20px', ...style }}>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          style={v.tab(active === tab.key)}
        >
          {tab.icon && renderIcon(tab.icon, { style: { width: 14, height: 14 } })}
          {tab.label}
          {tab.count !== undefined && (
            <Badge size="xs" variant={active === tab.key ? 'primary' : 'default'}>{tab.count}</Badge>
          )}
        </button>
      ))}
    </div>
  );
}

// === Premium EmptyState Component ===
export function EmptyState({ icon: Icon = Icons.Folder, title, description, action }) {
  return (
    <div style={{
      textAlign: 'center',
      padding: '48px 20px',
      color: 'var(--text-secondary)',
    }}>
      <div style={{
        width: '72px',
        height: '72px',
        borderRadius: '50%',
        background: 'var(--bg-tertiary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 16px',
      }}>
        {renderIcon(Icon, { style: { width: 32, height: 32, color: 'var(--text-tertiary)' } })}
      </div>
      {title && (
        <h4 style={{
          fontSize: '15px',
          fontWeight: '600',
          color: 'var(--text-primary)',
          marginBottom: '6px',
          fontFamily: 'var(--font-display)',
        }}>
          {title}
        </h4>
      )}
      {description && (
        <p style={{
          fontSize: '13px',
          marginBottom: action ? '20px' : '0',
          maxWidth: '300px',
          margin: action ? '0 auto 20px' : '0 auto',
          lineHeight: 1.5,
        }}>
          {description}
        </p>
      )}
      {action}
    </div>
  );
}

// === Toast System ===
const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const toast = {
    success: (msg) => addToast(msg, 'success'),
    error: (msg) => addToast(msg, 'error'),
    warning: (msg) => addToast(msg, 'warning'),
    info: (msg) => addToast(msg, 'info'),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 'var(--z-toast)',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}>
        {toasts.map((t) => (
          <ToastItem key={t.id} {...t} onClose={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ message, type, onClose }) {
  const variants = {
    info: { bg: 'var(--color-primary-600)', icon: Icons.Info },
    success: { bg: 'var(--color-success-600)', icon: Icons.CheckCircle },
    warning: { bg: 'var(--color-warning-600)', icon: Icons.AlertTriangle },
    error: { bg: 'var(--color-error-600)', icon: Icons.AlertCircle },
  };

  const v = variants[type] || variants.info;
  const IconComponent = v.icon;

  return (
    <div style={{
      background: v.bg,
      color: '#fff',
      padding: '12px 16px',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-lg)',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      minWidth: '280px',
      maxWidth: '400px',
      animation: 'slideInRight 200ms ease-out',
    }}>
      <IconComponent style={{ width: 18, height: 18, flexShrink: 0 }} />
      <span style={{ flex: 1, fontSize: '13px', fontWeight: '500' }}>{message}</span>
      <button
        onClick={onClose}
        style={{
          background: 'rgba(255,255,255,0.2)',
          border: 'none',
          borderRadius: 'var(--radius-sm)',
          padding: '4px',
          cursor: 'pointer',
          color: '#fff',
          display: 'flex',
          transition: 'background 150ms',
        }}
        onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
        onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
      >
        <Icons.X style={{ width: 12, height: 12 }} />
      </button>
    </div>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

// === Premium Table Component ===
export function Table({ columns, data, loading, emptyMessage = 'No data available', onRowClick, striped = false }) {
  if (loading) {
    return (
      <div style={{ padding: '20px 0' }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} style={{ display: 'flex', gap: '16px', marginBottom: '10px', padding: '0 16px' }}>
            <Skeleton width="50px" height="36px" />
            <Skeleton width="180px" height="36px" />
            <Skeleton width="120px" height="36px" />
            <Skeleton width="100px" height="36px" />
          </div>
        ))}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <EmptyState icon={Icons.FileText} title={emptyMessage} />;
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th key={i} style={{
                textAlign: 'left',
                padding: '10px 16px',
                fontSize: '11px',
                fontWeight: '600',
                color: 'var(--text-tertiary)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                borderBottom: '1px solid var(--border-primary)',
                background: 'var(--bg-secondary)',
                whiteSpace: 'nowrap',
              }}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              onClick={() => onRowClick && onRowClick(row)}
              style={{
                cursor: onRowClick ? 'pointer' : 'default',
                transition: 'background 100ms',
                background: striped && rowIndex % 2 === 1 ? 'var(--bg-secondary)' : 'transparent',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-tertiary)'}
              onMouseLeave={(e) => e.currentTarget.style.background = striped && rowIndex % 2 === 1 ? 'var(--bg-secondary)' : 'transparent'}
            >
              {columns.map((col, colIndex) => (
                <td key={colIndex} style={{
                  padding: '12px 16px',
                  fontSize: '13px',
                  color: 'var(--text-primary)',
                  borderBottom: '1px solid var(--border-light)',
                }}>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// === Premium Dropdown Menu ===
export function DropdownMenu({ trigger, children, align = 'right' }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div style={{ position: 'relative' }} ref={ref}>
      <div onClick={() => setOpen(!open)} style={{ cursor: 'pointer' }}>{trigger}</div>
      {open && (
        <div style={{
          position: 'absolute',
          top: '100%',
          [align]: 0,
          marginTop: '6px',
          background: 'var(--bg-primary)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--border-primary)',
          minWidth: '160px',
          zIndex: 'var(--z-dropdown)',
          animation: 'fadeInDown 150ms ease-out',
          overflow: 'hidden',
          padding: '4px',
        }}>
          {React.Children.map(children, child =>
            React.cloneElement(child, { onClose: () => setOpen(false) })
          )}
        </div>
      )}
    </div>
  );
}

export function DropdownItem({ children, icon: Icon, onClick, danger = false, onClose }) {
  const handleClick = () => {
    onClick?.();
    onClose?.();
  };

  return (
    <button
      onClick={handleClick}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '8px 12px',
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        fontSize: '13px',
        color: danger ? 'var(--color-error-600)' : 'var(--text-primary)',
        borderRadius: 'var(--radius-md)',
        transition: 'background 100ms',
        textAlign: 'left',
      }}
      onMouseEnter={(e) => e.target.style.background = danger ? 'var(--color-error-50)' : 'var(--bg-tertiary)'}
      onMouseLeave={(e) => e.target.style.background = 'transparent'}
    >
      {Icon && <Icon style={{ width: 14, height: 14, flexShrink: 0 }} />}
      {children}
    </button>
  );
}

// === Premium SearchInput Component ===
export function SearchInput({ value, onChange, placeholder = 'Search...', size = 'md', style = {} }) {
  const [focused, setFocused] = useState(false);

  const sizes = {
    sm: { height: '32px', fontSize: '13px', padding: '8px 12px 8px 36px', iconSize: 14 },
    md: { height: '40px', fontSize: '14px', padding: '10px 14px 10px 40px', iconSize: 16 },
    lg: { height: '48px', fontSize: '15px', padding: '12px 16px 12px 44px', iconSize: 18 },
  };

  const s = sizes[size] || sizes.md;

  return (
    <div style={{ position: 'relative', ...style }}>
      <Icons.Search style={{
        position: 'absolute',
        left: '12px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: s.iconSize,
        height: s.iconSize,
        color: focused ? 'var(--color-primary-500)' : 'var(--text-tertiary)',
        transition: 'color 150ms',
        pointerEvents: 'none',
      }} />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%',
          height: s.height,
          padding: s.padding,
          fontSize: s.fontSize,
          fontFamily: 'var(--font-sans)',
          color: 'var(--text-primary)',
          background: 'var(--bg-primary)',
          border: `1px solid ${focused ? 'var(--color-primary-500)' : 'var(--border-primary)'}`,
          borderRadius: 'var(--radius-lg)',
          outline: 'none',
          transition: 'all 150ms',
          boxShadow: focused ? '0 0 0 3px var(--ring-color)' : 'var(--shadow-xs)',
          boxSizing: 'border-box',
        }}
      />
    </div>
  );
}

// === Premium PageHeader Component ===
export function PageHeader({ title, subtitle, actions, breadcrumbs }) {
  return (
    <div style={{ marginBottom: '24px' }}>
      {breadcrumbs && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', fontSize: '13px' }}>
          {breadcrumbs.map((crumb, i) => (
            <React.Fragment key={i}>
              {i > 0 && <Icons.ChevronRight style={{ width: 12, height: 12, color: 'var(--text-tertiary)' }} />}
              {crumb.href ? (
                <a href={crumb.href} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>{crumb.label}</a>
              ) : (
                <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
        <div>
          <h1 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: 'var(--text-primary)',
            marginBottom: subtitle ? '4px' : 0,
            fontFamily: 'var(--font-display)',
            letterSpacing: '-0.02em',
          }}>
            {title}
          </h1>
          {subtitle && <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{subtitle}</p>}
        </div>
        {actions && <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>{actions}</div>}
      </div>
    </div>
  );
}

// === Premium ConfirmDialog Component ===
export function ConfirmDialog({ open, onClose, onConfirm, title, message, confirmText = 'Confirm', cancelText = 'Cancel', variant = 'danger', loading = false }) {
  return (
    <Modal open={open} onClose={onClose} title={title} size="sm">
      <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: 1.6 }}>{message}</p>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
        <Button variant="secondary" onClick={onClose} disabled={loading}>{cancelText}</Button>
        <Button variant={variant} onClick={onConfirm} loading={loading}>{confirmText}</Button>
      </div>
    </Modal>
  );
}

// === Premium FileUpload Component ===
export function FileUpload({ onUpload, accept, multiple = false, maxSize = 10, children }) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    const validFiles = Array.from(files).filter(file => file.size <= maxSize * 1024 * 1024);
    if (validFiles.length > 0) {
      onUpload(multiple ? validFiles : validFiles[0]);
    }
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      style={{
        border: `2px dashed ${dragActive ? 'var(--color-primary-500)' : 'var(--border-secondary)'}`,
        borderRadius: 'var(--radius-xl)',
        padding: '32px 20px',
        textAlign: 'center',
        cursor: 'pointer',
        background: dragActive ? 'var(--color-primary-50)' : 'var(--bg-secondary)',
        transition: 'all 150ms',
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        style={{ display: 'none' }}
      />
      {children || (
        <>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'var(--bg-tertiary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px',
          }}>
            <Icons.Upload style={{ width: 20, height: 20, color: 'var(--text-tertiary)' }} />
          </div>
          <p style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)', marginBottom: '4px' }}>
            Drop files here or click to upload
          </p>
          <p style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
            Max file size: {maxSize}MB
          </p>
        </>
      )}
    </div>
  );
}

// === Premium Progress Component ===
export function Progress({ value = 0, max = 100, size = 'md', color = 'primary', showLabel = false, animated = false }) {
  const percentage = Math.min((value / max) * 100, 100);

  const heights = { sm: '4px', md: '6px', lg: '8px' };

  const colors = {
    primary: 'var(--color-primary-500)',
    success: 'var(--color-success-500)',
    warning: 'var(--color-warning-500)',
    danger: 'var(--color-error-500)',
  };

  return (
    <div>
      <div style={{
        width: '100%',
        height: heights[size],
        background: 'var(--bg-tertiary)',
        borderRadius: 'var(--radius-full)',
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${percentage}%`,
          height: '100%',
          background: colors[color],
          borderRadius: 'var(--radius-full)',
          transition: animated ? 'none' : 'width 300ms ease-out',
          animation: animated ? 'progressBar 2s ease-in-out' : 'none',
        }} />
      </div>
      {showLabel && (
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '6px', textAlign: 'right' }}>
          {Math.round(percentage)}%
        </p>
      )}
    </div>
  );
}

// === Premium Tooltip Component ===
export function Tooltip({ children, content, position = 'top' }) {
  const [visible, setVisible] = useState(false);

  const positions = {
    top: { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: '6px' },
    bottom: { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: '6px' },
    left: { right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: '6px' },
    right: { left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: '6px' },
  };

  return (
    <div
      style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div style={{
          position: 'absolute',
          ...positions[position],
          background: 'var(--color-gray-900)',
          color: '#fff',
          padding: '6px 10px',
          borderRadius: 'var(--radius-md)',
          fontSize: '12px',
          fontWeight: '500',
          whiteSpace: 'nowrap',
          zIndex: 'var(--z-tooltip)',
          animation: 'fadeIn 100ms ease-out',
          boxShadow: 'var(--shadow-md)',
        }}>
          {content}
        </div>
      )}
    </div>
  );
}

// === Keyboard Shortcut Badge ===
export function KBD({ children }) {
  return (
    <kbd style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2px 6px',
      fontSize: '11px',
      fontFamily: 'var(--font-mono)',
      fontWeight: '500',
      color: 'var(--text-secondary)',
      background: 'var(--bg-tertiary)',
      border: '1px solid var(--border-secondary)',
      borderRadius: 'var(--radius-sm)',
      boxShadow: 'inset 0 -1px 0 var(--border-secondary)',
    }}>
      {children}
    </kbd>
  );
}

// === Feature Card (Landing Page) ===
export function FeatureCard({ icon: Icon, title, description, color = 'primary' }) {
  const [hovered, setHovered] = useState(false);

  const colorMap = {
    primary: { bg: 'var(--color-primary-50)', icon: 'var(--color-primary-600)', border: 'var(--color-primary-200)' },
    secondary: { bg: 'var(--color-secondary-50)', icon: 'var(--color-secondary-600)', border: 'var(--color-secondary-200)' },
    accent: { bg: 'var(--color-accent-50)', icon: 'var(--color-accent-600)', border: 'var(--color-accent-200)' },
    success: { bg: 'var(--color-success-50)', icon: 'var(--color-success-600)', border: 'var(--color-success-200)' },
  };

  const c = colorMap[color] || colorMap.primary;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--bg-primary)',
        borderRadius: 'var(--radius-xl)',
        padding: '28px',
        border: `1px solid ${hovered ? c.border : 'var(--border-primary)'}`,
        boxShadow: hovered ? 'var(--shadow-lg)' : 'var(--shadow-card)',
        transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
        transform: hovered ? 'translateY(-4px)' : 'none',
      }}
    >
      <div style={{
        width: '56px',
        height: '56px',
        borderRadius: 'var(--radius-xl)',
        background: c.bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '16px',
        transition: 'transform 200ms',
        transform: hovered ? 'scale(1.08)' : 'scale(1)',
      }}>
        {renderIcon(Icon, { style: { width: 24, height: 24, color: c.icon } })}
      </div>
      <h3 style={{
        fontSize: '16px',
        fontWeight: '600',
        color: 'var(--text-primary)',
        marginBottom: '8px',
        fontFamily: 'var(--font-display)',
      }}>{title}</h3>
      <p style={{
        fontSize: '14px',
        color: 'var(--text-secondary)',
        lineHeight: 1.6,
      }}>{description}</p>
    </div>
  );
}

// === Stat Counter (Landing Page) ===
export function StatCounter({ value, label, suffix = '', prefix = '', color = 'primary' }) {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;

    const numericValue = parseInt(value.toString().replace(/[^0-9]/g, ''), 10) || 0;
    const duration = 2000;
    const steps = 60;
    const increment = numericValue / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setDisplayValue(numericValue);
        clearInterval(timer);
        setHasAnimated(true);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, hasAnimated]);

  const colorMap = {
    primary: 'var(--color-primary-600)',
    secondary: 'var(--color-secondary-600)',
    accent: 'var(--color-accent-600)',
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <div style={{
        fontSize: '42px',
        fontWeight: '700',
        color: colorMap[color] || colorMap.primary,
        lineHeight: 1,
        marginBottom: '8px',
        fontFamily: 'var(--font-display)',
        letterSpacing: '-0.02em',
      }}>
        {prefix}{displayValue.toLocaleString()}{suffix}
      </div>
      <div style={{
        fontSize: '14px',
        color: 'var(--text-secondary)',
        fontWeight: '500',
      }}>{label}</div>
    </div>
  );
}

// === Blog Card ===
export function BlogCard({ image, category, title, excerpt, date, author }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--bg-primary)',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        border: '1px solid var(--border-primary)',
        boxShadow: hovered ? 'var(--shadow-lg)' : 'var(--shadow-card)',
        transition: 'all 250ms',
        transform: hovered ? 'translateY(-2px)' : 'none',
        cursor: 'pointer',
      }}
    >
      <div style={{
        height: '160px',
        background: image ? `url(${image}) center/cover` : 'linear-gradient(135deg, var(--color-primary-100), var(--color-secondary-100))',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {category && (
          <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
            <Badge variant="primary" size="sm">{category}</Badge>
          </div>
        )}
      </div>
      <div style={{ padding: '16px' }}>
        <h4 style={{
          fontSize: '15px',
          fontWeight: '600',
          color: 'var(--text-primary)',
          marginBottom: '8px',
          lineHeight: 1.4,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>{title}</h4>
        {excerpt && (
          <p style={{
            fontSize: '13px',
            color: 'var(--text-secondary)',
            marginBottom: '12px',
            lineHeight: 1.5,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>{excerpt}</p>
        )}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '12px',
          color: 'var(--text-tertiary)',
        }}>
          {author && <span>{author}</span>}
          {date && <span>{date}</span>}
        </div>
      </div>
    </div>
  );
}

// === Hero Search Bar (Landing) ===
export function HeroSearchBar({ tabs = [], activeTab, onTabChange, onSearch, placeholder = 'Rechercher...' }) {
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(searchValue, activeTab);
  };

  return (
    <div style={{
      background: 'var(--bg-primary)',
      borderRadius: 'var(--radius-2xl)',
      padding: '8px',
      boxShadow: 'var(--shadow-xl)',
      maxWidth: '640px',
      width: '100%',
    }}>
      {tabs.length > 0 && (
        <div style={{
          display: 'flex',
          gap: '4px',
          marginBottom: '8px',
          padding: '4px',
          background: 'var(--bg-tertiary)',
          borderRadius: 'var(--radius-lg)',
        }}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => onTabChange?.(tab.key)}
              style={{
                flex: 1,
                padding: '8px 14px',
                border: 'none',
                background: activeTab === tab.key ? 'var(--bg-primary)' : 'transparent',
                color: activeTab === tab.key ? 'var(--color-primary-600)' : 'var(--text-secondary)',
                fontWeight: activeTab === tab.key ? '600' : '500',
                fontSize: '13px',
                cursor: 'pointer',
                borderRadius: 'var(--radius-md)',
                transition: 'all 150ms',
                boxShadow: activeTab === tab.key ? 'var(--shadow-sm)' : 'none',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Icons.Search style={{
            position: 'absolute',
            left: '14px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '18px',
            height: '18px',
            color: 'var(--text-tertiary)',
            pointerEvents: 'none',
          }} />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={placeholder}
            style={{
              width: '100%',
              padding: '12px 14px 12px 44px',
              border: '1px solid var(--border-primary)',
              borderRadius: 'var(--radius-lg)',
              fontSize: '14px',
              color: 'var(--text-primary)',
              outline: 'none',
              transition: 'all 150ms',
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: '12px 24px',
            background: 'var(--bg-gradient-accent)',
            color: '#fff',
            border: 'none',
            borderRadius: 'var(--radius-lg)',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 150ms',
            boxShadow: 'var(--shadow-accent)',
          }}
        >
          Rechercher
        </button>
      </form>
    </div>
  );
}

// === CTA Button (Landing) ===
export function CTAButton({ children, variant = 'primary', size = 'md', onClick, fullWidth = false, style = {} }) {
  const [hovered, setHovered] = useState(false);

  const variants = {
    primary: {
      background: 'var(--bg-gradient-accent)',
      color: '#fff',
      boxShadow: 'var(--shadow-accent)',
    },
    outline: {
      background: 'transparent',
      color: '#fff',
      border: '2px solid rgba(255, 255, 255, 0.5)',
    },
    white: {
      background: '#fff',
      color: 'var(--color-primary-600)',
      boxShadow: 'var(--shadow-md)',
    },
  };

  const sizes = {
    sm: { padding: '10px 20px', fontSize: '13px' },
    md: { padding: '12px 24px', fontSize: '14px' },
    lg: { padding: '14px 28px', fontSize: '15px' },
  };

  const v = variants[variant];
  const s = sizes[size];

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        border: v.border || 'none',
        borderRadius: 'var(--radius-full)',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 200ms',
        transform: hovered ? 'translateY(-2px)' : 'none',
        ...s,
        background: v.background,
        color: v.color,
        boxShadow: hovered ? 'var(--shadow-lg)' : (v.boxShadow || 'none'),
        width: fullWidth ? '100%' : 'auto',
        ...style,
      }}
    >
      {children}
    </button>
  );
}

// === Divider ===
export function Divider({ vertical = false, style = {} }) {
  return (
    <div style={{
      background: 'var(--border-primary)',
      ...(vertical ? { width: '1px', alignSelf: 'stretch' } : { height: '1px', width: '100%' }),
      ...style,
    }} />
  );
}

// === Quick Actions Bar ===
export function QuickActionsBar({ actions }) {
  return (
    <div style={{
      display: 'flex',
      gap: '8px',
      padding: '12px',
      background: 'var(--bg-secondary)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border-primary)',
    }}>
      {actions.map((action, i) => (
        <Button
          key={i}
          variant="ghost"
          size="sm"
          icon={action.icon}
          onClick={action.onClick}
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
}

// Export all components
const UIComponents = {
  Icons,
  Button,
  Input,
  Select,
  Textarea,
  Card,
  Badge,
  Avatar,
  StatCard,
  Alert,
  Spinner,
  Skeleton,
  Modal,
  Tabs,
  EmptyState,
  ToastProvider,
  useToast,
  Table,
  DropdownMenu,
  DropdownItem,
  SearchInput,
  PageHeader,
  ConfirmDialog,
  FileUpload,
  Progress,
  Tooltip,
  KBD,
  FeatureCard,
  StatCounter,
  BlogCard,
  HeroSearchBar,
  CTAButton,
  Divider,
  QuickActionsBar,
};

export default UIComponents;
