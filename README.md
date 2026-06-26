# 🏥 Hospital Management System — Salesforce

> A complete, production-grade Hospital Management System built on Salesforce Lightning Experience as a portfolio project showcasing end-to-end Salesforce development capabilities — from data model to LWC dashboards to REST API integration.

---

## 🌟 What This Project Covers

`Apex` `LWC` `SOQL` `Flows` `Batch Apex` `Queueable Apex` `REST API` `Security Model` `Reports & Dashboards`

---

## ✨ Features

- 👤 **Patient Registration & Status Tracking**
- 🩺 **Doctor Onboarding with Approval Workflow**
- 📅 **Appointment Booking with Double-Booking Prevention**
- 📋 **Medical Records & Prescription Management**
- 🧾 **Automated Invoice Generation**
- 🏦 **Insurance Claim Submission & Approval**
- 📱 **SMS Notifications via REST API**
- 📊 **Executive Dashboard with Live KPIs**
- 🌐 **External Web UI via OAuth 2.0 + REST API**

---

## 🏗️ Architecture

| Layer | Technology |
|-------|-----------|
| Data Layer | 7 Custom Objects — Master-Detail & Lookup relationships |
| Business Logic | Apex Triggers (Handler Pattern), Service Classes |
| Async Processing | Batch Apex, Queueable Apex, Scheduled Apex |
| Automation | 4 Flows, 2 Approval Processes, Validation Rules |
| UI | 3 Lightning Web Components (LWC) |
| Security | Profiles, Permission Sets, Role Hierarchy, Sharing Rules |
| Integration | REST API → SMS Gateway via Named Credentials |
| External UI | HTML/CSS/JS + Salesforce OAuth 2.0 |

---

## 🗂️ Custom Objects

| Object | Description |
|--------|-------------|
| `Patient__c` | Demographics, insurance, status tracking |
| `Doctor__c` | Specialization, availability, performance |
| `Appointment__c` | Scheduling, token system, double-booking prevention |
| `Medical_Record__c` | Diagnosis, vitals, treatment plans, follow-up |
| `Prescription__c` | Medications, dosage, instructions |
| `Invoice__c` | Billing, payment tracking, outstanding balance |
| `Insurance_Claim__c` | Claim submission, approval, provider details |

---

## 📁 Project Structure

```
force-app/
└── main/
    └── default/
        ├── objects/                          # Custom object definitions
        │   ├── Patient__c/
        │   ├── Doctor__c/
        │   ├── Appointment__c/
        │   ├── Medical_Record__c/
        │   ├── Prescription__c/
        │   ├── Invoice__c/
        │   └── Insurance_Claim__c/
        ├── classes/                          # Apex classes
        │   ├── AppointmentTriggerHandler.cls
        │   ├── InvoiceService.cls
        │   ├── MedicalRecordService.cls
        │   ├── PrescriptionService.cls
        │   ├── PatientDashboardController.cls
        │   ├── DoctorDashboardController.cls
        │   ├── HospitalDashboardController.cls
        │   ├── SMSService.cls
        │   ├── OutstandingInvoiceBatch.cls
        │   └── DoctorAvailabilityQueueable.cls
        ├── triggers/
        │   └── AppointmentTrigger.trigger
        ├── lwc/                              # Lightning Web Components
        │   ├── patientDashboard/
        │   ├── doctorDashboard/
        │   └── hospitalDashboard/
        └── flows/                            # Flow definitions
```

---

## 📊 Executive Dashboard — 9 Components

| # | Component | Type | Source Report |
|---|-----------|------|---------------|
| 1 | Total Active Patients | KPI Metric | Patient Count Report |
| 2 | Total Active Doctors | KPI Metric | Doctor Count Report |
| 3 | Monthly Revenue | KPI Metric | Monthly Revenue Report |
| 4 | Pending Invoices | KPI Metric | Outstanding Invoice Report |
| 5 | Daily Appointment Status | Donut Chart | Daily Appointments Report |
| 6 | Revenue by Month | Bar Chart | Monthly Revenue Report |
| 7 | Doctor Appointments | Horizontal Bar | Doctor Performance Report |
| 8 | Top 5 Overdue Invoices | Table | Outstanding Invoice Report |
| 9 | Pending Insurance Claims | Table | Insurance Claim Report |

---

## 📈 Apex Code Coverage

| Class | Coverage |
|-------|----------|
| AppointmentTriggerHandler | 95% |
| InvoiceService | 90% |
| SMSService | 88% |
| OutstandingInvoiceBatch | 92% |
| DoctorAvailabilityQueueable | 90% |

---

## 🚀 Setup Instructions

**1. Clone the repo**
```bash
git clone https://github.com/vvcvivek/hms-salesforce
```

**2. Authorize your Salesforce org**
```bash
sf org login web --alias HMS_Org
```

**3. Deploy metadata**
```bash
sf project deploy start --target-org HMS_Org
```

**4. Assign Permission Sets**
```bash
sf org assign permset --name HMS_Senior_Doctor --target-org HMS_Org
```

**5. Import sample data**
Run the Anonymous Apex scripts from the `/scripts/` folder in Developer Console

**6. Configure Named Credential**
Setup → Named Credentials → SMS_Gateway → add your SMS provider endpoint

---

## 🧪 Running Tests

```bash
sf apex run test --class-names AppointmentTriggerHandlerTest,SMSServiceTest,InvoiceServiceTest --target-org HMS_Org
```

---

## 💡 Salesforce Skills Demonstrated

| Skill | Where Used |
|-------|-----------|
| Custom Objects & Fields | All 7 HMS objects |
| Master-Detail Relationships | Medical Record → Patient, Prescription → Medical Record |
| Formula Fields | Age, Sub Total, Outstanding Balance |
| Validation Rules | Patient DOB, Phone, Insurance; Appointment conflict |
| Apex Triggers (Bulkified) | AppointmentTrigger with Handler Pattern |
| SOQL | All service classes with filters, aggregates, relationships |
| Batch Apex | OutstandingInvoiceBatch with Stateful interface |
| Queueable Apex | DoctorAvailabilityQueueable |
| Record-Triggered Flows | Confirmation, Reminder, Onboarding, Invoice |
| Approval Processes | Doctor Onboarding, Insurance Claim |
| Lightning Web Components | Patient, Doctor, Hospital Dashboards |
| @wire Decorator | Patient data, appointments, history |
| Imperative Apex Calls | Status updates, payment recording |
| REST API Integration | SMS Gateway with Named Credential |
| HttpCalloutMock | Test coverage for callouts |
| Security Model | Profiles, Permission Sets, Role Hierarchy, OWD, Sharing Rules |
| Custom Report Types | 4 CRTs for all HMS modules |
| Reports & Dashboards | 9-component Executive Dashboard |
| VS Code + SFDX | Development and deployment |

---

## 🔗 Related Repository

> 🌐 [hms-external-ui](https://github.com/vvcvivek/hms-external-ui) — External web interface connected to this Salesforce org via OAuth 2.0 + REST API

---

## 👨‍💻 Author

**Vivek** — Salesforce Developer
📧 [GitHub](https://github.com/vvcvivek)

---

*HMS on Salesforce — Portfolio Project | Built with Salesforce Lightning Experience*
