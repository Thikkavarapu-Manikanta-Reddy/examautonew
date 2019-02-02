import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $: any;
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Observable,Subject,combineLatest} from 'rxjs';
@Component({
  selector: 'app-automata',
  templateUrl: './automata.component.html',
  styleUrls: ['./automata.component.css']
})
export class AutomataComponent implements OnInit {
    startAt = new Subject();
  endAt = new Subject();

startobs = this.startAt.asObservable();
  endobs = this.endAt.asObservable();

NumForm: FormGroup;
  quest;
  zip:boolean = false;
  zip1:boolean = false;
  exists:string;
  paper:string;
  pappo:string;
  hello:string;
  passw:string;
  bool1:boolean = false;
  bool2:boolean = false;
  drink:boolean = false;
  crisis:boolean = false;
  spinner:boolean = true;
  ero:string = 'Null';
  spinner1:boolean = true;
  constructor(private router: Router,private formBuilder: FormBuilder,private afs: AngularFirestore,private auth:AuthService) { }

  ngOnInit() {
        $(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip();   
});
    localStorage.removeItem('signedup');
        var d = new Date();
      var day1, month1, year1;
      day1 = d.getDate();
  month1 = d.getMonth() + 1;
  year1 = d.getFullYear();
  if(month1<10 && day1<10)
  {
    this.hello = year1+"-0"+month1+"-0"+day1;
   // console.log("hurray");
  }
  else if(day1<10)
  {
    this.hello = year1+"-"+month1+"-0"+day1;
  }
  else if(month1<10)
  {
    this.hello = year1+"-0"+month1+"-"+day1;
  }
  else
  {
    this.hello = year1+"-"+month1+"-"+day1;
  }
  //console.log(this.hello);
    this.createform();

if(localStorage.getItem("bool") == "true")
{
  this.paper = localStorage.getItem("papstat");
  $('#myModal').modal('show');
    setTimeout(()=>{
  $('#myModal').modal('hide');
  }, 2000);
  localStorage.removeItem('bool');
  localStorage.removeItem('papstat');
}

  this.auth.getquespub().subscribe(data123 => {
      if(data123!='')
      {
    this.zip = false;
    this.zip1 = false;
    this.quest = data123;
    this.spinner = false;
    // console.log(data123[0].pass)
  }
  else
  {
    this.zip1 = true;
      this.zip = true;
      this.spinner = false;
      this.exists = "At Present No Question Papers Are Available";
  }
    });

    combineLatest(this.startobs, this.endobs).subscribe((value) => {
      this.firequery(value[0], value[1]).subscribe((clubs) => {
         if(clubs!='')
        {
        this.zip = false;
        this.quest = clubs;
      }
      else
      {
        this.zip = true;
        this.exists = "There is no such paper avalaible!!";
      }
      })
    })
  }

createform()
{
this.NumForm = this.formBuilder.group({
     date: ['', [Validators.required] ],
     time: ['', [Validators.required] ],
     dur: ['', [Validators.required,Validators.pattern] ],
     alive: ['', [Validators.required,Validators.pattern] ]
    });
}


onKey(event: any)
{
  let q = event.target.value;
  console.log(q);
      if (q != '') {
      this.startAt.next(q);
      this.endAt.next(q + "\uf8ff");
    }
    else {
     this.auth.getquespub().subscribe(data123 => {
    this.zip = false;
    this.quest = data123
    });
    }
}

  firequery(start, end): Observable<any>
{
    return this.afs.collection('UsersQuestionPapers').doc(this.auth.getuser()).collection('QuestionPapersID', ref => ref.limit(4).orderBy('pid').startAt(start).endAt(end)).valueChanges();
}

update(id:string)
{
  localStorage.setItem('ques',id);
  //console.log(localStorage.getItem('ques'));
  this.router.navigate(['updatepaper']);
}
deletepap(pid1:string)
{
  const db = firebase.firestore();
  var hello = this;
      db.collection('UserQuestionPaper').doc(this.auth.getuser()).collection(pid1)
      .where('qid','>',0).get()
      .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
    doc.ref.delete();
 // console.log("Document successfully deleted1!");
  });
});

      db.collection('UsersQuestionPapers').doc(this.auth.getuser()).collection('QuestionPapersID')
      .where('pid','==',pid1).get()
      .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
    doc.ref.delete();
  //console.log("Document successfully deleted2!");
  });
});

      db.collection('CommonQuestionPapers')
      .where('pid','==',pid1).get()
      .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
    doc.ref.delete();
   localStorage.removeItem('examin'+pid1);
       localStorage.removeItem('case'+hello.auth.getuser()
  +localStorage.getItem("epid"));
localStorage.removeItem('hrs'+hello.auth.getuser()
  +localStorage.getItem("epid"));
localStorage.removeItem('mins'+hello.auth.getuser()
  +localStorage.getItem("epid"));
