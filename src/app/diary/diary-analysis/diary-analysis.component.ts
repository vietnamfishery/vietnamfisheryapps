import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { PondManagementService } from 'src/app/pond-management/pond-management.service';
import { AppService } from 'src/app/app.service';
import { tokenName } from 'src/environments';
import * as jwtDecode from 'jwt-decode';
import { MatSnackBar, MatDialogConfig, MatDialogRef, MatDialog } from '@angular/material';
import { CalendarEvent } from 'calendar-utils';
import { CalendarEventAction, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { Subject } from 'rxjs';
import { subDays, startOfDay, addDays, endOfMonth, addHours, isSameMonth, isSameDay, endOfDay } from 'date-fns';
import { colors } from '../../constants';
import { CalendarDialogComponent } from './dialog/component';
import { SeasionManagementService } from 'src/app/seasion-management/seasion-management.service';
import { DiaryService } from '../diary.service';
import * as moment from 'moment-timezone';

@Component({
    selector: 'app-diary-analysis',
    templateUrl: './diary-analysis.component.html',
    styleUrls: ['./diary-analysis.component.scss']
})
export class DiaryAnalysisComponent implements OnInit {

    pondUUId: string;
    seasonUUId: string;
    token: string;
    ownerId: number;
    isBoss: boolean = false;
    pond: any = {};
    season: any = {};

    dialogRef: MatDialogRef<CalendarDialogComponent>;
    lastCloseResult: string;
    actionsAlignment: string;
    config: MatDialogConfig = {
        disableClose: false,
        width: '',
        height: '',
        position: {
            top: '',
            bottom: '',
            left: '',
            right: ''
        },
        data: {
            action: '',
            event: []
        }
    };
    numTemplateOpens = 0;

    view = 'month';

    viewDate: Date = new Date();

    modalData: {
        action: string,
        event: CalendarEvent
    };

    actions: CalendarEventAction[] = [{
        label: '<i class="editButton"></i>',
        onClick: ({ event }: { event: CalendarEvent }): void => {
            this.handleEvent('Edited', event);
        }
    }, {
        label: '<i class="deleteButton"></i>',
        onClick: ({ event }: { event: CalendarEvent }): void => {
            this.events = this.events.filter(iEvent => iEvent !== event);
            this.handleEvent('Deleted', event);
        }
    }];

    refresh: Subject<any> = new Subject();

    events: CalendarEvent[] = [
        // {
        //     start: subDays(startOfDay(new Date()), 1),
        //     end: addDays(new Date(), 1),
        //     title: 'A 3 day event',
        //     color: colors.red,
        //     actions: this.actions
        // },
        // {
        //     start: startOfDay(new Date()),
        //     title: 'An event with no end date',
        //     color: colors.yellow,
        //     actions: this.actions
        // },
        // {
        //     start: subDays(endOfMonth(new Date()), 3),
        //     end: addDays(endOfMonth(new Date()), 3),
        //     title: 'A long event that spans 2 months',
        //     color: colors.blue
        // },
        // {
        //     start: addHours(startOfDay(new Date()), 2),
        //     end: new Date(),
        //     title: 'A draggable and resizable event',
        //     color: colors.yellow,
        //     actions: this.actions,
        //     resizable: {
        //         beforeStart: true,
        //         afterEnd: true
        //     },
        //     draggable: true
        // }
    ];

    activeDayIsOpen = false;

    constructor(
        private appService: AppService,
        public snackBar: MatSnackBar,
        private seasionManagementService: SeasionManagementService,
        private route: ActivatedRoute,
        private diaryService: DiaryService,
        private pondManagementService: PondManagementService,
        public dialog: MatDialog
    ) {
        this.token = this.appService.getCookie(tokenName);
        const deToken: any = jwtDecode(this.token);
        this.ownerId = deToken.createdBy == null && deToken.roles.length == 0 ? deToken.userId : deToken.roles[0].bossId;
        if (deToken.userId === this.ownerId) {
            this.isBoss = true;
        }
    }

    ngOnInit() {
        this.init();
    }

    init() {
        this.route.paramMap.pipe(
            switchMap((params: any) => {
                this.pondUUId = params.get('pondUUId');
                this.seasonUUId = params.get('seasonUUId')
                return this.pondManagementService.getPondByUUId(this.pondUUId, this.token);
            })).subscribe(res => {
                if (res.success) {
                    this.pond = res.pond;
                    this.seasionManagementService.getSeasonBySeasonUUId(this.seasonUUId, this.token).subscribe(res$ => {
                        if (res.success) {
                            this.season = res$.season;
                            this.getDiary(this.viewDate, this.view);
                        } else {
                            this.snackBar.open(res.message, 'Đóng', {
                                duration: 3000,
                                horizontalPosition: "center",
                                verticalPosition: 'top'
                            });
                        }
                    })
                } else {
                    this.snackBar.open(res.message, 'Đóng', {
                        duration: 3000,
                        horizontalPosition: "center",
                        verticalPosition: 'top'
                    });
                }
            });
    }

    getDiary(timeOut: Date, unitOfTime: string) {
        const obj: any = {
            pondId: this.pond.pondId,
            seasonId: this.season.seasonId,
            options: {
                timeOut,
                unitOfTime
            }
        }
        this.diaryService.getDiary(obj, this.token).subscribe(res => {
            this.events = [];
            res.diaries.forEach((diary: any) => {
                const obj: any = {
                    start: moment(diary.createdDate),
                    // end: addDays(new Date(), 1),
                    title: diary.diaryName,
                    color: colors.red,
                    diary,
                }
                this.events.push(obj);
            })
            this.refresh.next();
        })
    }

    dayClicked({ date, events }: { date: Date, events: CalendarEvent[] }): void {

        if (isSameMonth(date, this.viewDate)) {
            if (
                (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
                events.length === 0
            ) {
                this.activeDayIsOpen = false;
            } else {
                this.activeDayIsOpen = true;
                this.viewDate = date;
            }
        }
    }

    eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
        event.start = newStart;
        event.end = newEnd;
        this.handleEvent('Dropped or resized', event);
        this.refresh.next();
    }

    handleEvent(action: string, event: CalendarEvent): void {
        this.config.data = { event, action };
        this.dialogRef = this.dialog.open(CalendarDialogComponent, this.config);

        this.dialogRef.afterClosed().subscribe((result: string) => {
            this.lastCloseResult = result;
            this.dialogRef = null;
        });
    }

    addEvent(): void {
        this.events.push({
            title: 'New event',
            start: startOfDay(new Date()),
            end: endOfDay(new Date()),
            color: colors.red,
            draggable: true,
            resizable: {
                beforeStart: true,
                afterEnd: true
            }
        });
        this.refresh.next();
    }
}
