-- =========================================
-- DME - Dossiers Médicaux Électroniques
-- Database Initialization Script
-- =========================================

CREATE DATABASE IF NOT EXISTS dme_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE dme_db;

-- =====================
-- USERS
-- =====================
CREATE TABLE IF NOT EXISTS users (
  id_user       INT AUTO_INCREMENT PRIMARY KEY,
  email         VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role          ENUM('patient', 'doctor', 'staff') NOT NULL,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_role  (role)
) ENGINE=InnoDB;

-- =====================
-- DOCTORS
-- =====================
CREATE TABLE IF NOT EXISTS doctors (
  id_doctor            INT AUTO_INCREMENT PRIMARY KEY,
  id_user              INT NOT NULL UNIQUE,
  first_name           VARCHAR(100),
  last_name            VARCHAR(100),
  specialization       VARCHAR(150),
  license_number       VARCHAR(100),
  hospital_affiliation VARCHAR(200),
  FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE,
  INDEX idx_doctor_user (id_user)
) ENGINE=InnoDB;

-- =====================
-- PATIENTS
-- =====================
CREATE TABLE IF NOT EXISTS patients (
  id_patient       INT AUTO_INCREMENT PRIMARY KEY,
  id_user          INT NOT NULL UNIQUE,
  first_name       VARCHAR(100) NOT NULL,
  last_name        VARCHAR(100) NOT NULL,
  dob              DATE,
  phone_number     VARCHAR(30),
  address          TEXT,
  blood_type       VARCHAR(10),
  allergies        TEXT,
  chronic_diseases TEXT,
  FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE,
  INDEX idx_patient_user (id_user),
  INDEX idx_patient_name (last_name, first_name)
) ENGINE=InnoDB;

-- =====================
-- MEDICAL RECORDS
-- =====================
CREATE TABLE IF NOT EXISTS medical_records (
  id_record    INT AUTO_INCREMENT PRIMARY KEY,
  id_patient   INT NOT NULL,
  diagnosis    TEXT,
  treatment    TEXT,
  doctor_name  VARCHAR(200),
  visit_reason VARCHAR(255),
  status       ENUM('completed', 'in_progress', 'scheduled') DEFAULT 'completed',
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (id_patient) REFERENCES patients(id_patient) ON DELETE CASCADE,
  INDEX idx_record_patient (id_patient),
  INDEX idx_record_date    (created_at)
) ENGINE=InnoDB;

-- =====================
-- PRESCRIPTIONS
-- =====================
CREATE TABLE IF NOT EXISTS prescriptions (
  id_prescription INT AUTO_INCREMENT PRIMARY KEY,
  id_patient      INT NOT NULL,
  doctor_id       INT,
  medication      VARCHAR(255) NOT NULL,
  dosage          VARCHAR(100),
  frequency       VARCHAR(100),
  duration        VARCHAR(100),
  instructions    TEXT,
  prescribed_on   DATE NOT NULL,
  status          ENUM('active', 'expired', 'cancelled') DEFAULT 'active',
  FOREIGN KEY (id_patient) REFERENCES patients(id_patient) ON DELETE CASCADE,
  FOREIGN KEY (doctor_id)  REFERENCES doctors(id_doctor)   ON DELETE SET NULL,
  INDEX idx_prescription_patient (id_patient),
  INDEX idx_prescription_date    (prescribed_on)
) ENGINE=InnoDB;

-- =====================
-- ANALYSES
-- =====================
CREATE TABLE IF NOT EXISTS analyses (
  id_analysis      INT AUTO_INCREMENT PRIMARY KEY,
  id_patient       INT NOT NULL,
  doctor_id        INT,
  exam_name        VARCHAR(255) NOT NULL,
  result           VARCHAR(255),
  reference_range  VARCHAR(100),
  status           ENUM('normal', 'elevated', 'low', 'pending') DEFAULT 'pending',
  analysis_results TEXT,
  date_of_analysis DATE NOT NULL,
  category         VARCHAR(100),
  FOREIGN KEY (id_patient) REFERENCES patients(id_patient) ON DELETE CASCADE,
  FOREIGN KEY (doctor_id)  REFERENCES doctors(id_doctor)   ON DELETE SET NULL,
  INDEX idx_analysis_patient (id_patient),
  INDEX idx_analysis_date    (date_of_analysis)
) ENGINE=InnoDB;

