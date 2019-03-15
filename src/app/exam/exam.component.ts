import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
declare var $: any;
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {

papid123:string;
OptionForm: FormGroup;
count:number;
ptime:number;
ptime2:number;
passw:string;
userc:string;
days:string;
hours:string;
minutes:string;
seconds:string;
papid:boolean;
mess:string;
bool:boolean= false;
horror:boolean = false;
horror1:boolean = false;
horror2:boolean = false;
yoyo1:boolean = false;
yoyo2:boolean = false;
yoyo3:boolean = false;
yoyo4:boolean = false;
cuber:boolean= false;
temp:number=0;
num:number;
quest:object={};
questq;
lost;
paperber;
numblimit;
paperID:string;
vary:boolean = false;
zip:boolean = false;
zip1:boolean = false;
exists:string;
spinner:boolean = true;
attempt=[0];
queso:string;
counto:number=0;
  constructor(private router: Router,private formBuilder: FormBuilder,private afs: AngularFirestore,private auth:AuthService) { }

  ngOnInit() {
 
    this.paperID = localStorage.getItem("epid");
/*var hello = this;*/

//console.log(localStorage.getItem("epid"));

  const db = firebase.firestore();
  var hello = this;
 db.collection('CommonQuestionPapers')
 .where('pid','==',localStorage.getItem("epid")).get()
 .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
         querySnapshot.forEach((doc)=> {
         	hello.passw = doc.data().pass;
         	hello.ptime2 = doc.data().time;
         	hello.userc  =doc.data().user;
          localStorage.setItem("user123",doc.data().user);
hello.paperber = JSON.parse(localStorage.getItem('paperber'+localStorage.getItem("epid")+localStorage.getItem("user123")) || 'false');
hello.numblimit = JSON.parse(localStorage.getItem('numblimit'+localStorage.getItem("epid")+localStorage.getItem("user123")) || '0');
hello.temp = parseInt(hello.numblimit);
if(hello.paperber == false)
{
  //console.log(hello.paperber);
  setTimeout(()=>{
        hello.auth.getpap(localStorage.getItem("epid"),localStorage.getItem("user123")).subscribe(data123 => {
      if(data123!='')
      {
        localStorage.setItem("Data",JSON.stringify(data123));
        hello.lost=JSON.parse(localStorage.getItem("Data"));
        hello.optchecker1(hello.lost[parseInt(hello.numblimit)].qid);
        db.collection('UsersAnswers').doc(hello.auth.getuser()).collection(localStorage.getItem("epid"))
      .where('attempt', '==',1).get()
      .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
     querySnapshot.forEach((doc)=> {
        for(var e=0;e<hello.lost.length;e++)
       {
       if(doc.data().qid==hello.lost[e].qid)
       {
         hello.attempt[e]=1;
         //console.log("hurray",e);
         break;
       }
       }
           });
      } 
    else {

   }
    })
    .catch(function(error) {
      //  console.log("Error getting documents: ", error);
    });
        hello.count = data123.length;
        hello.quest = hello.lost[parseInt(hello.numblimit)];
               hello.spinner = false;
                if(parseInt(hello.numblimit)>0)
          hello.horror = true;
        else
          hello.horror = false;
       if(parseInt(hello.numblimit)+1 == hello.count)
          hello.horror1 = true;
        else
          hello.horror1 = false;
        //console.log("Working!!",hello.lost,hello.count);
      }
      else
      {
        //console.log("ERROR!!");
      }
    });
      }, 1000);
}
else
{
  //localStorage.removeItem('paperber'+localStorage.getItem("epid")+localStorage.getItem("user123"));
//localStorage.removeItem('numblimit'+localStorage.getItem("epid")+localStorage.getItem("user123"));
    //console.log(hello.numblimit);
    hello.lost=JSON.parse(localStorage.getItem("Data"));
    hello.count = hello.lost.length;
    hello.optchecker1(hello.lost[parseInt(hello.numblimit)].qid);
    db.collection('UsersAnswers').doc(hello.auth.getuser()).collection(localStorage.getItem("epid"))
      .where('attempt', '==',1).get()
      .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
     querySnapshot.forEach((doc)=> {
        for(var e=0;e<hello.lost.length;e++)
       {
       if(doc.data().qid==hello.lost[e].qid)
       {
         hello.attempt[e]=1;
         //console.log("hurray",e);
         break;
       }
       }
           });
      } 
    else {

   }
    })
    .catch(function(error) {
      //  console.log("Error getting documents: ", error);
    });
    hello.quest = hello.lost[parseInt(hello.numblimit)];
            hello.spinner = false;
            if(parseInt(hello.numblimit)>0)
          hello.horror = true;
        else
          hello.horror = false;
       if(parseInt(hello.numblimit)+1 == hello.count)
          hello.horror1 = true;
        else
          hello.horror1 = false;
    //console.log(hello.quest,hello.count,hello.lost[0]);
}
         // console.log(localStorage.getItem("user123"));
