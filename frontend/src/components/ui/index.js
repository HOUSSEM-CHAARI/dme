import React, { useState, useEffect, createContext, useContext } from 'react';

// ============================================
// DME Premium UI Component Library
// Modern Healthcare SaaS Platform
// ============================================

// === Icon Components (SVG-based) ===
export const Icons = {
  // Navigation
  Home: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  ),
  Users: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  ),
  User: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  ),
  FileText: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  ),
  Folder: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
    </svg>
  ),
  Calendar: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  ),
  Settings: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </svg>
  ),
  LogOut: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
      <polyline points="16 17 21 12 16 7"></polyline>
      <line x1="21" y1="12" x2="9" y2="12"></line>
    </svg>
  ),
  Search: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  ),
  Bell: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>
  ),
  // Actions
  Plus: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  ),
  Edit: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
  ),
  Trash: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      <line x1="10" y1="11" x2="10" y2="17"></line>
      <line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
  ),
  Download: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
  ),
  Upload: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="17 8 12 3 7 8"></polyline>
      <line x1="12" y1="3" x2="12" y2="15"></line>
    </svg>
  ),
  Eye: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  ),
  EyeOff: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
      <line x1="1" y1="1" x2="23" y2="23"></line>
    </svg>
  ),
  // Status
  Check: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  ),
  X: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  ),
  AlertCircle: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
  ),
  CheckCircle: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  ),
  Info: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
  ),
  // Medical
  Heart: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
  ),
  Activity: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
    </svg>
  ),
  Clipboard: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
    </svg>
  ),
  Stethoscope: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"></path>
      <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"></path>
      <circle cx="20" cy="10" r="2"></circle>
    </svg>
  ),
  Pill: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"></path>
      <path d="m8.5 8.5 7 7"></path>
    </svg>
  ),
  TestTube: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5h0c-1.4 0-2.5-1.1-2.5-2.5V2"></path>
      <path d="M8.5 2h7"></path>
      <path d="M14.5 16h-5"></path>
    </svg>
  ),
  Image: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <circle cx="8.5" cy="8.5" r="1.5"></circle>
      <polyline points="21 15 16 10 5 21"></polyline>
    </svg>
  ),
  BarChart: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="12" y1="20" x2="12" y2="10"></line>
      <line x1="18" y1="20" x2="18" y2="4"></line>
      <line x1="6" y1="20" x2="6" y2="16"></line>
    </svg>
  ),
  // Arrows
  ChevronRight: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  ),
  ChevronLeft: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
  ),
  ChevronDown: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  ),
  ArrowRight: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  ),
  // Other
  Menu: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
  ),
  MoreVertical: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="1"></circle>
      <circle cx="12" cy="5" r="1"></circle>
      <circle cx="12" cy="19" r="1"></circle>
    </svg>
  ),
  Clock: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  ),
  Phone: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
  ),
  Mail: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  ),
  MapPin: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  ),
  Printer: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="6 9 6 2 18 2 18 9"></polyline>
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
      <rect x="6" y="14" width="12" height="8"></rect>
    </svg>
  ),
  Filter: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
    </svg>
  ),
  RefreshCw: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="23 4 23 10 17 10"></polyline>
      <polyline points="1 20 1 14 7 14"></polyline>
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
    </svg>
  ),
  Lock: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  ),
  UserPlus: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="8.5" cy="7" r="4"></circle>
      <line x1="20" y1="8" x2="20" y2="14"></line>
      <line x1="23" y1="11" x2="17" y2="11"></line>
    </svg>
  ),
  Building: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
      <path d="M9 22v-4h6v4"></path>
      <path d="M8 6h.01"></path>
      <path d="M16 6h.01"></path>
      <path d="M12 6h.01"></path>
      <path d="M12 10h.01"></path>
      <path d="M12 14h.01"></path>
      <path d="M16 10h.01"></path>
      <path d="M16 14h.01"></path>
      <path d="M8 10h.01"></path>
      <path d="M8 14h.01"></path>
    </svg>
  ),
  Award: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="8" r="7"></circle>
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
    </svg>
  ),
  AlertTriangle: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
      <line x1="12" y1="9" x2="12" y2="13"></line>
      <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
  ),
  ArrowLeft: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="19" y1="12" x2="5" y2="12"></line>
      <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
  ),
  Save: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
      <polyline points="17 21 17 13 7 13 7 21"></polyline>
      <polyline points="7 3 7 8 15 8"></polyline>
    </svg>
  ),
  Shield: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
  ),
  Zap: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
  ),
  LogIn: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
      <polyline points="10 17 15 12 10 7"></polyline>
      <line x1="15" y1="12" x2="3" y2="12"></line>
    </svg>
  ),
  Trash2: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      <line x1="10" y1="11" x2="10" y2="17"></line>
      <line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
  ),
};