-- =====================
-- DOCUMENTS
-- =====================
CREATE TABLE IF NOT EXISTS documents (
  id_document INT AUTO_INCREMENT PRIMARY KEY,
  id_patient  INT NOT NULL,
  name        VARCHAR(255) NOT NULL,
  file_type   VARCHAR(50),
  file_path   VARCHAR(500),
  file_size   VARCHAR(50),
  added_by    VARCHAR(200),
  date_added  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_patient) REFERENCES patients(id_patient) ON DELETE CASCADE,
  INDEX idx_document_patient (id_patient)
) ENGINE=InnoDB;

-- =========================================
-- SEED DATA (development only)
-- =========================================

-- Password for all seed users: "Password123!"
-- Hash generated with bcrypt rounds=12

INSERT INTO users (email, password_hash, role) VALUES
  ('doctor@dme.fr',  '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeOBWATPuHBH1z4/6', 'doctor'),
  ('patient@dme.fr', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeOBWATPuHBH1z4/6', 'patient'),
  ('staff@dme.fr',   '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeOBWATPuHBH1z4/6', 'staff'),
  ('marie.dupont@dme.fr', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeOBWATPuHBH1z4/6', 'patient'),
  ('jean.martin@dme.fr',  '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeOBWATPuHBH1z4/6', 'patient');

INSERT INTO doctors (id_user, first_name, last_name, specialization, license_number, hospital_affiliation) VALUES
  (1, 'Martin', 'Dupont', 'Médecine générale', 'MED-2024-001', 'Hôpital Saint-Louis Paris');

INSERT INTO patients (id_user, first_name, last_name, dob, phone_number, address, blood_type, allergies, chronic_diseases) VALUES
  (2, 'Test',   'Patient',  '1990-01-01', '+33600000001', '1 rue Test, Paris',           'O+',  NULL,          NULL),
  (4, 'Marie',  'Dupont',   '1968-05-12', '+33612345678', '12 rue des Lilas, Paris',     'A+',  'Pénicilline', 'Hypertension artérielle,Diabète de type 2'),
  (5, 'Jean',   'Martin',   '1975-11-23', '+33745678901', '5 avenue Victor Hugo, Lyon',  'O+',  NULL,          'Asthme');

INSERT INTO medical_records (id_patient, diagnosis, treatment, doctor_name, visit_reason, status) VALUES
  (2, 'Hypertension artérielle stade 1', 'Amlodipine 5mg 1x/jour + régime hyposodé', 'Dr. Martin Dupont', 'Contrôle régulier', 'completed'),
  (2, 'Diabète de type 2', 'Metformine 850mg 2x/jour, suivi glycémique mensuel', 'Dr. Martin Dupont', 'Suivi diabète', 'completed'),
  (3, 'Crise hypertensive résolutive', 'Repos, Amlodipine 5mg', 'Dr. Martin Dupont', 'Hypertension', 'completed');

INSERT INTO prescriptions (id_patient, doctor_id, medication, dosage, frequency, duration, instructions, prescribed_on, status) VALUES
  (2, 1, 'Amlodipine 5mg',   '1 comprimé', '1 fois par jour', '30 jours',  'Prendre le matin avant le petit déjeuner', '2024-05-13', 'active'),
  (2, 1, 'Metformine 850mg', '1 comprimé', '2 fois par jour', '90 jours',  'À prendre pendant les repas',              '2024-04-10', 'active'),
  (3, 1, 'Salbutamol spray', '2 bouffées', 'Au besoin',        '60 jours', 'En cas de crise d''asthme',                '2024-05-05', 'active');

INSERT INTO analyses (id_patient, doctor_id, exam_name, result, reference_range, status, date_of_analysis, category) VALUES
  (2, 1, 'NFS (Numération formule sanguine)', 'Normal',    NULL,              'normal',   '2024-05-10', 'Examens de sang'),
  (2, 1, 'Glycémie à jeun',                  '1.25 g/L',  '0.70-1.10 g/L',  'elevated', '2024-05-10', 'Examens de sang'),
  (2, 1, 'Cholestérol total',                '2.10 g/L',  '1.20-2.00 g/L',  'normal',   '2024-05-10', 'Examens de sang'),
  (2, 1, 'Créatinine',                       '8.5 mg/L',  '6-12 mg/L',      'normal',   '2024-05-10', 'Examens de sang');

INSERT INTO documents (id_patient, name, file_type, file_size, added_by) VALUES
  (2, 'Compte rendu - 12/05/2024',  'PDF',   '114 ko', 'Dr. Martin Dupont'),
  (2, 'Ordonnance - 12/05/2024',    'PDF',   '88 ko',  'Dr. Martin Dupont'),
  (2, 'Analyse de sang - 10/05/2024', 'PDF', '245 ko', 'Laboratoire'),
  (2, 'Radiographie - 02/05/2024',  'Image', '1.2 Mo', 'Service imagerie');
