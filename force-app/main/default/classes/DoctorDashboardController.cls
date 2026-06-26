public with sharing class DoctorDashboardController { 
    @AuraEnabled(cacheable=true) 
    public static List<Appointment__c> getTodayAppointments(Id doctorId) { 
        return [ 
            SELECT Id, Name, Patient__c, Patient__r.First_Name__c, Patient__r.Last_Name__c, 
                   Appointment_Date__c, Appointment_Time__c, Status__c, 
                   Type__c, Token_Number__c, Reason_for_Visit__c 
            FROM Appointment__c 
            WHERE Doctor__c = :doctorId 
              AND Appointment_Date__c = TODAY 
              AND Status__c NOT IN ('Cancelled') 
            ORDER BY Appointment_Time__c ASC 
        ];
    }
    @AuraEnabled(cacheable=true) 
    public static Integer getActivePatientCount(Id doctorId) { 
        return [ 
            SELECT COUNT() 
            FROM Patient__c 
            WHERE Primary_Doctor__c = :doctorId 
              AND Patient_Status__c = 'Active' 
        ];
    }
    @AuraEnabled 
    public static void updateAppointmentStatus(Id appointmentId, String status) { 
        Appointment__c appt = new Appointment__c(Id = appointmentId, Status__c = status); 
        update appt; 
    }
} 