hello.papid = JSON.parse(localStorage.getItem('case'
	+hello.auth.getuser()
	+localStorage.getItem("epid")) || 'false');
//console.log(hello.papid);
        const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

        var d = new Date();
      var day, month, year,min,hr,sec;
      day = d.getDate();
  month = monthNames[d.getMonth()];
  year = d.getFullYear();
  min = d.getMinutes();
  hr = d.getHours();
  sec = d.getSeconds();
if(hello.papid == false)
{
    hello.ptime = doc.data().time;
    	  hello.ptime+=min;
        if(hello.ptime>=60)
        {
          if((hr+1)>23)
          {
            hr=0;
            if(((day+1)>30) && (month=="April"||
              month=="June"||
              month=="September"||month=="November"))
            {
              if(d.getMonth()+1>11)
              {
                year+=1;day=1;
                month = monthNames[d.getMonth()+1];
              }
              else
              {
              day=1;month = monthNames[d.getMonth()+1];
              }
            }
            else if(((day+1)>28) && (month=="February"))
            {
              if(d.getMonth()+1>11)
              {
                year+=1;day=1;
                month = monthNames[d.getMonth()+1];
              }
              else
              {
              day=1;month = monthNames[d.getMonth()+1];
              }
            }
            else if(((day+1)>31) && (month=="January"||
              month=="March"||month=="May"||
              month=="July"||month=="August"||
              month=="October"||month=="December"))
            {
              if(d.getMonth()+1>11)
              {
                year+=1;
                day=1;month = monthNames[d.getMonth()+1];
              }
              else
              {
              day=1;month = monthNames[d.getMonth()+1];
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
          hello.ptime%=60;
        }
    	  	
    	      //console.log(hello.ptime);
          localStorage.setItem("IOday"+hello.auth.getuser()
  +localStorage.getItem("epid"),day);
          localStorage.setItem("IOmonth"+hello.auth.getuser()
  +localStorage.getItem("epid"),month);
          localStorage.setItem("IOyear"+hello.auth.getuser()
  +localStorage.getItem("epid"),year);
    	localStorage.setItem("hrs"+hello.auth.getuser()
	+localStorage.getItem("epid"),hr);
    	localStorage.setItem("mins"+hello.auth.getuser()
	+localStorage.getItem("epid"),hello.ptime.toString());
    	localStorage.setItem("secs"+hello.auth.getuser()
	+localStorage.getItem("epid"),sec);
	  localStorage.setItem("case"+hello.auth.getuser()
	+localStorage.getItem("epid"),'true');

}
else{

}


// Set the date we're counting down to
var countDownDate = new Date(localStorage.getItem("IOmonth"+hello.auth.getuser()
  +localStorage.getItem("epid"))+parseInt(localStorage.getItem("IOday"+hello.auth.getuser()
  +localStorage.getItem("epid")))+","+parseInt(localStorage.getItem("IOyear"+hello.auth.getuser()
  +localStorage.getItem("epid")))+" "+parseInt(localStorage.getItem("hrs"+hello.auth.getuser()
	+localStorage.getItem("epid")))+":"+parseInt(localStorage.getItem("mins"+hello.auth.getuser()
	+localStorage.getItem("epid")))+":"+parseInt(localStorage.getItem("secs"+hello.auth.getuser()
	+localStorage.getItem("epid")))).getTime();

      hello.papid123 = JSON.parse(localStorage.getItem('king123') || 'false');
    if(hello.papid123 == 'false')
    localStorage.setItem("king123",localStorage.getItem("epid"));
  else
    clearInterval(hello.num);

// Update the count down every 1 second
hello.num = window.setInterval(()=> {

  // Get todays date and time
  var now = new Date().getTime();
    
  // Find the distance between now and the count down date
  var distance = countDownDate - now;
    
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result in an element with id="demo"
    hello.days = days.toString();
    hello.hours = hours.toString();
    hello.minutes = minutes.toString();
    hello.seconds = seconds.toString();
   // console.log(hello.days,hello.hours,hello.minutes,hello.seconds);
    
  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(hello.num);
    hello.mess = "ExamOver!!";
    hello.bool = true;
    hello.spinner = true;
    setTimeout(()=>{
    hello.resultcal();
    }, 1000);
  }
}, 1000);
  });
         
     }
     else
     {

     }
         });
          this.createform();

        //this.optchecker1(this.lost[parseInt(this.numblimit)].qid);
  }


