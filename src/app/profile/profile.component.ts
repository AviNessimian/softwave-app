import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MsalService, BroadcastService } from '@azure/msal-angular';
import { InteractionRequiredAuthError, AuthError } from 'msal';
import { apiConfig } from '../app-config';
import { AggregateRoot, Datum, Category, Unit } from '../model/models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private model: AggregateRoot = null;
  selected: Datum = null;


  constructor(private broadcastService: BroadcastService, private authService: MsalService, private http: HttpClient) { }

  public get init(): boolean {
    return this.model !== null;
  }


  ngOnInit(): void {
    this.getModel(apiConfig.webApi);

    this.broadcastService.subscribe('msal:acquireTokenSuccess', (payload) => {
      console.log('access token acquired at: ' + new Date().toString());
      console.log(payload);
    });

    this.broadcastService.subscribe('msal:acquireTokenFailure', (payload) => {
      console.log('access token acquisition fails');
      console.log(payload);
    });
  }

  getModel(url: string) {

    console.log(url);

    this.http.get<AggregateRoot>(url)
      .subscribe({
        next: (resopnse) => this.setResponse(resopnse),
        error: (err: AuthError) => {
          // If there is an interaction required error,
          // call one of the interactive methods and then make the request again.
          if (InteractionRequiredAuthError.isInteractionRequiredError(err.errorCode)) {
            this.authService.acquireTokenPopup({
              scopes: this.authService.getScopesForEndpoint(url)
            }).then(() => {
              this.http.get<AggregateRoot>(url).toPromise()
                .then(aggregate => this.setResponse(aggregate));
            });
          }
        }
      });
  }

  public getSelectedCategories(page: number): Category[] {
    let start: number = ((page - 1) * 4);
    let end: number = start + 4;
    var res = this.selected.categories.slice(start, end);
    return res;
  }

  private setResponse(aggregate: AggregateRoot): void {
    this.model = aggregate;
    this.selected = this.model.data[0];

    console.log(this.model);
  }

}
