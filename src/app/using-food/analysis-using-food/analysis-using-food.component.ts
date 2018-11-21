import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { PondManagementService } from 'src/app/pond-management/pond-management.service';
import { SeasionManagementService } from 'src/app/seasion-management/seasion-management.service';
import { tokenName, colors } from 'src/environments';
import { AppService } from 'src/app/app.service';
import { MatSnackBar, MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material';
import { CalendarDialogComponent } from './dialog/component';
import { CalendarEvent } from 'calendar-utils';
import { CalendarEventAction, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { Subject } from 'rxjs';
import { subDays, startOfDay, addDays, endOfMonth, addHours, endOfDay, isSameMonth, isSameDay } from 'date-fns';
import * as moment from 'moment-timezone';

@Component({
    selector: 'app-analysis-using-food',
    templateUrl: './analysis-using-food.component.html',
    styleUrls: ['./analysis-using-food.component.scss']
})
export class AnalysisUsingFoodComponent implements OnInit {

    pondUUId: string;
    seasonUUId: string;
    pond: any = {};
    season: any = {};
    token: string;

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

    actions: CalendarEventAction[] = [
        {
            label: '<i class="editButton"></i>',
            onClick: ({ event }: { event: CalendarEvent }): void => {
                this.handleEvent('Edited', event);
            }
        },
        {
            label: '<i class="deleteButton"></i>',
            onClick: ({ event }: { event: CalendarEvent }): void => {
                this.events = this.events.filter(iEvent => iEvent !== event);
                this.handleEvent('Deleted', event);
            }
        }
    ];

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
        //         // beforeStart: true,
        //         // afterEnd: true
        //     },
        //     draggable: true
        // }
    ];

    activeDayIsOpen = true;

    constructor(
        private pondManagementService: PondManagementService,
        private seasionManagementService: SeasionManagementService,
        public dialog: MatDialog,
        private snackBar: MatSnackBar,
        private route: ActivatedRoute,
        private appService: AppService
    ) {
        this.token = this.appService.getCookie(tokenName);
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
                            this.getTake();
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

    getTake() {
        const obj: any = {
            pondId: this.pond.pondId,
            seasonId: this.season.seasonId,
            type: 0
        }
        this.seasionManagementService.getTakeCare(obj, this.token).subscribe(res => {
            res.takeCare.forEach((takeCare: any) => {
                takeCare.usingFoods.forEach((using: any) => {
                    const obj: any = {
                        start: moment(using.createdDate),
                        // end: addDays(new Date(), 1),
                        title: takeCare.takeCareName,
                        color: colors.red,
                        takeCare,
                        using
                    }
                    this.events.push(obj);
                })
            })
            this.refresh.next();
        })
    }

    /**
     * Start of calendar event
     */
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

    /**
     * End of calendar event
     */
}
