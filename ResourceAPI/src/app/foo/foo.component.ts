import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Foo } from '../model/foo.model';
import { Observable } from 'rxjs';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-foo',
  imports: [JsonPipe],
  templateUrl: './foo.component.html',
  styleUrl: './foo.component.css'
})
export class FooComponent {

  fooData! : Foo[];
  data!: Object;
  loading: boolean = false;
  o!: Observable<Object>;
  oPost! : Observable<Object>;
  oFoo! : Observable<Foo[]>;

  constructor(public http: HttpClient) { }

  RESOURCE_URL = 'https://jsonplaceholder.typicode.com/posts/';
  
  //Alla pressione di un bottone facciamo una richiesta http
  makeUntypedRequest(): void {
    this.loading = true;
    this.o = this.http.get(this.RESOURCE_URL + '/1')
    this.o.subscribe(this.getSinglePostData);
  }
 
  //Funzione che viene richiamata quando arrivano i dati dal server
  getSinglePostData = (data : Object) => {
    this.data = data;
    this.loading = false;
  }

  //L'operazione di post necessita un parametro in più con i dati da inviare
  //Viene creata una stringa (JSON.strigify) a partire da un oggetto Typescript
  makePost(): void {
    // Definisco i dati da spedire
    let dataToSend = JSON.stringify({ 
      body: 'bar',
      title: 'foo',
      userId: 1
    });

    this.loading = true;

    //Faccio la richiesta post
    this.oPost = this.http.post('https://jsonplaceholder.typicode.com/posts', dataToSend)
    this.oPost.subscribe(this.getPostResponse);
  }

  //Ricevo i dati in risposta dalla post (Nota, non sono ancora tipizzati)
  getPostResponse = (data : Object) => {
    this.data = data;
    this.loading = false;
  }


  makeTypedRequest() : void
  {
    //oFoo : Observable<Foo[]>; Observable di tipo Foo[] è stao dichiarato tra gli attributi della classe 
    this.oFoo = this.http.get<Foo[]>('https://jsonplaceholder.typicode.com/posts');
    this.oFoo.subscribe(data => {this.fooData = data;});
  }

}