createform()
{
this.OptionForm = this.formBuilder.group({
     opt: ['']
      //opt: new FormControl({value:''})
    });
}

optchecker1(quesid:string)
{
const db = firebase.firestore();
var hello = this;
      db.collection('UsersAnswers').doc(this.auth.getuser()).collection(localStorage.getItem("epid"))
      .where('qid', '==',quesid).get()
      .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
     querySnapshot.forEach((doc)=> {
       hello.OptionForm.setValue({
          opt:doc.data().ans
        });
       //hello.vary = true;
           });
      } 
    else {
          hello.OptionForm.setValue({
          opt:''
        });
        //hello.vary = false;
        //console.log("no",quesid,localStorage.getItem('epid'));
      }
    })
    .catch(function(error) {
        //console.log("Error getting documents: ", error);
    });

}

optchecker(quesid:string,answer:string,attemptid:number)
{
const db = firebase.firestore();
var hello = this;
var oc,oa;
db.collection('UserQuestionPaper')
.doc(localStorage.getItem("user123")).collection(localStorage.getItem("epid"))
      .where('qid','==',quesid).get()
        .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
         querySnapshot.forEach((doc)=> {
           oa = doc.data().answer;
           if(answer == doc.data().answer)
             oc =1;
           else
             oc = 0;
    });
      } 
    else {
      
      }
         });


      db.collection('UsersAnswers').doc(this.auth.getuser()).collection(localStorage.getItem("epid"))
      .where('qid', '==',quesid).get()
      .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
     querySnapshot.forEach((doc)=> {
       hello.OptionForm.setValue({
          opt:doc.data().ans
        });
       hello.vary = true;
           });
     //console.log("yes");
      } 
    else {
        hello.vary = false;
      //console.log("no");
      }
        if(hello.vary == false)
  {
      db.collection('UsersAnswers').doc(hello.auth.getuser()).collection(localStorage.getItem("epid"))
      .add({
      qid:quesid,
      ans:answer,
      corans:oa,
      corr:oc,
      attempt:1
    }).then((docRef)=> {
      hello.attempt[attemptid]=1;
        //console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        //console.error("Error adding document: ", error);
      });
  }
  else
  {
     db.collection('UsersAnswers').doc(hello.auth.getuser()).collection(localStorage.getItem("epid"))
      .where('qid','==',quesid).get()
      .then((querySnapshot)=> {
    querySnapshot.forEach((doc)=> {
    doc.ref.update({ans:answer,corr:oc});
    hello.attempt[attemptid]=1;
  //console.log("Document successfully updated!");
  });
});
  }
      
    })
    .catch(function(error) {
        //console.log("Error getting documents: ", error);
    });

}

