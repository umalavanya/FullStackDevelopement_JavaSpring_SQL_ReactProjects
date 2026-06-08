<div style="margin-top:100px;margin-left: 200px;">
<form>

     <input
      type="text"
       placeholder="enter username"
       ngModel
       name="username"
       #username ="ngModel"
       required
       minlength="5"
       maxlength="10"> 
         @if(username.touched && username.invalid){
            
             @if(username.errors?.['required']){
                <span style="color:red">Username required</span>
             }
              @if(username.errors?.['minlength']){
                <span style="color:red">Username should be atleast 5 chars</span>
             }

         }
       <br><br>
      <input
       type="password"
        placeholder="enter password"
        ngModel
        name="password"
        #password="ngModel"
        required
        minlength="8"
        >
         @if(password.touched && password.invalid){
            
             @if(password.errors?.['required']){
                <span style="color:red">password required</span>
             }
              @if(password.errors?.['minlength']){
                <span style="color:red">password should be atleast 8 chars</span>
             }

         }
         
      
      <br><br>
       <button>Login</button>
</form>
</div>