import { Injectable } from "@angular/core";
import { Breadcrumb } from "@app/interfaces";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root'})
export class BreadcrumbsService {
    private breadcrumbsSubject = new BehaviorSubject<Breadcrumb[]>([]);
    breadcrumbs$ = this.breadcrumbsSubject.asObservable();

    public addBreadcrumb(newBreadcrumb: Breadcrumb){
        let currentBreadcrumbs = this.breadcrumbsSubject.getValue();
        const existingBreadcrumbIndex = currentBreadcrumbs.findIndex(breadcrumb => breadcrumb.level === newBreadcrumb.level);
        if (existingBreadcrumbIndex === -1) { // if exists
            currentBreadcrumbs.push(newBreadcrumb);
        }
        currentBreadcrumbs = currentBreadcrumbs.sort((a, b) => a.level - b.level);
        this.breadcrumbsSubject.next(currentBreadcrumbs);
    }

    public clearBreadcrumbs() {
        this.breadcrumbsSubject.next([]);
    }

    public removeBreadcrumb(breadcrumb: Breadcrumb){
        const currentBreadcrumbs = this.breadcrumbsSubject.getValue();
        const updatedBreadcrumbs = currentBreadcrumbs.filter(el => el.level !== breadcrumb.level);
        this.breadcrumbsSubject.next(updatedBreadcrumbs);
    }
    
    public removeLowerBreadcrumb(level: number){
        const currentBreadcrumbs = this.breadcrumbsSubject.getValue();
        const updatedBreadcrumbs = currentBreadcrumbs.filter(el => el.level !== level);
        this.breadcrumbsSubject.next(updatedBreadcrumbs);
    }
}