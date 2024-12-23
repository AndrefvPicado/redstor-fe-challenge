import { Injectable } from "@angular/core";
import { Breadcrumb } from "@app/interfaces";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root'})
export class BreadcrumbsService {
    private breadcrumbsSubject = new BehaviorSubject<Breadcrumb[]>([]);
    breadcrumbs$ = this.breadcrumbsSubject.asObservable();

    public addBreadcrumb(newBreadcrumb: Breadcrumb){
        const currentBreadcrumbs = this.breadcrumbsSubject.getValue();
        const existingBreadcrumbIndex = currentBreadcrumbs.findIndex(breadcrumb => breadcrumb.level === newBreadcrumb.level);
        
        if (existingBreadcrumbIndex !== -1) {
        currentBreadcrumbs[existingBreadcrumbIndex] = {
            ...currentBreadcrumbs[existingBreadcrumbIndex],
            url: newBreadcrumb.url,
            label: newBreadcrumb.label
        };
        } else {
            currentBreadcrumbs.push(newBreadcrumb);
        }

        this.breadcrumbsSubject.next(currentBreadcrumbs);
    }

    public clearBreadcrumbs() {
        this.breadcrumbsSubject.next([]);
    }

    public removeBreadcrumb(breadcrumb: Breadcrumb){
        const currentBreadcrumbs = this.breadcrumbsSubject.getValue();
        const updatedBreadcrumbs = currentBreadcrumbs.filter(breadcrumb => breadcrumb.level !== breadcrumb.level);
        this.breadcrumbsSubject.next(currentBreadcrumbs);
    }
}