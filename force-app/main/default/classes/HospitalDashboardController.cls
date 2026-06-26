// File: HospitalDashboardController.cls 
public with sharing class HospitalDashboardController { 
    /** 
     * Returns key hospital metrics for the dashboard. 
     * Uses a wrapper class to bundle multiple query results. 
     */ 
    @AuraEnabled(cacheable=true) 
    public static HospitalStats getHospitalStats() { 
        HospitalStats stats = new HospitalStats(); 
        // Total active patients 
        stats.totalPatients = [ 
            SELECT COUNT() FROM Patient__c WHERE Patient_Status__c = 'Active' 
        ];
        // Total active doctors 
        stats.totalDoctors = [ 
            SELECT COUNT() FROM Doctor__c WHERE Doctor_Status__c = 'Active' 
        ];
        // Today's appointments 
        stats.todayAppointments = [ 
            SELECT COUNT() FROM Appointment__c 
            WHERE Appointment_Date__c = TODAY 
              AND Status__c NOT IN ('Cancelled') 
        ];
        // Pending (unpaid) invoices 
        stats.pendingInvoices = [ 
            SELECT COUNT() FROM Invoice__c 
            WHERE Payment_Status__c IN ('Unpaid', 'Partially Paid') 
        ];
        // Monthly revenue (paid invoices this month) 
        Date firstOfMonth = Date.today().toStartOfMonth(); 
        AggregateResult[] revenueResults = [ 
            SELECT SUM(Amount_Paid__c) totalPaid 
            FROM Invoice__c 
            WHERE Payment_Date__c >= :firstOfMonth 
              AND Payment_Status__c IN ('Paid', 'Partially Paid') 
        ];
        if (!revenueResults.isEmpty() && revenueResults[0].get('totalPaid') != null) { 
            stats.monthlyRevenue = (Decimal) revenueResults[0].get('totalPaid'); 
        } 
        // Pending insurance claims 
        stats.pendingClaims = [ 
            SELECT COUNT() FROM Insurance_Claim__c 
            WHERE Status__c IN ('Submitted', 'Under Review') 
        ];
        return stats; 
    }
    // Wrapper / Inner Class 
    public class HospitalStats { 
        @AuraEnabled public Integer totalPatients    = 0; 
        @AuraEnabled public Integer totalDoctors     = 0; 
        @AuraEnabled public Integer todayAppointments = 0; 
        @AuraEnabled public Integer pendingInvoices  = 0; 
        @AuraEnabled public Decimal monthlyRevenue   = 0; 
        @AuraEnabled public Integer pendingClaims    = 0; 
    }
} 