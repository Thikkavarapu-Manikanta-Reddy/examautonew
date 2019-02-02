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
        return  this.http.post('https://examautomata.herokuapp.com/quespass', quesid123);
      }
      getemail()
      {
      		return localStorage.getItem('check');
      }
      getuser()
      {
      	return localStorage.getItem('loggeduser');
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
      setloggeduser(data:string,email123:string)
      {
        localStorage.setItem('loggeduser123',email123);
      	localStorage.setItem('loggeduser',data);
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
       return this.afs.collection('UserQuestionPaper').doc(puser).collection(papid).valueChanges();
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