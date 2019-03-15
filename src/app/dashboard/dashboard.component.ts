import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
declare var $: any;
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Observable,Subject,combineLatest} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	  startAt = new Subject();
  endAt = new Subject();

startobs = this.startAt.asObservable();
  endobs = this.endAt.asObservable();
NumForm: FormGroup;
NumForm2: FormGroup;
  	quest;
    questq;
    udetails;
	zip:boolean = false;
	zip1:boolean = false;
	exists:string;
    zipq:boolean = false;
  zip1q:boolean = false;
  existsq:string;
	paper:string;
	pappo:string;
	hello:string;
	passw:string;
	bool1:boolean = false;
	bool2:boolean = false;
	drink:boolean = false;
	crisis:boolean = false;
  spinner1:boolean = true;
	ero:string = 'Null';
  delete:string;

  constructor(private router: Router,private formBuilder: FormBuilder,private afs: AngularFirestore,private auth:AuthService) { }

  ngOnInit() {
    $(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip();   
});
  	this.createform();
  	var d = new Date();
  	  var day1, month1, year1;
  	  day1 = d.getDate();
  month1 = d.getMonth() + 1;
  year1 = d.getFullYear();

	if(month1<10 && day1<10)
	{
		this.hello = year1+"-0"+month1+"-0"+day1;
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

this.auth.getdetails().subscribe(data123 => {
      if(data123!='')
      {
    this.udetails = data123;
      }
  else
  {

  }
    });

	this.auth.getquespub().subscribe(data123 => {
  	  if(data123!='')
      {
  	this.zip = false;
  	this.zip1 = false;
    this.quest = data123;
    // console.log(data123[0].pass)
	}
	else
	{
		this.zip1 = true;
  		this.zip = true;
  		this.exists = "At Present No Question Papers Are Available";
	}
    });

    this.auth.getpartques().subscribe(data123 => {
      if(data123!='')
      {
    this.zipq = false;
    this.zip1q = false;
    this.questq = data123;
  }
  else
  {
    this.zip1q = true;
      this.zipq = true;
      this.existsq = "Upto now you didn't take any exams!!";
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
      this.firequeryq(value[0], value[1]).subscribe((clubs) => {
         if(clubs!='')
        {
        this.zipq = false;
        this.questq = clubs;
      }
      else
      {
        this.zipq = true;
        this.existsq = "There is no such paper avalaible!!";
      }
      })
    })
  }

details()
{
  $('#myModal3').modal('show');
  this.spinner1 = false;
  setTimeout(()=>{ 
  this.spinner1 = true; 
  }, 3000) 
}
  showpaper()
  {
  	$('#myModal').modal('show');
  }

 leaderboard()
 {
   $('#myModal2').modal('show');
 }
 leadselect(pid:string)
 {
   $('#myModal2').modal('hide');
   localStorage.setItem("leadpap",pid);
   this.router.navigate(['leaderboard']);
 }

createform()
{
this.NumForm = this.formBuilder.group({
     date: ['', [Validators.required] ],
     time: ['', [Validators.required] ],
     dur: ['', [Validators.required,Validators.pattern] ],
     alive: ['', [Validators.required,Validators.pattern] ]
    });
this.NumForm2 = this.formBuilder.group({
     number: ['', [Validators.required, Validators.pattern] ]
    });
}
onNumber()
{
   //console.log($('#pink').val());
  const db = firebase.firestore();
  var hello = this;
db.collection('UserDetails')
      .where('email', '==', hello.auth.getmail())
      .get()
        .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
         querySnapshot.forEach((doc)=> {
    doc.ref.update({number:$('#pink').val()});
  //console.log("Document successfully updated!");
    });
}
else
{

}
    });
//console.log(this.questq,this.questq[1].pid);
for(var i=0;i<this.questq.length;i++)
{
  db.collection('UsersResults').doc(this.questq[i].pid)
      .collection('Results')
      .where('email', '==', hello.auth.getmail())
      .get()
        .then((querySnapshot)=> {
   if (querySnapshot.size > 0) {
         querySnapshot.forEach((doc)=> {
    doc.ref.update({number:$('#pink').val()});
  //console.log("Document successfully updated!");
    });
}
else
{

}
    });
}

  $('#myModal3').modal('hide');
$('#myModal5').modal('show');
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
     this.auth.getquespub().subscribe(data123 => {
    this.zip = false;
    this.quest = data123
    });
    }
}
onKeyq(event: any)
{
  let q = event.target.value;
  //console.log(q);
      if (q != '') {
      this.startAt.next(q);
      this.endAt.next(q + "\uf8ff");
    }
    else {
     this.auth.getpartques().subscribe(data123 => {
    this.zipq = false;
    this.questq = data123
    });
    }
}

  firequery(start, end): Observable<any>
{
    return this.afs.collection('UsersQuestionPapers').doc(this.auth.getuser()).collection('QuestionPapersID', ref => ref.limit(4).orderBy('pid').startAt(start).endAt(end)).valueChanges();
}
  firequeryq(start, end): Observable<any>
{
    return this.afs.collection('UsersParticipatedExams').doc(this.auth.getuser()).collection('QuestionPapersID', ref => ref.limit(4).orderBy('pid').startAt(start).endAt(end)).valueChanges();
}

update(id:string)
{
	localStorage.setItem('ques',id);
	$('#myModal').modal('hide');
	this.router.navigate(['updatepaper']);
}
deletepap1(pid1:string)
{
  this.delete = pid1;
  $('#myModal4').modal('show');
  //console.log(this.delete);
}
deletepap()
{
  $('#myModal4').modal('hide');
  const db = firebase.firestore();
  var hello = this;
      db.collection('UserQuestionPaper').doc(this.auth.getuser()).collection(hello.delete)
      .where('qid','>',0).get()
      .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
    doc.ref.delete();
  //console.log("Document successfully deleted1!");
  });
});

      db.collection('UsersQuestionPapers').doc(this.auth.getuser()).collection('QuestionPapersID')
      .where('pid','==',hello.delete).get()
      .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
    doc.ref.delete();
  //console.log("Document successfully deleted2!");
  });
});

      db.collection('CommonQuestionPapers')
      .where('pid','==',hello.delete).get()
      .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
    doc.ref.delete();
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
  //console.log("Document successfully deleted2!");
  });
});


}

  contest(pid1:string)
{
	localStorage.setItem("papid",pid1);
      this.pappo = pid1;
      $('#myModal').modal('hide');
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
    //console.log(day,month1,year,ion[0],ion[1]);
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
   else if(monthos<month1)
  {
      this.spinner1=true;
      this.ero = "Enter Correct Month!!";
      this.bool2 = true;
  }
  else if(day<day1)
  {
      this.spinner1=true;
      this.ero = "Enter Correct Day!!";
      this.bool2 = true;
  }

  else
  {
    this.drink = true;
  }
  if(this.drink == true)
  {
      db.collection('ContestsTimes')
      .add({
      pid:localStorage.getItem("papid"),
      day:day,
      month:monthNames[date.getMonth()],
      year:year,
      hour:ion[0],
      min:ion[1]
    }).then(function(docRef) {
    hello.spinner1=true;  
    hello.ero = "Timings are setted perfectly!!";
    hello.bool1 = true;
      setTimeout(()=>{
    $('#myModal1').modal('hide');
    hello.router.navigate(['contests']);
      }, 500) 
        //console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        //console.error("Error adding document: ", error);
      }); 
  }

}
leader(pid:string)
{
  $('#myModal').modal('hide');
     localStorage.setItem("leadpap",pid);
   this.router.navigate(['leaderboard']);
}

}
