import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $: any;
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

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
num1:number;
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

    this.paperID = "QP59212";

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

  const db = firebase.firestore();
  var hello = this;

          localStorage.setItem("user321",'DemoUser');
         // console.log(localStorage.getItem("user321"));
hello.papid = JSON.parse(localStorage.getItem('case'
  +localStorage.getItem("random")
  +'QP59212') || 'false');
//console.log(hello.papid);
if(hello.papid == false)
{
    hello.ptime = 10;
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
          
            //console.log(hr,hello.ptime,day,month);
         localStorage.setItem("Uday"+localStorage.getItem("random")
  +'QP59212',day);
         localStorage.setItem("Umonth"+localStorage.getItem("random")
  +'QP59212',month);
         localStorage.setItem("Uyear"+localStorage.getItem("random")
  +'QP59212',year);
      localStorage.setItem("hrs"+localStorage.getItem("random")
  +'QP59212',hr);
      localStorage.setItem("mins"+localStorage.getItem("random")
  +'QP59212',hello.ptime.toString());
      localStorage.setItem("secs"+localStorage.getItem("random")
  +'QP59212',sec);
    localStorage.setItem("case"+localStorage.getItem("random")
  +'QP59212','true');

}
else{

}


// Set the date we're counting down to
var countDownDate = new Date(localStorage.getItem("Umonth"+localStorage.getItem("random")
  +'QP59212')+parseInt(localStorage.getItem("Uday"+localStorage.getItem("random")
  +'QP59212'))+","+parseInt(localStorage.getItem("Uyear"+localStorage.getItem("random")
  +'QP59212'))+" "+parseInt(localStorage.getItem("hrs"+localStorage.getItem("random")
  +'QP59212'))+":"+parseInt(localStorage.getItem("mins"+localStorage.getItem("random")
  +'QP59212'))+":"+parseInt(localStorage.getItem("secs"+localStorage.getItem("random")
  +'QP59212'))).getTime();

      hello.papid123 = JSON.parse(localStorage.getItem('king123') || 'false');
    if(hello.papid123 == 'false')
    localStorage.setItem("king123",'QP59212');
  else
    clearInterval(hello.num1);

// Update the count down every 1 second
hello.num1 = window.setInterval(()=> {

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
    clearInterval(hello.num1);
    hello.mess = "ExamOver!!";
    hello.bool = true;
    this.spinner = true;
    setTimeout(()=>{
    hello.resultcal();
    }, 1000);
  }
}, 1000);

