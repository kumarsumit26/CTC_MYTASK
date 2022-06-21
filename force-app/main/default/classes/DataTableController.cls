public class DataTableController{
    public Static Integer totalAAToBeReturned;
    public static List<sObject> listOfData;  
    
    @AuraEnabled(cacheable=true)
    public static DataTableWrapper initRecords(String ObjectName, String searchKey,
                                               String Orderby, String OrderDir, 
                                               boolean inlineEdit, boolean enableColAction,
                                               String pageSize, String pageNumber, Integer adjustDevice) {  
                                                   system.debug('ObjectName>>'+ObjectName + searchKey +  Orderby + OrderDir + inlineEdit + enableColAction + pageSize + pageNumber + adjustDevice);     
        DataTableWrapper dtw = new DataTableWrapper();
        List<LabelDescriptionWrapper> labelList = new List<LabelDescriptionWrapper>();
        system.debug('<<labelList>>>'+labelList);
        List<String> fieldSet = new List<String>();
        Set<String> fieldNameSet = new Set<String>();
        Boolean IsCTCUser;
        String UserProfileName = [SELECT Id, Name FROM Profile WHERE Id=:userinfo.getProfileId() LIMIT 1][0].Name;
        System.debug('UserProfileName'+ UserProfileName);
        if(UserProfileName == 'System Administrator'){
            IsCTCUser = false; 
        }else{
            IsCTCUser = true;
        }

        for(Approved_Appraiser_Field__mdt obj : [SELECT Id,Field_Name__c,Field_API_Name__c,Display_Order__c
                                                  FROM Approved_Appraiser_Field__mdt 
                                                  ORDER BY Display_Order__c ]){
                                                      fieldNameSet.add(obj.Field_API_Name__c);
                                                      System.debug('obj------->>>'+obj);
                                                  }
                                                   system.debug('FieldNAmeset------->>>'+fieldNameSet);
                                                  
                                                   
        if(Schema.getGlobalDescribe().containsKey(ObjectName) ) {
            sObject sObj = Schema.getGlobalDescribe().get(ObjectName).newSObject();
            
            //get all the labels for Opportunity fields and put them in a map, keyed to the field api name
            Map<String, Schema.SObjectField> fieldMap = Schema.getGlobalDescribe().get(ObjectName).getDescribe().fields.getMap();
            Map<Schema.SObjectField,String> fieldToAPIName = new Map<Schema.SObjectField,String>();
            Map<String, String> apiNameToLabel = new Map<String, String>();
            for(String fieldName :  fieldNameSet){
                
                if(fieldMap.containsKey(fieldName)) {
                    fieldSet.add(fieldName);
                    
                    if(IsCTCUser){
                        
                        
                        labelList.add(new LabelDescriptionWrapper(fieldMap.get(fieldName).getDescribe().getLabel(), fieldName, fieldMap.get(fieldName).getDescribe().getType().name().toLowerCase(), true,inlineEdit, null ));
                        System.debug('<<fieldName>>>'+fieldName);
                    }else{
                        labelList.add(new LabelDescriptionWrapper(fieldMap.get(fieldName).getDescribe().getLabel(), fieldName, fieldMap.get(fieldName).getDescribe().getType().name().toLowerCase(), true,false, null ));
                    }   
                }
                System.debug('<<fieldName>>>'+fieldName);
                system.debug('<<labelList>>>'+labelList);
            }
            
            //add action         
            if(enableColAction && IsCTCUser) {
                List<Actions> actionList = new List<Actions>();
                System.debug('<<actionList>>>'+actionList);
                actionList.add(new Actions('Edit','Edit'));
                actionList.add(new Actions('View','View'));
                actionList.add(new Actions('Delete','Delete'));
                TypeAttributes tAttribute = new TypeAttributes(actionList);
                System.debug('<<actionList>>>'+actionList);
                
                labelList.add(new LabelDescriptionWrapper('Actions', 'Actions', 'action', false, false, tAttribute ));
                System.debug('<<labelList>>>>>>'+labelList);
            }
            
            //call method to query
            List<sObject> sObjectRecords = getsObjectRecords(ObjectName, fieldSet, 50, '', Orderby, OrderDir, searchKey, pageSize, pageNumber);
            dtw.ldwList     = labelList;
            dtw.sobList     = sObjectRecords;
            dtw.fieldsList  = fieldSet;
            dtw.totalData = listOfData;
            dtw.totalCount  = totalAAToBeReturned ;//Database.countQuery('SELECT count() FROM '+ObjectName);
            dtw.isBrokerUser = IsCTCUser;
            System.debug('sObjectRecords'+sObjectRecords.size()); //1
            System.debug('sObjectRecords>>>>>>>>>>>'+sObjectRecords); //NG
            System.debug('dtw>>>>>>>>>>>'+dtw); //NG


        }
        return dtw;
    }
    
     @AuraEnabled 
    public static List<sObject> getsObjectRecords(String ObjectName, List<String> fieldNameSet, 
                                                Integer LimitSize, String recId,
                                                String Orderby, String OrderDir,
                                                String searchKey, String pageSize, 
                                                String pageNumber) {
        System.debug('ObjectName>>'+ObjectName);
        System.debug('fieldNameSet>>>'+fieldNameSet);
        System.debug('LimitSize>>>'+LimitSize);
        System.debug('recId>>>'+recId);
        System.debug('Orderby>>>'+Orderby);
        System.debug('OrderDir>>>'+OrderDir);
        System.debug('searchKey>>>'+searchKey);
        System.debug('pageSize>>>>'+pageSize);
        System.debug('pageNumber>>>'+pageNumber);
        System.debug('getsObjectRecords>>>'+pageNumber); //1     
                                                                                                    
        System.debug('FieldNAmeset------->>>'+fieldNameSet);     //Get                                      
                                                    
        OrderDir = String.isBlank(OrderDir) ? 'asc' : OrderDir;
        System.debug('OrderDir'+OrderDir);    //asc

        String query = 'SELECT '+String.join(fieldNameSet, ',')+' FROM '+ObjectName;
        System.debug('ObjectName'+ObjectName); //AppAppraise_c
        System.debug('query>>>>>'+query); //get
       
        if(String.isNotBlank(recId)) {
            recId = String.valueOf(recId);
            query += ' WHERE ID >: recId ';
            System.debug('recId'+recId); //NG
        }
        
        if(String.isNotBlank(searchKey)){
            query +=' WHERE Municipality__c LIKE \'%'+searchKey+'%\'';                                                                     
            query +=' OR Appraisal_Firm__c LIKE \'%'+searchKey+'%\'';
            query +=' OR Province__c LIKE \'%'+searchKey+'%\'';
        }  
        query += ' ORDER BY '+Orderby+' '+OrderDir+' NULLS LAST';
       
        /*
        if(LimitSize != null && Integer.valueOf(LimitSize) > 0) {
            LimitSize = Integer.valueOf(LimitSize);
            query += ' Limit '+LimitSize;
        }*/
        
         System.debug('Query>>>'+query) ;                                          
        totalAAToBeReturned =  Database.query(query).size();
        System.debug('totalAAToBeReturned>>>'+totalAAToBeReturned);
        listOfData=Database.query(query);
         System.debug('totalAAToBeReturned>>>>>'+listOfData);                                         
        ApexPages.StandardSetController ssc = new ApexPages.StandardSetController(Database.getQueryLocator(query));
       ssc.setpagesize(Integer.valueOf(pageSize));
        ssc.setPageNumber(Integer.valueOf(pageNumber));
         System.debug('Record>>>>'+ssc.getRecords().size());  
         System.debug('ssc>>>>'+ssc);  //NG
        return (List<sObject>)ssc.getRecords();
    }
    
    @AuraEnabled
    public static sObject deleteSObject(sObject sob) {
        delete sob;
        System.debug('sob>>>>'+sob);//NG
        return sob;
        
    }
    
    @AuraEnabled
    public static void updateRecords(List<sObject> sobList, String updateObjStr, String objectName) {    
        schema.SObjectType sobjType = Schema.getGlobalDescribe().get(ObjectName);   
        System.debug('  '+sobjType);
        
        Map<String, Schema.sObjectField> sObjectFields = sobjType.getDescribe().fields.getMap();
        
        List<sObject> updateList = new List<sObject>();
        List<Object> obList = (List<Object>) JSON.deserializeUntyped(updateObjStr);
        for(object ob :obList) {
            Map<String, object> obmap = (Map<String, object>)ob;
            
            String rowKey = (String)obmap.get('id');
            System.debug('>>>>rowKey>>>>>>>>'+rowKey);
            Integer rowKeyInt = Integer.ValueOf(rowKey.removeStart('row-'));
            
            sobject sObj = sobList[rowKeyInt];
            for(string fieldName : obmap.keySet()) {
                if(fieldName != 'id') {
                    Object value = obmap.get(fieldName);
                    Schema.DisplayType valueType = sObjectFields.get(fieldName).getDescribe().getType();
                    System.debug('>>>>value instanceof String && valueType>>>>>>>>'+valueType);
                    System.debug('>>>>Schema.DisplayType.String>>>>>>>>'+Schema.DisplayType.String);
                    if (true)
                    {
                        String svalue = (String)value;
                        if (valueType == Schema.DisplayType.Date)
                            sObj.put(fieldName, Date.valueOf(svalue));
                        else if(valueType == Schema.DisplayType.DateTime) {
                            try{
                                System.debug( (DateTime)value);
                            }catch(exception ex) {
                                system.debug(ex.getmessage());
                            }
                            String d1 = svalue;
                            list<String> d2 = d1.split('-');
                            list<integer> timeComponent = new list<integer>();
                            timeComponent.add(Integer.valueOf(d2[0]));
                            timeComponent.add(Integer.valueOf(d2[1]));
                            timeComponent.add(Integer.valueOf(d2[2].left(2)));
                            
                            String t = d2[2].substringBetween('T','.');
                            
                            list<String> time1 = t.split(':');
                            timeComponent.add(Integer.valueOf(time1[0]));
                            timeComponent.add(Integer.valueOf(time1[1]));
                            timeComponent.add(Integer.valueOf(time1[2]));
                            
                            Datetime dt = Datetime.newInstance(timeComponent[0],timeComponent[1],timeComponent[2],timeComponent[3],timeComponent[4],timeComponent[5]);
                            sObj.put(fieldName, dt);
                        }
                        //
                        else if (valueType == Schema.DisplayType.Percent || valueType == Schema.DisplayType.Currency)
                            sObj.put(fieldName, svalue == '' ? null : Decimal.valueOf(svalue));
                        else if (valueType == Schema.DisplayType.Double)
                            sObj.put(fieldName, svalue == '' ? null : Double.valueOf(svalue));
                        else if (valueType == Schema.DisplayType.Integer)
                            sObj.put(fieldName, Integer.valueOf(svalue));
                        else if (valueType == Schema.DisplayType.Base64)
                            sObj.put(fieldName, Blob.valueOf(svalue));
                        else
                            sObj.put(fieldName, svalue);
                    }
                    else
                        sObj.put(fieldName, value);
                }
            }
            updateList.add(sObj);
        }
        
        update updateList;
    }
    
    public class DataTableWrapper {
        @AuraEnabled
        public List<LabelDescriptionWrapper> ldwList;
        @AuraEnabled
        public List<sObject> sobList;
        @AuraEnabled
        public List<sObject> totalData;
        @AuraEnabled
        public List<String> fieldsList;
        @AuraEnabled
        public Integer totalCount;
        @AuraEnabled
        public Boolean isBrokerUser;
        
    }
    
    public class LabelDescriptionWrapper {
        @AuraEnabled
        public String label;
        @AuraEnabled
        public String fieldName;
        @AuraEnabled
        public String type;
        @AuraEnabled
        public boolean sortable;
        @AuraEnabled
        public boolean editable;
        @AuraEnabled
        public TypeAttributes typeAttributes;
        
        public LabelDescriptionWrapper(String labelTemp, String fieldNameTemp, String typeTemp, boolean sortableTemp, boolean editableTemp,TypeAttributes typeAttributesTemp) {
            label     = labelTemp;
            fieldName = fieldNameTemp;
            type      = typeTemp;
            sortable  = sortableTemp;
            editable = editableTemp;
            typeAttributes = typeAttributesTemp;
        }
    }
    
    public class TypeAttributes  {
        @AuraEnabled
        public List<Actions> rowActions;
        
        public typeAttributes(List<Actions> rowActionsTemp) {
            rowActions    = rowActionsTemp;
        }
    }
    
    public class Actions {
        @AuraEnabled
        public String label;
        @AuraEnabled
        public String name;
        
        public Actions(String labelTemp, String nameTemp) {
            label       = labelTemp;
            name        = nameTemp;
        }
    }
    @AuraEnabled
    public static void createNewApprovedApp(String newAAData){
        warpTheFieldsValue objValueWrap = (warpTheFieldsValue) JSON.deserialize(newAAData, warpTheFieldsValue.class);
        Insert new Approved_Appraiser__c
            (Municipality__c = objValueWrap.municipality,
            Appraiser_Film__c = objValueWrap.appraisalFirm,
            Appraisers__c = objValueWrap.Appraisers,
             Email__c = objValueWrap.Email,
             Fax__c = objValueWrap.Fax,//Phone__c = objValueWrap.Phone,
             Address__c = objValueWrap.Address);
        
    }
    
    public class warpTheFieldsValue{
        @testVisible
        public string municipality;
        @testVisible
        public string appraisalFirm;
        @testVisible
        public string Appraisers;
        @testVisible
        public string Email;
        @testVisible
        public string Fax;
        @testVisible
        public string Phone;
        @testVisible
        public string Address;
    }
}