// === Component Styles (CSS-in-JS with design tokens) ===
const styles = {
  // Button styles
  button: {
    base: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      fontFamily: 'var(--font-family)',
      fontWeight: '500',
      borderRadius: 'var(--radius-lg)',
      cursor: 'pointer',
      transition: 'all var(--transition-fast)',
      border: 'none',
      outline: 'none',
      whiteSpace: 'nowrap',
    },
    sizes: {
      xs: { padding: '6px 12px', fontSize: '12px', height: '28px' },
      sm: { padding: '8px 16px', fontSize: '13px', height: '32px' },
      md: { padding: '10px 20px', fontSize: '14px', height: '40px' },
      lg: { padding: '12px 24px', fontSize: '15px', height: '48px' },
      xl: { padding: '16px 32px', fontSize: '16px', height: '56px' },
    },
    variants: {
      primary: {
        background: 'linear-gradient(135deg, var(--color-primary-600) 0%, var(--color-primary-700) 100%)',
        color: '#fff',
        boxShadow: '0 2px 4px rgba(37, 99, 235, 0.2)',
      },
      secondary: {
        background: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        border: '1px solid var(--border-light)',
        boxShadow: 'var(--shadow-xs)',
      },
      success: {
        background: 'linear-gradient(135deg, var(--color-success-500) 0%, var(--color-success-600) 100%)',
        color: '#fff',
        boxShadow: '0 2px 4px rgba(16, 185, 129, 0.2)',
      },
      danger: {
        background: 'linear-gradient(135deg, var(--color-error-500) 0%, var(--color-error-600) 100%)',
        color: '#fff',
        boxShadow: '0 2px 4px rgba(239, 68, 68, 0.2)',
      },
      warning: {
        background: 'linear-gradient(135deg, var(--color-warning-500) 0%, var(--color-warning-600) 100%)',
        color: '#fff',
        boxShadow: '0 2px 4px rgba(245, 158, 11, 0.2)',
      },
      ghost: {
        background: 'transparent',
        color: 'var(--color-primary-600)',
      },
      outline: {
        background: 'transparent',
        color: 'var(--color-primary-600)',
        border: '1px solid var(--color-primary-600)',
      },
    },
  },
};

// === Icon Rendering Helper ===
/**
 * Safely renders an icon whether it is a Component reference or a JSX element.
 */
const renderIcon = (icon, props = {}) => {
  if (!icon) return null;
  if (React.isValidElement(icon)) return icon;
  const IconComponent = icon;
  return <IconComponent {...props} />;
};

// === Button Component ===
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
  style = {}
}) {
  const baseStyle = {
    ...styles.button.base,
    ...styles.button.sizes[size],
    ...styles.button.variants[variant],
    ...(fullWidth && { width: '100%' }),
    ...(disabled && { opacity: 0.5, cursor: 'not-allowed' }),
    ...style,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={className}
      style={baseStyle}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.target.style.transform = 'translateY(-1px)';
          e.target.style.boxShadow = variant === 'primary'
            ? '0 4px 12px rgba(37, 99, 235, 0.3)'
            : 'var(--shadow-md)';
        }
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = styles.button.variants[variant]?.boxShadow || 'none';
      }}
    >
      {loading && (
        <span key="loader" style={{
          width: size === 'sm' ? 14 : 16,
          height: size === 'sm' ? 14 : 16,
          border: '2px solid currentColor',
          borderTopColor: 'transparent',
          borderRadius: '50%',
          animation: 'spin 0.7s linear infinite',
        }} />
      )}
      {!loading && Icon && iconPosition === 'left' && renderIcon(Icon, { style: { width: size === 'sm' ? 14 : 18, height: size === 'sm' ? 14 : 18 } })}
      {children}
      {!loading && Icon && iconPosition === 'right' && renderIcon(Icon, { style: { width: size === 'sm' ? 14 : 18, height: size === 'sm' ? 14 : 18 } })}
    </button>
  );
}