this.createform();
this.paperber = JSON.parse(localStorage.getItem('paperber'+localStorage.getItem("epid1")+localStorage.getItem("user321")) || 'false');
this.numblimit = JSON.parse(localStorage.getItem('numblimit'+localStorage.getItem("epid1")+localStorage.getItem("user321")) || '0');
hello.temp = parseInt(hello.numblimit);
if(this.paperber == false)
{
  //console.log(this.paperber);
  setTimeout(()=>{
        this.auth.getpap(localStorage.getItem("epid1"),localStorage.getItem("user321")).subscribe(data123 => {
      if(data123!='')
      {
        localStorage.setItem("Data",JSON.stringify(data123));
        this.lost=JSON.parse(localStorage.getItem("Data"));
        this.optchecker1(this.lost[parseInt(this.numblimit)].qid);
        db.collection('DemoAnswers').doc(localStorage.getItem("random")).collection(localStorage.getItem("epid1"))
      .where('attempt', '==',1).get()
      .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
     querySnapshot.forEach((doc)=> {
        for(var e=0;e<hello.lost.length;e++)
       {
       if(doc.data().qid==hello.lost[e].qid)
       {
         hello.attempt[e]=1;
         console.log("hurray",e);
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
        this.count = data123.length;
        this.quest = this.lost[parseInt(this.numblimit)];
               this.spinner = false;
                if(parseInt(this.numblimit)>0)
          this.horror = true;
        else
          this.horror = false;
       if(parseInt(this.numblimit)+1 == this.count)
          this.horror1 = true;
        else
          this.horror1 = false;
        //console.log("Working!!",this.lost,this.count);
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
  //localStorage.removeItem('paperber'+localStorage.getItem("epid1")+localStorage.getItem("user321"));
//localStorage.removeItem('numblimit'+localStorage.getItem("epid1")+localStorage.getItem("user321"));
    //console.log(this.numblimit);
    this.lost=JSON.parse(localStorage.getItem("Data"));
    this.count = this.lost.length;
    this.optchecker1(this.lost[parseInt(this.numblimit)].qid);
          db.collection('DemoAnswers').doc(localStorage.getItem("random")).collection(localStorage.getItem("epid1"))
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
    this.quest = this.lost[parseInt(this.numblimit)];
            this.spinner = false;
            if(parseInt(this.numblimit)>0)
          this.horror = true;
        else
          this.horror = false;
       if(parseInt(this.numblimit)+1 == this.count)
          this.horror1 = true;
        else
          this.horror1 = false;
    //console.log(this.quest,this.count,this.lost[0]);
}

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
      db.collection('DemoAnswers').doc(localStorage.getItem("random")).collection(localStorage.getItem("epid1"))
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
        //console.log("no",quesid,localStorage.getItem('epid1'));
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
.doc(localStorage.getItem("user321")).collection(localStorage.getItem("epid1"))
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


      db.collection('DemoAnswers').doc(localStorage.getItem("random")).collection(localStorage.getItem("epid1"))
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
      db.collection('DemoAnswers').doc(localStorage.getItem("random")).collection(localStorage.getItem("epid1"))
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
     db.collection('DemoAnswers').doc(localStorage.getItem("random")).collection(localStorage.getItem("epid1"))
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
        console.log("Error getting documents: ", error);
    });

}
savenext1()
{
  $('#myModal4').modal('hide');
 this.spinner = true;
        if(this.OptionForm.value.opt != '')
        this.optchecker(this.queso,this.OptionForm.value.opt,parseInt(this.numblimit));
        clearInterval(this.num1);
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
  localStorage.setItem('paperber'+localStorage.getItem("epid1")+localStorage.getItem("user321"),'true');
  this.paperber = true;
  this.temp = parseInt(this.numblimit) + 1;
        this.numblimit = this.temp.toString();
   localStorage.setItem('numblimit'+localStorage.getItem("epid1")+localStorage.getItem("user321"),this.numblimit);
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
   localStorage.setItem('numblimit'+localStorage.getItem("epid1")+localStorage.getItem("user321"),this.numblimit);

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
  localStorage.setItem('paperber'+localStorage.getItem("epid1")+localStorage.getItem("user321"),'true');
  this.paperber = true;
  this.temp = i;
        this.numblimit = this.temp.toString();
   localStorage.setItem('numblimit'+localStorage.getItem("epid1")+localStorage.getItem("user321"),this.numblimit);
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
        db.collection('DemoAnswers').doc(localStorage.getItem("random")).collection(localStorage.getItem("epid1"))
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
  this.auth.setdemoresult(true);
  const db = firebase.firestore();
  var hello = this;

var sco=0,totsco=0;

localStorage.removeItem('paperber1'+localStorage.getItem("epid1")+localStorage.getItem("user321"));
  localStorage.removeItem('numblimit1'+localStorage.getItem("epid1")+localStorage.getItem("user321"));
localStorage.removeItem('demoexamin'+localStorage.getItem("epid1"));
 localStorage.removeItem('case'+localStorage.getItem("random")
  +localStorage.getItem("epid1"));
 localStorage.removeItem('Uday'+localStorage.getItem("random")
  +localStorage.getItem("epid1"));
 localStorage.removeItem('Umonth'+localStorage.getItem("random")
  +localStorage.getItem("epid1"));
 localStorage.removeItem('Uyear'+localStorage.getItem("random")
  +localStorage.getItem("epid1"));
localStorage.removeItem('hrs'+localStorage.getItem("random")
  +localStorage.getItem("epid1"));
localStorage.removeItem('mins'+localStorage.getItem("random")
  +localStorage.getItem("epid1"));
localStorage.removeItem('secs'+localStorage.getItem("random")
  +localStorage.getItem("epid1"));
localStorage.removeItem('examin'+localStorage.getItem("epid1"));
localStorage.removeItem('paperber'+localStorage.getItem("epid1")+localStorage.getItem("user321"));
localStorage.removeItem('numblimit'+localStorage.getItem("epid1")+localStorage.getItem("user321"));


 db.collection('DemoAnswers').doc(localStorage.getItem("random"))
  .collection(localStorage.getItem("epid1"))
  .where('corr', '==',1).get()
        .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
     querySnapshot.forEach((doc)=> {
       ++sco;
       hello.yoyo1 = true;
        });

    db.collection('UserQuestionPaper')
.doc(localStorage.getItem("user321"))
.collection(localStorage.getItem("epid1")).get()
        .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
         querySnapshot.forEach((doc)=> {
           ++totsco;
           hello.yoyo2 = true;
    });
     if(hello.yoyo1 == true && hello.yoyo2 == true)
     {
        db.collection('DemoResults').doc(localStorage.getItem("epid1"))
      .collection("Results")
      .add({
      user:localStorage.getItem("random"),
      score:sco,
      totscore:totsco,
      rank:0
    }).then((docRef)=> {
           this.spinner = false;
    this.router.navigate(['demoresults']);
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
.doc(localStorage.getItem("user321"))
.collection(localStorage.getItem("epid1")).get()
        .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
         querySnapshot.forEach((doc)=> {
           totsco++;
           hello.yoyo1 = true;
           hello.yoyo2 = true;
    });
     if(hello.yoyo1 == true && hello.yoyo2 == true)
     {
        db.collection('DemoResults').doc(localStorage.getItem("epid1"))
      .collection("Results")
      .add({
      user:localStorage.getItem("random"),
      score:sco,
      totscore:totsco,
      rank:0
    }).then((docRef)=> {
           this.spinner = false;
    this.router.navigate(['demoresults']);
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
         /*setTimeout(()=>{
           this.spinner = false;
    this.router.navigate(['demoresults']);
      }, 3500) */

}
}