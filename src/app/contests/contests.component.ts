import { Component, OnInit } from '@angular/core';
declare var $: any;
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Observable,Subject,combineLatest} from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-contests',
  templateUrl: './contests.component.html',
  styleUrls: ['./contests.component.css']
})
export class ContestsComponent implements OnInit {

    startAt = new Subject();
  endAt = new Subject();

startobs = this.startAt.asObservable();
  endobs = this.endAt.asObservable();

days1:string;
hours1:string;
minutes1:string;
seconds1:string;
days:string;
hours:string;
minutes:string;
seconds:string;
exists:string;
quest;
alive:number;
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
papid1:boolean;
deadline:boolean;
aliveline:boolean;
papid123:string;
num:number;
num1:number;
exp:string;
ptime:number;
passw:string;
userc:string;
middle:string = 'Nothing!!';
spinner:boolean = true;
spinner1:boolean = true;
alivebool:boolean = false;
zoomalive:boolean;
zoomboom:boolean;
PassForm: FormGroup;
delete:string;
time;

  constructor(private formBuilder: FormBuilder,private router: Router,private afs: AngularFirestore,private auth:AuthService) { }

  ngOnInit() {

this.createform();
const db = firebase.firestore();
  var hello = this;

    if(!this.auth.isloggedin())
    {
      this.jog = true;
      this.boom = false;
    }
    else
    {
      this.jog = false;
      db.collection('CommonQuestionPapers')
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
      }
      else
      {
        this.zip = true;
        this.exists = "There is no such Contest avalaible!!";
      }
      })
    })

    //console.log(this.num[0],this.num[1]);
      this.auth.getquescon().subscribe(data123 => {
      if(data123!='')
      {
        this.zip = false;
        this.zip1 = false;
        this.spinner = false;
        this.quest = data123;
      }
  else
  {
//console.log("hello")
      this.zip1 = true;
      this.zip = true;
      this.spinner = false;
      this.exists = "At Present No Competitions Are Available";
  }
    });

  }

leader()
{
  console.log("jump");
  $('#myModal3').modal('hide');
  this.router.navigate(['leaderboard']);
}

