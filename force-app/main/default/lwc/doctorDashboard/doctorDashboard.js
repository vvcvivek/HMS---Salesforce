// doctorDashboard.js 
import { LightningElement, api, wire, track } from 'lwc'; 
import { NavigationMixin } from 'lightning/navigation'; 
import { ShowToastEvent } from 'lightning/platformShowToastEvent'; 
import getTodayAppointments from '@salesforce/apex/DoctorDashboardController.getTodayAppointments'; 
import getActivePatientCount from '@salesforce/apex/DoctorDashboardController.getActivePatientCount'; 
import updateAppointmentStatus from '@salesforce/apex/DoctorDashboardController.updateAppointmentStatus'; 
const COLUMNS = [ 
    { label: 'Token', fieldName: 'Token_Number__c', type: 'number', initialWidth: 80 }, 
    { label: 'Patient', fieldName: 'PatientName', type: 'text' }, 
    { label: 'Time', fieldName: 'Appointment_Time__c', type: 'text' }, 
    { label: 'Type', fieldName: 'Type__c', type: 'text' }, 
    { label: 'Status', fieldName: 'Status__c', type: 'text' }, 
    {
        type: 'action', 
        typeAttributes: { 
            rowActions: [ 
                { label: 'Mark In Progress', name: 'in_progress' }, 
                { label: 'Mark Completed',   name: 'completed'   }, 
                { label: 'Cancel',           name: 'cancelled'   }, 
                { label: 'View Patient',     name: 'view_patient'} 
            ] 
        } 
    }
]; 
export default class DoctorDashboard extends NavigationMixin(LightningElement) { 
    @api doctorId = 'a09dL00000QOWnlQAH'; // Set via component property or current user's doctor Id 
    @track todayAppointments = []; 
    @track activePatientCount = 0; 
    @track isLoading = true; 
    columns = COLUMNS; 
    @wire(getTodayAppointments, { doctorId: '$doctorId' }) 
    wiredAppointments({ error, data }) { 
        if (data) { 
            // Flatten nested fields for datatable 
            this.todayAppointments = data.map(appt => ({ 
                ...appt, 
                PatientName: appt.Patient__r ? appt.Patient__r.First_Name__c + ' ' + appt.Patient__r.Last_Name__c : '' 
            })); 
            this.isLoading = false; 
        } else if (error) { 
            this.isLoading = false; 
            console.error(error); 
        } 
    }
    @wire(getActivePatientCount, { doctorId: '$doctorId' }) 
    wiredCount({ data, error }) { 
        if (data !== undefined) this.activePatientCount = data; 
    }
    get todayAppointmentCount() { return this.todayAppointments.length; } 
    get completedCount() { 
        return this.todayAppointments.filter(a => a.Status__c === 'Completed').length; 
    }
    get pendingCount() { 
        return this.todayAppointments.filter(a => ['Scheduled','Confirmed','In Progress'].includes(a.Status__c)).length; 
    }
    handleRowAction(event) { 
        const action = event.detail.action.name; 
        const row    = event.detail.row; 
        if (action === 'view_patient') { 
            this[NavigationMixin.Navigate]({ 
                type: 'standard__recordPage', 
                attributes: { recordId: row.Patient__c, actionName: 'view' } 
            }); 
            return; 
        } 
        const statusMap = { 
            'in_progress': 'In Progress', 
            'completed':   'Completed', 
            'cancelled':   'Cancelled' 
        };
        const newStatus = statusMap[action]; 
        if (newStatus) { 
            updateAppointmentStatus({ appointmentId: row.Id, status: newStatus }) 
                .then(() => { 
                    this.dispatchEvent(new ShowToastEvent({ 
                        title: 'Success', message: `Appointment marked as ${newStatus}`, variant: 'success' 
                    })); 
                    // Refresh wire 
                    return refreshApex(this.wiredAppointments); 
                }) 
                .catch(error => { 
                    this.dispatchEvent(new ShowToastEvent({ 
                        title: 'Error', message: error.body.message, variant: 'error' 
                    })); 
                }); 
        } 
    }
    connectedCallback() {
    console.log('Doctor Id = ' + this.doctorId);
}
} 