// === Input Component ===
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
  style = {},
  inputStyle = {},
  ...props
}) {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div style={{ marginBottom: '20px', ...style }}>
      {label && (
        <label style={{
          display: 'block',
          fontSize: '14px',
          fontWeight: '500',
          color: 'var(--text-primary)',
          marginBottom: '8px',
        }}>
          {label}
          {required && <span style={{ color: 'var(--color-error-500)', marginLeft: '4px' }}>*</span>}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        {Icon && (
          <div style={{
            position: 'absolute',
            left: '14px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: focused ? 'var(--color-primary-500)' : 'var(--text-tertiary)',
            transition: 'color var(--transition-fast)',
            display: 'flex'
          }}>{renderIcon(Icon, { size: 18 })}</div>
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
            padding: Icon ? '12px 14px 12px 44px' : '12px 14px',
            paddingRight: isPassword ? '44px' : '14px',
            fontSize: '14px',
            fontFamily: 'var(--font-family)',
            color: 'var(--text-primary)',
            background: disabled ? 'var(--bg-tertiary)' : 'var(--bg-primary)',
            border: `1px solid ${error ? 'var(--color-error-500)' : focused ? 'var(--color-primary-500)' : 'var(--border-light)'}`,
            borderRadius: 'var(--radius-lg)',
            outline: 'none',
            transition: 'all var(--transition-fast)',
            boxShadow: focused ? '0 0 0 3px rgba(59, 130, 246, 0.1)' : 'none',
            boxSizing: 'border-box',
            ...inputStyle,
          }}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              color: 'var(--text-tertiary)',
            }}
          >
            {showPassword ? <Icons.EyeOff style={{ width: 18, height: 18 }} /> : <Icons.Eye style={{ width: 18, height: 18 }} />}
          </button>
        )}
      </div>
      {helpText && !error && (
        <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '6px' }}>{helpText}</p>
      )}
      {error && (
        <p style={{ fontSize: '12px', color: 'var(--color-error-500)', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Icons.AlertCircle style={{ width: 14, height: 14 }} />
          {error}
        </p>
      )}
    </div>
  );
}

