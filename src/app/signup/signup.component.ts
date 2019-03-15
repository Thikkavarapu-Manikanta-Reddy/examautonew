import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $: any;
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
	SignupForm: FormGroup;
	emailid:string;
  constructor(private router: Router,private formBuilder: FormBuilder,private afs: AngularFirestore,private auth:AuthService) { }

  ngOnInit() {
  	this.createform();
  	this.emailid = this.auth.getemail();
  	//console.log(this.emailid);
    $(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip();   
});
  }

createform()
{
this.SignupForm = this.formBuilder.group({
     name: ['', [Validators.required, Validators.pattern] ],
     number: ['', [Validators.required, Validators.pattern] ],
     password: ['', [Validators.required, Validators.pattern] ],
     cpassword: ['', [Validators.required, Validators.pattern] ]
    });
}
onSubmit()
{
$('[data-toggle="tooltip"]').tooltip('dispose');
const db = firebase.firestore();
	var hello = this;
	//console.log(hello.LoginForm.value.password);
 	 db.collection('UserDetails')
 	 .where("email", "==", this.emailid)
	.get()
	.then(function(querySnapshot) {
 	if (querySnapshot.size > 0) {
 			$('#myModal3').modal('show');
 			hello.SignupForm.reset({
      			name: '',
            number:'',
      			password: '',
      			cpassword: ''
    		});
  		} 
  	else {
    db.collection('UserDetails')
    .where("name","==",hello.SignupForm.value.name)
  .get().then(function(querySnapshot) {
   if (querySnapshot.size > 0) {
       $('#myModal4').modal('show');
      } 
    else {

          if(hello.SignupForm.value.password == hello.SignupForm.value.cpassword)
  {
    hello.afs.collection('UserDetails').doc(hello.emailid).set({
      name:hello.SignupForm.value.name,
      email: hello.emailid,
      secretkey:hello.SignupForm.value.password,
      number:hello.SignupForm.value.number
    });
        hello.SignupForm.reset({
            name: '',
            number:'',
            password: '',
            cpassword: ''
        });
    $('#myModal1').modal('show');

  }
  else
  {
    $('#myModal2').modal('show');
  }

    }
  });

  		}
    })
    .catch(function(error) {
       // console.log("Error getting documents: ", error);
    });

}

}
