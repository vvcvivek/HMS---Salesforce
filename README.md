# 🏥 Hospital Management System — Salesforce

A complete end-to-end **Hospital Management System** built on 
**Salesforce Lightning Experience** as a portfolio project 
demonstrating real-world Salesforce development skills.

---

## 📸 Screenshots

### Hospital Executive Dashboard
<img width="1920" height="1080" alt="DASHBOARD" src="https://github.com/user-attachments/assets/b42e8509-e56e-4f2d-97f1-88f46f33cbd3" />
<img width="1920" height="1080" alt="DASHBOARD2" src="https://github.com/user-attachments/assets/9e072e89-efbb-41d0-bcca-37d710cead11" />


### Patient Dashboard (LWC)
<img width="1918" height="922" alt="Patients page" src="https://github.com/user-attachments/assets/9bd89fe7-8510-46ed-ab7f-44f4390956a5" />


### Doctor Dashboard (LWC)
<img width="1918" height="925" alt="Doctors Page" src="https://github.com/user-attachments/assets/97a65d7e-8f3c-4aeb-a6ef-c134d9628cfb" />


### Invoice Record
<img width="1920" height="1080" alt="Invoices" src="https://github.com/user-attachments/assets/0d9f3d2d-770c-4bbe-b55f-2c73ca4c5d28" />


### Flow Builder
<img width="1920" height="1080" alt="Flow" src="https://github.com/user-attachments/assets/f9df96a2-f89b-41de-b4a9-d5123b012658" />


### Schema Builder
<img width="1918" height="1078" alt="Data Model" src="https://github.com/user-attachments/assets/c90ba540-b0fa-4868-9d0e-4c3dd28eda5a" />


---

## 🎯 Business Problem

Traditional hospitals manage patient data, appointments, 
prescriptions, and billing through disconnected paper records 
or legacy systems — causing double bookings, lost records, 
delayed billing, and poor patient experience.

## ✅ Solution

A unified cloud platform on Salesforce Lightning that 
digitizes the entire hospital workflow from patient 
registration to insurance claim settlement.

---

## 🏗 Architecture

UI Layer         →  Lightning Web Components (LWC)

Business Logic   →  Apex Triggers + Service Classes

Async Processing →  Batch Apex + Queueable Apex

Automation       →  Flows + Approval Processes

Integration      →  REST API → SMS Gateway

Security         →  Profiles + Permission Sets + Sharing Rules

Reporting        →  Custom Reports + Executive Dashboard

---

## 📦 Data Model

7 Custom Objects:

| Object | Relationship | Purpose |
|--------|-------------|---------|
| Patient__c | Master | Patient registration |
| Doctor__c | Independent | Doctor profiles |
| Appointment__c | Lookup → Patient, Doctor | Booking management |
| Medical_Record__c | Master-Detail → Patient | Visit records |
| Prescription__c | Master-Detail → Medical Record | Medicines |
| Invoice__c | Master-Detail → Patient | Billing |
| Insurance_Claim__c | Master-Detail → Invoice | Claims |

---

## ✨ Features

### Patient Management
- Patient registration with validation rules
- Auto patient ID generation (PAT-{0000})
- Medical history tracking
- Insurance information management

### Doctor Management
- Doctor onboarding with approval process
- Specialization and department management
- Availability tracking via Queueable Apex

### Appointment Management
- Book appointments with double-booking prevention
- Auto token number assignment
- Reschedule and cancel with audit trail
- Appointment confirmation via email

### Medical Records
- Complete visit documentation
- Vitals tracking (BP, Temperature, Pulse, Weight)
- Diagnosis and treatment plans
- Follow-up scheduling

### Billing
- Auto invoice generation on appointment completion
- Multi-charge support (Consultation, Medicine, Lab)
- Formula-based tax and discount calculation
- Payment tracking with outstanding balance

### Insurance Claims
- Claim submission workflow
- Approval process with multi-step routing
- Status tracking from Draft to Settled

---

## 💻 Technical Implementation

### Apex Trigger — Double Booking Prevention
```apex
// Fires before insert/update on Appointment__c
// Builds Set of booked slots — fully bulkified
// One SOQL handles all 200 records in batch
public static void preventDoubleBooking(
        List<Appointment__c> newAppointments,
        Map<Id, Appointment__c> oldMap) {
    // Collect doctor IDs and dates
    // Query existing appointments in one SOQL
    // Check slot conflicts using Set
    // addError() blocks the DML
}
```

### Batch Apex — Monthly Invoice Processing
```apex
// Implements Database.Stateful for cross-chunk aggregation
// Processes overdue invoices monthly
// Sends summary email to billing manager
global class OutstandingInvoiceBatch 
    implements Database.Batchable<SObject>, Database.Stateful {
    global Integer totalOverdueCount = 0;
    global Decimal totalOverdueAmount = 0;
}
```

