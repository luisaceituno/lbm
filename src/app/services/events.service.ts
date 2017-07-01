import { LbmEvent, LbmEventType } from '../types/lbm-event.type';

import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class EventsService extends EventEmitter<LbmEvent> {

    constructor() {
        super();
    }

    public byType(type: LbmEventType) {
        return this.filter(event => event.type == type);
    }
}
