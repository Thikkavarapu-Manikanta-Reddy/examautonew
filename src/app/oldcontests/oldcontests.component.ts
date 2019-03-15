import { Component, OnInit } from '@angular/core';
declare var $: any;
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Observable,Subject,combineLatest} from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-oldcontests',
  templateUrl: './oldcontests.component.html',
  styleUrls: ['./oldcontests.component.css']
})
export class OldcontestsComponent implements OnInit {

    startAt = new Subject();
  endAt = new Subject();

startobs = this.startAt.asObservable();
  endobs = this.endAt.asObservable();
days:string;
hours:string;
minutes:string;
seconds:string;
exists:string;
quest;
bool1:boolean = false;
bool2:boolean = false;
zip:boolean = false;
zip1:boolean = false;
bomb:boolean = false;
bomb1:boolean = false;
bomb2:boolean = false;
boom:boolean = false;
jog:boolean = false;
papid:string;
num:number;
exp:string;
middle:string = 'Nothing!!';
spinner:boolean = true;
spinner1:boolean = true;
PassForm: FormGroup;
delete:string;

  constructor(private formBuilder: FormBuilder,private router: Router,private afs: AngularFirestore,private auth:AuthService) { }

  ngOnInit() {

this.createform();
const db = firebase.firestore();
  var hello = this;


        if(!this.auth.isloggedin())
    {
      this.jog = true;
      this.boom = false;
      this.bomb = false;
    }
    else
    {
      this.jog = false;
      this.bomb = true;
      db.collection('OldCommonQuestionPapers')
    .where("user", "==", this.auth.getuser())
  .get()
  .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
     hello.boom = true;
      } 
    else {
        hello.boom = false;
      }
         });

    }

    combineLatest(this.startobs, this.endobs).subscribe((value) => {
      this.firequery(value[0], value[1]).subscribe((clubs) => {
         if(clubs!='')
        {
        this.zip = false;
        this.quest = clubs;
        this.spinner = false;
      }
      else
      {
        this.zip = true;
        this.spinner = false;
        this.exists = "There is no such Contest avalaible!!";
      }
      })
    })

    //console.log(this.num[0],this.num[1]);
      this.auth.getoldquescon().subscribe(data123 => {
      if(data123!='')
      {
        this.zip = false;
        this.zip1 = false;
        this.quest = data123;
        this.spinner = false;
      }
  else
  {

      this.zip1 = true;
      this.zip = true;
      this.spinner = false;
      this.exists = "At Present No OldCompetitions Are Available";
  }
    });

  }

  onKey(event: any)
{
  let q = event.target.value;
  //console.log(q);
      if (q != '') {
      this.startAt.next(q);
      this.endAt.next(q + "\uf8ff");
    }
    else {
     this.auth.getoldquescon().subscribe(data123 => {
    this.zip = false;
    this.quest = data123;
    this.spinner = false;
    });
    }
}

  firequery(start, end): Observable<any>
{
    return this.afs.collection('OldCommonQuestionPapers', ref => ref.limit(4).orderBy('pid').startAt(start).endAt(end)).valueChanges();
}

  createform()
{
this.PassForm = this.formBuilder.group({
     password: ['', [Validators.required, Validators.pattern,Validators.min(10000),, Validators.max(99999)] ]
    });
}

  contest(pid:string)
  {
      this.bool1 = false;
      this.bool2  =false;
    localStorage.setItem("epid2",pid);
    $('#myModal').modal('show');
     this.PassForm.reset({
     password: ''
     });
  }

start()
{
  localStorage.removeItem('oldresult'+localStorage.getItem("epid2"));
this.spinner1 = false;
const db = firebase.firestore();
  var hello = this;

        db.collection('OldUsersAnswers').doc(this.auth.getuser())
        .collection(localStorage.getItem("epid2"))
      .get()
      .then((querySnapshot)=> {
    querySnapshot.forEach(function(doc) {
    doc.ref.delete();
  });
});
db.collection('OldCommonQuestionPapers')
      .where('pass', '==', this.PassForm.value.password)
     .get()
        .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
         querySnapshot.forEach((doc)=> {
                   hello.bool2 = true;
                   hello.bool1 = false;
                   hello.middle="Succesfully Authenticated!!";
                   hello.auth.setoldexamin(true);
                 setTimeout(()=>{
                   hello.spinner1 = true;
                 $('#myModal').modal('hide');
           hello.router.navigate(['oldexam']);
      }, 1500)

    });
      } 
    else {
       hello.bool2 = false;
       hello.bool1 = true;
       hello.spinner1 = true;
       hello.middle="Incorrect Password!!";
      }
         });
}
login()
{
  $('#myModal').modal('hide');
this.router.navigate(['login']);
}

deletecont1(pid1:string)
{
  this.delete = pid1;
  $('#myModal2').modal('show');
 // console.log(this.delete);
}

deletecont()
{
  $('#myModal2').modal('hide');
  const db = firebase.firestore();
  var hello = this;
db.collection('OldCommonQuestionPapers')
      .where('pid', '==', this.delete)
      .where('user','==',this.auth.getuser()).get()
        .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
         querySnapshot.forEach(function(doc) {
    doc.ref.delete();
  //console.log("Document successfully deleted!");
    });
      } 
    else {
       $('#myModal1').modal('show');
      }
         });
}

}
