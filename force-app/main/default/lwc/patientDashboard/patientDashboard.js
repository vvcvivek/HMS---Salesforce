import { LightningElement, api, wire, track } from 'lwc';
import getUpcomingAppointments 
    from '@salesforce/apex/PatientDashboardController.getUpcomingAppointments';
import getPatientDetails
    from '@salesforce/apex/PatientDashboardController.getPatientDetails';
import getPatientMedicalHistory
    from '@salesforce/apex/MedicalRecordService.getPatientMedicalHistory';
import getDefaultPatient
    from '@salesforce/apex/PatientDashboardController.getDefaultPatient';

export default class PatientDashboard extends LightningElement {
    @api recordId;
    @api patientId; // manual override for App Page

    @track patient;
    @track upcomingAppointments = [];
    @track medicalHistory = [];
    @track isLoading = true;
    @track activePatientId;

    connectedCallback() {
        // Use recordId if on record page
        // Use patientId property if set in App Builder
        // Otherwise load first active patient
        if (this.recordId) {
            this.activePatientId = this.recordId;
            this.loadData();
        } else if (this.patientId) {
            this.activePatientId = this.patientId;
            this.loadData();
        } else {
            this.loadDefaultPatient();
        }
    }

    loadDefaultPatient() {
        getDefaultPatient()
            .then(result => {
                if (result) {
                    this.activePatientId = result.Id;
                    this.loadData();
                } else {
                    this.isLoading = false;
                }
            })
            .catch(error => {
                console.error(error);
                this.isLoading = false;
            });
    }

    loadData() {
        // Load patient details
        getPatientDetails({ patientId: this.activePatientId })
            .then(result => {
                this.patient = result;
                this.isLoading = false;
            })
            .catch(error => {
                console.error(error);
                this.isLoading = false;
            });

        // Load appointments
        getUpcomingAppointments({ patientId: this.activePatientId })
            .then(result => {
                this.upcomingAppointments = result;
            })
            .catch(error => console.error(error));

        // Load medical history
        getPatientMedicalHistory({ patientId: this.activePatientId })
            .then(result => {
                this.medicalHistory = result;
            })
            .catch(error => console.error(error));
    }

    get hasAppointments() {
        return this.upcomingAppointments && 
               this.upcomingAppointments.length > 0;
    }

    get hasMedicalHistory() {
        return this.medicalHistory && 
               this.medicalHistory.length > 0;
    }

    get patientName() {
        if (!this.patient) return '';
        return this.patient.First_Name__c + ' ' + this.patient.Last_Name__c;
    }
}