savenext1()
{
  $('#myModal4').modal('hide');
            this.spinner = true;
        if(this.OptionForm.value.opt != '')
        this.optchecker(this.queso,this.OptionForm.value.opt,parseInt(this.numblimit));
        clearInterval(this.num);
        setTimeout(()=>{
        this.resultcal();
        }, 1000) 
}

savenext(quesid:string)
{

  const db = firebase.firestore();
      if(parseInt(this.numblimit)+1 == this.count)
          {
            this.cuber=true;
          this.queso=quesid;
          $('#myModal4').modal('show');
          setTimeout(()=>{
            this.cuber=false;
             }, 1500);
          var count1=0;
          for(var i=0;i<this.lost.length;i++)
          {
            if(this.attempt[i]==1)
            {
              count1++;
            }
          }
          this.counto = count1; 
        }
      else
         {
        this.spinner = true;
        setTimeout(()=>{
         this.spinner = false;
      const db = firebase.firestore();
          if(this.OptionForm.value.opt != '')
    this.optchecker(quesid,this.OptionForm.value.opt,parseInt(this.numblimit));
  localStorage.setItem('paperber'+localStorage.getItem("epid")+localStorage.getItem("user123"),'true');
  this.paperber = true;
  this.temp = parseInt(this.numblimit) + 1;
        this.numblimit = this.temp.toString();
   localStorage.setItem('numblimit'+localStorage.getItem("epid")+localStorage.getItem("user123"),this.numblimit);
                  if(parseInt(this.numblimit)>0)
          this.horror = true;
        else
          this.horror = false;
        if(parseInt(this.numblimit)+1 == this.count)
          this.horror1 = true;
        else
          this.horror1 = false;
        this.lost=JSON.parse(localStorage.getItem("Data"));
    this.optchecker1(this.lost[this.temp].qid);
      this.quest = this.lost[this.temp]; 
 // console.log(this.paperber,this.numblimit);
  //console.log("jimik",this.OptionForm.value.opt);
}, 1500);
}

}
previous(quesid:string)
{
          this.spinner = true;
        setTimeout(()=>{
         this.spinner = false;
   if(this.OptionForm.value.opt != '')
    this.optchecker(quesid,this.OptionForm.value.opt,parseInt(this.numblimit));
  this.temp = parseInt(this.numblimit) -1;
        this.numblimit = this.temp.toString();
   localStorage.setItem('numblimit'+localStorage.getItem("epid")+localStorage.getItem("user123"),this.numblimit);

                 if(parseInt(this.numblimit)>0)
          this.horror = true;
        else
          this.horror = false;
                if(parseInt(this.numblimit)+1 == this.count)
          this.horror1 = true;
        else
          this.horror1 = false;
        this.lost=JSON.parse(localStorage.getItem("Data"));
        this.optchecker1(this.lost[this.temp].qid);
        this.quest = this.lost[this.temp]; 
        //console.log(this.paperber,this.numblimit);
}, 1500);
}


navigate()
{
  $('#myModal').modal('show');
}

quesnavigate(quesid:string)
{
  $('#myModal').modal('hide');
  //console.log(this.lost[0].qid);
  this.spinner = true;
  for(var i=0;i<this.lost.length;i++)
  {
    if(quesid == this.lost[i].qid)
    {
setTimeout(()=>{
         this.spinner = false;
      const db = firebase.firestore();
  localStorage.setItem('paperber'+localStorage.getItem("epid")+localStorage.getItem("user123"),'true');
  this.paperber = true;
  this.temp = i;
        this.numblimit = this.temp.toString();
   localStorage.setItem('numblimit'+localStorage.getItem("epid")+localStorage.getItem("user123"),this.numblimit);
                  if(parseInt(this.numblimit)>0)
          this.horror = true;
        else
          this.horror = false;
        if(parseInt(this.numblimit)+1 == this.count)
          this.horror1 = true;
        else
          this.horror1 = false;
        this.lost=JSON.parse(localStorage.getItem("Data"));
    this.optchecker1(this.lost[this.temp].qid);
      this.quest = this.lost[this.temp]; 
  //console.log(this.numblimit);
}, 1500);
      //console.log(this.lost[i].qid,i);
      break;
    }
  }
}