// === Select Component ===
export function Select({ label, children, error, value, onChange, disabled, required, style = {}, ...props }) {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ marginBottom: '20px', ...style }}>
      {label && (
        <label style={{
          display: 'block',
          fontSize: '14px',
          fontWeight: '500',
          color: 'var(--text-primary)',
          marginBottom: '8px',
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
            padding: '12px 40px 12px 14px',
            fontSize: '14px',
            fontFamily: 'var(--font-family)',
            color: 'var(--text-primary)',
            background: disabled ? 'var(--bg-tertiary)' : 'var(--bg-primary)',
            border: `1px solid ${error ? 'var(--color-error-500)' : focused ? 'var(--color-primary-500)' : 'var(--border-light)'}`,
            borderRadius: 'var(--radius-lg)',
            outline: 'none',
            cursor: 'pointer',
            appearance: 'none',
            transition: 'all var(--transition-fast)',
            boxShadow: focused ? '0 0 0 3px rgba(59, 130, 246, 0.1)' : 'none',
            boxSizing: 'border-box',
          }}
          {...props}
        >
          {children}
        </select>
        <Icons.ChevronDown style={{
          position: 'absolute',
          right: '14px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '18px',
          height: '18px',
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

// === Textarea Component ===
export function Textarea({ label, error, rows = 4, required, value, onChange, placeholder, style = {}, ...props }) {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ marginBottom: '20px', ...style }}>
      {label && (
        <label style={{
          display: 'block',
          fontSize: '14px',
          fontWeight: '500',
          color: 'var(--text-primary)',
          marginBottom: '8px',
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
          fontFamily: 'var(--font-family)',
          color: 'var(--text-primary)',
          background: 'var(--bg-primary)',
          border: `1px solid ${error ? 'var(--color-error-500)' : focused ? 'var(--color-primary-500)' : 'var(--border-light)'}`,
          borderRadius: 'var(--radius-lg)',
          outline: 'none',
          resize: 'vertical',
          transition: 'all var(--transition-fast)',
          boxShadow: focused ? '0 0 0 3px rgba(59, 130, 246, 0.1)' : 'none',
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

// === Card Component ===
export function Card({ children, style = {}, padding = '24px', hover = false, onClick, className = '' }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      className={className}
      onMouseEnter={() => hover && setIsHovered(true)}
      onMouseLeave={() => hover && setIsHovered(false)}
      style={{
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-xl)',
        padding,
        boxShadow: isHovered ? 'var(--shadow-card-hover)' : 'var(--shadow-card)',
        border: '1px solid var(--border-light)',
        transition: 'all var(--transition-normal)',
        cursor: onClick ? 'pointer' : 'default',
        transform: isHovered ? 'translateY(-2px)' : 'none',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// === Badge Component ===
export function Badge({ children, variant = 'default', size = 'md', dot = false }) {
  const variants = {
    default: { bg: 'var(--color-gray-100)', color: 'var(--color-gray-700)' },
    primary: { bg: 'var(--color-primary-100)', color: 'var(--color-primary-700)' },
    success: { bg: 'var(--color-success-100)', color: 'var(--color-success-700)' },
    warning: { bg: 'var(--color-warning-100)', color: 'var(--color-warning-700)' },
    danger: { bg: 'var(--color-error-100)', color: 'var(--color-error-700)' },
    info: { bg: 'var(--color-info-100)', color: 'var(--color-info-600)' },
    purple: { bg: '#f3e8ff', color: '#7c3aed' },
  };

  const sizes = {
    sm: { padding: '2px 8px', fontSize: '11px' },
    md: { padding: '4px 10px', fontSize: '12px' },
    lg: { padding: '6px 12px', fontSize: '13px' },
  };

  const v = variants[variant] || variants.default;
  const s = sizes[size] || sizes.md;

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      background: v.bg,
      color: v.color,
      ...s,
      fontWeight: '600',
      borderRadius: 'var(--radius-full)',
      whiteSpace: 'nowrap',
    }}>
      {dot && (
        <span style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: v.color,
        }} />
      )}
      {children}
    </span>
  );
}

// === Avatar Component ===
export function Avatar({ name = '', src, size = 40, status }) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  const colors = [
    { bg: '#dbeafe', color: '#1e40af' },
    { bg: '#dcfce7', color: '#166534' },
    { bg: '#fce7f3', color: '#9d174d' },
    { bg: '#fed7aa', color: '#9a3412' },
    { bg: '#e9d5ff', color: '#6b21a8' },
    { bg: '#ccfbf1', color: '#115e59' },
  ];
  const colorIndex = name.charCodeAt(0) % colors.length;
  const { bg, color } = colors[colorIndex];

  const statusColors = {
    online: '#10b981',
    offline: '#6b7280',
    busy: '#ef4444',
    away: '#f59e0b',
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {src ? (
        <img
          src={src}
          alt={name}
          style={{
            width: size,
            height: size,
            borderRadius: '50%',
            objectFit: 'cover',
            border: '2px solid var(--bg-primary)',
            boxShadow: 'var(--shadow-sm)',
          }}
        />
      ) : (
        <div style={{
          width: size,
          height: size,
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${bg} 0%, ${bg}dd 100%)`,
          color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: '600',
          fontSize: size * 0.38,
          border: '2px solid var(--bg-primary)',
          boxShadow: 'var(--shadow-sm)',
        }}>
          {initials || <Icons.User style={{ width: size * 0.5, height: size * 0.5 }} />}
        </div>
      )}
      {status && (
        <span style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: size * 0.28,
          height: size * 0.28,
          borderRadius: '50%',
          background: statusColors[status] || statusColors.offline,
          border: '2px solid var(--bg-primary)',
        }} />
      )}
    </div>
  );
}

// === StatCard Component ===
export function StatCard({ label, value, icon: Icon, iconSize = 24, trend, trendValue, color = 'primary', loading = false }) {
  const colors = {
    primary: { bg: 'var(--color-primary-50)', icon: 'var(--color-primary-500)', gradient: 'linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600))' },
    success: { bg: 'var(--color-success-50)', icon: 'var(--color-success-500)', gradient: 'linear-gradient(135deg, var(--color-success-500), var(--color-success-600))' },
    warning: { bg: 'var(--color-warning-50)', icon: 'var(--color-warning-500)', gradient: 'linear-gradient(135deg, var(--color-warning-500), var(--color-warning-600))' },
    danger: { bg: 'var(--color-error-50)', icon: 'var(--color-error-500)', gradient: 'linear-gradient(135deg, var(--color-error-500), var(--color-error-600))' },
    purple: { bg: '#f3e8ff', icon: '#7c3aed', gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' },
    teal: { bg: 'var(--color-secondary-50)', icon: 'var(--color-secondary-500)', gradient: 'linear-gradient(135deg, var(--color-secondary-500), var(--color-secondary-600))' },
  };

  const c = colors[color] || colors.primary;

  return (
    <Card style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-secondary)', marginBottom: '8px' }}>
            {label}
          </p>
          {loading ? (
            <div style={{ width: '80px', height: '32px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', animation: 'pulse 2s ease-in-out infinite' }} />
          ) : (
            <p style={{ fontSize: '28px', fontWeight: '700', color: 'var(--text-primary)', lineHeight: 1.2 }}>
              {value}
            </p>
          )}
          {trend && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '8px' }}>
              <span style={{
                fontSize: '12px',
                fontWeight: '600',
                color: trend === 'up' ? 'var(--color-success-600)' : 'var(--color-error-600)',
              }}>
                {trend === 'up' ? '↑' : '↓'} {trendValue}
              </span>
              <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>vs last month</span>
            </div>
          )}
        </div>
        <div style={{
          width: '52px',
          height: '52px',
          borderRadius: 'var(--radius-xl)',
          background: c.gradient,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 4px 12px ${c.icon}33`,
        }}>
          {renderIcon(Icon, { size: iconSize, style: { color: '#fff' } })}
        </div>
      </div>
    </Card>
  );
}

// === Alert Component ===
export function Alert({ children, variant = 'info', title, onClose, style = {} }) {
  const variants = {
    info: { bg: 'var(--color-info-50)', border: 'var(--color-info-500)', icon: Icons.Info, color: 'var(--color-info-600)' },
    success: { bg: 'var(--color-success-50)', border: 'var(--color-success-500)', icon: Icons.CheckCircle, color: 'var(--color-success-600)' },
    warning: { bg: 'var(--color-warning-50)', border: 'var(--color-warning-500)', icon: Icons.AlertCircle, color: 'var(--color-warning-600)' },
    error: { bg: 'var(--color-error-50)', border: 'var(--color-error-500)', icon: Icons.AlertCircle, color: 'var(--color-error-600)' },
  };

  const v = variants[variant] || variants.info;
  const IconComponent = v.icon;

  return (
    <div style={{
      background: v.bg,
      borderLeft: `4px solid ${v.border}`,
      borderRadius: 'var(--radius-lg)',
      padding: '16px',
      display: 'flex',
      gap: '12px',
      marginBottom: '16px',
      ...style,
    }}>
      <IconComponent style={{ width: 20, height: 20, color: v.color, flexShrink: 0, marginTop: '2px' }} />
      <div style={{ flex: 1 }}>
        {title && <p style={{ fontWeight: '600', color: v.color, marginBottom: '4px' }}>{title}</p>}
        <p style={{ fontSize: '14px', color: 'var(--text-primary)', lineHeight: 1.5 }}>{children}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: v.color }}
        >
          <Icons.X style={{ width: 16, height: 16 }} />
        </button>
      )}
    </div>
  );
}