alive123(pid:string)
{
  this.alivebool = false;
  this.zoomboom = JSON.parse(localStorage.getItem('zoom0'
  +pid) || 'false');
  this.zoomalive = JSON.parse(localStorage.getItem('zoom1'
  +pid) || 'false');
    $('#myModal2').modal('show');
  if(this.zoomboom = true)
  {
      if(this.zoomalive == false)
{
this.alivebool=false;
}
else{
this.alivebool=true;

 const db = firebase.firestore();
  var hello = this;

 hello.aliveline = JSON.parse(localStorage.getItem('alive'
  +pid) || 'false');
    if(hello.aliveline == false)
{
  //console.log("databasealive");
      db.collection('AliveContestsTimes')
      .where('pid', '==', pid).get()
      .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
     querySnapshot.forEach((doc)=> {
localStorage.setItem("monthD1"+pid,doc.data().month);
localStorage.setItem("dayD1"+pid,doc.data().day);
localStorage.setItem("yearD1"+pid,doc.data().year);
localStorage.setItem("hourD1"+pid,doc.data().hour);
localStorage.setItem("minD1"+pid,doc.data().min);
localStorage.setItem("secD1"+pid,doc.data().sec);
localStorage.setItem('alive'+pid,'true');

// var countDownDate = new Date(doc.data().month
//   +doc.data().day+","
//   +doc.data().year+" "
//   +doc.data().hour+":"
//   +doc.data().min+":"+doc.data().sec).getTime();

// Update the count down every 1 second
      hello.papid123 = JSON.parse(localStorage.getItem('king11') || 'false');
    if(hello.papid123 == 'false')
    localStorage.setItem("king11",pid);
  if(localStorage.getItem("king11") != pid)
  {
    clearInterval(hello.num1);
  }

hello.num1 = window.setInterval(()=> {

  hello.auth.getDate1(doc.data().month,doc.data().day,
    doc.data().year,doc.data().hour,doc.data().min,
    doc.data().sec).subscribe((data) => {

   console.log(data);
   hello.time = data.time;

    //Find the distance between now and the count down date
var countDownDate = data.countDown;

// Find the distance between now and the count down date
  var distance = countDownDate - hello.time;

// Time calculations for days, hours, minutes and seconds
  var days1 = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours1 = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes1 = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds1 = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result in an element with id="demo"
    hello.days1 = days1.toString();
    hello.hours1 = hours1.toString();
    hello.minutes1 = minutes1.toString();
    hello.seconds1 = seconds1.toString();
   // console.log(hello.days,hello.hours,hello.minutes,hello.seconds);
    
  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(hello.num1);
    localStorage.removeItem('king11');
    localStorage.removeItem('alive'+pid);
    localStorage.removeItem('dead'+pid);
    localStorage.removeItem('case1'+pid);
          //hello.yoyo3 = true;
      db.collection('OldCommonQuestionPapers')
      .where('pid', '==', pid)
      .get()
        .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
         querySnapshot.forEach((doc)=> {
       doc.ref.update({time:hello.ptime});
       //hello.yoyo4 = true;
       db.collection('CommonQuestionPapers')
      .where('pid', '==', pid)
      .get()
        .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
         querySnapshot.forEach((doc)=> {
    doc.ref.delete();
   // hello.yoyo4 = true;
  //console.log("as","Document successfully deleted!");
    });
      } 
    else {
       
      }
         });
        db.collection('ContestsTimes')
      .where('pid', '==', pid).get()
        .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
         querySnapshot.forEach(function(doc) {
    doc.ref.delete();
  //console.log("Document successfully deleted!");
    });
      } 
    else {
       
      }
         });
        db.collection('AliveContestsTimes')
      .where('pid', '==', pid).get()
        .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
         querySnapshot.forEach(function(doc) {
    doc.ref.delete();
  //console.log("Document successfully deleted!");
    });
      } 
    else {
       
      }
         });
    });
      } 
    else {
       
 db.collection('OldCommonQuestionPapers')
      .add({
      pid:pid,
      pass:hello.passw,
      time:hello.ptime,
      user:hello.userc
    }).then(function(docRef) {
      db.collection('CommonQuestionPapers')
      .where('pid', '==', pid)
      .get()
        .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
         querySnapshot.forEach((doc)=> {
    doc.ref.delete();
    });
      } 
    else {
       
      }
         });
        //console.log("Document written with ID: ", docRef.id);
   db.collection('ContestsTimes')
      .where('pid', '==', pid).get()
        .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
         querySnapshot.forEach(function(doc) {
    doc.ref.delete();
  //console.log("Document successfully deleted!");
    });
      } 
    else {
       
      }
         });
        db.collection('AliveContestsTimes')
      .where('pid', '==', pid).get()
        .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
         querySnapshot.forEach(function(doc) {
    doc.ref.delete();
  //console.log("Document successfully deleted!");
    });
      } 
    else {
       
      }
         });
    })
    .catch(function(error) {
        //console.error("Error adding document: ", error);
      });

      }
         });
    $('#myModal2').modal('hide');
  }


});    
}, 1000);
    
           });
      } 
    else {

      }
    })
    .catch(function(error) {
        //console.log("Error getting documents: ", error);
    });
}
else
{
//console.log("localalive");
// var countDownDate = new Date(localStorage.getItem("monthD1"+pid)
//   +localStorage.getItem("dayD1"+pid)+","
//   +localStorage.getItem("yearD1"+pid)+" "
//   +localStorage.getItem("hourD1"+pid)+":"
//   +localStorage.getItem("minD1"+pid)+":"+localStorage.getItem("secD1"+pid)).getTime();

// Update the count down every 1 second
      hello.papid123 = JSON.parse(localStorage.getItem('king11') || 'false');
    if(hello.papid123 == 'false')
    localStorage.setItem("king11",pid);
  if(localStorage.getItem("king11") != pid)
  {
    clearInterval(hello.num1);
  }

// Update the count down every 1 second
hello.num1 = window.setInterval(()=> {

  hello.auth.getDate1(localStorage.getItem("monthD1"+pid),
    parseInt(localStorage.getItem("dayD1"+pid)),
    parseInt(localStorage.getItem("yearD1"+pid)),
    parseInt(localStorage.getItem("hourD1"+pid)),
    parseInt(localStorage.getItem("minD1"+pid)),
    parseInt(localStorage.getItem("secD1"+pid))).subscribe((data) => {

   console.log(data);
   hello.time = data.time;

    //Find the distance between now and the count down date
var countDownDate = data.countDown;

// Find the distance between now and the count down date
  var distance = countDownDate - hello.time;

 // Time calculations for days, hours, minutes and seconds
  var days1 = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours1 = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes1 = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds1 = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result in an element with id="demo"
    hello.days1 = days1.toString();
    hello.hours1 = hours1.toString();
    hello.minutes1 = minutes1.toString();
    hello.seconds1 = seconds1.toString();
   // console.log(hello.days,hello.hours,hello.minutes,hello.seconds);
    
  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(hello.num1);
    localStorage.removeItem('king11');
    localStorage.removeItem('alive'+pid);
    localStorage.removeItem('dead'+pid);
    localStorage.removeItem('case1'+pid);
    localStorage.removeItem('zoom0'+pid);
    localStorage.removeItem('zoom1'+pid);
          //hello.yoyo3 = true;
      db.collection('OldCommonQuestionPapers')
      .where('pid', '==', pid)
      .get()
        .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
         querySnapshot.forEach((doc)=> {
       doc.ref.update({time:hello.ptime});
       //hello.yoyo4 = true;
       db.collection('CommonQuestionPapers')
      .where('pid', '==', pid)
      .get()
        .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
         querySnapshot.forEach((doc)=> {
    doc.ref.delete();
   // hello.yoyo4 = true;
  //console.log("as","Document successfully deleted!");
    });
      } 
    else {
       
      }
         });
        db.collection('ContestsTimes')
      .where('pid', '==', pid).get()
        .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
         querySnapshot.forEach(function(doc) {
    doc.ref.delete();
  //console.log("Document successfully deleted!");
    });
      } 
    else {
       
      }
         });
        db.collection('AliveContestsTimes')
      .where('pid', '==', pid).get()
        .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
         querySnapshot.forEach(function(doc) {
    doc.ref.delete();
  //console.log("Document successfully deleted!");
    });
      } 
    else {
       
      }
         });
    });
      } 
    else {
       
 db.collection('OldCommonQuestionPapers')
      .add({
      pid:pid,
      pass:hello.passw,
      time:hello.ptime,
      user:hello.userc
    }).then(function(docRef) {
      db.collection('CommonQuestionPapers')
      .where('pid', '==', pid)
      .get()
        .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
         querySnapshot.forEach((doc)=> {
    doc.ref.delete();
    });
      } 
    else {
       
      }
         });
        //console.log("Document written with ID: ", docRef.id);
   db.collection('ContestsTimes')
      .where('pid', '==', pid).get()
        .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
         querySnapshot.forEach(function(doc) {
    doc.ref.delete();
  //console.log("Document successfully deleted!");
    });
      } 
    else {
       
      }
         });
        db.collection('AliveContestsTimes')
      .where('pid', '==', pid).get()
        .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
         querySnapshot.forEach(function(doc) {
    doc.ref.delete();
  //console.log("Document successfully deleted!");
    });
      } 
    else {
       
      }
         });
    })
    .catch(function(error) {
        //console.error("Error adding document: ", error);
      });

      }
         });
    $('#myModal2').modal('hide');
  }

});
},1000);
    
      }

}
  }
}

  createform()
{
this.PassForm = this.formBuilder.group({
     password: ['', [Validators.required, Validators.pattern,Validators.min(10000),, Validators.max(99999)] ]
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
     this.auth.getquescon().subscribe(data123 => {
    this.zip = false;
    this.quest = data123
    });
    }
}

  firequery(start, end): Observable<any>
{
    return this.afs.collection('CommonQuestionPapers', ref => ref.limit(4).orderBy('pid').startAt(start).endAt(end)).valueChanges();
}


  contest(pid:string)
  {
  const db = firebase.firestore();
  var hello = this;

    if(hello.auth.isloggedin())
    {
          db.collection('ExamComp').doc(this.auth.getuser())
    .collection(pid).where('exam','==',1)
    .get()
        .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
     $('#myModal3').modal('show');
      } 
    else {
    hello.cool(pid);
    }
    });  
    }
    else
    { 
    hello.cool(pid);       
    }
      }
      
