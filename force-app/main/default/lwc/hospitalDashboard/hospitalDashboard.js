// hospitalDashboard.js 
import { LightningElement, wire, track } from 'lwc'; 
import getHospitalStats from '@salesforce/apex/HospitalDashboardController.getHospitalStats'; 
export default class HospitalDashboard extends LightningElement { 
    @track stats = {}; 
    @track isLoading = true; 
    connectedCallback() { 
        this.loadStats(); 
    }
    loadStats() { 
        this.isLoading = true; 
        getHospitalStats() 
            .then(result => { 
                this.stats = result; 
                this.isLoading = false; 
            }) 
            .catch(error => { 
                console.error(error); 
                this.isLoading = false; 
            }); 
    }
    get formattedRevenue() { 
        if (!this.stats.monthlyRevenue) return '₹0'; 
        return '₹' + new Intl.NumberFormat('en-IN').format(this.stats.monthlyRevenue); 
    }
} 