// === Spinner Component ===
export function Spinner({ size = 32, color = 'var(--color-primary-500)' }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      <div style={{
        width: size,
        height: size,
        border: `3px solid ${color}22`,
        borderTopColor: color,
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
    </div>
  );
}

// === LoadingSkeleton Component ===
export function Skeleton({ width = '100%', height = '20px', borderRadius = 'var(--radius-md)', style = {} }) {
  return (
    <div style={{
      width,
      height,
      borderRadius,
      background: 'linear-gradient(90deg, var(--bg-tertiary) 25%, var(--bg-secondary) 50%, var(--bg-tertiary) 75%)',
      backgroundSize: '200% 100%',
      animation: 'shimmer 1.5s infinite',
      ...style,
    }} />
  );
}

// === Modal Component ===
export function Modal({ open, onClose, title, children, size = 'md', footer }) {
  const sizes = {
    sm: '400px',
    md: '560px',
    lg: '720px',
    xl: '900px',
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

  if (!open) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--bg-overlay)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 'var(--z-modal)',
        padding: '20px',
        animation: 'fadeIn var(--transition-fast)',
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
          animation: 'scaleIn var(--transition-normal)',
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
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-light)',
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text-primary)' }}>{title}</h3>
          <button
            onClick={onClose}
            style={{
              background: 'var(--bg-tertiary)',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-secondary)',
              display: 'flex',
              transition: 'all var(--transition-fast)',
            }}
          >
            <Icons.X style={{ width: 18, height: 18 }} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div style={{
            padding: '16px 24px',
            borderTop: '1px solid var(--border-light)',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px',
            background: 'var(--bg-secondary)',
          }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

// === Tabs Component ===
export function Tabs({ tabs, active, onChange, style = {} }) {
  return (
    <div style={{
      display: 'flex',
      gap: '4px',
      background: 'var(--bg-tertiary)',
      padding: '4px',
      borderRadius: 'var(--radius-lg)',
      marginBottom: '24px',
      ...style,
    }}>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          style={{
            flex: 1,
            padding: '10px 16px',
            border: 'none',
            background: active === tab.key ? 'var(--bg-primary)' : 'transparent',
            color: active === tab.key ? 'var(--color-primary-600)' : 'var(--text-secondary)',
            fontWeight: active === tab.key ? '600' : '500',
            fontSize: '14px',
            cursor: 'pointer',
            borderRadius: 'var(--radius-md)',
            transition: 'all var(--transition-fast)',
            boxShadow: active === tab.key ? 'var(--shadow-sm)' : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          {tab.icon && renderIcon(tab.icon, { size: 16 })}
          {tab.label}
          {tab.count !== undefined && (
            <Badge size="sm" variant={active === tab.key ? 'primary' : 'default'}>{tab.count}</Badge>
          )}
        </button>
      ))}
    </div>
  );
}