cool(pid:string)
{
    const db = firebase.firestore();
  var hello = this;
 hello.bool1 = false;
hello.bool2  =false;
hello.middle = "Nothing";
    localStorage.setItem("epid",pid);
    hello.bomb = false;
    hello.bomb1 =false;
    hello.bomb2 =false;
    $('#myModal').modal('show');
        // Set the date we're counting down to
    hello.deadline = JSON.parse(localStorage.getItem('dead'
  +pid) || 'false');
    if(hello.deadline == false)
{
  //console.log("database");
      db.collection('ContestsTimes')
      .where('pid', '==', pid).get()
      .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
     querySnapshot.forEach((doc)=> {
localStorage.setItem("monthA1"+pid,doc.data().month);
localStorage.setItem("dayA1"+pid,doc.data().day);
localStorage.setItem("yearA1"+pid,doc.data().year);
localStorage.setItem("hourA1"+pid,doc.data().hour);
localStorage.setItem("minA1"+pid,doc.data().min);
localStorage.setItem('dead'+pid,'true');
// var countDownDate = new Date(doc.data().month
//   +doc.data().day+","
//   +doc.data().year+" "
//   +doc.data().hour+":"
//   +doc.data().min+":"+"0").getTime();

// Update the count down every 1 second
      hello.papid = JSON.parse(localStorage.getItem('king44') || 'false');
    if(hello.papid == 'false')
    localStorage.setItem("king44",pid);
  if(localStorage.getItem("king44") != pid)
  {
    clearInterval(hello.num);
  }

hello.num = window.setInterval(()=> {

  hello.auth.getDate1(doc.data().month,doc.data().day,
    doc.data().year,doc.data().hour,doc.data().min,
    0).subscribe((data) => {

   console.log(data);
   hello.time = data.time;

    //Find the distance between now and the count down date
var countDownDate = data.countDown;

// Find the distance between now and the count down date
  var distance = countDownDate - hello.time;

// Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    hello.days = days.toString();
    hello.hours = hours.toString();
    hello.minutes = minutes.toString();
    hello.seconds = seconds.toString();
  // Output the result in an element with id="demo"

   //console.log(hello.days,hello.hours,hello.minutes,hello.seconds);
  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(hello.num);
    localStorage.removeItem('king44');
    //localStorage.removeItem('dead'+pid);
     hello.bomb1 = true;
     hello.bomb2 = true;
     hello.alivebool = true;
     hello.startalive(pid);
     localStorage.setItem('zoom0'+pid,'true');
     localStorage.setItem('zoom1'+pid,'true');
     hello.exp = "ExamStarted HurryUp!!";
    if(hello.auth.isloggedin())
    {
      hello.bomb = true;
      hello.jog = false;
    }
    
  else
  {
    hello.jog = true;
  }
  }

});
},1000); 
    
           });
      } 
    else {

      }
    })
    .catch(function(error) {
        //console.log("Error getting documents: ", error);
    });
}
else
{
//console.log("local");
// var countDownDate = new Date(localStorage.getItem("monthA1"+pid)
//   +localStorage.getItem("dayA1"+pid)+","
//   +localStorage.getItem("yearA1"+pid)+" "
//   +localStorage.getItem("hourA1"+pid)+":"
//   +localStorage.getItem("minA1"+pid)+":"+"0").getTime();

// Update the count down every 1 second
      hello.papid = JSON.parse(localStorage.getItem('king44') || 'false');
    if(hello.papid == 'false')
    localStorage.setItem("king44",pid);
  if(localStorage.getItem("king44") != pid)
  {
    clearInterval(hello.num);
  }

hello.num = window.setInterval(()=> {

 hello.auth.getDate1(localStorage.getItem("monthA1"+pid),
    parseInt(localStorage.getItem("dayA1"+pid)),
    parseInt(localStorage.getItem("yearA1"+pid)),
    parseInt(localStorage.getItem("hourA1"+pid)),
    parseInt(localStorage.getItem("minA1"+pid)),
    0).subscribe((data) => {

   console.log(data);
   hello.time = data.time;

    //Find the distance between now and the count down date
var countDownDate = data.countDown;

// Find the distance between now and the count down date
  var distance = countDownDate - hello.time;

// Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    hello.days = days.toString();
    hello.hours = hours.toString();
    hello.minutes = minutes.toString();
    hello.seconds = seconds.toString();
  // Output the result in an element with id="demo"

   //console.log(hello.days,hello.hours,hello.minutes,hello.seconds);
  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(hello.num);
    localStorage.removeItem('king44');
    //localStorage.removeItem('dead'+pid);
     hello.bomb1 = true;
     hello.bomb2 = true;
     hello.alivebool = true;
     hello.startalive(pid);
     localStorage.setItem('zoom0'+pid,'true');
     localStorage.setItem('zoom1'+pid,'true');
     hello.exp = "ExamStarted HurryUp!!";
    if(hello.auth.isloggedin())
    {
      hello.bomb = true;
      hello.jog = false;
    }
    
  else
  {
    hello.jog = true;
  }
  }

});
},1000);

}
}

