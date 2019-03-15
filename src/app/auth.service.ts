import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
//email4:string;
signedupstatus = JSON.parse(localStorage.getItem('signedup') || 'false');
loggedinstatus = JSON.parse(localStorage.getItem('loggedin') || 'false');
examinstatus = JSON.parse(localStorage.getItem('examin'+localStorage.getItem("epid")) || 'false');
oldexaminstatus = JSON.parse(localStorage.getItem('oldexamin'+localStorage.getItem("epid2")) || 'false');
demoexaminstatus = JSON.parse(localStorage.getItem('demoexamin'+localStorage.getItem("epid1")) || 'false');
demoresultstatus = JSON.parse(localStorage.getItem('demoresult'+localStorage.getItem("random")) || 'false');
oldresultstatus = JSON.parse(localStorage.getItem('oldresult'+localStorage.getItem("epid2")) || 'false');
resultstatus = JSON.parse(localStorage.getItem('result'+localStorage.getItem("epid")) || 'false');
 data;
  constructor(private http: HttpClient,private afs: AngularFirestore) { }

sendmail(email123:string) {
	//this.email4 = email123;
	localStorage.setItem('check',email123);
        const emailid = {"emailid": email123};            
      return  this.http.post('https://examautomata.herokuapp.com/email', emailid);
      }
      sendpass(ques:string,text:string)
      {
        var ema = localStorage.getItem('loggeduser123');
        const quesid123 = {"quesid": ques,"emailid": ema,"text123":text};
        return this.http.post('https://examautomata.herokuapp.com/quespass', quesid123);
      }
      getDate(): Observable<any>
      {
        const quesid123 = {"quesid": 0};
      //return this.http.post('http://localhost:3000/date',quesid123);
      return this.http.post('https://examautomata.herokuapp.com/date',quesid123);
      }
      getDate1(month:string,day:number,year:number,hr:number,
        min:number,sec:number): Observable<any>
      {
      const date1 = {"month": month,"day": day,"year":year,
      "hr": hr,"min": min,"sec":sec};
      //return this.http.post('http://localhost:3000/date1',date1);
      return this.http.post('https://examautomata.herokuapp.com/date1',date1);
      }
      getemail()
      {
      		return localStorage.getItem('check');
      }
      getmail()
      {
          return localStorage.getItem('loggeduser123');
      }
      getuser()
      {
      	return localStorage.getItem('loggeduser');
      }
      getnumber()
      {
        return localStorage.getItem('loggednumber');
      }
      issignedup()
      {
      	return JSON.parse(localStorage.getItem('signedup') || 'false');
      }
      setsignedup(value:boolean)
      {
      	this.signedupstatus = value;
      	localStorage.setItem('signedup','true');
      }
      isloggedin()
      {
      	//return JSON.parse(localStorage.getItem('loggedin') || this.loggedinstatus.toString());
      return JSON.parse(localStorage.getItem('loggedin') || 'false');
      }
      setloggedin(value:boolean)
      {
      	this.loggedinstatus = value;
      	localStorage.setItem('loggedin','true');
      }
      setexamin(value:boolean)
      {
        this.examinstatus = value;
        localStorage.setItem('examin'+localStorage.getItem("epid"),'true');
      }
      isexamin()
      {
      return JSON.parse(localStorage.getItem('examin'+localStorage.getItem("epid")) || 'false');
      }
      setoldexamin(value:boolean)
      {
        this.oldexaminstatus = value;
        localStorage.setItem('oldexamin'+localStorage.getItem("epid2"),'true');
      }
      isoldexamin()
      {
      return JSON.parse(localStorage.getItem('oldexamin'+localStorage.getItem("epid2")) || 'false');
      }
      setdemoexamin(value:boolean)
      {
        this.demoexaminstatus = value;
        localStorage.setItem('demoexamin'+localStorage.getItem("epid1"),'true');
      }
      isdemoexamin()
      {
      return JSON.parse(localStorage.getItem('demoexamin'+localStorage.getItem("epid1")) || 'false');
      }
      setdemoresult(value:boolean)
      {
        this.demoresultstatus = value;
        localStorage.setItem('demoresult'+localStorage.getItem("random"),'true');
      }
      isdemoresult()
      {
      return JSON.parse(localStorage.getItem('demoresult'+localStorage.getItem("random")) || 'false');
      }
      setoldresult(value:boolean)
      {
        this.oldresultstatus = value;
        localStorage.setItem('oldresult'+localStorage.getItem("epid2"),'true');
      }
      isoldresult()
      {
      return JSON.parse(localStorage.getItem('oldresult'+localStorage.getItem("epid2")) || 'false');
      }
      setresult(value:boolean)
      {
        this.resultstatus = value;
        localStorage.setItem('result'+localStorage.getItem("epid"),'true');
      }
      isresult()
      {
      return JSON.parse(localStorage.getItem('result'+localStorage.getItem("epid")) || 'false');
      }
      setloggeduser(data:string,email123:string,num123:number)
      {
        localStorage.setItem('loggeduser123',email123);
      	localStorage.setItem('loggeduser',data);
        localStorage.setItem('loggednumber',num123.toString());
      } 
     getques(quesno:string): Observable<any>
     {
          return this.afs.collection('UserQuestionPaper').doc(this.getuser()).collection('QP' + quesno).valueChanges();
     }
     getques1(quesno:string): Observable<any>
     {
          return this.afs.collection('UserQuestionPaper').doc(this.getuser()).collection(quesno).valueChanges();
     }
     getquespub(): Observable<any>
     {
       return this.afs.collection('UsersQuestionPapers').doc(this.getuser()).collection('QuestionPapersID').valueChanges();
     }
     getpartques(): Observable<any>
     {
       return this.afs.collection('UsersParticipatedExams').doc(this.getuser()).collection('QuestionPapersID').valueChanges();
     }
     getquescon(): Observable<any>
     {
       return this.afs.collection('CommonQuestionPapers').valueChanges();
     }
     getoldquescon(): Observable<any>
     {
       return this.afs.collection('OldCommonQuestionPapers').valueChanges();
     }
     getpap(papid:string,puser:string): Observable<any>
     {
       return this.afs.collection('UserQuestionPaper').doc(puser).collection(papid,ref => ref.orderBy('qid')).valueChanges();
     }
     getexamers(papid:string): Observable<any>
     {
       return this.afs.collection('UsersResults').doc(papid)
       .collection("Results",ref => ref.orderBy('score','desc')).valueChanges();
     }
     getdetails(): Observable<any>
     {
       return this.afs.collection('UserDetails', ref => ref.where('name', '==', this.getuser())).valueChanges();
     }
}