deselect(quesid:string)
{
  var hello = this;
  const db = firebase.firestore();
        db.collection('UsersAnswers').doc(this.auth.getuser()).collection(localStorage.getItem("epid"))
      .where('qid','==',quesid).get()
      .then((querySnapshot)=> {
    querySnapshot.forEach(function(doc) {
    doc.ref.delete();
    hello.attempt[parseInt(hello.numblimit)]=0;
  });
});
    this.OptionForm.setValue({
      opt:''
  });
      //console.log("hello");
}
resultcal()
{
  this.auth.setresult(true);
  const db = firebase.firestore();
  var hello = this;

var sco=0,totsco=0;
  localStorage.removeItem('paperber0'+localStorage.getItem("epid")+localStorage.getItem("user123"));
  localStorage.removeItem('numblimit0'+localStorage.getItem("epid")+localStorage.getItem("user123"));
 localStorage.removeItem('examin'+localStorage.getItem("epid"));
 localStorage.removeItem('case'+hello.auth.getuser()
  +localStorage.getItem("epid"));
 localStorage.removeItem('IOday'+hello.auth.getuser()
  +localStorage.getItem("epid"));
 localStorage.removeItem('IOmonth'+hello.auth.getuser()
  +localStorage.getItem("epid"));
 localStorage.removeItem('IOyear'+hello.auth.getuser()
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

           db.collection('ExamComp').doc(this.auth.getuser())
    .collection(localStorage.getItem("epid")).add({
      exam:1
    }).then(function(docRef) {
        //console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        //console.error("Error adding document: ", error);
      });

 db.collection('UsersAnswers').doc(this.auth.getuser())
  .collection(localStorage.getItem("epid"))
  .where('corr', '==',1).get()
        .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
     querySnapshot.forEach((doc)=> {
       ++sco;
        });
       hello.yoyo1 = true;
    db.collection('UserQuestionPaper')
.doc(localStorage.getItem("user123"))
.collection(localStorage.getItem("epid")).get()
        .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
         querySnapshot.forEach((doc)=> {
           ++totsco;
    });
        hello.yoyo2 = true;
     if(hello.yoyo1 == true && hello.yoyo2 == true)
     {
       //console.log("puck1");
      db.collection('UsersResults').doc(localStorage.getItem("epid"))
      .collection("Results")
      .add({
      user:hello.auth.getuser(),
      score:sco,
      totscore:totsco,
      email:hello.auth.getmail(),
      number:hello.auth.getnumber()
    }).then((docRef)=> {
           this.spinner = false;
    this.router.navigate(['results']);
        //console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        //console.error("Error adding document: ", error);
      });        
         }
      } 
    else {
      
      }
         });

      } 
    else {
      
      db.collection('UserQuestionPaper')
.doc(localStorage.getItem("user123"))
.collection(localStorage.getItem("epid")).get()
        .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
         querySnapshot.forEach((doc)=> {
           totsco++;
    });
           hello.yoyo1 = true;
           hello.yoyo2 = true;
     if(hello.yoyo1 == true && hello.yoyo2 == true)
     {
      // console.log("puck2");
    db.collection('UsersResults').doc(localStorage.getItem("epid"))
     .collection("Results")
      .add({
      user:hello.auth.getuser(),
      score:sco,
      totscore:totsco,
      email:hello.auth.getmail(),
      number:hello.auth.getnumber() 
    }).then((docRef)=> {
           this.spinner = false;
    this.router.navigate(['results']);
        //console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        //console.error("Error adding document: ", error);
      });
  }
      } 
    else {
      
      }
         });

      }
         });

}

}