startalive(pid:string)
{

  const db = firebase.firestore();
  var hello = this;

           const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

 // var d = new Date();
 // var day, month, year,min,hr,sec;
 //  day = d.getDate();
 //  month = monthNames[d.getMonth()];
 //  year = d.getFullYear();
 //  min = d.getMinutes();
 //  hr = d.getHours();
 //  sec = d.getSeconds();
var day, month,monthno,year,min,hr,sec;

this.auth.getDate().subscribe((data) => {

day = data.day;
month = data.month;
monthno = data.monthno;
year = data.year;
hr = data.hr;
min = data.min;
sec = data.sec;

db.collection('CommonQuestionPapers')
  .where("pid", "==", pid)
  .get()
  .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
    querySnapshot.forEach((doc)=> {
    //localStorage.setItem("alive",doc.data().alive);
    hello.ptime = doc.data().time;
    hello.passw = doc.data().pass;
    hello.userc = doc.data().user;
    hello.papid1 = JSON.parse(localStorage.getItem('case1'
  +pid) || 'false');
//console.log("jon",hello.papid1,pid);
  if(hello.papid1 == false)
{
        hello.alive = doc.data().alive;
        hello.alive+=min;
        if(hello.alive>=60 && hello.alive<=119)
        {
          if((hr+1)>23)
          {
            hr=0;
            if(((day+1)>30) && (month=="April"||
              month=="June"||
              month=="September"||month=="November"))
            {
              if(monthno+1>11)
              {
                year+=1;day=1;
                month = monthNames[monthno+1];
              }
              else
              {
              day=1;month = monthNames[monthno+1];
              }
            }
            else if(((day+1)>28) && (month=="February"))
            {
              if(monthno+1>11)
              {
                year+=1;day=1;
                month = monthNames[monthno+1];
              }
              else
              {
              day=1;month = monthNames[monthno+1];
              }
            }
            else if(((day+1)>31) && (month=="January"||
              month=="March"||month=="May"||
              month=="July"||month=="August"||
              month=="October"||month=="December"))
            {
              if(monthno+1>11)
              {
                year+=1;
                day=1;month = monthNames[monthno+1];
              }
              else
              {
              day=1;month = monthNames[monthno+1];
              }
            }
            else
            {
              day+=1;
            }
          }
          else
          {
            hr+=1;
          }
          hello.alive%=60;
        }
        else if(hello.alive>=120 && hello.alive<=179)
        {
          if((hr+2)>23 && (hr+2)<=24)
          {
            hr=0;
            if(((day+1)>30) && (month=="April"||
              month=="June"||
              month=="September"||month=="November"))
            {
              if(monthno+1>11)
              {
                year+=1;day=1;
                month = monthNames[monthno+1];
              }
              else
              {
              day=1;month = monthNames[monthno+1];
              }
            }
            else if(((day+1)>28) && (month=="February"))
            {
              if(monthno+1>11)
              {
                year+=1;day=1;
                month = monthNames[monthno+1];
              }
              else
              {
              day=1;month = monthNames[monthno+1];
              }
            }
            else if(((day+1)>31) && (month=="January"||
              month=="March"||month=="May"||
              month=="July"||month=="August"||
              month=="October"||month=="December"))
            {
              if(monthno+1>11)
              {
                year+=1;
                day=1;month = monthNames[monthno+1];
              }
              else
              {
              day=1;month = monthNames[monthno+1];
              }
            }
            else
            {
              day+=1;
            }
          }
          else if((hr+2)>24 && (hr+2)<=25)
          {
            hr=1;
            if(((day+1)>30) && (month=="April"||
              month=="June"||
              month=="September"||month=="November"))
            {
              if(monthno+1>11)
              {
                year+=1;day=1;
                month = monthNames[monthno+1];
              }
              else
              {
              day=1;month = monthNames[monthno+1];
              }
            }
            else if(((day+1)>28) && (month=="February"))
            {
              if(monthno+1>11)
              {
                year+=1;day=1;
                month = monthNames[monthno+1];
              }
              else
              {
              day=1;month = monthNames[monthno+1];
              }
            }
            else if(((day+1)>31) && (month=="January"||
              month=="March"||month=="May"||
              month=="July"||month=="August"||
              month=="October"||month=="December"))
            {
              if(monthno+1>11)
              {
                year+=1;
                day=1;month = monthNames[monthno+1];
              }
              else
              {
              day=1;month = monthNames[monthno+1];
              }
            }
            else
            {
              day+=1;
            }
          }
          else
          {
            hr+=2;
          }
          hello.alive%=120;
        }
        else if(hello.alive>=180 && hello.alive<=239)
        {
          if((hr+3)>23 && (hr+3)<=24)
          {
            hr=0;
            if(((day+1)>30) && (month=="April"||
              month=="June"||
              month=="September"||month=="November"))
            {
              if(monthno+1>11)
              {
                year+=1;day=1;
                month = monthNames[monthno+1];
              }
              else
              {
              day=1;month = monthNames[monthno+1];
              }
            }
            else if(((day+1)>28) && (month=="February"))
            {
              if(monthno+1>11)
              {
                year+=1;day=1;
                month = monthNames[monthno+1];
              }
              else
              {
              day=1;month = monthNames[monthno+1];
              }
            }
            else if(((day+1)>31) && (month=="January"||
              month=="March"||month=="May"||
              month=="July"||month=="August"||
              month=="October"||month=="December"))
            {
              if(monthno+1>11)
              {
                year+=1;
                day=1;month = monthNames[monthno+1];
              }
              else
              {
              day=1;month = monthNames[monthno+1];
              }
            }
            else
            {
              day+=1;
            }
          }
          else if((hr+3)>24 && (hr+3)<=25)
          {
            hr=1;
            if(((day+1)>30) && (month=="April"||
              month=="June"||
              month=="September"||month=="November"))
            {
              if(monthno+1>11)
              {
                year+=1;day=1;
                month = monthNames[monthno+1];
              }
              else
              {
              day=1;month = monthNames[monthno+1];
              }
            }
            else if(((day+1)>28) && (month=="February"))
            {
              if(monthno+1>11)
              {
                year+=1;day=1;
                month = monthNames[monthno+1];
              }
              else
              {
              day=1;month = monthNames[monthno+1];
              }
            }
            else if(((day+1)>31) && (month=="January"||
              month=="March"||month=="May"||
              month=="July"||month=="August"||
              month=="October"||month=="December"))
            {
              if(monthno+1>11)
              {
                year+=1;
                day=1;month = monthNames[monthno+1];
              }
              else
              {
              day=1;month = monthNames[monthno+1];
              }
            }
            else
            {
              day+=1;
            }
          }
          else if((hr+3)>25 && (hr+3)<=26)
          {
            hr=2;
            if(((day+1)>30) && (month=="April"||
              month=="June"||
              month=="September"||month=="November"))
            {
              if(monthno+1>11)
              {
                year+=1;day=1;
                month = monthNames[monthno+1];
              }
              else
              {
              day=1;month = monthNames[monthno+1];
              }
            }
            else if(((day+1)>28) && (month=="February"))
            {
              if(monthno+1>11)
              {
                year+=1;day=1;
                month = monthNames[monthno+1];
              }
              else
              {
              day=1;month = monthNames[monthno+1];
              }
            }
            else if(((day+1)>31) && (month=="January"||
              month=="March"||month=="May"||
              month=="July"||month=="August"||
              month=="October"||month=="December"))
            {
              if(monthno+1>11)
              {
                year+=1;
                day=1;month = monthNames[monthno+1];
              }
              else
              {
              day=1;month = monthNames[monthno+1];
              }
            }
            else
            {
              day+=1;
            }
          }
          else
          {
            hr+=3;
          }
          hello.alive%=180;
        }
          
          db.collection('AliveContestsTimes')
      .add({
      pid:pid,
      day:day,
      month:month,
      year:year,
      hour:hr,
      min:hello.alive,
      sec:sec
    }).then(function(docRef) {
        //console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        //console.error("Error adding document: ", error);
      });
    localStorage.setItem("case1"
  +pid,'true');
}
else{

}
});
  }
});

});
}

