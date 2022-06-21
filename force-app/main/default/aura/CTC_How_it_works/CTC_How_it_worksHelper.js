({
    SendEmail : function(component) {
        console.log("start");
        var email=this._e('txtEmail').value;
        var action=component.get("c.processEmail");
        action.setParams({
            email:email,
            
        })
        action.setCallback(this,function(e){
            if(e.getState()=='SUCCESS'){
                var result=e.getReturnValue();
                console.log(result);
                if(result=='Success'){
                    alert('Email Send Successfully!');
                    component.set('v.email',null)
                }
                else{
                    alert(result);
                }
            }
            else{
                alert(JSON.stringify(e.getError()));
            }
        });
        $A.enqueueAction(action);
    },
    
    _e:function(ele){
        return document.getElementById(ele);
    },
    
    helperinstashare: function(component){
        var instaname= component.get("v.name");
        var instaemail= component.get("v.email");
        var instastatus= component.get("v.status");
        var action = component.get("c.createInstashare");
        action.setParams({"name":instaname,"email":instaemail,"status":instastatus});
        action.setCallback(this,function(response){
            var state = response.getState();
            if(state=="SUCCESS")
            {
                var res = response.getReturnValue();
                alert(res);
            }
        });
        $A.enqueueAction(action);
    },
    
    
    fetchData: function (component, fetchData, numberOfRecords) {
        
    },
    

})