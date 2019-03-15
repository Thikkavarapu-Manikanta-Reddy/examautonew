import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $: any;
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	LoginForm: FormGroup;
  constructor(private router: Router,private formBuilder: FormBuilder,private afs: AngularFirestore,private auth:AuthService) { }

  ngOnInit() {
  	this.createform();
    $(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip();   
});

  }

createform()
{
this.LoginForm = this.formBuilder.group({
     email: ['', [Validators.required,Validators.email] ],
     password: ['', [Validators.required, Validators.pattern] ],
    });
}
onSubmit()
{
  $('[data-toggle="tooltip"]').tooltip('dispose');
	const db = firebase.firestore();
	var hello = this;
	//console.log(hello.LoginForm.value.password);
 	 db.collection('UserDetails')
 	 .where("secretkey", "==", this.LoginForm.value.password)
 	 .where("email", "==", this.LoginForm.value.email)
	.get()
	.then(function(querySnapshot) {
 	if (querySnapshot.size > 0) {
  querySnapshot.forEach((doc)=> {
 		//console.log(querySnapshot.docs[0].data());
 		hello.auth.setloggedin(true);
 		hello.auth.setloggeduser(doc.data().name,hello.LoginForm.value.email,doc.data().number);
		hello.router.navigate(['automata']);
  });
  		} 
  	else {
  		//console.log("No such document!");
  		//console.log(typeof hello.LoginForm.value.password);
    	$('#myModal').modal('show');
    	hello.LoginForm.reset({
      email: '',
      password: ''
    });
  		}
    })
    .catch(function(error) {
        //console.log("Error getting documents: ", error);
    });
}

}