start()
{
  localStorage.removeItem('result'+localStorage.getItem("epid"));
this.spinner1 = false;
const db = firebase.firestore();
  var hello = this;
db.collection('CommonQuestionPapers')
      .where('pass', '==', this.PassForm.value.password)
     .get()
        .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
         querySnapshot.forEach((doc)=> {
                   hello.bool2 = true;
                   hello.bool1 = false;
                   hello.middle="Succesfully Authenticated!!";
                   hello.auth.setexamin(true);
db.collection('UsersParticipatedExams').doc(hello.auth.getuser()).collection('QuestionPapersID')
      .add({
      pid:localStorage.getItem("epid")
    }).then((docRef)=> {
        //console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        //console.error("Error adding document: ", error);
      });
           db.collection('ExamComp').doc(this.auth.getuser())
    .collection(localStorage.getItem("epid")).add({
      exam:1
    }).then(function(docRef) {
        //console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        //console.error("Error adding document: ", error);
      });
                 setTimeout(()=>{
                   hello.spinner1 = true;
                 $('#myModal').modal('hide');
           hello.router.navigate(['exam']);
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
  $('#myModal4').modal('show');
  //console.log(this.delete);
}

deletecont()
{
  $('#myModal4').modal('hide');
  const db = firebase.firestore();
  var hello = this;
      db.collection('ContestsTimes')
      .where('pid', '==', this.delete).get()
        .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
         querySnapshot.forEach(function(doc) {
    doc.ref.delete();
  //console.log("Document successfully deleted!");
  console.log("yep");
    });
      } 
    else {
       
      }
         });
        db.collection('AliveContestsTimes')
      .where('pid', '==', this.delete).get()
        .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
         querySnapshot.forEach(function(doc) {
    doc.ref.delete();
  //console.log("Document successfully deleted!");
    });
      } 
    else {
       
      }
         });

db.collection('CommonQuestionPapers')
      .where('pid', '==', this.delete)
      .where('user','==',this.auth.getuser()).get()
        .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
         querySnapshot.forEach(function(doc) {
    doc.ref.delete();
     clearInterval(hello.num);
     clearInterval(hello.num1);
    localStorage.removeItem('examin'+hello.delete);
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
localStorage.removeItem('case1'+hello.delete);
localStorage.removeItem('dayD1'+hello.delete);
localStorage.removeItem('monthD1'+hello.delete);
localStorage.removeItem('yearD1'+hello.delete);
localStorage.removeItem('hrs1'+hello.delete);
localStorage.removeItem('mins1'+hello.delete);
localStorage.removeItem('secs1'+hello.delete);
localStorage.removeItem('king11');
localStorage.removeItem('king44');
localStorage.removeItem('dead'+hello.delete);
localStorage.removeItem('alive'+hello.delete);
localStorage.removeItem('zoom0'+hello.delete);
localStorage.removeItem('zoom1'+hello.delete);
  //console.log("Document successfully deleted!");
    });
      } 
    else {
       $('#myModal1').modal('show');
      }
         });

}

}