localStorage.removeItem('secs'+hello.auth.getuser()
  +localStorage.getItem("epid"));
localStorage.removeItem('examin'+localStorage.getItem("epid"));
localStorage.removeItem('paperber'+localStorage.getItem("epid")+localStorage.getItem("user123"));
localStorage.removeItem('numblimit'+localStorage.getItem("epid")+localStorage.getItem("user123"));
 // console.log("Document successfully deleted2!");
  });
});


}

demo123()
{
   $('#myModal2').modal('show');
}

start()
{
this.spinner1 = false;
 localStorage.setItem("epid1",'QP59212');
  const db = firebase.firestore();
  var hello = this;
        db.collection('DemoAnswers').doc(this.auth.getuser())
        .collection(localStorage.getItem("epid1"))
      .get()
      .then((querySnapshot)=> {
    querySnapshot.forEach(function(doc) {
    doc.ref.delete();
  });
});
      hello.auth.setdemoexamin(true);
      setTimeout(()=>{
    $('#myModal2').modal('hide');
    this.spinner1 = true;
    this.router.navigate(['demo']);
      }, 2000) 
}

contest(pid1:string)
{
  localStorage.setItem("papid",pid1);
      this.pappo = pid1;
      $('#myModal1').modal('show');
}

onSubmit123()
{
  $('[data-toggle="tooltip"]').tooltip('dispose');
  const db = firebase.firestore();
  var hello = this;
  localStorage.setItem("keypap",this.pappo);
 db.collection('UsersQuestionPapers').doc(this.auth.getuser())
 .collection('QuestionPapersID')
 .where('pid','==',this.pappo).get().then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
         querySnapshot.forEach((doc)=> {
    //console.log(doc.data().pass);
    hello.passw = doc.data().pass;
  //console.log("Document successfully updated!");

        db.collection('CommonQuestionPapers')
      .where('pid', '==', hello.pappo)
      .where('user','==',hello.auth.getuser()).get()
        .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
         querySnapshot.forEach((doc)=> {
      db.collection('CommonQuestionPapers')
      .where('pid','==',hello.pappo).get()
      .then((querySnapshot)=> {
    querySnapshot.forEach((doc)=> {
    doc.ref.update({time:hello.NumForm.value.dur});
  //console.log("Document successfully updated!");
    });
});
    });
      } 
    else {
      db.collection('CommonQuestionPapers')
      .add({
      pid:hello.pappo,
      pass:hello.passw,
      time:hello.NumForm.value.dur,
      alive:hello.NumForm.value.alive,
      user:hello.auth.getuser()
    }).then(function(docRef) {
        //console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        //console.error("Error adding document: ", error);
      });
      }
         });
      });
      } 
    else {
       //$('#myModal1').modal('show');
      }
         });



  this.bool1 = false;
  this.bool2 = false;
  this.drink = false;
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
  //$('#submit123').on('click', ()=>{
    
  var date = new Date($('#date-input').val());
  var day, month,monthos,year,time,hr1,min1;
  time = $('#myTime').val();
  day = date.getDate();
  month = date.getMonth();
  monthos = date.getMonth()+1;
  year = date.getFullYear();
  var d = new Date();
   var day1, month1, year1;
  hr1 = d.getHours();
  min1 = d.getMinutes();
  day1 = d.getDate();
  month1 = d.getMonth() + 1;
  year1 = d.getFullYear();
  var ion = time.split(':');
    console.log(day,month1,year,ion[0],ion[1]);
    if(year==year1 && monthos==month1 && day==day1)
    {
  if(ion[0]==hr1)
  {
    if(ion[1]>min1)
    {
      this.drink = true;
    }
    else
    {
      this.ero = "Enter the Correct Time(Minutes)!!";
      this.bool2 = true;
    }
  }
  else if (ion[0]>hr1) 
  {
    this.drink = true;
  }
  else
  {
      this.ero = "Enter the Correct Time(Hours and Minutes)!!";
      this.bool2 = true;
  }
  }
  else if(year<year1)
  {
      this.ero = "Enter Correct Year!!";
      this.bool2 = true;
  }
  else
  {
    this.drink = true;
  }
  if(this.drink == true)
  {
    localStorage.setItem("%day"+localStorage.getItem("papid"),day);
      localStorage.setItem("%month"+localStorage.getItem("papid"),monthNames[date.getMonth()]);
      localStorage.setItem("%year"+localStorage.getItem("papid"),year);
      localStorage.setItem("%hour"+localStorage.getItem("papid"),ion[0]);
      localStorage.setItem("%min"+localStorage.getItem("papid"),ion[1]);
      this.ero = "Timings are setted perfectly!!";
    this.bool1 = true;
      setTimeout(()=>{
    $('#myModal1').modal('hide');
    this.router.navigate(['contests']);
      }, 2000)       

  }

}


}