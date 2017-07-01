import { LbmEvent, LbmEventType } from '../types/lbm-event.type';

import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import { CompletionObserver, ErrorObserver, NextObserver } from 'rxjs/Observer';

@Injectable()
export class EventsService extends EventEmitter<LbmEvent> {
    public byType(type: LbmEventType) {
        return this.filter(event => event.type == type);
    }
}