### Queueable Apex — Doctor Availability
```apex
// Accepts complex type List<Appointment__c>
// Cannot use Future method here
// Updates Is_Available__c when doctor has 5+ bookings
public class DoctorAvailabilityQueueable implements Queueable {
    private List<Appointment__c> newAppointments;
}
```

### REST API Integration — SMS Gateway
```apex
// Named Credential handles authentication
// HttpCalloutMock for test coverage
// SMSResponse wrapper class for result handling
public static SMSResponse sendSMS(String phone, String message) {
    HttpRequest req = new HttpRequest();
    req.setEndpoint('callout:SMS_Gateway/v2/send');
    req.setMethod('POST');
}
```

---

## 🔐 Security Model

| Layer | Implementation |
|-------|---------------|
| OWD | Private for Patient, Appointment, Invoice |
| Role Hierarchy | CEO → Medical Director → Doctor → Receptionist |
| Profiles | HMS Doctor, Receptionist, Billing Staff, Nurse |
| Permission Sets | Senior Doctor, Insurance Manager, Report Viewer |
| Sharing Rules | Share patients with doctors via role |

---

## ⚡ Automation

| Automation | Type | Trigger |
|-----------|------|---------|
| Appointment Confirmation | Record-Triggered Flow | Status = Confirmed |
| Appointment Reminder | Scheduled Flow | 1 day before date |
| Patient Onboarding | Record-Triggered Flow | Patient created |
| Doctor Approval | Approval Process | Status = Pending |
| Insurance Claim Approval | Approval Process | Status = Submitted |

---

## 📊 Reports & Dashboards

### Reports Created
1. Daily Appointments Report
2. Monthly Revenue Report
3. Doctor Performance Report
4. Insurance Claim Status Report
5. Active Patient Count
6. Active Doctor Count
7. Pending Invoices Count
8. Overdue Invoices Report
9. Pending Insurance Claims

### Executive Dashboard
9 components including Metric KPIs, Donut Charts,
Bar Charts, and Lightning Tables — all with live data.

---

## 📁 Project Structure
force-app/main/default/

├── classes/

│   ├── AppointmentTriggerHandler.cls

│   ├── AppointmentTriggerHandler.cls-meta.xml

│   ├── DoctorAvailabilityQueueable.cls

│   ├── DoctorAvailabilityQueueable.cls-meta.xml

│   ├── DoctorDashboardController.cls

│   ├── DoctorDashboardController.cls-meta.xml

│   ├── HospitalDashboardController.cls

│   ├── HospitalDashboardController.cls-meta.xml

│   ├── InvoiceService.cls

│   ├── InvoiceService.cls-meta.xml

│   ├── MedicalRecordService.cls

│   ├── MedicalRecordService.cls-meta.xml

│   ├── OutstandingInvoiceBatch.cls

│   ├── OutstandingInvoiceBatch.cls-meta.xml

│   ├── PatientDashboardController.cls

│   ├── PatientDashboardController.cls-meta.xml

│   ├── PrescriptionService.cls

│   ├── PrescriptionService.cls-meta.xml

│   └── SMSService.cls

│       SMSService.cls-meta.xml

├── triggers/

│   ├── AppointmentTrigger.trigger

│   └── AppointmentTrigger.trigger-meta.xml

├── lwc/

│   ├── patientDashboard/

│   │   ├── patientDashboard.html

│   │   ├── patientDashboard.js

│   │   └── patientDashboard.js-meta.xml

│   ├── doctorDashboard/

│   │   ├── doctorDashboard.html

│   │   ├── doctorDashboard.js

│   │   └── doctorDashboard.js-meta.xml

│   └── hospitalDashboard/

│       ├── hospitalDashboard.html

│       ├── hospitalDashboard.js

│       └── hospitalDashboard.js-meta.xml

└── objects/

├── Patient__c/

├── Doctor__c/

├── Appointment__c/

├── Medical_Record__c/

├── Prescription__c/

├── Invoice__c/

└── Insurance_Claim__c/
screenshots/

├── hospital_dashboard.png

├── patient_dashboard.png

├── doctor_dashboard.png

├── invoice.png

├── flow_builder.png

└── schema_builder.png
scripts/

└── sample_data_insert.apex

---
## 👤 Author

**Vivek** | Salesforce Developer (Fresher)

- LinkedIn: [https://www.linkedin.com/in/vvcvivek/]
- Email: [vivekchaudhari316@gmail.com]

---

## ⭐ Support
<img width="1920" height="1080" alt="DASHBOARD" src="https://github.com/user-attachments/assets/85dd371c-fad3-47e2-954e-6985d1425096" />

If this project helped you, please give it a ⭐ star!

It helps other Salesforce freshers find this resource.

---

*Built with ❤️ using Salesforce Lightning Experience*
*Apex | LWC | SOQL | Flows | Batch Apex | REST API*