// === EmptyState Component ===
export function EmptyState({ icon: Icon = Icons.Folder, title, description, action }) {
  return (
    <div style={{
      textAlign: 'center',
      padding: '60px 20px',
      color: 'var(--text-secondary)',
    }}>
      <div style={{
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: 'var(--bg-tertiary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 20px',
      }}>
        {renderIcon(Icon, { size: 36, style: { color: 'var(--text-tertiary)' } })}
      </div>
      {title && (
        <h4 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>
          {title}
        </h4>
      )}
      {description && (
        <p style={{ fontSize: '14px', marginBottom: '20px', maxWidth: '320px', margin: '0 auto 20px' }}>
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

  const addToast = (message, type = 'info', duration = 4000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  };

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
        bottom: '24px',
        right: '24px',
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
    warning: { bg: 'var(--color-warning-600)', icon: Icons.AlertCircle },
    error: { bg: 'var(--color-error-600)', icon: Icons.AlertCircle },
  };

  const v = variants[type] || variants.info;
  const IconComponent = v.icon;

  return (
    <div style={{
      background: v.bg,
      color: '#fff',
      padding: '14px 20px',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-lg)',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      minWidth: '320px',
      maxWidth: '480px',
      animation: 'slideInRight var(--transition-normal)',
    }}>
      <IconComponent style={{ width: 20, height: 20, flexShrink: 0 }} />
      <span style={{ flex: 1, fontSize: '14px', fontWeight: '500' }}>{message}</span>
      <button
        onClick={onClose}
        style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '4px', padding: '4px', cursor: 'pointer', color: '#fff', display: 'flex' }}
      >
        <Icons.X style={{ width: 14, height: 14 }} />
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

// === Table Component ===
export function Table({ columns, data, loading, emptyMessage = 'No data available', onRowClick }) {
  if (loading) {
    return (
      <div style={{ padding: '40px 0' }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
            <Skeleton width="60px" height="40px" />
            <Skeleton width="200px" height="40px" />
            <Skeleton width="150px" height="40px" />
            <Skeleton width="100px" height="40px" />
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
                padding: '12px 16px',
                fontSize: '12px',
                fontWeight: '600',
                color: 'var(--text-secondary)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                borderBottom: '1px solid var(--border-light)',
                background: 'var(--bg-secondary)',
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
                transition: 'background var(--transition-fast)',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-secondary)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              {columns.map((col, colIndex) => (
                <td key={colIndex} style={{
                  padding: '16px',
                  fontSize: '14px',
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

// === Dropdown Menu ===
export function DropdownMenu({ trigger, children, align = 'right' }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <div onClick={() => setOpen(!open)}>{trigger}</div>
      {open && (
        <>
          <div style={{ position: 'fixed', inset: 0, zIndex: 999 }} onClick={() => setOpen(false)} />
          <div style={{
            position: 'absolute',
            top: '100%',
            [align]: 0,
            marginTop: '8px',
            background: 'var(--bg-primary)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--border-light)',
            minWidth: '180px',
            zIndex: 1000,
            animation: 'fadeInDown var(--transition-fast)',
            overflow: 'hidden',
          }}>
            {children}
          </div>
        </>
      )}
    </div>
  );
}

export function DropdownItem({ children, icon: Icon, onClick, danger = false }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '10px 16px',
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        fontSize: '14px',
        color: danger ? 'var(--color-error-600)' : 'var(--text-primary)',
        transition: 'background var(--transition-fast)',
      }}
      onMouseEnter={(e) => e.target.style.background = danger ? 'var(--color-error-50)' : 'var(--bg-secondary)'}
      onMouseLeave={(e) => e.target.style.background = 'transparent'}
    >
      {Icon && <Icon style={{ width: 16, height: 16 }} />}
      {children}
    </button>
  );
}

// === SearchInput Component ===
export function SearchInput({ value, onChange, placeholder = 'Search...', style = {} }) {
  return (
    <div style={{ position: 'relative', ...style }}>
      <Icons.Search style={{
        position: 'absolute',
        left: '14px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '18px',
        height: '18px',
        color: 'var(--text-tertiary)',
      }} />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '10px 14px 10px 44px',
          fontSize: '14px',
          fontFamily: 'var(--font-family)',
          color: 'var(--text-primary)',
          background: 'var(--bg-primary)',
          border: '1px solid var(--border-light)',
          borderRadius: 'var(--radius-lg)',
          outline: 'none',
          transition: 'all var(--transition-fast)',
          boxSizing: 'border-box',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = 'var(--color-primary-500)';
          e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = 'var(--border-light)';
          e.target.style.boxShadow = 'none';
        }}
      />
    </div>
  );
}

// === PageHeader Component ===
export function PageHeader({ title, subtitle, actions, breadcrumbs }) {
  return (
    <div style={{ marginBottom: '32px' }}>
      {breadcrumbs && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontSize: '13px' }}>
          {breadcrumbs.map((crumb, i) => (
            <React.Fragment key={i}>
              {i > 0 && <Icons.ChevronRight style={{ width: 14, height: 14, color: 'var(--text-tertiary)' }} />}
              {crumb.href ? (
                <a href={crumb.href} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>{crumb.label}</a>
              ) : (
                <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: subtitle ? '4px' : 0 }}>
            {title}
          </h1>
          {subtitle && <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{subtitle}</p>}
        </div>
        {actions && <div style={{ display: 'flex', gap: '12px' }}>{actions}</div>}
      </div>
    </div>
  );
}

// === ConfirmDialog Component ===
export function ConfirmDialog({ open, onClose, onConfirm, title, message, confirmText = 'Confirm', cancelText = 'Cancel', variant = 'danger' }) {
  return (
    <Modal open={open} onClose={onClose} title={title} size="sm">
      <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: 1.6 }}>{message}</p>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
        <Button variant="secondary" onClick={onClose}>{cancelText}</Button>
        <Button variant={variant} onClick={onConfirm}>{confirmText}</Button>
      </div>
    </Modal>
  );
}

// === FileUpload Component ===
export function FileUpload({ onUpload, accept, multiple = false, maxSize = 10, children }) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = React.useRef(null);

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
        border: `2px dashed ${dragActive ? 'var(--color-primary-500)' : 'var(--border-medium)'}`,
        borderRadius: 'var(--radius-xl)',
        padding: '40px 20px',
        textAlign: 'center',
        cursor: 'pointer',
        background: dragActive ? 'var(--color-primary-50)' : 'var(--bg-secondary)',
        transition: 'all var(--transition-fast)',
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
          <Icons.Upload style={{ width: 40, height: 40, color: 'var(--text-tertiary)', marginBottom: '12px' }} />
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

// === Progress Component ===
export function Progress({ value = 0, max = 100, size = 'md', color = 'primary', showLabel = false }) {
  const percentage = Math.min((value / max) * 100, 100);
  const heights = { sm: '4px', md: '8px', lg: '12px' };
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
          transition: 'width var(--transition-slow)',
        }} />
      </div>
      {showLabel && (
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px', textAlign: 'right' }}>
          {Math.round(percentage)}%
        </p>
      )}
    </div>
  );
}

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
};

export default UIComponents;
