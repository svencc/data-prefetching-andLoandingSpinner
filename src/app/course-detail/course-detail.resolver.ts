import {ActivatedRouteSnapshot, Params, Resolve, RouterStateSnapshot} from '@angular/router';
import {Course} from '../shared/model/course';
import {Lesson} from '../shared/model/lesson';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {CoursesService} from '../services/courses.service';
import {switchMap, tap} from 'rxjs/operators';

export interface CourseDetailResolverData {
  course: Course,
  lessons: Lesson[]
}

@Injectable()
export class CourseDetailResolver implements Resolve<[Course, Lesson[]]> {

  constructor(private coursesService: CoursesService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<[Course, Lesson[]]> {

    return this.coursesService.findCourseByUrl(route.params['id']).pipe(
      switchMap<Course, CourseDetailResolverData>((course: Course) => {
        return this.coursesService.findLessonsForCourse(course.id).pipe(
          switchMap<Lesson[], CourseDetailResolverData>((lessons: Lesson[]) => {
            return of({course: course, lessons: lessons});
          })
        )
      }),
      tap(console.log)
    )
  }

}
